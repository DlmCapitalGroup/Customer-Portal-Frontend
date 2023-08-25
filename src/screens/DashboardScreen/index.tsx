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
import importantImg from "../../assets/images/important.svg";
import accountIcon from "../../assets/images/account_details.png";
import bvnIcon from "../../assets/images/bvn_icon.png";
import {
    loginLocal,
    setCustomerOnboardingData,
    setUpdatedOnboardingData,
} from "../../store/auth-slice";
import { formatter } from "../../helper";

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
    const { customer, local }: any = useAppSelector((state) => state.auth);
    const [transactions, setTransactions] = React.useState([]);
    const [news, setNews] = React.useState<any>([]);
    const [overviewData, setOverViewData] = React.useState<any>({});
    const [loading, setLoading] = React.useState(false);
    const dispatch = useAppDispatch();
    const [stepper, setStepper] = React.useState(false);
    const [bankData, setBankData] = React.useState({
        bvn: "",
        bankname: "",
        accountNumber: "",
        accountName: "",
    });

    const [show, setShow] = React.useState(false);

    const [kycData, setKycData] = React.useState({
        passportPicture: "",
        formOfIdentity: "",
        utilityBill: "",
        unitHolderSignature: "",
    });

    const navigate = useNavigate();

    const dobRef = useRef<any>(null);

    const fetchData = useCallback(() => {
        console.log(dobRef?.current, "it is working");
        if (customer?.id) {
            setLoading(true);
            console.log(customer?.id, "efcefrdcefd");

            devInstance
                .get(
                    `https://assetmgt-api.dlm.group/api/v1/investments/get-customer-investments/${customer?.id}`
                )
                .then((res: any) => {
                    console.log(res?.data?.data, "investments");
                    setTransactions(res?.data?.data?.investments);
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

            // await devInstance
            //     .get("/Admin/GetNewsUpdates")
            //     .then((res: any) => {
            //         setNews(res?.data);
            //         // console.log(res, "News");
            //     })
            //     .catch((error: any) => {
            //         const message =
            //             (error.response && error.response.data) ||
            //             error.message ||
            //             error.toString();
            //         // console.log(message);
            //         setLoading(false);
            //     })
            //     .finally(() => setLoading(false));
        }
    }, [customer?.id]);

    useEffect(() => {
        fetchData();
        fetchNews();
        devInstance
            .get(
                `https://apps.dlm.group/ASSETMGTAPI/api/v1/Transaction/GetBankInfo/${customer.id}`
            )
            .then((res) => {
                console.log(res, "response");
                setBankData({
                    ...bankData,
                    bvn: res.data.bvn,
                    bankname: res.data.bankname,
                    accountNumber: res.data.accountNumber,
                    accountName: res.data.accountName,
                });
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
                setShow(true);
            })
            .finally(() => setLoading(false));

        devInstance
            .get(
                `https://apps.dlm.group/ASSETMGTAPI/api/v1/Transaction/GetKycDocuments/${customer?.id}`
            )
            .then((res) => {
                console.log(res, "response");
                setKycData({
                    ...kycData,
                    passportPicture: res?.data?.passportPicture,
                    formOfIdentity: res?.data?.formOfIdentity,
                    utilityBill: res?.data?.utilityBill,
                    unitHolderSignature: res?.data?.unitHolderSignature,
                });
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
                setShow(true);
            })
            .finally(() => setLoading(false));
    }, []);

    function checkBank() {
        if (
            bankData.bvn &&
            bankData.bankname &&
            bankData.accountName &&
            bankData.accountNumber
        )
            return true;
    }

    function checkKyc() {
        if (
            kycData.passportPicture &&
            kycData.unitHolderSignature &&
            kycData.utilityBill &&
            kycData.formOfIdentity
        )
            return true;
    }

    function checkAll() {
        if (checkBank() && checkKyc()) {
            return true;
        }
    }

    async function fetchNews() {
        setLoading(true);
        devInstance
            .get("http://localhost:80/api/v1/news-update")
            .then((res: any) => {
                setNews(res?.data?.data?.news);
                console.log(res, "news");
            })
            .catch((error: any) => {
                const message =
                    (error.response && error.response.data) ||
                    error.message ||
                    error.toString();
                console.log(message);
                toast.error(message);
            })
            .finally(() => setLoading(false));
    }

    // useLayoutEffect(() => {
    //     devInstance
    //         .get(
    //             `/Transaction/GetCustomerSignUpDetails/${customer.emailAddress}`
    //         )
    //         .then((res) => {
    //             dispatch(setCustomerOnboardingData(res.data));
    //         });
    // }, [customer.emailAddress, dispatch]);

    const TransactionList = () => {
        if (transactions?.length > 0) {
            return (
                <>
                    {transactions
                        ?.slice(0, 9)
                        .map((item: any, index: number) => (
                            <div className="flex items-center">
                                <div className="basis-1/4 pl-[20px]">
                                    <h3>{item?.instrumentTypeLabel}</h3>
                                </div>
                                <div className="basis-1/4 text-center">
                                    <h3>{formatter(item?.faceValue)}</h3>
                                </div>
                                <div className="basis-1/4 text-center">
                                    <h3>
                                        {new Date(
                                            item?.startDate
                                        ).toLocaleDateString()}
                                    </h3>
                                </div>
                                <div className="basis-1/4 text-right pr-[20px]">
                                    <h3
                                        className={`${
                                            item?.status === "RUNNING"
                                                ? "text-success"
                                                : item?.status === "DECLINED"
                                                ? "text-error"
                                                : "text-primary"
                                        }`}
                                    >
                                        {item?.status === "RUNNING"
                                            ? "CONFIRMED"
                                            : item?.status}
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

    const totalTranxAmount = transactions.reduce(
        (sum, { transactionAmount }) => sum + transactionAmount,
        0
    );

    return (
        <DashboardLayout>
            <div className="pt-[48px] pr-5 lg:pr-16 text-primary">
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

                    {show && !checkAll() && (
                        <div>
                            <h2 className="text-lg font-semibold text-primary mb-3">
                                Complete your profile
                            </h2>
                            <div className="flex items-start gap-x-10 mb-16">
                                {!checkKyc() && (
                                    <div
                                        className="w-56 h-64 bg-blue-light/30 p-6 hover:cursor-pointer relative shadow-md hover:border hover:border-primary"
                                        onClick={() => {
                                            navigate("/settings", {
                                                state: {
                                                    path: 2,
                                                },
                                            });
                                        }}
                                    >
                                        <h3 className="text-lg font-semibold text-primary">
                                            KYC Documents
                                        </h3>

                                        <p className="text-base text-primary/60">
                                            0/1 Completed
                                        </p>
                                        <img
                                            alt=""
                                            src={bvnIcon}
                                            className="relative left-5"
                                        />
                                    </div>
                                )}

                                {!checkBank() && !loading && (
                                    <div
                                        className="w-56 h-64 bg-error/30 p-6 hover:cursor-pointer shadow-md hover:border hover:border-primary"
                                        onClick={() => {
                                            navigate("/settings", {
                                                state: {
                                                    path: 1,
                                                },
                                            });
                                        }}
                                    >
                                        <h3 className="text-lg font-semibold text-primary">
                                            Bank Details
                                        </h3>

                                        <p className="text-base text-primary/60">
                                            0/1 Completed
                                        </p>

                                        <img
                                            alt=""
                                            src={accountIcon}
                                            className="relative left-5"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    <div className="flex flex-col gap-y-10 lg:flex-row justify-between space-x-3">
                        <div className="w-full lg:w-[456px] h-[328px] bg-white-light shadow-sm rounded-[20px]">
                            <div className="py-3 text-center flex text-sm xl:text-base divide-x h-full">
                                <div className="basis-1/2 flex flex-col divide-y">
                                    <div className="basis-1/3 flex items-center justify-center">
                                        <div>
                                            <p>Net Asset Value (₦)</p>
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
                                            <p>Cash</p>
                                            <p className="font-semibold">
                                                ₦{" "}
                                                {customer?.cashAcctBalance
                                                    ? customer?.cashAcctBalance.slice(
                                                          3
                                                      )
                                                    : 0}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="basis-1/3 flex items-center justify-center">
                                        <div>
                                            <p>Value of Holding</p>
                                            <p className="font-semibold">₦ 0</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="basis-1/2 flex flex-col divide-y">
                                    <div className="basis-1/3 flex items-center justify-center">
                                        <div>
                                            <p>Unit Price</p>
                                            <p className="font-semibold">₦ 0</p>
                                        </div>
                                    </div>
                                    <div className="basis-1/3 flex items-center justify-center">
                                        <div>
                                            <p>Interest</p>
                                            <p className="font-semibold">₦ 0</p>
                                        </div>
                                    </div>
                                    <div className="basis-1/3 flex items-center justify-center">
                                        <div>
                                            <p>Total Investment</p>
                                            <p className="font-semibold">₦ 0</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <div className="basis-full md:basis-auto lg:w-[363px] h-[328px] bg-white-light shadow-sm rounded-[20px]">
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
                        </div> */}

                        <div className="basis-full md:basis-auto lg:w-[253px] h-[328px] bg-white-light shadow-sm rounded-[20px] flex flex-col">
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
                                            <p className="text-sm">Equity</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-20 lg:mt-[40px]">
                        <h2 className="text-xl font-semibold mb-5">
                            Transactions
                        </h2>
                        <div className="flex flex-col lg:flex-row justify-between min-h-[365px] gap-y-10 gap-x-3">
                            <div className="w-full lg:w-[679px] rounded-[20px] bg-white-lighter h-full">
                                <div className="text-sm w-full rounded-[20px] bg-white-light h-[365px]">
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
                                    <div>
                                        <div className="flex flex-col h-[310px] overflow-hidden">
                                            <div className="flex flex-col space-y-4 py-4 grow overflow-y-auto">
                                                <TransactionList />
                                            </div>
                                        </div>
                                        <p
                                            className="font-semibold text-sm text-right mr-5 cursor-pointer mt-5"
                                            onClick={() =>
                                                navigate("/transactions")
                                            }
                                        >
                                            View more
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full lg:w-[420px] rounded-[20px] bg-white-light py-[18px] px-8 overflow-y-auto">
                                <h3 className="text-base font-semibold mb-5">
                                    News & Updates
                                </h3>
                                <div className="text-sm flex flex-col items-start space-y-2">
                                    {news.length ? (
                                        news?.map((item: any, index: any) => (
                                            <div
                                                className="flex w-full items-start gap-x-3 relative py-2 bg-[#DBE1E64D]/30 px-1 rounded-md"
                                                key={index}
                                            >
                                                {news?.priority === "HIGH" ? (
                                                    <img
                                                        alt=""
                                                        src={importantImg}
                                                        className="rounded-full bg-primary/60 mt-1.5"
                                                    />
                                                ) : (
                                                    <img
                                                        alt=""
                                                        src={elipse}
                                                        className="w-3 h-3 rounded-full bg-primary/60 mt-1.5"
                                                    />
                                                )}
                                                <div className="grow">
                                                    {item?.content.slice(
                                                        0,
                                                        100
                                                    ) + "..."}
                                                    <a
                                                        className="mt-2 flex justify-end text-xs"
                                                        href={news?.url}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                    >
                                                        Read more
                                                    </a>
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
            {loading && <Loader />}
        </DashboardLayout>
    );
};

export default DashboardScreen;
