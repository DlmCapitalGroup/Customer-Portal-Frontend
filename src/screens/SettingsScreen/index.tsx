import React, { useCallback, useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import Kyc from "./KycScreen";
import BankInfo from "./BankInfo";
import Profile from "./ProfileScreen";
import { devInstance } from "../../store/devInstance";
import { useAppSelector } from "../../store/hooks";

const Settings = () => {
    const { customer, local }: any = useAppSelector((state) => state.auth);
    const location: any = useLocation();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = React.useState(0);
    const [loading, setLoading] = useState(false);
    let stateParams: any = location?.state?.path;

    useEffect(() => {
        if (stateParams) {
            // navigate(stateParams);
            setActiveTab(stateParams);
        }
    }, []);

    const tabs = [
        { name: "My Profile", path: 0 },
        { name: "Bank Info", path: 1 },
        { name: "KYC Documents", path: 2 },
    ];

    return (
        <DashboardLayout>
            <div className="pt-14 max-w-[630px] text-primary">
                <div>
                    <h2 className="text-xl font-semibold mb-[67px]">
                        Settings
                    </h2>

                    <div className="flex gap-x-10 flex-wrap gap-y-5">
                        {tabs.map((item, index) => (
                            <span
                                className={`cursor-pointer text-base ${
                                    activeTab === item.path &&
                                    "border-b-[2.5px] border-primary"
                                }`}
                                key={index}
                                onClick={() => {
                                    // navigate(item.path);
                                    setActiveTab(item.path);
                                }}
                            >
                                {item.name}
                            </span>
                        ))}
                    </div>
                </div>
                <div className="my-14">
                    {activeTab === 0 && <Profile />}
                    {activeTab === 1 && <BankInfo />}
                    {activeTab === 2 && <Kyc />}
                    {/* <Outlet /> */}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Settings;
