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

const Product = () => {
    const location: any = useLocation();
    const [investment, setInvestment] = useState<any>("");
    const [openStepper, setOpenStepper] = React.useState(false);
    const [stepperType, setStepperType] = React.useState("");
    let stateParams = location?.state?.selectedProduct;
    const dispatch = useAppDispatch();

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

    const products = React.useMemo(
        () => [
            {
                id: 1,
                title: "Fixed Income Fund",
                thumb: r1,
                desc: "The DLM Fixed Income Fund, a SEC-registered mutual fund that invests in fixed income assets, offers a unique opportunity for investors with a minimum investment of N10,000. The fund boasts a 15% return as of today, one of the highest in the market. Investors can top up with N10,000 at any time, making it a great tool for developing a savings culture and financial discipline. Withdrawals after one month are not subject to penalty fees and there are no hidden charges. On average, the fund performs better than typical savings accounts offered by banks.",
            },
            {
                id: 2,
                title: "High Interest Investment Plan",
                thumb: r6,
                desc: "This high-yield investment opportunity offers investors the chance to earn returns above a typical savings account with fixed investment returns over a specified period. On maturity, there is the option to roll over investments and the flexibility to migrate to other investment plans without incurring any penalty fees.",
            },
            {
                id: 3,
                title: "Child Education Plan",
                thumb: r5,
                desc: "The Child Education Plan is a great way to secure the future of your child by providing you with the ability to plan and fund their education, from primary through tertiary levels. Investments can be made on a monthly, quarterly, or yearly basis, with three different investment plans to choose from: Silver (minimum of N20,000), Gold (minimum of N100,000), and Platinum (minimum of N250,000). Clients have the option to customize their investment plans to suit their individual needs and an advisor will provide pertinent and useful information and guide the client through the entire planning process.",
            },
            {
                id: 4,
                title: "Target Date Plan",
                thumb: r7,
                desc: "The DLM Asset Management Target Date Plan is tailored to meet the needs of investors who have a specific financial goal in mind and the discipline to reach it. The plan involves a disciplined investment process and is locked in for the selected length of time chosen by the subscriber at the time of subscription. This plan is designed for individuals, families, and organizations that have a set financial goal to achieve and offers flexibility with a flexible plan date and the option for subscribers to choose either monthly, quarterly, or annual contribution. The account can be run in either dollars or naira, with a minimum investment of N20,000.00 in Naira and $10,000.00 in Dollars. The plan guarantees a return of 10% per annum (as of today) and subscribers have access to a free financial planning session with a wealth advisor.",
            },
            {
                id: 5,
                title: "Retirement plan subscription",
                thumb: r8,
                desc: "The DLM Asset Management Retirement Planning is a solution tailored for employers and employees who are planning for their post-retirement life. It provides the opportunity to plan for retirement with experienced professionals and own a diverse range of assets, while also having access to best-in-class wealth advisory services. The plan is designed to help clients design their future and manage the various risks associated with retirement, including longevity risks and investment risks, while also helping to organize and manage their assets.",
            },
        ],
        []
    );

    useEffect(() => {
        if (typeof stateParams === "string") {
            let product = products.find((el) => el.title === stateParams);
            setInvestment(product);
        }
        console.log(investment);
    }, [investment, products, stateParams]);

    function openModal() {
        setOpenStepper(true);
        if (
            investment?.title.toLowerCase() === "fixed income fund" ||
            products[stateParams]?.title.toLowerCase() === "fixed income fund"
        ) {
            setStepperType("fif");
            dispatch(clearStepper());
        }
        if (
            investment?.title.toLowerCase() ===
                "high interest investment plan" ||
            products[stateParams]?.title.toLowerCase() ===
                "high interest investment plan"
        ) {
            setStepperType("hiip1");
            dispatch(clearStepper());
        }
        if (
            investment?.title.toLowerCase() === "target date plan" ||
            products[stateParams]?.title.toLowerCase() === "target date plan"
        ) {
            setStepperType("tdp");
            dispatch(clearStepper());
        }
        if (
            investment?.title.toLowerCase() ===
                "retirement plan subscription" ||
            products[stateParams]?.title.toLowerCase() ===
                "retirement plan subscription"
        ) {
            setStepperType("rps");
            dispatch(clearStepper());
        }
        if (
            investment?.title.toLowerCase() === "child education plan" ||
            products[stateParams]?.title.toLowerCase() ===
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
                {investment?.title || products[stateParams]?.title}
            </h3>
            <p className="mb-[73px] text-base">
                See and learn more about our products and what they have to
                offer you.
            </p>
            <div>
                <div className="mb-10 h-96 w-full">
                    <img
                        alt=""
                        src={investment?.thumb || products[stateParams]?.thumb}
                        className="w-full h-full object-cover object-center rounded-[20px]"
                    />
                </div>

                <p className="mb-20">
                    {investment?.desc || products[stateParams]?.desc}
                </p>

                <div className="text-center">
                    <Button buttonType="lg" onClick={openModal}>
                        Create account
                    </Button>
                </div>
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
