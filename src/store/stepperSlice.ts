import { createSlice } from "@reduxjs/toolkit";

interface StepperState {
    currentStepper: number;
    formData: object;
}

const initialState: StepperState = {
    currentStepper: 1,
    formData: {
        FirstName: "",
        Surname: "",
        PhoneNumber: "",
        EmailAddress: "",
        MiddleName: "",
        MotherMaidenName: "",
        Gender: "",
        BirthDate: "",
        BirthPlace: "",
        Occupation: "",
        Nationality: "",
        NextOfKinName: "",
        RelationshipWithNOK: "",
        PhoneNumberNOK: "",
        ContactAddressNOK: "",
        ResidentialAddress: "",
        PostalAddress: "",
        PassportPhoto: "",
        UnitHolderSignature: "",
        EmploymentStatus: "",
        Employer: "",
        EmployerPhoneNumber: "",
        EmployerAddress: "",
        FundSource: "",
        GrossAnnualIncome: "",
        BankName: "",
        AccountName: "",
        AccountNumber: "",
        Branch: "",
        BVN: "",
    },
};

const stepperSlice = createSlice({
    name: "stepper",
    initialState,
    reducers: {
        nextStepper: (state: any) => {
            state.currentStepper = state.currentStepper + 1;
            // console.log(state.formData.PassportPhoto)
        },
        prevStepper: (state) => {
            state.currentStepper = state.currentStepper - 1;
        },
        clearStepper: (state) => {
            state.currentStepper = 1;
            // state.formData = {
            //     FirstName: "",
            //     Surname: "",
            //     PhoneNumber: "",
            //     EmailAddress: "",
            //     MiddleName: "",
            //     MotherMaidenName: "",
            //     Gender: "",
            //     BirthDate: "",
            //     BirthPlace: "",
            //     Occupation: "",
            //     Nationality: "",
            //     NextOfKinName: "",
            //     RelationshipWithNOK: "",
            //     PhoneNumberNOK: "",
            //     ContactAddressNOK: "",
            //     ResidentialAddress: "",
            //     PostalAddress: "",
            //     PassportPhoto: "",
            //     UnitHolderSignature: "",
            //     EmploymentStatus: "",
            //     Employer: "",
            //     EmployerPhoneNumber: "",
            //     EmployerAddress: "",
            //     FundSource: "",
            //     GrossAnnualIncome: "",
            //     BankName: "",
            //     AccountName: "",
            //     AccountNumber: "",
            //     Branch: "",
            //     BVN: "",
            // };
        },
        setData: (state, action: any) => {
            state.formData = action.payload;
        },
    },
});

export const { nextStepper, prevStepper, setData, clearStepper } =
    stepperSlice.actions;

export default stepperSlice.reducer;
