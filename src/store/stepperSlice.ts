import { createSlice } from "@reduxjs/toolkit";

interface StepperState {
    currentStepper: number;
    formData: object;
    updatedOnboardingData: {} | null;
}

const initialState: StepperState = {
    currentStepper: 1,
    formData: {
        IsANewClient: "true",
        InvestmentAmount: "",
        HearAboutUs: "",
        IsAJointApplicant: "",
        JointApplicantsName: "",
        Surname: "",
        Age: "",
        BirthDate: "",
        EmailAddress: "",
        PhoneNumber: "",
        ResidentialAddress: "",
        State: "",
        Country: "",
        Occupation: "",
        IdType: "",
        IdNumber: "",
        IdIssueDate: "",
        ExpiryDate: "",
        NameNOK: "",
        ResidentialAddressNOK: "",
        CityNOK: "",
        EmailAddressNOK: "",
        RelationshipWithNOK: "",
        PrefCommunicationMode: "",
        AccountName: "",
        AccountNumber: "",
        BankName: "",
        BVN: "",
        InterestReinvestment: "",
        Nationality: "",
        ResidenceJurisdiction: "",
        UsTin: "",
        PassportPhoto: "",
        FormOfIdentity: "",
        UtilityBill: "",
        UnitHolderSignature: "",
    },
    updatedOnboardingData: null,
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
            state.currentStepper = 0;
        },
        clearForm: (state) => {
            state.formData = {
                IsANewClient: "true",
                InvestmentAmount: "",
                HearAboutUs: "",
                IsAJointApplicant: "",
                JointApplicantsName: "",
                FirstName: "",
                Surname: "",
                Age: "",
                BirthDate: "",
                EmailAddress: "",
                PhoneNumber: "",
                ResidentialAddress: "",
                State: "",
                Country: "",
                Occupation: "",
                IdType: "",
                IdNumber: "",
                IdIssueDate: "",
                ExpiryDate: "",
                NameNOK: "",
                ResidentialAddressNOK: "",
                CityNOK: "",
                EmailAddressNOK: "",
                RelationshipWithNOK: "",
                PrefCommunicationMode: "",
                AccountName: "",
                AccountNumber: "",
                BankName: "",
                BVN: "",
                InterestReinvestment: "",
                Nationality: "",
                ResidenceJurisdiction: "",
                UsTin: "",
                PassportPhoto: "",
                FormOfIdentity: "",
                UtilityBill: "",
                UnitHolderSignature: "",
            };
        },
        setData: (state, action: any) => {
            state.formData = action.payload;
        },
        setUpdatedOnboardingData: (state, action) => {
            state.updatedOnboardingData = action.payload;
        },
    },
});

export const {
    nextStepper,
    prevStepper,
    setData,
    clearStepper,
    setUpdatedOnboardingData,
    clearForm,
} = stepperSlice.actions;

export default stepperSlice.reducer;
