import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    user: object;
    customer: object;
    token: string;
}

const initialState: AuthState = {
    user: {},
    customer: {},
    token: "",
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
});

export default authSlice.reducer;
