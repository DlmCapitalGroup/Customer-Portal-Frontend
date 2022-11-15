import React, { useState } from "react";
import productImageLg from "../../assets/images/product-image-lg.png";
import Button from "../../components/ButtonComponent";

const StepperModal = (props: any) => {
    const { children, closeModal, submitEvent } = props;
    const [step, setStep] = useState(1);
    const [completedStep, setCompletedStep] = useState(0);

    function nextFunction() {
        setStep((prev) => (prev > 3 ? submitEvent() : prev + 1));
    }

    function prevFunction() {
        if (step > 1) {
            setStep((prev) => (prev < 2 ? closeModal() : prev - 1));
        } else {
            closeModal();
        }
    }

    return (
        <div className="fixed top-0 left-0 w-screen h-screen grid place-items-center overflow-y-auto py-20 bg-primary/30 text-primary">
            <div className="w-[691px] h-[1028px] bg-white-light rounded-[20px]">
                <div className="w-full h-[72px] border-b-primary/10 border-b flex justify-center items-center text-sm">
                    {["Customer Info", "Next of Kin", "Bank Info & KYC"].map(
                        (item, index) => (
                            <div key={index} className="flex items-center">
                                <div
                                    className={`flex space-x-2 items-center ${
                                        index + 1 <= step
                                            ? "text-primary"
                                            : "text-blue-lighter"
                                    }`}
                                >
                                    <div
                                        className={`w-[43.8px] h-[40px] rounded-full bg-blue-lighter/40 grid place-items-center font-bold text-base ${
                                            index + 1 <= step
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
                        ),
                    )}
                </div>

                <div className="w-[570px] mx-auto py-6">
                    <div>{children}</div>

                    <div className="mt-14 flex justify-between">
                        <Button buttonType="md" onClick={prevFunction}>
                            {step > 1 ? "Back" : "Cancel"}
                        </Button>

                        <button
                            className="w-[180px] border-primary border rounded-[8px] hover:bg-primary/5 font-semibold"
                            onClick={nextFunction}
                        >
                            {step === 3 ? "Submit" : "Next"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Product = () => {
    const [openStepper, setOpenStepper] = useState(false);
    function closeModal() {
        setOpenStepper(false);
    }

    function openModal() {
        setOpenStepper(true);
    }

    return (
        <div className="pt-[50px] text-primary max-w-[1120px] text-base pb-20">
            <h3 className="text-xl font-semibold mb-[15px]">
                Fixed Deposit Investment
            </h3>
            <p className="mb-[73px] text-base">
                See and learn more about our products and what they have to
                offer you.
            </p>
            <div>
                <div className="mb-10">
                    <img alt="" src={productImageLg} />
                </div>

                <p className="mb-20">
                    See and learn more about our products and what they have to
                    offer you. See and learn more about our products and what
                    they have to offer you.See and learn more about our products
                    and what they have to offer you. See and learn more about
                    our products and what they have to offer you. See and learn
                    more about our products and what they have to offer you. See
                    and learn more about our products and what they have to
                    offer you. See and learn more about our products and what
                    they have to offer you.See and learn more about our products
                    and what they have to offer you.See and learn more about our
                    products and what they have to offer you.See and learn more
                    about our products and what they have to offer you.See and
                    learn more about our products and what they have to offer
                    you.See and learn more about our products and what they have
                    to offer you. See and learn more about our products and what
                    they have to offer you.
                </p>

                <div className="text-center">
                    <Button buttonType="lg" onClick={openModal}>Get Started</Button>
                </div>
            </div>

            {openStepper && <StepperModal closeModal={closeModal} />}
        </div>
    );
};

export default Product;
