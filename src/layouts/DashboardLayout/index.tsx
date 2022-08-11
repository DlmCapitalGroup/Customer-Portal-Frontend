import React, { useState } from "react";
import logoSm from "../../assets/images/logo-sm.svg";
import logoLg from "../../assets/images/logo-lg.svg";
import { Link } from "react-router-dom";
import dashboardIcon from "../../assets/images/dashboard-icon.svg";
import transactionsIcon from "../../assets/images/transactions-icon.svg";
import planIcon from "../../assets/images/plan-icon.svg";
import supportIcon from "../../assets/images/support-icon.svg";
import notificationIcon from "../../assets/images/notification-icon.svg";
import settingsIcon from "../../assets/images/settings-icon.svg";
import logoutIcon from "../../assets/images/logout-icon.svg";
import userIcon from "../../assets/images/user-icon.svg";
import activeIcon from "../../assets/images/active-icon.svg";

interface dashboardProps {
    children: React.ReactNode;
}

const DashboardLayout = (props: dashboardProps) => {
    const { children } = props;
    const [expand, setExpand] = useState(false)
    const dashboardLinks = [
        {
            name: "dashboard",
            icon: dashboardIcon,
        },
        {
            name: "transactions",
            icon: transactionsIcon,
        },
        {
            name: "plan",
            icon: planIcon,
        },
        {
            name: "support",
            icon: supportIcon,
        },
        {
            name: "notifications",
            icon: notificationIcon,
        },
        {
            name: "settings",
            icon: settingsIcon,
        },
        {
            name: "Adesewa Ademeso",
            icon: userIcon,
        },
        {
            name: "Logout",
            icon: logoutIcon,
        },
        // {
        //     name: ""
        // }
    ]
    return (
        <div className="w-full min-h-screen">
            <div className="absolute left-0 top-0 w-[70px] transition ease-in-out delay-150 duration-300 hover:w-[210px] h-screen py-[40px] bg-primary rounded-tr-3xl rounded-br-3xl flex flex-col" onMouseEnter={() => setExpand(true)} onMouseLeave={() => setExpand(false)}>
                <div className={`${expand && "pl-[15px]"} mb-[76px]`}>
                    {
                        expand ? (
                            <img alt="" src={logoLg} />
                        ) : (
                            <img alt="" src={logoSm} className="mx-auto" />
                        )
                    }
                </div>
                <div className="flex flex-col justify-between grow">
                    <div className="flex flex-col space-y-10">
                        {
                            dashboardLinks.slice(0, 4).map((link, index) => (
                                <Link to={link.name} className={`flex ${expand ? "pl-[15px]" : "mx-auto"} items-center`}>
                                    {index === 0 && <img alt="" src={activeIcon} className="absolute left-0" />}
                                    <img alt="" src={link?.icon} /> {expand && <span className="text-base text-white ml-[25px] capitalize">{link.name}</span>}</Link>
                            ))
                        }
                    </div>

                    <div className="flex flex-col space-y-10">
                        {
                            dashboardLinks.slice(4).map((link) => (
                                <Link to={link.name} className={`flex ${expand ? "pl-[15px]" : "mx-auto"} items-center`}><img alt="" src={link?.icon} /> {expand && <span className="text-base text-white ml-[25px] capitalize">{link.name}</span>}</Link>
                            ))
                        }
                    </div>
                </div>
            </div>
            <div className="ml-[250px]">
                {children}
            </div>
        </div>
    )
}

export default DashboardLayout;