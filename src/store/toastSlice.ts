import { createSlice } from "@reduxjs/toolkit";

interface ToastSlice {
    message: string | null;
    messageType: "success" | "error" | null;
}

const initialState: ToastSlice = {
    message: null,
    messageType: null,
};

const toastSlice = createSlice({
    name: "toast",
    initialState,
    reducers: {
        setMessage: (state, action) => {
            state.message = action.payload;
        },
        setMessageType: (state, action) => {
            console.log(action.payload, 'action.payload')
            state.messageType = action.payload;
        },
    },
});

export const { setMessage, setMessageType } = toastSlice.actions;

export default toastSlice.reducer;

export const selectMessage = (state: any) => state.toast.message;
export const selectMessageType = (state: any) => state.toast.messageType;
