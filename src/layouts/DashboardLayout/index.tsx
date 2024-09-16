import React, { useState } from "react";
import logoSm from "../../assets/images/logo-sm.svg";
import logoLg from "../../assets/images/logo-lg.svg";
import { Link, useLocation } from "react-router-dom";
import dashboardIcon from "../../assets/images/dashboard-icon.svg";
import transactionsIcon from "../../assets/images/transactions-icon.svg";
import planIcon from "../../assets/images/plan-icon.svg";
import supportIcon from "../../assets/images/support-icon.svg";
import notificationIcon from "../../assets/images/notification-icon.svg";
import settingsIcon from "../../assets/images/settings-icon.svg";
import logoutIcon from "../../assets/images/logout-icon.svg";
import userIcon from "../../assets/images/user-icon.svg";
import activeIcon from "../../assets/images/active-icon.svg";
import notebookIcon from "../../assets/images/notebook.svg";

interface dashboardProps {
    children: React.ReactNode;
}

const DashboardLayout = (props: dashboardProps) => {
    const { children } = props;
    const [expand, setExpand] = useState(false);
    const location = useLocation();
    console.log(location.pathname);

    const dashboardLinks = [
        {
            name: "dashboard",
            icon: dashboardIcon,
            path: "/"
        },
        {
            name: "transactions",
            icon: transactionsIcon,
            path: "/transactions",
        },
        {
            name: "plan",
            icon: planIcon,
            path: "/plan"
        },
        {
            name: "our library",
            icon: notebookIcon,
            path: "/library"
        },
        {
            name: "support",
            icon: supportIcon,
            path: "/support"
        },
        {
            name: "notifications",
            icon: notificationIcon,
            path: "/notifications"
        },
        {
            name: "settings",
            icon: settingsIcon,
            path: "/settings"
        },
        {
            name: "Adesewa Ademeso",
            icon: userIcon,
            path: "/profile"
        },
        {
            name: "Logout",
            icon: logoutIcon,
            path: "/logout"
        },
        // {
        //     name: ""
        // }
    ]

    return (
        <div className="w-full min-h-screen bg-primary-light">
            <div className="fixed left-0 top-0 w-[70px] transition ease-in-out delay-150 duration-300 hover:w-[210px] h-screen py-[40px] bg-primary rounded-tr-3xl rounded-br-3xl flex flex-col" onMouseEnter={() => setExpand(true)} onMouseLeave={() => setExpand(false)}>
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
                            dashboardLinks.slice(0, 6).map((link, index) => (
                                <Link to={link.path} className={`flex ${expand ? "pl-[15px]" : "mx-auto"} items-center`}>
                                    {location.pathname === link.path && <img alt="" src={activeIcon} className="absolute left-0" />}
                                    <img alt="" src={link?.icon} /> {expand && <span className="text-base text-white ml-[25px] capitalize">{link.name}</span>}</Link>
                            ))
                        }
                    </div>

                    <div className="flex flex-col space-y-10">
                        {
                            dashboardLinks.slice(6).map((link) => (
                                <Link to={link.path} className={`flex ${expand ? "pl-[15px]" : "mx-auto"} items-center`}><img alt="" src={link?.icon} /> {expand && <span className="text-base text-white ml-[25px] capitalize">{link.name}</span>}</Link>
                            ))
                        }
                    </div>
                </div>
            </div>
            <div className="ml-[250px] pb-20">
                {children}
            </div>
        </div>
    )
}

export default DashboardLayout;