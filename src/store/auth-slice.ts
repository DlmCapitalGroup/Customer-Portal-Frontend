import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import authService from "./api/authService";
import { devInstance } from "./devInstance";
import { clearStepper } from "./stepperSlice";
import { store } from ".";
interface AuthState {
    user: {} | null;
    customer: {} | null;
    token: {};
    loading: boolean;
    customerOnboardingData: {} | null;
    updatedOnboardingData: {} | null;
    admin: {} | null;
}

const initialState: AuthState = {
    user: {
        access_token:
            "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJhMVFQeFJTQmEtTkR3U1VtMjFySXp4UHBQZmJ0NWdfdDRlQ3ZXemZhTFU4In0.eyJleHAiOjE2ODg1NTgzNTAsImlhdCI6MTY4ODUyMjM1MCwianRpIjoiM2I1ZTkzN2UtYTdhOC00Y2NiLTlkZWMtZjNhNjhiZDJhZjk2IiwiaXNzIjoiaHR0cDovL2tleWNsb2FrOjgwODAvYXV0aC9yZWFsbXMvemFuaWJhbC1hcHBsaWNhdGlvbi1zdWl0ZSIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiIyODkyNzM0ZS1hMTNjLTQ2OWItOWI5Yy00MmZmODk2NmYxZTYiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJlZmluYW5jZS1hcHBzIiwic2Vzc2lvbl9zdGF0ZSI6ImJhNjQ2YWU0LTFmYjctNDk5OS1hZDk2LWVhMmZhZDBlOTc1NSIsImFjciI6IjEiLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiZGVmYXVsdC1yb2xlcy16YW5pYmFsLWFwcGxpY2F0aW9uLXN1aXRlIiwib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImVmaW5hbmNlLWFwcHMiOnsicm9sZXMiOlsiYXBpLXVzZXIiLCJhcHAtYWRtaW4iXX0sImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoiZW1haWwgcHJvZmlsZSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiYXBwLWdyb3VwIjoiU1lTQURNSU4iLCJuYW1lIjoiQmlzb2xhIE9ndW55ZSIsInByZWZlcnJlZF91c2VybmFtZSI6InN1cHBvcnQuYXBpIiwiZ2l2ZW5fbmFtZSI6IkJpc29sYSIsImZhbWlseV9uYW1lIjoiT2d1bnllIn0.e35icDlgWOrqe6hqui3AThwUQVYjD3TvOBU_6jIwhc7f5IO6yKYb73rNoywZzY_tU3bRsT7MMNrlsqLJb-sjXgxdSTeMCaJVg3P7rN5j7afdC8n2ov_LjtJUZBuzafhYzD5bi81g-TZRgQeyrTgbC6qyaBmOP8a7IcczYSAVwxda3YO3uRjbycGpL6X97h505AZadblXIZBAzxn5VzwvzKJ9c4DtIJfa5I-xxTNHZk4EeLQaarReDEen_6mNKOA5yDYIH4T_O-Sl-M1xRZdA-PdO5E4xY8eQmwapxzbWTJrS5OFS4w4URiqnK14dj5U15wTkI4z3EAhaxXnVjGwZ8g",
        expires_in: 36000,
        refresh_expires_in: 1800,
        refresh_token:
            "eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI3MDM3NThhMS05OGVmLTRkZTQtOWRhMS04NWIyZTZiNDZlM2YifQ.eyJleHAiOjE2ODg1MjQxNTAsImlhdCI6MTY4ODUyMjM1MCwianRpIjoiMWY1MDkwOWYtNTE3Yy00YTliLTgyNDQtMTY2MjcyZTk5OWI4IiwiaXNzIjoiaHR0cDovL2tleWNsb2FrOjgwODAvYXV0aC9yZWFsbXMvemFuaWJhbC1hcHBsaWNhdGlvbi1zdWl0ZSIsImF1ZCI6Imh0dHA6Ly9rZXljbG9hazo4MDgwL2F1dGgvcmVhbG1zL3phbmliYWwtYXBwbGljYXRpb24tc3VpdGUiLCJzdWIiOiIyODkyNzM0ZS1hMTNjLTQ2OWItOWI5Yy00MmZmODk2NmYxZTYiLCJ0eXAiOiJSZWZyZXNoIiwiYXpwIjoiZWZpbmFuY2UtYXBwcyIsInNlc3Npb25fc3RhdGUiOiJiYTY0NmFlNC0xZmI3LTQ5OTktYWQ5Ni1lYTJmYWQwZTk3NTUiLCJzY29wZSI6ImVtYWlsIHByb2ZpbGUifQ.BX60BtyqRNJSi2jIo_YJyitBJ0LhSoTq74PxtGj_bJY",
        token_type: "Bearer",
        "not-before-policy": 0,
        session_state: "ba646ae4-1fb7-4999-ad96-ea2fad0e9755",
        scope: "email profile",
    },
    customer: {
        id: 851715,
        active: true,
        name: "0000010943",
        label: "AJANAKU OLADIMEJI",
        ecrmId: 851715,
        referalCode: "OLAJ1715",
        cashAcct: "0000019179",
        cashAcctBalance: "NGN 0.00",
        firstName: "Oladimeji",
        lastName: "Ajanaku",
        cellPhone: "09162611469",
        emailAddress1: "hamzat-oz@hotmail.com",
        portalUserName: "hammy06",
        portalPasswordToken:
            "VzJDfFWv4f6q1+zy3GAAy0HQaESS0HyV4RrMRK8wVHNjhSA0cdVA+HxgoL5XldLpkQyVGiliKztPenKVwrzBPw==",
        allowDebitBalance: false,
        customerGroupName: "STANDARD",
        customerGroupLabel: "STANDARD",
        businessOfficeName: "0000000008",
        customerType: "REGULAR",
        partnerType: "INDIVIDUAL",
        termsAndCondAccepted: false,
        enrollInContribScheme: false,
        accountOpened: 1687392000000,
        status: "ACTIVE",
        workflowStatus: "APPROVED",
    },
    token: "",
    loading: false,
    customerOnboardingData: null,
    updatedOnboardingData: null,
    admin: null,
};

