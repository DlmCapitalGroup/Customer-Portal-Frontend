import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import authService from "./api/authService";
import { devInstance } from "./devInstance";
import { setMessageType } from "./toastSlice";
interface AuthState {
    user: object | null;
    customer: object | null;
    token: string;
    loading: boolean;
    error: any;
    success: boolean;
    authenticated: boolean;
    registered: boolean;
}

const initialState: AuthState = {
    user: null,
    customer: null,
    token: "",
    loading: false,
    error: null,
    success: false,
    authenticated: false,
    registered: false,
};

export const loginUser = createAsyncThunk(
    "Authentication/LoginUser",
    async (user: object, thunkAPI) => {
        try {
            return await authService.loginUser(user);
        } catch (error) {
            setMessageType("error")
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const loginCustomer = createAsyncThunk(
    "Authentication/CustomerLogin",
    async (customer: object, thunkAPI) => {
        try {
            return await authService.loginCustomer(customer);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const registerCustomer = createAsyncThunk(
    "Authentication/CustomerSignUp",
    async (customer: object, thunkAPI) => {
        try {
            return await authService.registerCustomer(customer);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const confirmCustomer = createAsyncThunk(
    "Authentication/CustomerSignUp",
    async (otp: string, thunkAPI) => {
        // try {
        //     return await authService.confirmCustomer(otp, token, email);
        // } catch (error) {
        //     return thunkAPI.rejectWithValue(error);
        // }
    }
);

export const forgotPassword = createAsyncThunk(
    "Authentication/ForgotPassword",
    async (customerEmail: string, thunkAPI) => {
        try {
            return await authService.forgotPassword;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setCustomer: (state, action) => {
            state.customer = action.payload;
        },
        setLoading: (state) => {
            if (state.loading === false) {
                state.loading = true;
            } else {
                state.loading = false;
            }
        },
        logout: (state) => {
            state.user = null;
            state.customer = null;
            localStorage.removeItem("user");
            localStorage.removeItem("customer");
            setAuthToken(null);
        },
    },
    extraReducers(builder) {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                console.log("loading user");
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.user = action.payload;
                toast("Logged in successfully!");
                state.loading = false;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                toast(`${state.error.message}`)
            })
            .addCase(loginCustomer.pending, (state) => {
                state.loading = true;
                console.log("loading customer");
            })
            .addCase(loginCustomer.fulfilled, (state, action) => {
                state.customer = action.payload;
                state.loading = false;
                state.authenticated = true;
                console.log("fulfilled customer");
            })
            .addCase(loginCustomer.rejected, (state, action) => {
                state.loading = false;
                state.authenticated = false;
                state.error = action.payload;
                toast(`${state.error.message}`)
            })
            .addCase(registerCustomer.pending, (state) => {
                state.loading = true;
                console.log("registering customer");
            })
            .addCase(registerCustomer.fulfilled, (state, action) => {
                console.log(action.payload);
                // state.customer = action.payload;
                // state.loading = false;
                // state.registered = true;
                // console.log("registered customer");
            })
            .addCase(registerCustomer.rejected, (state, action) => {
                state.loading = false;
                state.authenticated = false;
                state.error = action.payload;
                console.log(state.error.message);
            });
    },
});


export const setAuthToken = (token: string | null) => {
    if (token) {
        devInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
        delete devInstance.defaults.headers.common.Authorization;
    }
};

export const { logout, setLoading, setCustomer, setUser } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentCustomer = (state: any) => state.auth.customer;
