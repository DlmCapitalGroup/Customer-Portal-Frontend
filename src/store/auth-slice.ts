import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import authService from "./api/authService";
import { devInstance } from "./devInstance";
interface AuthState {
    user: object | null;
    customer: object | null;
    token: string;
    loading: boolean;
    error: string;
    success: boolean;
    loggedIn: boolean;
}

const initialState: AuthState = {
    user: null,
    customer: null,
    token: "",
    loading: false,
    error: "",
    success: false,
    loggedIn: false,
};

export const loginUser = createAsyncThunk(
    "Authentication/LoginUser",
    async (user: object, thunkAPI) => {
        try {
            return await authService.loginUser(user);
        } catch (error) {
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

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        // setUser: (state, action) => {
        //     const { user } = action.payload;
        //     state.user = user;
        // },
        // setCustomer: (state, action) => {
        //     const { customer } = action.payload;
        //     state.customer = customer;
        // },
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
                // console.log(action.payload)
                // const { user } = action.payload;
                state.user = action.payload;
                state.loading = false;
                console.log("fulfilled user");
                console.log(state.user)
            })
            .addCase(loginUser.rejected, (state) => {
                state.loading = false;
                console.log("error");
                state.error = "error";
            })
            .addCase(loginCustomer.pending, (state) => {
                state.loading = true;
                console.log("loading customer");
            })
            .addCase(loginCustomer.fulfilled, (state, action) => {
                const { customer } = action.payload;
                state.customer = customer;
                state.loading = false;
                state.loggedIn = true;
                console.log("fulfilled customer");
            })
            .addCase(loginCustomer.rejected, (state) => {
                state.loading = false;
                console.log("error");
                state.error = "error";
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

export const { logout, setLoading } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentCustomer = (state: any) => state.auth.customer;
