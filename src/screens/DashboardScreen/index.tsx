import React, { useCallback, useEffect } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import searchIcon from "../../assets/images/search-icon.svg";
// import userIcon from "../../assets/images/user-icon-lg.svg";
// import settingsIcon from "../../assets/images/settings-icon-dark.svg";
// import notificationIcon from "../../assets/images/notification-icon-dark.svg";
// import naira from "../../assets/images/naira.svg";
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
import { clearStepper, setData } from "../../store/stepperSlice";
import axios from "axios";

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
    const { customer }: any = useAppSelector((state) => state.auth);
    const [transactions, setTransactions] = React.useState([]);
    const [news, setNews] = React.useState([]);
    const [openStepper, setOpenStepper] = React.useState(false);
    const { currentStepper, formData }: any = useAppSelector(
        (state) => state.stepper
    );
    const [overviewData, setOverViewData] = React.useState<any>({});
    const [loading, setLoading] = React.useState(false);
    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    function closeModal() {
        setOpenStepper(false);
    }

    const formChange = async (e: any) => {
        if (e.target.type === "file") {
            const data = new FormData();
            data.append("file", e.target.files[0]);
            data.append("upload_preset", "assetmanagement");
            let res: any = await fetch(
                "https://api.cloudinary.com/v1_1/hammy06/image/upload",
                {
                    method: "post",
                    mode: "cors",
                    body: data,
                }
            );
            if (res) {
                dispatch(setData({ ...formData, [e.target.name]: res.url }));
            }
        } else if (e.target.name === "GrossAnnualIncome") {
            dispatch(
                setData({
                    ...formData,
                    [e.target.name]: parseInt(e.target.value),
                })
            );
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

    const openAccount = () => {
        setLoading(true);
        try {
            let res: any = devInstance.post(
                "/Transaction/OpenInvestmentAccount",
                formData
            );
            let errors =
                res.meta.rejectedWithValue === true ||
                res.meta.requestStatus === "rejected";

            if (!errors) {
                console.log(res.data, "fulfilled");
                toast.success("Account Opened");
                dispatch(clearStepper());
            }
        } catch (error: any) {
            const message =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
            toast.error(`${error}`);
            console.log(error, "error");
        } finally {
            setLoading(false);
        }
    };

    const fetchData = useCallback(async () => {
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
                .get("/Dashboard/GetTransactions", {
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
                    console.log(message);
                    setLoading(false);
                })
                .finally(() => setLoading(false));

            await devInstance
                .get("/Dashboard/News-Updates")
                .then((res: any) => {
                    setNews(res?.data);
                    console.log(res, "News");
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
        }
    }, [customer?.customerId, customer.portalUsername]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const TransactionList = () => {
        if (transactions?.length > 0) {
            return (
                <>
                    {transactions?.map((item: any, index: number) => (
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
                                        item?.transactionStatus === "EXECUTED"
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

    return (
        <DashboardLayout>
            <div className="pt-[48px] pr-16 text-primary">
                {/* <div className="flex justify-between items-center mb-[60px] max-w-[1119px]"> */}
                {/* <div className="relative flex items-center">
                        <input
                            type="search"
                            className="w-[664px] h-[56px] px-4 bg-white-lighter border-none rounded-lg focus:ring-primary"
                            placeholder="Search"
                        />
                        <img
                            alt="search"
                            src={searchIcon}
                            className="absolute right-4"
                        />
                    </div> */}
                {/* <div className="flex items-center space-x-[38px]">
                        <Link to="/">
                            <img alt="" src={notificationIcon} />
                        </Link>
                        <Link to="/">
                            <img alt="" src={settingsIcon} />
                        </Link>
                        <img alt="" src={userIcon} />
                    </div> */}
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
                {/* </div> */}

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

                    <div className="flex justify-between">
                        <div className="w-[456px] h-full bg-white-light shadow-sm rounded-[20px] flex flex-col">
                            <div className="py-3 text-center flex text-base divide-x">
                                <div className="basis-1/2 flex flex-col divide-y">
                                    <div className="basis-1/3 flex items-center justify-center py-10 border-b border-primary">
                                        <div>
                                            <p>Net Asset (₦)</p>
                                            <p className="font-semibold">
                                                ₦{" "}
                                                {(overviewData?.netAssetValue &&
                                                    overviewData.netAssetValue.toFixed(
                                                        2
                                                    )) ||
                                                    0}
                                            </p>
                                        </div>
                                    </div>
                                    {/* <div className="basis-1/3 flex items-center justify-center">
                                        <div>
                                            <p>Wallet</p>
                                            <p className="font-semibold">
                                                ₦{" "}
                                                {(customer?.cashAccountBalance &&
                                                    customer?.cashAccountBalance.slice(
                                                        3
                                                    )) ||
                                                    0}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="basis-1/3 flex items-center justify-center">
                                        <div>
                                            <p>Savings</p>
                                            <p className="font-semibold">
                                                $100,000.03
                                            </p>
                                        </div>
                                    </div> */}
                                </div>
                                <div className="basis-1/2 flex flex-col divide-y py-10 border-b border-primary">
                                    {/* <div className="basis-1/3 flex items-center justify-center">
                                        <div>
                                            <p>Net Asset ($)</p>
                                            <p className="font-semibold">
                                                $100,000.03
                                            </p>
                                        </div>
                                    </div> */}
                                    <div className="basis-1/3 flex items-center justify-center">
                                        <div>
                                            <p>Wallet</p>
                                            <p className="font-semibold">
                                                ₦{" "}
                                                {(customer?.cashAccountBalance &&
                                                    customer?.cashAccountBalance.slice(
                                                        3
                                                    )) ||
                                                    0}
                                            </p>
                                        </div>
                                    </div>
                                    {/* <div className="basis-1/3 flex items-center justify-center">
                                        <div>
                                            <p>Returns</p>
                                            <p className="font-semibold">
                                                $100,000.03
                                            </p>
                                        </div>
                                    </div>
                                    <div className="basis-1/3 flex items-center justify-center">
                                        <div>
                                            <p>Net Asset ($)</p>
                                            <p className="font-semibold">
                                                $100,000.03
                                            </p>
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                            <div className="mx-auto mb-5 mt-2">
                                <Button
                                    buttonType="md"
                                    onClick={() => setOpenStepper(true)}
                                >
                                    Open Account
                                </Button>
                            </div>
                        </div>
                        {/* <div className="w-[363px] h-full bg-white-light shadow-sm rounded-[20px]">
                            <h3 className="font-semibold text-base mb-[60px] mt-[18px] ml-5">
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
                        </div> */}

                        {/* <div className="w-[253px] h-full bg-white-light shadow-sm rounded-[20px] flex flex-col">
                            <h3 className="font-semibold text-base mt-[18px] ml-5">
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
                        </div> */}
                    </div>
                    <div className="mt-[40px]">
                        <h2 className="text-xl font-semibold mb-5">
                            Transactions
                        </h2>
                        <div className="flex justify-between h-[365px]">
                            <div className="w-[679px] rounded-[20px] bg-white-lighter h-full">
                                <div className="text-sm w-full rounded-[20px] bg-white-light h-full">
                                    <div className="flex bg-primary rounded-[20px] h-[45.2px] text-white items-center text-base">
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
                {openStepper && (
                    <StepperModal
                        closeModal={closeModal}
                        submitEvent={openAccount}
                        // investment={investment}
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
                                                value={formData.FirstName}
                                                // value={customer?.firstName}
                                                // disabled
                                            />
                                            <Input
                                                placeholder="Surname *"
                                                name="Surname"
                                                onChange={formChange}
                                                required
                                                value={formData.Surname}
                                                // value={customer?.lastName}
                                                // disabled
                                            />
                                        </div>
                                        <Input
                                            placeholder="Middle Name *"
                                            name="MiddleName"
                                            onChange={formChange}
                                            required
                                            value={formData.MiddleName}
                                        />
                                        <Input
                                            placeholder="Mother’s Maiden Name *"
                                            name="MotherMaidenName"
                                            onChange={formChange}
                                            required
                                            value={formData.MotherMaidenName}
                                        />
                                        <div className="grid grid-cols-2 gap-x-7">
                                            <Select
                                                options={["Male", "Female"]}
                                                title="Gender *"
                                                name="Gender"
                                                onChange={formChange}
                                                value={formData.Gender}
                                            />
                                            <Input
                                                type="date"
                                                placeholder="Mother’s Maiden Name *"
                                                name="BirthDate"
                                                onChange={formChange}
                                                required
                                                value={formData.BirthDate}
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-x-7">
                                            <Input
                                                placeholder="Place of Birth *"
                                                name="BirthPlace"
                                                onChange={formChange}
                                                required
                                                value={formData.BirthPlace}
                                            />
                                            <Input
                                                placeholder="Occupation *"
                                                name="Occupation"
                                                onChange={formChange}
                                                required
                                                value={formData.Occupation}
                                            />
                                        </div>
                                        <Select
                                            options={["Nigeria", "Ghania"]}
                                            title="Nationality *"
                                            name="Nationality"
                                            onChange={formChange}
                                            value={formData.Nationality}
                                        />
                                        <div className="grid grid-cols-2 gap-x-7">
                                            <Input
                                                placeholder="Next of Kin *"
                                                name="NextOfKinName"
                                                onChange={formChange}
                                                required
                                                value={formData.NextOfKinName}
                                            />
                                            <Input
                                                placeholder="Relationship *"
                                                name="RelationshipWithNOK"
                                                onChange={formChange}
                                                required
                                                value={
                                                    formData.RelationshipWithNOK
                                                }
                                            />
                                        </div>
                                        <Input
                                            placeholder="Next of Kin Phone Number *"
                                            type="number"
                                            name="PhoneNumberNOK"
                                            onChange={formChange}
                                            required
                                            value={formData.PhoneNumberNOK}
                                        />
                                        <Input
                                            placeholder="Next of Kin Contact Address *"
                                            name="ContactAddressNOK"
                                            onChange={formChange}
                                            required
                                            value={formData.ContactAddressNOK}
                                        />
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
                                            name="ResidentialAddress"
                                            onChange={formChange}
                                            required
                                            value={formData.ResidentialAddress}
                                        />
                                        <Input
                                            placeholder="Postal Address *"
                                            name="PostalAddress"
                                            onChange={formChange}
                                            required
                                            value={formData.PostalAddress}
                                        />
                                        <div className="grid grid-cols-2 gap-x-7">
                                            <Input
                                                placeholder="Phone Number *"
                                                name="PhoneNumber"
                                                onChange={formChange}
                                                required
                                                type="number"
                                                value={formData.PhoneNumber}
                                            />
                                            <Input
                                                placeholder="Email Address *"
                                                name="EmailAddress"
                                                onChange={formChange}
                                                required
                                                type="email"
                                                value={formData.EmailAddress}
                                            />
                                        </div>
                                        <Input
                                            placeholder="Passport Picture *"
                                            name="PassportPhoto"
                                            onChange={formChange}
                                            required
                                            type="file"
                                            // value={formData.PassportPhoto}
                                        />
                                        <Input
                                            placeholder="Unit holder signature *"
                                            name="UnitHolderSignature"
                                            onChange={formChange}
                                            required
                                            type="file"
                                            // value={formData.UnitHolderSignature}
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
                                            name="EmploymentStatus"
                                            onChange={formChange}
                                            value={formData.EmploymentStatus}
                                        />
                                        <Input
                                            placeholder="Employer *"
                                            name="Employer"
                                            onChange={formChange}
                                            required
                                            value={formData.Employer}
                                        />
                                        <Input
                                            placeholder="Employer’s Telephone Number *"
                                            name="EmployerPhoneNumber"
                                            onChange={formChange}
                                            required
                                            type="number"
                                            value={formData.EmployerPhoneNumber}
                                        />
                                        <Input
                                            placeholder="Employer/Employment Address *"
                                            name="EmployerAddress"
                                            onChange={formChange}
                                            required
                                            value={formData.EmployerAddress}
                                        />
                                        <Input
                                            placeholder="Source of Funds *"
                                            name="FundSource"
                                            onChange={formChange}
                                            required
                                            value={formData.FundSource}
                                        />
                                        <Input
                                            placeholder="Gross Annual Income Details *"
                                            name="GrossAnnualIncome"
                                            onChange={formChange}
                                            required
                                            type="number"
                                            value={formData.GrossAnnualIncome}
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
                                            name="BankName"
                                            onChange={formChange}
                                            value={formData.BankName}
                                        />

                                        <Input
                                            placeholder="Account Name *"
                                            name="AccountName"
                                            onChange={formChange}
                                            required
                                            value={formData.AccountName}
                                        />
                                        <Input
                                            placeholder="Account Number *"
                                            name="AccountNumber"
                                            onChange={formChange}
                                            required
                                            type="number"
                                            value={formData.AccountNumber}
                                        />
                                        <Input
                                            placeholder="Branch *"
                                            name="Branch"
                                            onChange={formChange}
                                            required
                                            value={formData.Branch}
                                        />
                                        <Input
                                            placeholder="BVN *"
                                            name="BVN"
                                            onChange={formChange}
                                            required
                                            type="number"
                                            value={formData.BVN}
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
                                            furnished above are true and correct
                                            to the best of my knowledge,
                                            information and belief and i
                                            undertake to inform DLM Asset
                                            Management Limited of any changes
                                            therein, immediately in the event
                                            that any of the above information is
                                            found to be false or untrue or
                                            misleading or misrepresented, I am
                                            aware that I may be held liable for
                                            it. I hereby consent to DLM Asset
                                            Management Limited sharing any of
                                            the information furnished in this
                                            form as it deems appropriate and as
                                            may be required by regulatory
                                            authorities.
                                        </p>
                                    </p>
                                </div>
                            )}
                        </form>
                    </StepperModal>
                )}
            </div>
            {loading && <Loader />}
        </DashboardLayout>
    );
};

export default DashboardScreen;
