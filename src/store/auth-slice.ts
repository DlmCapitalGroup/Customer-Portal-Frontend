import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import authService from "./api/authService";
import { devInstance } from "./devInstance";
import { clearStepper } from "./stepperSlice";
interface AuthState {
    user: {} | null;
    customer: {} | null;
    token: {};
    loading: boolean;
    customerOnboardingData: {} | null;
    updatedOnboardingData: {} | null;
}

const initialState: AuthState = {
    user: null,
    customer: null,
    token: "",
    loading: false,
    customerOnboardingData: null,
    updatedOnboardingData: null,
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
    "Authentication/updatePassword",
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

export const resetPassword = createAsyncThunk(
    "Authentication/UpdatePassword",
    async (customerDetails: object, thunkAPI) => {
        try {
            return await authService.resetPassword(customerDetails);
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
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        logout: (state) => {
            localStorage.removeItem("persist:root");
            localStorage.removeItem('token');
            state.user = null;
            state.customer = null;
            state.loading = false;
            setAuthToken(null);
            clearStepper();
        },
        updateCustomer: (state, action) => {
            state.customer = action.payload;
        },
        setCustomerOnboardingData: (state, action) => {
            state.customerOnboardingData = action.payload;
        },
        setUpdatedOnboardingData: (state, action) => {
            state.updatedOnboardingData = action.payload;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                toast.error(`${action.payload}`);
            })
            .addCase(loginCustomer.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginCustomer.fulfilled, (state, action) => {
                state.customer = action.payload;
                state.loading = false;
                // toast.success("Login Successful");
            })
            .addCase(loginCustomer.rejected, (state, action) => {
                state.loading = false;
                toast.error(`${action.payload}`);
            })
            .addCase(registerCustomer.pending, (state) => {
                state.loading = true;
            })
            .addCase(registerCustomer.fulfilled, (state, action) => {
                state.customer = action.payload;
                state.loading = false;
                toast.success("Check your email inbox or spam for OTP");
            })
            .addCase(registerCustomer.rejected, (state, action: any) => {
                state.loading = false;
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
            .addCase(resetPassword.pending, (state) => {
                state.loading = true;
            })
            .addCase(resetPassword.fulfilled, (state) => {
                state.loading = false;
                toast.success("Password has been changed successfully");
            })
            .addCase(resetPassword.rejected, (state, action: any) => {
                state.loading = false;
                toast.error(
                    `${action.payload.errors.ConfirmPassword.map(
                        (err: any) => err
                    )}`
                );
                console.log(action.payload);
                console.log(action.payload.errors);
            })
            .addCase(updatePassword.pending, (state) => {
                state.loading = true;
            })
            .addCase(updatePassword.fulfilled, (state) => {
                state.loading = false;
                toast.success("Password has been updated successfully");
            })
            .addCase(updatePassword.rejected, (state, action: any) => {
                state.loading = false;
                toast.error(`${action.payload}`);
            });
    },
});

export const setAuthToken = (token: string | null) => {
    if (token) {
        localStorage.setItem('token', token)
        devInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
        delete devInstance.defaults.headers.common.Authorization;
    }
};

export const {
    logout,
    setLoading,
    setCustomer,
    setUser,
    updateCustomer,
    setCustomerOnboardingData,
    setUpdatedOnboardingData,
} = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentCustomer = (state: any) => state.auth.customer;
export const selectUpdatedOnboardingData = (state: any) =>
    state.auth.updatedOnboardingData;
