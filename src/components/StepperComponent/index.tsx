import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
    clearStepper,
    nextStepper,
    prevStepper,
} from "../../store/stepperSlice";
import Button from "../ButtonComponent";

const StepperModal = (props: any) => {
    const { children, closeModal, submitEvent } = props;
    // const [completedStep, setCompletedStep] = useState(0);

    const { currentStepper }: any = useAppSelector((state) => state.stepper);
    const dispatch = useAppDispatch();

    function nextFunction() {
        currentStepper > 3 ? submitEvent() : dispatch(nextStepper());
    }

    function prevFunction() {
        if (currentStepper < 2) {
            dispatch(clearStepper());
            closeModal();
        } else {
            dispatch(prevStepper());
        }
    }

    useEffect(() => {
        console.log(currentStepper);
    });

    return (
        <div
            className="fixed top-0 left-0 w-screen h-screen grid place-items-center overflow-y-auto py-20 bg-primary/30 text-primary"
            {...props}
        >
            <div className="w-[691px] h-[1028px] bg-white-light rounded-[20px] flex flex-col">
                <div className="w-full h-[72px] border-b-primary/10 border-b flex justify-center items-center text-sm">
                    {["Customer Info", "Next of Kin", "Bank Info & KYC"].map(
                        (item, index) => (
                            <div key={index} className="flex items-center">
                                <div
                                    className={`flex space-x-2 items-center ${
                                        index + 1 <= currentStepper
                                            ? "text-primary"
                                            : "text-blue-lighter"
                                    }`}
                                >
                                    <div
                                        className={`w-[43.8px] h-[40px] rounded-full bg-blue-lighter/40 grid place-items-center font-bold text-base ${
                                            index + 1 <= currentStepper
                                                ? "bg-blue-lighter"
                                                : "bg-blue-lighter/30"
                                        }`}
                                    >
                                        {index + 1}
                                    </div>
                                    <span>{item}</span>
                                </div>

                                {index < 2 && (
                                    <hr className="w-[50px] border-primary mx-3" />
                                )}
                            </div>
                        )
                    )}
                </div>

                <div className="w-[570px] mx-auto py-6 grow flex flex-col justify-between">
                    <div>{children}</div>

                    <div className="mt-14 flex justify-between">
                        <Button buttonType="md" onClick={prevFunction}>
                            {currentStepper > 1 ? "Back" : "Cancel"}
                        </Button>

                        <button
                            className="w-[180px] border-primary border rounded-[8px] hover:bg-primary/5 font-semibold"
                            onClick={nextFunction}
                        >
                            {currentStepper === 4 ? "Submit" : "Next"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StepperModal;
