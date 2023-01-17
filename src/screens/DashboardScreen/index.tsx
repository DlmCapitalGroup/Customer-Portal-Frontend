import React, { useCallback, useEffect } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import searchIcon from "../../assets/images/search-icon.svg";
// import userIcon from "../../assets/images/user-icon-lg.svg";
// import settingsIcon from "../../assets/images/settings-icon-dark.svg";
// import notificationIcon from "../../assets/images/notification-icon-dark.svg";
// import naira from "../../assets/images/naira.svg";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

import { Link, useNavigate } from "react-router-dom";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import Button from "../../components/ButtonComponent";
import { devInstance } from "../../store/devInstance";
import { useAppSelector } from "../../store/hooks";
import CustomChart from "../../components/pieChart";

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

    const [transactions, setTransactions] = React.useState([]);

    const { customer }: any = useAppSelector((state) => state.auth);

    const [overviewData, setOverViewData] = React.useState<any>({});

    const navigate = useNavigate();

    const fetchData = useCallback(() => {
        if (customer?.customerId) {
            devInstance
                .get("/Dashboard/GetTransactionDetails", {
                    params: { CustomerId: customer?.customerId },
                })
                .then((res: any) => {
                    setOverViewData(res.data);
                })
                .catch((err) => console.log(err));

            devInstance
                .get("/Dashboard/GetTransactions", {
                    params: { CustomerId: customer?.customerId },
                })
                .then((res: any) => {
                    setTransactions(res?.data?.result);
                })
                .catch((err) => console.log(err));
        }
    }, [customer?.customerId]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <DashboardLayout>
            <div className="pt-[48px] pr-16 text-primary">
                <div className="flex justify-between items-center mb-[60px] max-w-[1119px]">
                    <div className="relative flex items-center">
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
                    </div>
                    {/* <div className="flex items-center space-x-[38px]">
                        <Link to="/">
                            <img alt="" src={notificationIcon} />
                        </Link>
                        <Link to="/">
                            <img alt="" src={settingsIcon} />
                        </Link>
                        <img alt="" src={userIcon} />
                    </div> */}
                    <div className="flex space-x-10 items-center">
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
                </div>

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

                    <div className="h-[328px] flex justify-between">
                        <div className="w-[456px] h-full bg-white-light shadow-sm rounded-[20px]">
                            <div className="py-3 text-center flex text-base divide-x h-full">
                                <div className="basis-1/2 flex flex-col divide-y">
                                    <div className="basis-1/3 flex items-center justify-center">
                                        <div>
                                            <p>Net Asset (₦)</p>
                                            <p className="font-semibold">
                                                ₦{" "}
                                                {overviewData?.netAssetValue &&
                                                    overviewData.netAssetValue.toFixed(
                                                        2
                                                    )}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="basis-1/3 flex items-center justify-center">
                                        <div>
                                            <p>Wallet</p>
                                            <p className="font-semibold">
                                                ₦{" "}
                                                {customer?.cashAccountBalance.slice(
                                                    3
                                                )}
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
                                    </div>
                                </div>
                                <div className="basis-1/2 flex flex-col divide-y">
                                    <div className="basis-1/3 flex items-center justify-center">
                                        <div>
                                            <p>Net Asset ($)</p>
                                            <p className="font-semibold">
                                                $100,000.03
                                            </p>
                                        </div>
                                    </div>
                                    <div className="basis-1/3 flex items-center justify-center">
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
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-[363px] h-full bg-white-light shadow-sm rounded-[20px]">
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
                        </div>

                        <div className="w-[253px] h-full bg-white-light shadow-sm rounded-[20px] flex flex-col">
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
                        </div>
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
                                    <div className="flex flex-col grow">
                                        <div className="flex flex-col space-y-4 py-4 grow">
                                            {transactions ? (
                                                transactions.map(
                                                    (item: any, index) => (
                                                        <div className="flex items-center">
                                                            <div className="basis-1/4 pl-[20px]">
                                                                <h3>
                                                                    {
                                                                        item?.transactionType
                                                                    }
                                                                </h3>
                                                            </div>
                                                            <div className="basis-1/4 text-center">
                                                                <h3>
                                                                    {
                                                                        item?.transactionAmount
                                                                    }
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
                                                                {index % 3 ===
                                                                0 ? (
                                                                    <h3 className="text-error">
                                                                        {
                                                                            item?.transactionStatus
                                                                        }
                                                                    </h3>
                                                                ) : (
                                                                    <h3 className="text-success">
                                                                        Successful
                                                                    </h3>
                                                                )}
                                                            </div>
                                                        </div>
                                                    )
                                                )
                                            ) : (
                                                <div className="flex justify-center">
                                                    <svg
                                                        role="status"
                                                        className="inline w-6 h-6 text-primary animate-spin"
                                                        viewBox="0 0 100 101"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                                            fill="#09335E"
                                                        />
                                                        <path
                                                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                                            fill="currentColor"
                                                        />
                                                    </svg>
                                                </div>
                                            )}
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
                            <div className="w-[420px] rounded-[20px] bg-white-light py-[18px] px-8">
                                <h3 className="text-base font-semibold mb-5">
                                    News & Updates
                                </h3>
                                <div className="text-sm flex flex-col space-y-4">
                                    <div className="flex items-start space-x-3">
                                        <span className="w-3 h-3 rounded-full bg-primary/60 mt-1.5"></span>
                                        <span>
                                            Dollar to Naira exchange rate is now
                                            at 680 naira to a dollar
                                        </span>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <span className="w-3 h-3 rounded-full bg-primary/60 mt-1.5"></span>
                                        <span>
                                            Dollar to Naira exchange rate is now
                                            at 680 naira to a dollar
                                        </span>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <span className="w-3 h-3 rounded-full bg-primary/60 mt-1.5"></span>
                                        <span>
                                            Dollar to Naira exchange rate is now
                                            at 680 naira to a dollar
                                        </span>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <span className="w-3 h-3 rounded-full bg-primary/60 mt-1.5"></span>
                                        <span>
                                            Dollar to Naira exchange rate is now
                                            at 680 naira to a dollar
                                        </span>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <span className="w-3 h-3 rounded-full bg-primary/60 mt-1.5"></span>
                                        <span>
                                            Dollar to Naira exchange rate is now
                                            at 680 naira to a dollar
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default DashboardScreen;
