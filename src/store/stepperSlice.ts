import { createSlice } from "@reduxjs/toolkit";

interface StepperState {
    currentStepper: number;
}

const initialState: StepperState = {
    currentStepper: 1,
};

const stepperSlice = createSlice({
    name: "stepper",
    initialState,
    reducers: {
        nextStepper: (state: any) => {
            state.currentStepper = state.currentStepper + 1;
        },
        prevStepper: (state) => {
            state.currentStepper = state.currentStepper - 1;
        },
        clearStepper: (state) => {
            state.currentStepper = 0;
        },
    },
});

export const {
    nextStepper,
    prevStepper,
    clearStepper,
} = stepperSlice.actions;

export default stepperSlice.reducer;
