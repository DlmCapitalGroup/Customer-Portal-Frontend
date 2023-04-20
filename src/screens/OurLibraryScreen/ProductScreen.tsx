import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../components/ButtonComponent";
import Loader from "../../components/LoaderComponent";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import r1 from "../../assets/images/r1.svg";
import r5 from "../../assets/images/r5.svg";
import r6 from "../../assets/images/r6.svg";
import r7 from "../../assets/images/r7.svg";
import r8 from "../../assets/images/r8.svg";
import HiipIndividualForm from "./HiipIndividualForm";
import HiipCorporateForm from "./HiipCorporateForm";
import TargetDatePlan from "./TargetDatePlan";
import RetirementPlanSubscription from "./RetirementPlanSubscription";
import FixedIncomeFund from "./FixedIncomeFund";
import ChildEducationPlan from "./ChildEducationPlan";
import { clearStepper } from "../../store/stepperSlice";
import Back from "../../components/BackButton";
import { devInstance } from "../../store/devInstance";

const Product = () => {
    const location: any = useLocation();
    const [investment, setInvestment] = useState<any>("");
    const [openStepper, setOpenStepper] = React.useState(false);
    const [stepperType, setStepperType] = React.useState("");
    const [loading, setLoading] = useState(false);
    let stateParams = location?.state?.selectedProduct;
    const dispatch = useAppDispatch();
    const [products, setProducts] = useState<any>([]);

    const { customer }: any = useAppSelector((state) => state.auth);

    const states = [
        "Abia",
        "Adamawa",
        "Akwa Ibom",
        "Anambra",
        "Bauchi",
        "Bayelsa",
        "Benue",
        "Borno",
        "Cross River",
        "Delta",
        "Ebonyi",
        "Edo",
        "Ekiti",
        "Enugu",
        "FCT - Abuja",
        "Gombe",
        "Imo",
        "Jigawa",
        "Kaduna",
        "Kano",
        "Katsina",
        "Kebbi",
        "Kogi",
        "Kwara",
        "Lagos",
        "Nasarawa",
        "Niger",
        "Ogun",
        "Ondo",
        "Osun",
        "Oyo",
        "Plateau",
        "Rivers",
        "Sokoto",
        "Taraba",
        "Yobe",
        "Zamfara",
    ];

    useEffect(() => {
        setLoading(true);
        devInstance
            .get(
                "https://apps.dlm.group/ASSETMGTAPI/api/v1/admin/GetProductIds"
            )
            .then((response) => {
                setProducts(response.data.data);
                console.log(response.data.data);
            })
            .catch((err) => console.log(err))
            .finally(() => {
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        if (typeof stateParams === "string") {
            let product = products.find(
                (el: any) => el.productName === stateParams
            );
            setInvestment(product);
        }
        console.log(investment);
    }, [investment, products, stateParams]);

    function openModal() {
        setOpenStepper(true);
        if (
            investment?.productName.toLowerCase() === "fixed income fund" ||
            products[stateParams]?.productName.toLowerCase() ===
                "fixed income fund"
        ) {
            setStepperType("fif");
            dispatch(clearStepper());
        }
        if (
            investment?.productName.toLowerCase() ===
                "high interest investment plan" ||
            products[stateParams]?.productName.toLowerCase() ===
                "high interest investment plan"
        ) {
            setStepperType("hiip1");
            dispatch(clearStepper());
        }
        if (
            investment?.productName.toLowerCase() === "target date plan" ||
            products[stateParams]?.productName.toLowerCase() ===
                "target date plan"
        ) {
            setStepperType("tdp");
            dispatch(clearStepper());
        }
        if (
            investment?.productName.toLowerCase() ===
                "retirement plan subscription" ||
            products[stateParams]?.productName.toLowerCase() ===
                "retirement plan subscription"
        ) {
            setStepperType("rps");
            dispatch(clearStepper());
        }
        if (
            investment?.productName.toLowerCase() === "child education plan" ||
            products[stateParams]?.productName.toLowerCase() ===
                "child education plan"
        ) {
            setStepperType("cep");
            dispatch(clearStepper());
        }
    }

    function closeModal() {
        setOpenStepper(false);
        setStepperType("");
        dispatch(clearStepper());
    }

    function formType(val: string) {
        if (val === "individual") {
            setStepperType("hiip1");
            console.log("Value of form", val);
        }
        if (val === "corporate") {
            setStepperType("hiip2");
            console.log("Value of form", val);
        }
    }

    console.log(stateParams);

    return (
        <div className="pt-[50px] text-primary max-w-[1120px] text-base pb-20">
            <Back />
            <h3 className="text-xl font-semibold mb-[15px] capitalize">
                {investment?.productName || products[stateParams]?.productName}
            </h3>
            <p className="mb-[73px] text-base">
                See and learn more about our products and what they have to
                offer you.
            </p>
            <div>
                <div className="mb-10 h-96 w-full">
                    <img
                        alt=""
                        src={
                            investment?.imageUrl ||
                            products[stateParams]?.imageUrl
                        }
                        className="w-full h-full object-cover object-center rounded-[20px]"
                    />
                </div>

                <p className="mb-20">
                    {investment?.productDescription ||
                        products[stateParams]?.productDescription}
                </p>

                <div className="text-center">
                    <Button buttonType="lg" onClick={openModal}>
                        Create account
                    </Button>
                </div>
                {loading && <Loader />}
            </div>

            {openStepper && stepperType === "fif" && (
                <FixedIncomeFund states={states} closeModal={closeModal} />
            )}
            {openStepper && stepperType === "hiip1" && (
                <HiipIndividualForm
                    closeModal={closeModal}
                    states={states}
                    formType={formType}
                />
            )}
            {openStepper && stepperType === "hiip2" && (
                <HiipCorporateForm
                    closeModal={closeModal}
                    states={states}
                    formType={formType}
                />
            )}
            {openStepper && stepperType === "tdp" && (
                <TargetDatePlan closeModal={closeModal} />
            )}
            {openStepper && stepperType === "rps" && (
                <RetirementPlanSubscription closeModal={closeModal} />
            )}
            {openStepper && stepperType === "cep" && (
                <ChildEducationPlan closeModal={closeModal} states={states} />
            )}
        </div>
    );
};

export default Product;
