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
import {
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
    const { customer, customerOnboardingData }: any = useAppSelector(
        (state) => state.auth
    );
    const [transactions, setTransactions] = React.useState([]);
    const [news, setNews] = React.useState([]);
    const [overviewData, setOverViewData] = React.useState<any>({});
    const [loading, setLoading] = React.useState(false);
    const dispatch = useAppDispatch();
    const [stepper, setStepper] = React.useState(false);

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
                                    <h3>
                                        {formatter(item?.transactionAmount)}
                                    </h3>
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

    const totalTranxAmount = transactions.reduce(
        (sum, { transactionAmount }) => sum + transactionAmount,
        0
    );

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
                            <div className="w-[420px] rounded-[20px] bg-white-light py-[18px] px-8 overflow-y-auto">
                                <h3 className="text-base font-semibold mb-5">
                                    News & Updates
                                </h3>
                                <div className="text-sm flex flex-col items-start space-y-2">
                                    {news.length ? (
                                        news?.map((item: string, index) => (
                                            <div
                                                className="flex items-start gap-x-3 relative py-2 bg-[#DBE1E64D]/30 px-1 rounded-md"
                                                key={index}
                                            >
                                                {index === 0 ? (
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
                                                    {item.slice(0, 100) + "..."}
                                                    <span className="mt-2 flex justify-end text-xs">
                                                        Read more
                                                    </span>
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
