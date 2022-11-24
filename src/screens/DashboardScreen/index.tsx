import React, { useEffect } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import searchIcon from "../../assets/images/search-icon.svg";
// import userIcon from "../../assets/images/user-icon-lg.svg";
// import settingsIcon from "../../assets/images/settings-icon-dark.svg";
// import notificationIcon from "../../assets/images/notification-icon-dark.svg";
// import naira from "../../assets/images/naira.svg";

import { Link, useNavigate } from "react-router-dom";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import Button from "../../components/ButtonComponent";
import { devInstance } from "../../store/devInstance";
import { useAppSelector } from "../../store/hooks";

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

    const [overviewData, setOverViewData] = React.useState({});

    const navigate = useNavigate();

    useEffect(() => {
        if (customer) {
            devInstance
                .get("/Dashboard/GetTransactionDetails", {
                    params: { CustomerId: customer?.customerId },
                })
                .then((res: any) => {
                    console.log(res);
                })
                .catch((err) => console.log(err));
        }
    }, [customer]);

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
                                                ₦ 100,000.03
                                            </p>
                                        </div>
                                    </div>
                                    <div className="basis-1/3 flex items-center justify-center">
                                        <div>
                                            <p>Wallet</p>
                                            <p className="font-semibold">
                                                $100,000.03
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
                        <div className="w-[624px] h-full bg-white-light shadow-sm rounded-[20px] pl-5">
                            <h3 className="font-semibold text-base mb-[60px] mt-[18px] ml-5">
                                Investment Analysis
                            </h3>
                            <LineChart width={550} height={200} data={data}>
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
                    </div>
                    <div className="mt-[40px]">
                        <h2 className="text-xl font-semibold mb-5">
                            Transactions
                        </h2>
                        <div className="flex justify-between h-[365px]">
                            <div className="w-[679px] rounded-[20px] bg-white-lighter">
                                <div className="text-sm w-full rounded-[20px] bg-white-light">
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
                                    <div>
                                        <div className="flex flex-col space-y-4 py-4">
                                            {[1, 2, 3, 4, 5, 6, 7].map(
                                                (item, index) => (
                                                    <div className="flex items-center">
                                                        <div className="basis-1/4 pl-[20px]">
                                                            <h3>
                                                                Car Investment
                                                            </h3>
                                                        </div>
                                                        <div className="basis-1/4 text-center">
                                                            <h3>500,000.67</h3>
                                                        </div>
                                                        <div className="basis-1/4 text-center">
                                                            <h3>
                                                                13 June, 2022
                                                            </h3>
                                                        </div>
                                                        <div className="basis-1/4 text-right pr-[20px]">
                                                            {index % 3 === 0 ? (
                                                                <h3 className="text-error">
                                                                    Failed
                                                                </h3>
                                                            ) : (
                                                                <h3 className="text-success">
                                                                    Successful
                                                                </h3>
                                                            )}
                                                        </div>
                                                    </div>
                                                )
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
