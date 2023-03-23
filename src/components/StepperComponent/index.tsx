import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
    clearStepper,
    nextStepper,
    prevStepper,
} from "../../store/stepperSlice";
import Button from "../ButtonComponent";
import { usePaystackPayment } from "react-paystack";
import { devInstance } from "../../store/devInstance";
import { toast } from "react-toastify";

interface stepperProps {
    children?: React.ReactNode;
    closeModal?: any;
    submitEvent?: any;
    stepperTitles?: Array<any>;
    iCorp?: boolean;
    rPlan?: boolean;
    cep?: boolean;
    amount?: any;
    email?: string;
    firstname: string;
    lastname: string;
    phone: string;
}

const StepperModal = (props: stepperProps) => {
    const {
        children,
        closeModal,
        submitEvent,
        stepperTitles,
        iCorp,
        rPlan,
        cep,
        amount,
        email,
        firstname,
        lastname,
        phone,
    } = props;

    const { customer }: any = useAppSelector((state) => state.auth);

    const config: any = {
        reference: new Date().getTime().toString(),
        email: email || customer.emailAddress,
        amount: amount * 100 || 50000, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
        publicKey: process.env.REACT_APP_APIKEY_PAYSTACK,
        metadata: {
            custom_field: [
                {
                    phone: phone,
                    first_name: firstname,
                    last_name: lastname,
                },
            ],
        },
    };

    const initializePayment = usePaystackPayment(config);

    const submitPaystackData = async (data: any) => {
        console.log(data, "pp! data");
        await devInstance
            .post("/Transaction/PayDetails", data)
            .then((res: any) => {
                if (res.status === 200) {
                    submitEvent?.();
                }
            })
            .catch((error: any) => {
                const message =
                    (error.response && error.response.data) ||
                    error.message ||
                    error.toString();
                console.log(message);
                toast.error(message);
            })
            .finally(() => console.log("Done"));
    };

    const onSuccess: any = (referenceRes: any) => {
        let data = {
            reference: referenceRes?.reference,
            customerId: customer?.customerId,
            trans: referenceRes?.trans,
            transaction: referenceRes?.transaction,
            trxref: referenceRes?.trxref,
            redirecturl: referenceRes?.redirecturl,
        };

        if (referenceRes) {
            submitPaystackData?.(data);
        }
    };

    const onClose = () => {
        console.log("closed");
    };

    const paystackHookExample = () => {
        initializePayment(onSuccess, onClose);
    };

    const { currentStepper }: any = useAppSelector((state) => state.stepper);
    const dispatch = useAppDispatch();

    function nextFunction(e: any) {
        e.preventDefault();
        (iCorp && currentStepper > 2) ||
        (rPlan && currentStepper > 1) ||
        (cep && currentStepper > 1) ||
        currentStepper > 3
            ? paystackHookExample()
            : dispatch(nextStepper());
    }

    function prevFunction() {
        if ((cep && currentStepper === 1) || currentStepper === 0) {
            dispatch(clearStepper());
            closeModal();
        } else {
            dispatch(prevStepper());
        }
    }

    return (
        <div
            className="fixed top-0 left-0 w-screen h-screen flex flex-col items-center overflow-y-auto py-10 bg-primary/30 text-primary"
            {...props}
        >
            <form
                className="w-[691px] bg-white-light rounded-[20px] flex flex-col my-10 py-5"
                onSubmit={nextFunction}
            >
                <div className="w-full h-[72px] border-b-primary/10 border-b flex justify-center items-center text-sm">
                    {(
                        stepperTitles || [
                            "",
                            "Customer Info",
                            "Next of Kin",
                            "Bank Info & KYC",
                        ]
                    ).map((item, index) => {
                        return (
                            index + 1 !== 1 && (
                                <div key={index} className="flex items-center">
                                    <div
                                        className={`flex space-x-2 items-center ${
                                            index <= currentStepper
                                                ? "text-primary"
                                                : "text-blue-lighter"
                                        }`}
                                    >
                                        <div
                                            className={`w-[40px] h-[40px] rounded-full bg-blue-lighter/40 grid place-items-center font-bold text-base ${
                                                index <= currentStepper
                                                    ? "bg-blue-lighter"
                                                    : "bg-blue-lighter/30"
                                            }`}
                                        >
                                            {index}
                                        </div>
                                        <span>{item}</span>
                                    </div>

                                    {(index < 3 ||
                                        (iCorp && index < 2) ||
                                        (rPlan && index < 2)) && (
                                        <hr
                                            className={`w-[50px] border-primary mx-3 ${
                                                stepperTitles && "w-[20px]"
                                            }`}
                                        />
                                    )}
                                </div>
                            )
                        );
                    })}
                </div>

                <div className="w-[570px] mx-auto py-6 grow flex flex-col gap-y-10 justify-between">
                    <div>{children}</div>

                    <div className="mt-14 flex justify-between">
                        <Button
                            buttonType="md"
                            onClick={prevFunction}
                            type="button"
                        >
                            {currentStepper > 0 ? "Back" : "Cancel"}
                        </Button>

                        <button
                            type="submit"
                            className="w-[180px] border-primary border rounded-[8px] hover:bg-primary/5 font-semibold"
                        >
                            {currentStepper === 4 ||
                            (iCorp && currentStepper > 2) ||
                            (rPlan && currentStepper > 1) ||
                            (cep && currentStepper > 1)
                                ? "Submit"
                                : "Next"}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default StepperModal;
