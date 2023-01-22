import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import authService from "./api/authService";
import { devInstance } from "./devInstance";
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
        } catch (error: any) {
            console.log(error, "error 1");
            const message =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const loginCustomer = createAsyncThunk(
    "Authentication/CustomerLogin",
    async (customer: object, thunkAPI) => {
        try {
            return await authService.loginCustomer(customer);
        } catch (error: any) {
            const message =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const registerCustomer = createAsyncThunk(
    "Authentication/CustomerSignUp",
    async (customer: object, thunkAPI) => {
        try {
            return await authService.registerCustomer(customer);
        } catch (error: any) {
            const message =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const confirmCustomer = createAsyncThunk(
    "Authentication/CustomerSignUp",
    async (state: string, thunkAPI) => {
        try {
            return await authService.confirmCustomer(state);
        } catch (error: any) {
            const message =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const forgottenPassword = createAsyncThunk(
    "Authentication/ForgottenPassword",
    async (customerEmail: string, thunkAPI) => {
        try {
            return await authService.forgottenPassword(customerEmail);
        } catch (error: any) {
            const message =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const resendOtpCode = createAsyncThunk(
    "Authentication/resendOtp",
    async (customerEmail: string, thunkAPI) => {
        try {
            return await authService.resendOtp(customerEmail);
        } catch (error: any) {
            const message =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const updatePassword = createAsyncThunk(
    "Authentication/UpdatePassword",
    async (customerDetails: object, thunkAPI) => {
        try {
            return await authService.updatePassword(customerDetails);
        } catch (error: any) {
            const message =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
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
        updateCustomer: (state, action) => {
            state.customer = action.payload;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                console.log("error");
                state.error = action.payload;
                toast.error(`${action.payload}`);
            })
            .addCase(loginCustomer.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginCustomer.fulfilled, (state, action) => {
                state.customer = action.payload;
                state.loading = false;
                state.authenticated = true;
                toast.success("Login Successful");
            })
            .addCase(loginCustomer.rejected, (state, action) => {
                state.loading = false;
                state.authenticated = false;
                state.error = action.payload;
                toast.error(`${action.payload}`);
                console.log(action.payload);
            })
            .addCase(registerCustomer.pending, (state) => {
                state.loading = true;
            })
            .addCase(registerCustomer.fulfilled, (state, action) => {
                state.customer = action.payload;
                state.loading = false;
                state.registered = true;
                // toast.success("Your account has been created!");
                toast.success("Check your email inbox or spam for OTP");
            })
            .addCase(registerCustomer.rejected, (state, action) => {
                state.loading = false;
                state.authenticated = false;
                state.error = action.payload;
                toast.error(`${action.payload}`);
            })
            .addCase(forgottenPassword.pending, (state) => {
                state.loading = true;
            })
            .addCase(forgottenPassword.fulfilled, (state) => {
                toast.success("Check your email to reset password");
                state.loading = false;
            })
            .addCase(forgottenPassword.rejected, (state, action) => {
                state.loading = false;
                toast.error(`${action.payload}`);
            })
            .addCase(resendOtpCode.pending, (state) => {
                state.loading = true;
            })
            .addCase(resendOtpCode.fulfilled, (state) => {
                state.loading = false;
                toast.success("OTP has been resent");
            })
            .addCase(resendOtpCode.rejected, (state, action) => {
                state.loading = false;
                toast.error(`${action.payload}`);
            })
            .addCase(updatePassword.pending, (state) => {
                state.loading = true;
                console.log("pending")
            })
            .addCase(updatePassword.fulfilled, (state) => {
                state.loading = false;
                toast.success("Password has been changed successfully");
            })
            .addCase(updatePassword.rejected, (state, action) => {
                state.loading = false;
                toast.error(`${action.payload}`);
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

export const { logout, setLoading, setCustomer, setUser, updateCustomer } =
    authSlice.actions;

export default authSlice.reducer;

export const selectCurrentCustomer = (state: any) => state.auth.customer;
