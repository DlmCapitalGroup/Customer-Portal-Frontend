import React, {
    MutableRefObject,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import productImageLg from "../../assets/images/product-image-lg.png";
import Button from "../../components/ButtonComponent";
import { Input, Select } from "../../components/FormElements";
// import Select from "../../components/SelectComponent";
import Loader from "../../components/LoaderComponent";
import StepperModal from "../../components/StepperComponent";
import { devInstance } from "../../store/devInstance";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
    clearForm,
    clearStepper,
    nextStepper,
    setData,
} from "../../store/stepperSlice";
import r1 from "../../assets/images/r1.svg";
import r5 from "../../assets/images/r5.svg";
import r6 from "../../assets/images/r6.svg";
import r7 from "../../assets/images/r7.svg";
import r8 from "../../assets/images/r8.svg";
import Products from "./ProductsScreen";
import HiipIndividualForm from "./HiipIndividualForm";
import HiipCorporateForm from "./HiipCorporateForm";

const Product = () => {
    const navigate = useNavigate();
    const location: any = useLocation();
    const formEl: any = useRef();
    const dispatch = useAppDispatch();
    const [investment, setInvestment] = useState<any>("");
    const [currentStep, setCurrentStep] = useState(1);
    const [openStepper, setOpenStepper] = React.useState(false);
    const [stepperType, setStepperType] = React.useState("");
    const { currentStepper, formData }: any = useAppSelector(
        (state) => state.stepper
    );
    const [newClient, setNewClient] = useState("true");
    const [product, setProduct] = React.useState<any>({});
    const [loading, setLoading] = useState(false);
    let stateParams = location?.state?.selectedProduct;
    function closeModal() {
        setOpenStepper(false);
        setStepperType("");
    }

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

    function setClient(value: any) {
        dispatch(
            setData({
                ...formData,
                IsANewClient: value,
            })
        );
        console.log(formData);
    }

    const formChange = async (e: any) => {
        e.preventDefault();
        if (e.target.type === "radio") {
            if (e.target.value === "Yes") {
                dispatch(
                    setData({
                        ...formData,
                        [e.target.name]: "true",
                    })
                );
            } else {
                if (e.target.value === "No") {
                    dispatch(
                        setData({
                            ...formData,
                            [e.target.name]: "False",
                        })
                    );
                }
            }
        } else if (e.target.type === "file") {
            setLoading(true);
            const data = new FormData();
            data.append("file", e.target.files[0]);
            data.append("upload_preset", "assetmanagement");
            fetch("https://api.cloudinary.com/v1_1/hammy06/image/upload", {
                method: "post",
                mode: "cors",
                body: data,
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data.secure_url);
                    dispatch(
                        setData({
                            ...formData,
                            [e.target.name]: data,
                        })
                    );
                    console.log(formData);
                })
                .catch((err) => {
                    setLoading(false);
                    toast(`${err}`);
                })
                .finally(() => setLoading(false));
        } else {
            dispatch(
                setData({
                    ...formData,
                    [e.target.name]: e.target.value,
                })
            );
        }
        console.log(formData);
    };

    const fileErrors = [
        {
            title: "Passport Photo",
            value: formData.PassportPhoto,
        },
        {
            title: "Utility Bill",
            value: formData.UtilityBill,
        },
        {
            title: "Unit Holder Signature",
            value: formData.UnitHolderSignature,
        },
        {
            title: "Form of Identity",
            value: formData.FormOfIdentity,
        },
    ];

    const openAccount = async (e: any) => {
        if (fileErrors[0].value === "") {
            toast.error(`${fileErrors[0].title} is required`);
        }
        if (fileErrors[1].value === "") {
            toast.error(`${fileErrors[1].title} is required`);
        }
        if (fileErrors[2].value === "") {
            toast.error(`${fileErrors[2].title} is required`);
        }
        if (fileErrors[3].value === "") {
            toast.error(`${fileErrors[3].title} is required`);
        }

        if (
            fileErrors[0].value &&
            fileErrors[1].value &&
            fileErrors[2].value &&
            fileErrors[3].value
        ) {
            setLoading(true);
            // setTimeout(() => {
            //     setLoading(false);
            //     toast.success("Account Opened Successfully!");
            //     setOpenStepper(false);
            //     dispatch(clearStepper());
            //     navigate("/");
            // }, 3000);
            var data = new FormData();
            data.append("AccountName", formData.AccountName || "NA");
            data.append(
                "AccountNumber",
                formData.AccountNumber || "1234567890"
            );
            data.append("Age", formData.Age || "18");
            data.append("BirthDate", formData.BirthDate || "2022-01-01");
            data.append("BankName", formData.BankName || "NA");
            data.append("BVN", formData.BVN);
            data.append("CityNOK", formData.CityNOK || "NA");
            data.append("Country", formData.Country || "NA");
            data.append("EmailAddress", formData.EmailAddress);
            data.append("EmailAddressNOK", formData.EmailAddressNOK);
            data.append("ExpiryDate", formData.ExpiryDate || "2022-01-01");
            data.append("FormOfIdentity", formData.FormOfIdentity);
            data.append("IdIssueDate", formData.IdIssueDate || "2022-01-01");
            data.append("IdNumber", formData.IdNumber);
            data.append("IdType", formData.IdType || "NA");
            data.append(
                "InterestReinvestment",
                formData.InterestReinvestment || "true"
            );
            data.append("InvestmentAmount", formData.InvestmentAmount || "200");
            data.append(
                "IsAJointApplicant",
                formData.IsAJointApplicant || "true"
            );
            data.append("IsANewClient", formData.IsANewClient || "true");
            data.append(
                "JointApplicantsName",
                formData.JointApplicantsName || "NA"
            );
            data.append("NameNOK", formData.NameNOK || "NA");
            data.append("Nationality", formData.Nationality || "NA");
            data.append("Occupation", formData.Occupation || "NA");
            data.append("PassportPhoto", formData.PassportPhoto || "NA");
            data.append("PhoneNumber", formData.PhoneNumber || "NA");
            data.append(
                "PrefCommunicationMode",
                formData.PrefCommunicationMode
            );
            data.append(
                "ProductName",
                investment.title || products[stateParams]?.title
            );
            data.append(
                "RelationshipWithNOK",
                formData.RelationshipWithNOK || "NA"
            );
            data.append("ResidentialAddress", formData.ResidentialAddress);
            data.append(
                "ResidentialAddressNOK",
                formData.ResidentialAddressNOK
            );
            data.append("State", formData.State || "NA");
            data.append("UnitHolderSignature", formData.UnitHolderSignature);
            data.append("UtilityBill", formData.UtilityBill);
            data.append("HearAboutUs", formData.HearAboutUs);
            data.append("FirstName", formData.FirstName);
            data.append("Surname", formData.Surname);
            data.append(
                "ResidenceJurisdiction",
                formData.ResidenceJurisdiction
            );
            data.append("UsTin", formData.UsTin);

            var config = {
                method: "post",
                maxBodyLength: Infinity,
                url: "https://apps.dlm.group/ASSETMGTAPI/api/v1/Transaction/FixedIncomeFundInvestment",
                data: data,
            };

            devInstance(config)
                .then(function (response: any) {
                    console.log(JSON.stringify(response.data));
                    toast.success(
                        `${response.message || response.data.message}`
                    );
                    dispatch(clearStepper());
                    dispatch(clearForm());
                    setOpenStepper(false);
                })
                .catch(function (error: any) {
                    console.log(error);
                    toast.error("error");
                    setLoading(false);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    };

    function openModal() {
        // if (stateParams) {
        //     setInvestment(stateParams);
        // }
        setOpenStepper(true);
        if (
            investment?.title.toLowerCase() === "fixed income fund" ||
            products[stateParams]?.title.toLowerCase() === "fixed income fund"
        ) {
            setStepperType("fif");
        }
        if (
            investment?.title.toLowerCase() ===
                "high interest investment plan" ||
            products[stateParams]?.title.toLowerCase() ===
                "high interest investment plan"
        ) {
            setStepperType("hiip");
        }
    }

    console.log(stateParams, "state params");

    return (
        <div className="pt-[50px] text-primary max-w-[1120px] text-base pb-20">
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
                <StepperModal closeModal={closeModal} submitEvent={openAccount}>
                    <div className="text-primary">
                        {currentStepper === 0 && (
                            <div>
                                <h3 className="text-xl font-semibold text-center mb-3">
                                    Fixed Income Fund Investment
                                </h3>
                                <p className="mb-[29px] text-center">
                                    Kindly fill the form to get started on your
                                    fixed income fund investment
                                </p>
                                <div className="flex flex-col gap-y-4">
                                    <div className="flex justify-between w-full">
                                        <div className="flex items-center gap-x-3">
                                            <input
                                                className="border-primary checked:bg-primary focus:bg-primary focus:ring-primary checked:ring-primary"
                                                name="IsANewClient"
                                                type="radio"
                                                checked
                                                onClick={() =>
                                                    setClient("true")
                                                }
                                            />
                                            I am a new client
                                        </div>
                                        <div className="flex items-center gap-x-3">
                                            <input
                                                className="border-primary checked:bg-primary"
                                                name="IsANewClient"
                                                type="radio"
                                                value="No"
                                                onClick={() =>
                                                    setClient("false")
                                                }
                                            />
                                            I am an existing client
                                        </div>
                                    </div>
                                    <div>
                                        <Input
                                            placeholder="How much do you want to invest (Min of 10,000) *"
                                            name="InvestmentAmount"
                                            onChange={formChange}
                                            required
                                            type="number"
                                            value={
                                                formData.InvestmentAmount ||
                                                null
                                            }
                                        />
                                    </div>
                                    <div>
                                        <Select
                                            options={[
                                                "Referral/ Word of Mouth",
                                                "Google Search",
                                                "Instagram",
                                                "Twitter",
                                                "Facebook",
                                                "Others",
                                            ]}
                                            required
                                            title="How did you hear about us? *"
                                            name="HearAboutUs"
                                            onChange={formChange}
                                            value={formData.HearAboutUs || null}
                                        />
                                    </div>
                                    <div>
                                        <Select
                                            options={["Yes", "No"]}
                                            title="Is this a joint applicant? *"
                                            name="IsAJointApplicant"
                                            onChange={formChange}
                                            required
                                            value={
                                                formData.IsAJointApplicant ||
                                                null
                                            }
                                        />
                                    </div>
                                    {formData.IsAJointApplicant === "true" && (
                                        <div>
                                            <Input
                                                placeholder="Joint applicants name"
                                                name="JointApplicantsName"
                                                onChange={formChange}
                                                value={
                                                    formData.JointApplicantsName ||
                                                    null
                                                }
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
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
                                            value={formData.FirstName}
                                            pattern="[A-Za-z]+"
                                            title="Only Alphabets are allowed"
                                        />
                                        <Input
                                            placeholder="Surname *"
                                            name="Surname"
                                            onChange={formChange}
                                            required
                                            pattern="[A-Za-z]+"
                                            title="Only Alphabets are allowed"
                                            value={formData.Surname}
                                            // value={customer?.lastName}
                                            // disabled
                                        />
                                    </div>
                                    <Input
                                        placeholder="Age *"
                                        name="Age"
                                        onChange={formChange}
                                        required
                                        max="99"
                                        min="18"
                                        type="number"
                                        value={formData.Age}
                                    />
                                    <Input
                                        placeholder="Date Of Birth *"
                                        name="BirthDate"
                                        onChange={formChange}
                                        required
                                        type="date"
                                        value={formData.BirthDate || null}
                                    />
                                    <Input
                                        placeholder="Email Address *"
                                        name="EmailAddress"
                                        onChange={formChange}
                                        required
                                        type="email"
                                        value={formData.EmailAddress}
                                    />
                                    <Input
                                        placeholder="Phone Number *"
                                        name="PhoneNumber"
                                        type="number"
                                        onChange={formChange}
                                        required
                                        value={formData.PhoneNumber}
                                    />
                                    <Input
                                        placeholder="Residential Address *"
                                        name="ResidentialAddress"
                                        onChange={formChange}
                                        required
                                        value={formData.ResidentialAddress}
                                    />
                                    <div className="grid grid-cols-2 gap-x-7">
                                        <Select
                                            options={[
                                                "Nigeria",
                                                "Ghana",
                                                "Togo",
                                            ]}
                                            title="Country *"
                                            name="Country"
                                            onChange={formChange}
                                            required
                                            value={formData.Country || null}
                                        />
                                        <Select
                                            options={states}
                                            title="State *"
                                            name="State"
                                            placeholder="state"
                                            onChange={formChange}
                                            required
                                            value={formData.State || null}
                                        />
                                    </div>
                                    <Input
                                        placeholder="Occupation  *"
                                        name="Occupation"
                                        onChange={formChange}
                                        pattern="^[A-Za-z]+[A-Za-z ]*$"
                                        title="Only Alphabets are allowed"
                                        required
                                        value={formData.Occupation || null}
                                    />
                                    <div className="grid grid-cols-2 gap-x-7">
                                        <Select
                                            options={[
                                                "International Passport",
                                                "Driver's License",
                                                "National ID",
                                                "Voters Card",
                                            ]}
                                            title="Type of ID *"
                                            name="IdType"
                                            onChange={formChange}
                                            value={formData.State || null}
                                        />
                                        <Input
                                            placeholder="ID Number *"
                                            name="IdNumber"
                                            onChange={formChange}
                                            required
                                            type="number"
                                            value={formData.IdNumber}
                                        />
                                    </div>
                                    {(formData.IdType === "Driver's License" ||
                                        formData.IdType === "National ID") && (
                                        <div className="grid grid-cols-2 gap-x-7">
                                            <Input
                                                placeholder="ID Issue Date *"
                                                name="IdIssueDate"
                                                onChange={formChange}
                                                required
                                                type="date"
                                                value={formData.IdIssueDate}
                                            />
                                            <Input
                                                placeholder="Expiry Date *"
                                                name="ExpiryDate"
                                                onChange={formChange}
                                                required
                                                type="date"
                                                value={formData.ExpiryDate}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                        {currentStepper === 2 && (
                            <div>
                                <h3 className="text-xl font-semibold mb-[29px] text-center">
                                    Next of Kin
                                </h3>
                                <div className="flex flex-col gap-y-4">
                                    <Input
                                        placeholder="Name of Next of Kin *"
                                        name="NameNOK"
                                        onChange={formChange}
                                        pattern="^[A-Za-z]+[A-Za-z ]*$"
                                        title="Only Alphabets are allowed"
                                        required
                                        value={formData.NameNOK}
                                    />
                                    <Input
                                        placeholder="Residential Address *"
                                        name="ResidentialAddressNOK"
                                        onChange={formChange}
                                        required
                                        value={formData.ResidentialAddressNOK}
                                    />
                                    <Input
                                        placeholder="City *"
                                        name="CityNOK"
                                        onChange={formChange}
                                        required
                                        pattern="^[A-Za-z]+[A-Za-z ]*$"
                                        title="Only Alphabets are allowed"
                                        value={formData.CityNOK}
                                    />
                                    <Input
                                        placeholder="Email Address *"
                                        name="EmailAddressNOK"
                                        onChange={formChange}
                                        required
                                        type="email"
                                        value={formData.EmailAddressNOK}
                                    />
                                    <Input
                                        placeholder="Relationship with Next of Kin *"
                                        name="RelationshipWithNOK"
                                        pattern="^[A-Za-z]+[A-Za-z ]*$"
                                        title="Only Alphabets are allowed"
                                        onChange={formChange}
                                        required
                                        value={formData.RelationshipWithNOK}
                                    />
                                    <Select
                                        options={["Email", "SMS", "Phone Call"]}
                                        title="Preferred Mode of Communication *"
                                        name="PrefCommunicationMode"
                                        onChange={formChange}
                                        required
                                        value={
                                            formData.PrefCommunicationMode ||
                                            null
                                        }
                                    />
                                </div>
                            </div>
                        )}
                        {currentStepper === 3 && (
                            <div>
                                <h3 className="text-xl font-semibold mb-[29px] text-center">
                                    Bank Information
                                </h3>
                                <div className="flex flex-col gap-y-4">
                                    <Input
                                        placeholder="Account Name *"
                                        name="AccountName"
                                        onChange={formChange}
                                        required
                                        value={formData.AccountName}
                                        pattern="^[A-Za-z]+[A-Za-z ]*$"
                                        title="Only Alphabets are allowed"
                                    />
                                    <Input
                                        placeholder="Account Number *"
                                        name="AccountNumber"
                                        onChange={formChange}
                                        required
                                        type="number"
                                        value={formData.AccountNumber}
                                    />
                                    <Select
                                        options={[
                                            "Links Microfinance Bank",
                                            "Zenith Bank",
                                            "UBA",
                                            "GT Bank",
                                        ]}
                                        title="Bank Name *"
                                        required
                                        name="BankName"
                                        onChange={formChange}
                                        value={formData.BankName || null}
                                    />
                                    <Input
                                        placeholder="BVN *"
                                        name="BVN"
                                        onChange={formChange}
                                        required
                                        type="number"
                                        value={formData.BVN}
                                    />
                                    <div className="flex flex-col space-y-1">
                                        <Select
                                            options={["Yes", "No"]}
                                            title="Do you want to reinvest Interest/Dividend? *"
                                            required
                                            name="InterestReinvestment"
                                            onChange={formChange}
                                            value={
                                                formData.InterestReinvestment ||
                                                null
                                            }
                                        />
                                        <small>
                                            Dividend/Redemption payments will
                                            only be made to the bank details
                                            above
                                        </small>
                                    </div>
                                    <Select
                                        options={["Nigeria", "Ghana", "Togo"]}
                                        title="Nationality *"
                                        name="Nationality"
                                        required
                                        onChange={formChange}
                                        value={formData.Nationality || null}
                                    />
                                    <textarea
                                        name="ResidenceJurisdiction"
                                        onChange={formChange}
                                        className="h-110px] w-full text-base mt-2 placeholder-primary/40 px-4 bg-white-lighter focus:ring-primary active:ring-primary shadow-sm border border-primary/5 rounded-lg"
                                        value={formData.ResidenceJurisdiction}
                                        placeholder="If you have residence in a jurisdiction other than Nigeria, please state the jurisdiction "
                                    ></textarea>
                                    <textarea
                                        name="UsTin"
                                        onChange={formChange}
                                        className="h-110px] w-full text-base mt-2 placeholder-primary/40 px-4 bg-white-lighter focus:ring-primary active:ring-primary shadow-sm border border-primary/5 rounded-lg"
                                        value={formData.UsTin}
                                        placeholder="If you are a US citizen or US tax resident, please provide your US Tax Identification Number"
                                    ></textarea>
                                </div>
                            </div>
                        )}

                        {currentStepper === 4 && (
                            <div>
                                <h3 className="text-xl font-semibold mb-[29px] text-center">
                                    KYC Information
                                </h3>
                                <div className="flex flex-col gap-y-4">
                                    <Input
                                        placeholder="Passport Picture *"
                                        name="PassportPhoto"
                                        onChange={formChange}
                                        type="file"
                                        uploaded={
                                            formData.PassportPhoto
                                                ? true
                                                : false
                                        }
                                    />
                                    <Input
                                        placeholder="Form of Identity (Govt ID) *"
                                        name="FormOfIdentity"
                                        onChange={formChange}
                                        type="file"
                                        uploaded={
                                            formData.FormOfIdentity
                                                ? true
                                                : false
                                        }
                                    />
                                    <Input
                                        placeholder="Utility Bill *"
                                        name="UtilityBill"
                                        onChange={formChange}
                                        type="file"
                                        uploaded={
                                            formData.UtilityBill ? true : false
                                        }
                                    />
                                    <Input
                                        placeholder="Unit holder signature *"
                                        name="UnitHolderSignature"
                                        onChange={formChange}
                                        type="file"
                                        uploaded={
                                            formData.UnitHolderSignature
                                                ? true
                                                : false
                                        }
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
                                        held liable for it. I hereby cosnsent to
                                        DLM Asset Management Limited sharing any
                                        of the information furnished in this
                                        form as it deems appropriate and as may
                                        be required by regulatory authorities.
                                    </p>
                                </p>
                            </div>
                        )}
                    </div>
                </StepperModal>
            )}
            {openStepper && stepperType === "hiip" && (
                <HiipCorporateForm closeModal={closeModal} />
            )}
            {loading && <Loader />}
        </div>
    );
};

export default Product;
