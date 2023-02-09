import React, { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import productImageLg from "../../assets/images/product-image-lg.png";
import Button from "../../components/ButtonComponent";
import { Input, Select } from "../../components/FormElements";
import StepperModal from "../../components/StepperComponent";
import { useAppSelector } from "../../store/hooks";

const Product = () => {
    const [openStepper, setOpenStepper] = useState(true);
    const location: any = useLocation();
    const [investment, setInvestment] = useState("");
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        
    });
    const { currentStepper }: any = useAppSelector((state) => state.stepper);
    let stateParams = location?.state?.selectedProduct;
    function closeModal() {
        setOpenStepper(false);
    }

    function openModal() {
        if (stateParams) {
            setInvestment(stateParams);
        }
        setOpenStepper(true);
    }

    function formChange(e: any) {}

    console.log(stateParams);

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
                    <Button buttonType="lg" onClick={openModal}>
                        Get Started
                    </Button>
                </div>
            </div>

            {openStepper && (
                <StepperModal
                    closeModal={closeModal}
                    investment={investment}
                >
                    <form className="text-primary">
                        {currentStepper === 1 && (
                            <div>
                                <h3 className="text-xl font-semibold mb-[29px] text-center">
                                    Customer Information
                                </h3>
                                <div className="flex flex-col gap-y-4">
                                    <div className="grid grid-cols-2 gap-x-7">
                                        <Input
                                            placeholder="First Name *"
                                            name="FirstName"
                                            onChange={formChange}
                                            required
                                        />
                                        <Input
                                            placeholder="Surname *"
                                            name="Surname"
                                            onChange={formChange}
                                            required
                                        />
                                    </div>
                                    <Input
                                        placeholder="Middle Name *"
                                        name="MiddleName"
                                        onChange={formChange}
                                        required
                                    />
                                    <Input
                                        placeholder="Mother’s Maiden Name *"
                                        name="MotherMaidenName"
                                        onChange={formChange}
                                        required
                                    />
                                    <div className="grid grid-cols-2 gap-x-7">
                                        <Select
                                            options={["Male", "Female"]}
                                            title="Gender *"
                                        />
                                        <Input
                                            type="date"
                                            placeholder="Mother’s Maiden Name *"
                                            name="MotherMaidenName"
                                            onChange={formChange}
                                            required
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-x-7">
                                        <Input
                                            placeholder="Place of Birth *"
                                            name="MotherMaidenName"
                                            onChange={formChange}
                                            required
                                        />
                                        <Input
                                            placeholder="Occupation *"
                                            name="MotherMaidenName"
                                            onChange={formChange}
                                            required
                                        />
                                    </div>
                                    <Select
                                        options={["Nigeria", "Ghania"]}
                                        title="Nationality *"
                                    />
                                    <div className="grid grid-cols-2 gap-x-7">
                                        <Input
                                            placeholder="Next of Kin Phone Number *"
                                            type="number"
                                            name="MotherMaidenName"
                                            onChange={formChange}
                                            required
                                        />
                                        <Input
                                            placeholder="Next of Kin Contact Address *"
                                            name="MotherMaidenName"
                                            onChange={formChange}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                        {currentStepper === 2 && (
                            <div>
                                <h3 className="text-xl font-semibold mb-[29px] text-center">
                                    Contact Details
                                </h3>
                                <div className="flex flex-col gap-y-4">
                                    <Input
                                        placeholder="Residential Address *"
                                        name="FirstName"
                                        onChange={formChange}
                                        required
                                    />
                                    <Input
                                        placeholder="Postal Address *"
                                        name="Surname"
                                        onChange={formChange}
                                        required
                                    />
                                    <div className="grid grid-cols-2 gap-x-7">
                                        <Input
                                            placeholder="Phone Number *"
                                            name="FirstName"
                                            onChange={formChange}
                                            required
                                            type="number"
                                        />
                                        <Input
                                            placeholder="Email Address *"
                                            name="Surname"
                                            onChange={formChange}
                                            required
                                            type="email"
                                        />
                                    </div>
                                    <Input
                                        placeholder="Passport Picture *"
                                        name="FirstName"
                                        onChange={formChange}
                                        required
                                        type="file"
                                    />
                                    <Input
                                        placeholder="Unit holder signature *"
                                        name="Surname"
                                        onChange={formChange}
                                        required
                                        type="file"
                                    />
                                </div>
                            </div>
                        )}
                        {currentStepper === 3 && (
                            <div>
                                <h3 className="text-xl font-semibold mb-[29px] text-center">
                                    Employment Details
                                </h3>
                                <div className="flex flex-col gap-y-4">
                                    <Select
                                        options={["Employed", "Unemployed"]}
                                        title="Employment Status *"
                                    />
                                    <Input
                                        placeholder="Employer *"
                                        name="FirstName"
                                        onChange={formChange}
                                        required
                                    />
                                    <Input
                                        placeholder="Employer’s Telephone Number *"
                                        name="FirstName"
                                        onChange={formChange}
                                        required
                                        type="number"
                                    />
                                    <Input
                                        placeholder="Employer/Employment Address *"
                                        name="FirstName"
                                        onChange={formChange}
                                        required
                                        type="number"
                                    />
                                    <Input
                                        placeholder="Source of Funds *"
                                        name="FirstName"
                                        onChange={formChange}
                                        required
                                        type="number"
                                    />
                                    <Input
                                        placeholder="Gross Annual Income Details *"
                                        name="FirstName"
                                        onChange={formChange}
                                        required
                                        type="number"
                                    />
                                </div>
                            </div>
                        )}

                        {currentStepper === 4 && (
                            <div>
                                <h3 className="text-xl font-semibold mb-[29px] text-center">
                                    Banking Details
                                </h3>
                                <div className="flex flex-col gap-y-4">
                                    <Select
                                        options={["GTB", "Zenith"]}
                                        title="Bank *"
                                    />

                                    <Input
                                        placeholder="Account Name *"
                                        name="FirstName"
                                        onChange={formChange}
                                        required
                                    />
                                    <Input
                                        placeholder="Account Number *"
                                        name="FirstName"
                                        onChange={formChange}
                                        required
                                        type="number"
                                    />
                                    <Input
                                        placeholder="Branch *"
                                        name="FirstName"
                                        onChange={formChange}
                                        required
                                    />
                                    <Input
                                        placeholder="BVN *"
                                        name="FirstName"
                                        onChange={formChange}
                                        required
                                        type="number"
                                    />
                                </div>
                                <p className="flex space-x-5 items-start text-base text-black mt-12">
                                    <input
                                        type="checkbox"
                                        className="rounded-[5px] bg-white-lighter mt-1"
                                        required
                                    />
                                    <p className="-tracking-[.02em] text-xs">
                                        I hereby declare that the details
                                        furnished above are true and correct to
                                        the best of my knowledge, information
                                        and belief and i undertake to inform DLM
                                        Asset Management Limited of any changes
                                        therein, immediately in the event that
                                        any of the above information is found to
                                        be false or untrue or misleading or
                                        misrepresented, I am aware that I may be
                                        held liable for it. I hereby consent to
                                        DLM Asset Management Limited sharing any
                                        of the information furnished in this
                                        form as it deems appropriate and as may
                                        be required by regulatory authorities.
                                    </p>
                                </p>
                            </div>
                        )}
                    </form>
                </StepperModal>
            )}
        </div>
    );
};

export default Product;