export const loginUser = createAsyncThunk(
    "/security/request/access-token",
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

export const loginAdmin = createAsyncThunk(
    "Admin/LoginAdmin",
    async (admin: object, thunkAPI) => {
        try {
            return await authService.loginAdmin(admin);
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
    async (customer: any, thunkAPI) => {
        try {
            // console.log(customer)
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
    "/partner/customer/create",
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
        logout: (state, userType) => {
            localStorage.removeItem("persist:root");
            localStorage.removeItem("token");
            state.user = null;
            state.customer = null;
            state.loading = false;
            state.admin = null;
            setAuthToken(null);
            clearStepper();
            if (userType.payload === "customer") {
                window.location.href = "/auth/sign-in";
            } else {
                window.location.href = "/admin/sign-in";
            }
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
            .addCase(loginAdmin.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginAdmin.fulfilled, (state, action) => {
                state.loading = false;
                state.admin = action.payload;
            })
            .addCase(loginAdmin.rejected, (state, action) => {
                state.loading = false;
                toast.error(`${action.payload}`);
            })
            .addCase(loginCustomer.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginCustomer.fulfilled, (state, action) => {
                state.customer = action.payload;
                state.loading = false;
                console.log(action.payload);
                // toast.success("Login Successful");
            })
            .addCase(loginCustomer.rejected, (state, action) => {
                state.loading = false;
                toast.error(`${action.payload}`);
            })
            .addCase(registerCustomer.pending, (state) => {
                // state.loading = true;
            })
            .addCase(registerCustomer.fulfilled, (state, action) => {
                // store.dispatch(loginCustomer(action.payload));
                // state.loading = false;
                // toast.success("Check your email inbox or spam for OTP");
            })
            .addCase(registerCustomer.rejected, (state, action: any) => {
                // state.loading = false;
                // toast.error(`${action.payload}`);
                console.log(action.payload);
                toast.error("Error Creating Account");
            })
            .addCase(forgottenPassword.pending, (state) => {
                // state.loading = true;
            })
            .addCase(forgottenPassword.fulfilled, (state) => {
                toast.success("Check your email to reset password");
                // state.loading = false;
            })
            .addCase(forgottenPassword.rejected, (state, action) => {
                state.loading = false;
                toast.error(`${action.payload}`);
            })
            .addCase(resendOtpCode.pending, (state) => {
                // state.loading = true;
            })
            .addCase(resendOtpCode.fulfilled, (state) => {
                // state.loading = false;
                toast.success("OTP has been resent");
            })
            .addCase(resendOtpCode.rejected, (state, action) => {
                // state.loading = false;
                toast.error(`${action.payload}`);
            })
            .addCase(resetPassword.pending, (state) => {
                // state.loading = true;
            })
            .addCase(resetPassword.fulfilled, (state) => {
                // state.loading = false;
                toast.success("Password has been changed successfully");
            })
            .addCase(resetPassword.rejected, (state, action: any) => {
                // state.loading = false;
                toast.error(
                    `${action.payload.errors.ConfirmPassword.map(
                        (err: any) => err
                    )}`
                );
                console.log(action.payload);
                console.log(action.payload.errors);
            })
            .addCase(updatePassword.pending, (state) => {
                // state.loading = true;
            })
            .addCase(updatePassword.fulfilled, (state) => {
                // state.loading = false;
                toast.success("Password has been updated successfully");
            })
            .addCase(updatePassword.rejected, (state, action: any) => {
                // state.loading = false;
                toast.error(`${action.payload}`);
            });
    },
});

export const setAuthToken = (token: string | null) => {
    if (token) {
        console.log(token, "set authentication token method");
        localStorage.setItem("token", token);
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
