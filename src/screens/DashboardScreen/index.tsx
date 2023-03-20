import React, { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import searchIcon from "../../assets/images/search-icon.svg";
import userIcon from "../../assets/images/user-icon-lg.svg";
import settingsIcon from "../../assets/images/settings-icon-dark.svg";
import notificationIcon from "../../assets/images/notification-icon-dark.svg";
import naira from "../../assets/images/naira.svg";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Link, useNavigate } from "react-router-dom";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import Button from "../../components/ButtonComponent";
import { devInstance } from "../../store/devInstance";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import CustomChart from "../../components/pieChart";
import Loader from "../../components/LoaderComponent";
import { toast } from "react-toastify";
import elipse from "../../assets/images/elipse.svg";
import StepperModal from "../../components/StepperComponent";
import { Input, Select } from "../../components/FormElements";
import { clearStepper } from "../../store/stepperSlice";
import axios from "axios";
import chevronDown from "../../assets/images/chevron-down.svg";
import cancelBtn from "../../assets/images/close-modal.svg";
import {
    setCustomerOnboardingData,
    setUpdatedOnboardingData,
} from "../../store/auth-slice";

ChartJS.register(ArcElement, Tooltip, Legend);

const DashboardScreen = () => {
    const data = [
        { name: "0", uv: 400, pv: 1000, amt: 1000 },
        { name: "1", uv: 500, pv: 600, amt: 700 },
        { name: "2", uv: 600, pv: 300, amt: 400 },
        { name: "3", uv: 300, pv: 400, amt: 600 },
        { name: "4", uv: 200, pv: 400, amt: 600 },
        { name: "5", uv: 700, pv: 300, amt: 200 },
        { name: "6", uv: 800, pv: 300, amt: 400 },
        { name: "7", uv: 600, pv: 400, amt: 900 },
        { name: "8", uv: 400, pv: 200, amt: 100 },
        { name: "9", uv: 500, pv: 500, amt: 500 },
    ];
    const { customer, customerOnboardingData }: any = useAppSelector(
        (state) => state.auth
    );
    const [transactions, setTransactions] = React.useState([]);
    const [news, setNews] = React.useState([]);
    const [overviewData, setOverViewData] = React.useState<any>({});
    const [loading, setLoading] = React.useState(false);
    const dispatch = useAppDispatch();
    const [stepper, setStepper] = React.useState(false);
    const [currentStep, setCurrentStep] = React.useState(1);
    const [formData, setFormData] = React.useState<any>({
        FirstName: customerOnboardingData?.firstName || "",
        Surname: customerOnboardingData?.lastName || "",
        Age: "",
        BirthDate: "",
        EmailAddress: customerOnboardingData?.emailAddress || "",
        PhoneNumber: customerOnboardingData?.phoneNumber || "",
        ResidentialAddress: "",
        State: "",
        Country: "",
        Occupation: "",
        IdType: "",
        IdNumber: "",
        BankName: "",
        AccountName: "",
        AccountNumber: "",
        BVN: "",
        NextOfKinName: "",
        AddressNOK: "",
        RelationshipWithNOK: "",
        PassportPhoto: "",
        FormOfIdentity: "",
        UtilityBill: "",
        UnitHolderSignature: "",
    });

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

    const findMissingFormdata = () => {
        return !!(
            formData.FirstName &&
            formData.Surname &&
            formData.Age &&
            formData.BirthDate &&
            formData.EmailAddress &&
            formData.PhoneNumber &&
            formData.ResidentialAddress &&
            formData.State &&
            formData.Country &&
            formData.Occupation &&
            formData.IdType &&
            formData.IdNumber &&
            formData.BankName &&
            formData.AccountName &&
            formData.AccountNumber &&
            formData.BVN &&
            formData.NextOfKinName &&
            formData.AddressNOK &&
            formData.RelationshipWithNOK &&
            formData.PassportPhoto &&
            formData.FormOfIdentity &&
            formData.UtilityBill &&
            formData.UnitHolderSignature
        );
    };

    const navigate = useNavigate();

    const dobRef = useRef<any>(null);

    const fetchData = useCallback(async () => {
        console.log(dobRef?.current, "it is working");
        if (customer?.customerId || customer.portalUsername) {
            setLoading(true);
            await devInstance
                .get("/Dashboard/GetTransactionDetails", {
                    params: { CustomerId: customer?.customerId },
                })
                .then((res: any) => {
                    setOverViewData(res.data);
                    console.log(res.data.details, "details");
                })
                .catch((error: any) => {
                    const message =
                        (error.response && error.response.data) ||
                        error.message ||
                        error.toString();
                    console.log(message);
                    setLoading(false);
                })
                .finally(() => setLoading(false));

            await devInstance
                .get(`/Dashboard/GetTransactions/${customer.customerId}`, {
                    params: { CustomerId: customer?.customerId },
                })
                .then((res: any) => {
                    setTransactions(res?.data?.data?.pageItems);
                })
                .catch((error: any) => {
                    const message =
                        (error.response && error.response.data) ||
                        error.message ||
                        error.toString();
                    // console.log(message);
                    setLoading(false);
                })
                .finally(() => setLoading(false));

            await devInstance
                .get("/Dashboard/News-Updates")
                .then((res: any) => {
                    setNews(res?.data);
                    // console.log(res, "News");
                })
                .catch((error: any) => {
                    const message =
                        (error.response && error.response.data) ||
                        error.message ||
                        error.toString();
                    // console.log(message);
                    setLoading(false);
                })
                .finally(() => setLoading(false));
        }
    }, [customer?.customerId, customer.portalUsername]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    useLayoutEffect(() => {
        devInstance
            .get(
                `/Transaction/GetCustomerSignUpDetails/${customer.emailAddress}`
            )
            .then((res) => {
                dispatch(setCustomerOnboardingData(res.data));
            });
    }, [customer.emailAddress, dispatch]);

    useEffect(() => {
        devInstance
            .get(
                `/Transaction/GetCustomerOnboardingDetails/${customer.emailAddress}`
            )
            .then((res) => {
                console.log(res, "response");
                setFormData({
                    ...formData,
                    Surname: res.data.surname,
                    Age: res.data.age,
                    BirthDate: res.data.birthDate.slice(0, 10),
                    EmailAddress: res.data.emailAddress,
                    PhoneNumber: res.data.phoneNumber,
                    ResidentialAddress: res.data.residentialAddress,
                    State: res.data.state,
                    Country: res.data.country,
                    Occupation: res.data.occupation,
                    IdType: res.data.idType,
                    IdNumber: res.data.idNumber,
                    BankName: res.data.bankName,
                    AccountName: res.data.accountName,
                    AccountNumber: res.data.accountNumber,
                    BVN: res.data.bvn,
                    NextOfKinName: res.data.nextOfKinName,
                    AddressNOK: res.data.addressNOK,
                    RelationshipWithNOK: res.data.relationshipWithNOK,
                    PassportPhoto: res.data.passportPhoto,
                    FormOfIdentity: res.data.formOfIdentity,
                    UtilityBill: res.data.utilityBill,
                    UnitHolderSignature: res.data.unitHolderSignature,
                });
            });
    }, []);

    const TransactionList = () => {
        if (transactions?.length > 0) {
            return (
                <>
                    {transactions
                        ?.slice(0, 9)
                        .map((item: any, index: number) => (
                            <div className="flex items-center">
                                <div className="basis-1/4 pl-[20px]">
                                    <h3>{item?.transactionType}</h3>
                                </div>
                                <div className="basis-1/4 text-center">
                                    <h3>{item?.transactionAmount}</h3>
                                </div>
                                <div className="basis-1/4 text-center">
                                    <h3>
                                        {new Date(
                                            item?.transactionDate
                                        ).toLocaleDateString()}
                                    </h3>
                                </div>
                                <div className="basis-1/4 text-right pr-[20px]">
                                    <h3
                                        className={`${
                                            item?.transactionStatus ===
                                            "EXECUTED"
                                                ? "text-success"
                                                : "text-error"
                                        }`}
                                    >
                                        {item?.transactionStatus}
                                    </h3>
                                </div>
                            </div>
                        ))}
                </>
            );
        } else {
            return (
                <div className="pl-[20px] text-center text-error">
                    <h3>No Transactions Found</h3>
                </div>
            );
        }
    };

    function nextFunction(e: any) {
        e.preventDefault();
        if (currentStep < 2) {
            setCurrentStep((prev) => prev + 1);
        } else {
            accountOnboarding();
        }
    }

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

    const accountOnboarding = () => {
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
            var data = new FormData();
            data.append("AccountName", formData.AccountName);
            data.append("AccountNumber", formData.AccountNumber);
            data.append("AddressNOK", formData.AddressNOK);
            data.append("Age", formData.Age);
            data.append("BankName", formData.BankName);
            data.append("BirthDate", formData.BirthDate);
            data.append("BVN", formData.BVN);
            data.append("Country", formData.Country);
            data.append("EmailAddress", formData.EmailAddress);
            data.append("FirstName", formData.FirstName);
            data.append("FormOfIdentity", formData.FormOfIdentity);
            data.append("IdNumber", formData.IdNumber);
            data.append("IdType", formData.IdType);
            data.append("NextOfKinName", formData.NextOfKinName);
            data.append("Occupation", formData.Occupation);
            data.append("PassportPhoto", formData.PassportPhoto);
            data.append("PhoneNumber", formData.PhoneNumber);
            data.append("RelationshipWithNOK", formData.RelationshipWithNOK);
            data.append("ResidentialAddress", formData.ResidentialAddress);
            data.append("State", formData.State);
            data.append("Surname", formData.Surname);
            data.append("UnitHolderSignature", formData.UnitHolderSignature);
            data.append("UtilityBill", formData.UtilityBill);

            var config = {
                method: "post",
                maxBodyLength: Infinity,
                url: "https://apps.dlm.group/ASSETMGTAPI/api/v1/Transaction/InvestmentOnboarding",
                data: data,
            };

            devInstance(config)
                .then(function (response: any) {
                    console.log(JSON.stringify(response.data));
                    toast.success(`${response.data.message}`);
                    setStepper(false);
                    navigate("/products");
                })
                .catch(function (error: any) {
                    console.log(error);
                    setLoading(false);
                    toast.error("Failed");
                })
                .finally(() => setLoading(false));
        }
    };

    function prevFunction() {
        if (currentStep > 1) {
            setCurrentStep((prev) => prev - 1);
        } else {
            setStepper(false);
        }
    }

    function formChange(e: any) {
        if (e.target.type === "file") {
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
                    setFormData({
                        ...formData,
                        [e.target.name]: data,
                    });
                    console.log(formData);
                })
                .catch((err) => {
                    toast(`${err}`);
                    setLoading(false);
                })
                .finally(() => setLoading(false));
        } else {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value,
            });
        }
        console.log(formData);
        // setformData({ ...formData, [e.target.name]: e.target.value });
    }

    return (
        <DashboardLayout>
            <div className="pt-[48px] pr-16 text-primary">
                {/* <div className="flex justify-between items-center mb-[60px] max-w-[1119px] space-x-14">
                    <div className="relative flex items-center max-w-[664px] w-full">
                        <input
                            type="search"
                            className="w-full h-[56px] px-4 bg-white-lighter border-none rounded-lg focus:ring-primary"
                            placeholder="Search"
                        />
                        <img
                            alt="search"
                            src={searchIcon}
                            className="absolute right-4"
                        />
                    </div>
                    <div className="flex space-x-5 xl:space-x-10 items-center">
                        <Button
                            variant="dark"
                            buttonType="md"
                            onClick={() => navigate("/fund-wallet")}
                        >
                            Fund Wallet
                        </Button>
                        <Button
                            variant="light"
                            buttonType="md"
                            onClick={() => navigate("/withdraw")}
                        >
                            Withdraw
                        </Button>
                    </div>
                </div> */}
                {!findMissingFormdata() && (
                    <div className="py-6 bg-primary text-white px-8 text-base font-bold flex justify-between items-center mb-10 rounded-xl">
                        <span>Please Complete your profile</span>
                        <Button
                            variant="light"
                            buttonType="md"
                            onClick={() => {
                                setStepper(true);
                                console.log(customer);
                            }}
                        >
                            Update Profile
                        </Button>
                    </div>
                )}

                <div className="max-w-[1119px]">
                    <div className="flex justify-between items-center mb-[40px]">
                        <h2 className="text-xl font-semibold">Overview</h2>
                        {/* <div className="flex space-x-10 items-center">
                            <Button
                                variant="dark"
                                buttonType="md"
                                onClick={() => navigate("/fund-wallet")}
                            >
                                Fund Wallet
                            </Button>
                            <Button
                                variant="light"
                                buttonType="md"
                                onClick={() => navigate("/withdraw")}
                            >
                                Withdraw
                            </Button>
                        </div> */}
                    </div>

                    <div className="h-[328px] flex justify-between space-x-3">
                        <div className="w-[456px] h-full bg-white-light shadow-sm rounded-[20px]">
                            <div className="py-3 text-center flex text-sm xl:text-base divide-x h-full">
                                <div className="basis-1/2 flex flex-col divide-y">
                                    <div className="basis-1/3 flex items-center justify-center">
                                        <div>
                                            <p>Net Asset (₦)</p>
                                            <p className="font-semibold">
                                                ₦{" "}
                                                {overviewData?.netAssetValue
                                                    ? overviewData?.netAssetValue.toFixed(
                                                          2
                                                      )
                                                    : 0}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="basis-1/3 flex items-center justify-center">
                                        <div>
                                            <p>Wallet</p>
                                            <p className="font-semibold">
                                                ₦{" "}
                                                {customer?.cashAccountBalance
                                                    ? customer?.cashAccountBalance.slice(
                                                          3
                                                      )
                                                    : 0}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="basis-1/3 flex items-center justify-center">
                                        <div>
                                            <p>Savings</p>
                                            <p className="font-semibold">₦ 0</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="basis-1/2 flex flex-col divide-y">
                                    <div className="basis-1/3 flex items-center justify-center">
                                        <div>
                                            <p>Net Asset ($)</p>
                                            <p className="font-semibold">$ 0</p>
                                        </div>
                                    </div>
                                    <div className="basis-1/3 flex items-center justify-center">
                                        <div>
                                            <p>Returns</p>
                                            <p className="font-semibold">$ 0</p>
                                        </div>
                                    </div>
                                    <div className="basis-1/3 flex items-center justify-center">
                                        <div>
                                            <p>Investments</p>
                                            <p className="font-semibold">$ 0</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-[363px] h-full bg-white-light shadow-sm rounded-[20px]">
                            <h3 className="font-semibold text-sm xl:text-base mb-[60px] mt-[18px] ml-5">
                                Investment Analysis
                            </h3>
                            <LineChart width={350} height={200} data={data}>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <CartesianGrid stroke="#ccc" />
                                <Line
                                    type="monotone"
                                    dataKey="uv"
                                    stroke="#8884d8"
                                />
                                <Line
                                    type="monotone"
                                    dataKey="pv"
                                    stroke="#82ca9d"
                                />
                            </LineChart>
                        </div>

                        <div className="w-[253px] h-full bg-white-light shadow-sm rounded-[20px] flex flex-col">
                            <h3 className="font-semibold text-sm xl:text-base mt-[18px] ml-5">
                                Portfolio Analysis
                            </h3>

                            <div>
                                <div className="-mt-24">
                                    <CustomChart />
                                </div>
                                <div className="py-2 flex justify-between -mt-[120px] px-4">
                                    <div className="flex flex-col gap-y-2">
                                        <div className="flex items-center gap-x-3">
                                            <div className="w-3 h-3 rounded-full bg-[#6ED73E]"></div>
                                            <p className="text-sm">Bonds</p>
                                        </div>
                                        <div className="flex items-center gap-x-3">
                                            <div className="w-3 h-3 rounded-full bg-[#F178B6]"></div>
                                            <p className="text-sm">Cash</p>
                                        </div>
                                        <div className="flex items-center gap-x-3">
                                            <div className="w-3 h-3 rounded-full bg-[#A5A6F6]"></div>
                                            <p className="text-sm">Asset</p>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-x-3">
                                            <div className="w-3 h-3 rounded-full bg-[#094D46]"></div>
                                            <p className="text-sm">Others</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-[40px]">
                        <h2 className="text-xl font-semibold mb-5">
                            Transactions
                        </h2>
                        <div className="flex justify-between h-[365px] space-x-3">
                            <div className="w-[679px] rounded-[20px] bg-white-lighter h-full">
                                <div className="text-sm w-full rounded-[20px] bg-white-light h-full">
                                    <div className="flex bg-primary rounded-[20px] h-[45.2px] text-white items-center text-sm xl:text-base">
                                        <div className="basis-1/4 pl-[20px]">
                                            <h3>Type</h3>
                                        </div>
                                        <div className="basis-1/4 text-center">
                                            <h3>Amount</h3>
                                        </div>
                                        <div className="basis-1/4 text-center">
                                            <h3>Date</h3>
                                        </div>
                                        <div className="basis-1/4 text-right pr-[20px]">
                                            <h3>Status</h3>
                                        </div>
                                    </div>
                                    <div className="flex flex-col grow h-full">
                                        <div className="flex flex-col space-y-4 py-4 grow">
                                            <TransactionList />
                                        </div>
                                        <p
                                            className="font-semibold text-sm text-right mr-5 cursor-pointer"
                                            onClick={() =>
                                                navigate("/transactions")
                                            }
                                        >
                                            View more
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="w-[420px] rounded-[20px] bg-white-light py-[18px] px-8 overflow-y-auto">
                                <h3 className="text-base font-semibold mb-5">
                                    News & Updates
                                </h3>
                                <div className="text-sm flex flex-col items-start space-y-4">
                                    {news.length ? (
                                        news?.map((item, index) => (
                                            <div
                                                className="flex items-start gap-x-3 relative"
                                                key={index}
                                            >
                                                <img
                                                    alt=""
                                                    src={elipse}
                                                    className="w-3 h-3 rounded-full bg-primary/60 mt-1.5"
                                                />
                                                <div className="grow">
                                                    {item}
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <h3 className="text-error">
                                            No News Found
                                        </h3>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {stepper && (
                <div className="fixed top-0 left-0 w-screen h-screen grid place-items-center overflow-y-auto py-20 bg-primary/30 text-primary">
                    <form
                        className="w-[691px] min-h-[1028px] bg-white-light rounded-[20px] flex flex-col my-20"
                        onSubmit={nextFunction}
                    >
                        <div className="w-[570px] mx-auto py-6 grow flex flex-col justify-between">
                            <div>
                                <div className="relative">
                                    <img
                                        alt=""
                                        src={cancelBtn}
                                        className="absolute -right-10 cursor-pointer"
                                        onClick={() => setStepper(false)}
                                    />
                                    <h3 className="font-semibold text-center text-xl mb-10">
                                        Update Customer Profile
                                    </h3>
                                </div>
                                {currentStep === 1 && (
                                    <div className="flex flex-col gap-y-4">
                                        <div className="grid grid-cols-2 gap-x-8">
                                            <Input
                                                placeholder="First Name *"
                                                name="FirstName"
                                                pattern="[A-Za-z]+"
                                                title="Only Alphabets are allowed"
                                                onChange={formChange}
                                                value={formData.FirstName}
                                            />
                                            <Input
                                                placeholder="Surname *"
                                                name="Surname"
                                                pattern="[A-Za-z]+"
                                                title="Only Alphabets are allowed"
                                                onChange={formChange}
                                                value={formData.Surname}
                                            />
                                        </div>
                                        <Input
                                            placeholder="Age *"
                                            name="Age"
                                            type="number"
                                            min="18"
                                            max="99"
                                            onChange={formChange}
                                            value={formData.Age}
                                            required
                                        />
                                        <Input
                                            placeholder="Date of Birth *"
                                            name="BirthDate"
                                            type="date"
                                            onChange={formChange}
                                            value={formData.BirthDate}
                                            required
                                        />
                                        <Input
                                            placeholder="Email Address *"
                                            name="EmailAddress"
                                            type="email"
                                            required
                                            onChange={formChange}
                                            value={formData.EmailAddress}
                                        />
                                        <Input
                                            placeholder="Phone Number *"
                                            name="PhoneNumber"
                                            type="number"
                                            required
                                            onChange={formChange}
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
                                                value={formData.state || null}
                                            />
                                        </div>
                                        <Input
                                            placeholder="Occupation *"
                                            name="Occupation"
                                            pattern="^[A-Za-z]+[A-Za-z ]*$"
                                            title="Only Alphabets are allowed"
                                            onChange={formChange}
                                            required
                                            value={formData.Occupation}
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
                                                required
                                                name="IdType"
                                                onChange={formChange}
                                                value={formData.IdType || null}
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
                                        {(formData.IdType ===
                                            "Driver's License" ||
                                            formData.IdType ===
                                                "International Passport") && (
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
                                        <div className="grid grid-cols-2 gap-x-7">
                                            <Input
                                                placeholder="Account Name *"
                                                name="AccountName"
                                                onChange={formChange}
                                                required
                                                pattern="^[A-Za-z]+[A-Za-z ]*$"
                                                title="Only Alphabets are allowed"
                                                value={formData.AccountName}
                                            />
                                            <Input
                                                placeholder="Account Number *"
                                                name="AccountNumber"
                                                type="number"
                                                onChange={formChange}
                                                required
                                                value={formData.AccountNumber}
                                            />
                                        </div>
                                        <Input
                                            placeholder="BVN *"
                                            name="BVN"
                                            onChange={formChange}
                                            required
                                            type="number"
                                            value={formData.BVN}
                                        />

                                        {/* <div className="relative">
                                        <div className="absolute">
                                            <Input
                                                placeholder="Date of Birth *"
                                                name="BirthDate"
                                                type="date"
                                                onChange={formChange}
                                                value={formData.BirthDate}
                                                ref={dobRef}
                                            />
                                        </div>
                                        <div
                                            className="h-[56px] flex items-center justify-between w-full text-base mt-2 placeholder-primary/40 px-4 cursor-pointer bg-white-lighter focus:ring-primary active:ring-primary shadow-sm border border-primary/5 rounded-lg"
                                            onClick={() =>
                                                // dob.current.setOpen(true)
                                                console.log(dobRef)
                                            }
                                        >
                                            <p>Date of Birth</p>
                                            <img alt="" src={chevronDown} />
                                        </div>
                                    </div> */}
                                    </div>
                                )}
                                {currentStep === 2 && (
                                    <div className="flex flex-col gap-y-4">
                                        <Input
                                            placeholder="Next of Kin Name *"
                                            name="NextOfKinName"
                                            onChange={formChange}
                                            pattern="^[A-Za-z]+[A-Za-z ]*$"
                                            title="Only Alphabets are allowed"
                                            required
                                            value={formData.NextOfKinName}
                                        />
                                        <Input
                                            placeholder="Next of Kin Address *"
                                            name="AddressNOK"
                                            onChange={formChange}
                                            required
                                            value={formData.AddressNOK}
                                        />
                                        <Input
                                            placeholder="Relationship With Next of Kin *"
                                            name="RelationshipWithNOK"
                                            pattern="^[A-Za-z]+[A-Za-z ]*$"
                                            title="Only Alphabets are allowed"
                                            onChange={formChange}
                                            required
                                            value={formData.RelationshipWithNOK}
                                        />
                                        <Input
                                            placeholder="Update Passport Photo *"
                                            name="PassportPhoto"
                                            onChange={formChange}
                                            type="file"
                                            uploaded={
                                                formData.PassportPhoto
                                                    ? true
                                                    : false
                                            }
                                            // values={formData?.PassportPhoto || null}
                                        />
                                        <Input
                                            placeholder="Update Valid ID (Govt ID) *"
                                            name="FormOfIdentity"
                                            onChange={formChange}
                                            type="file"
                                            uploaded={
                                                formData.FormOfIdentity
                                                    ? true
                                                    : false
                                            }
                                            // values={formData?.FormOfIdentity || null}
                                        />
                                        <Input
                                            placeholder="Update Utility Bill *"
                                            name="UtilityBill"
                                            onChange={formChange}
                                            type="file"
                                            uploaded={
                                                formData.UtilityBill
                                                    ? true
                                                    : false
                                            }
                                            // values={formData?.UtilityBill || null}
                                        />
                                        <Input
                                            placeholder="Update Signature *"
                                            name="UnitHolderSignature"
                                            onChange={formChange}
                                            type="file"
                                            uploaded={
                                                formData.UnitHolderSignature
                                                    ? true
                                                    : false
                                            }
                                            // values={
                                            //     formData?.UnitHolderSignature || null
                                            // }
                                        />
                                    </div>
                                )}
                            </div>

                            {/* <button type="button" onClick={accountOnboarding}>
                            sefsfsfgf
                        </button> */}

                            <div className="mt-14 flex justify-between">
                                <Button
                                    buttonType="md"
                                    onClick={prevFunction}
                                    type="button"
                                >
                                    {currentStep > 1 ? "Back" : "Cancel"}
                                </Button>

                                <button
                                    type="submit"
                                    className="w-[180px] border-primary border rounded-[8px] hover:bg-primary/5 font-semibold"
                                >
                                    {currentStep === 2 ? "Submit" : "Next"}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            )}
            {loading && <Loader />}
        </DashboardLayout>
    );
};

export default DashboardScreen;
