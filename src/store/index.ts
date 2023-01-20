import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import toastReducer from "./toastSlice";

export const store = configureStore({
    reducer: { auth: authReducer, toast: toastReducer },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
