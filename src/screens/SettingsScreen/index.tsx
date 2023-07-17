import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";

const Settings = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = React.useState("/settings/profile");
    const tabs = [
        { name: "My Profile", path: "/settings/profile" },
        // { name: "Password", path: "/settings/password" },
        { name: "Bank Info", path: "/settings/bank-info" },
        { name: "KYC Documents", path: "/settings/kyc" },
        // { name: "Notifications", path: "/settings/notifications" },
        // { name: "My Account", path: "/settings/account" },
    ];

    useEffect(() => {
        if (location.pathname === "/settings") {
            navigate("/settings/profile");
        } else {
            navigate(location.pathname);
            setActiveTab(location.pathname);
        }
    }, [location, navigate]);

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
                                    navigate(item.path);
                                    setActiveTab(item.path);
                                }}
                            >
                                {item.name}
                            </span>
                        ))}
                    </div>
                </div>
                <div className="my-14">
                    <Outlet />
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Settings;
