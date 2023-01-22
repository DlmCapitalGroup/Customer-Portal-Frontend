import React, { useEffect, useState } from "react";
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
import dashboardBg from "../../assets/images/bg-dashboard.svg";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { logout } from "../../store/auth-slice";

interface dashboardProps {
    children: React.ReactNode;
    onClick?: any;
}

const DashboardLayout = (props: dashboardProps) => {
    const { customer }: any = useAppSelector((state) => state.auth);
    const { children, onClick } = props;
    const location = useLocation();
    console.log(location.pathname);
    const dispatch = useAppDispatch();

    const dashboardLinks = [
        {
            name: "dashboard",
            icon: dashboardIcon,
            path: "/",
        },
        {
            name: "transactions",
            icon: transactionsIcon,
            path: "/transactions",
        },
        // {
        //     name: "plan",
        //     icon: planIcon,
        //     path: "#",
        // },
        // {
        //     name: "Library",
        //     icon: notebookIcon,
        //     path: "/library",
        // },
        // {
        //     name: "support",
        //     icon: supportIcon,
        //     path: "/support",
        // },
        // {
        //     name: "notifications",
        //     icon: notificationIcon,
        //     path: "#",
        // },
        {
            name: "settings",
            icon: settingsIcon,
            path: "/settings",
        },
        {
            name: `${
                customer?.firstName.charAt(0).toUpperCase() +
                customer?.firstName.slice(1).toLowerCase() +
                " " +
                customer?.lastName.charAt(0).toUpperCase() +
                customer?.lastName.slice(1).toLowerCase()
            }`,
            icon: userIcon,
            path: "/settings",
        },
        {
            name: "Logout",
            icon: logoutIcon,
            path: "#",
        },
    ];

    return (
        <div className="w-full min-h-screen bg-primary-light">
            <div className="fixed left-0 top-0 w-[210px] transition ease-in-out delay-150 duration-300 h-screen py-[40px] bg-primary rounded-tr-3xl rounded-br-3xl flex flex-col">
                <img
                    alt=""
                    src={dashboardBg}
                    className="fixed bottom-[100px] ml-6 -z-10"
                />
                <div className="pl-[15px] mb-[76px]">
                    <img alt="" src={logoLg} />
                </div>
                <div className="flex flex-col justify-between grow">
                    <div className="flex flex-col space-y-10">
                        {dashboardLinks.slice(0, 3).map((link, index) => (
                            <Link
                                to={link.path}
                                className="flex pl-[15px] items-center"
                            >
                                {location.pathname === link.path && (
                                    <img
                                        alt=""
                                        src={activeIcon}
                                        className="absolute left-0"
                                    />
                                )}
                                <img alt="" src={link?.icon} />{" "}
                                <span className="text-base text-white ml-[25px] capitalize">
                                    {link.name}
                                </span>
                            </Link>
                        ))}
                    </div>

                    <div className="flex flex-col space-y-10">
                        {dashboardLinks.slice(3).map((link, index) => (
                            <Link
                                to={index === 0 ? link.path : ""}
                                className="flex pl-[15px] items-center"
                                onClick={() =>
                                    index === 1 && dispatch(logout())
                                }
                            >
                                <img alt="" src={link.icon} />{" "}
                                <span className="text-base text-white ml-[25px] capitalize">
                                    {link?.name && link?.name}
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
            <div className="ml-[250px] pb-20">{children}</div>
        </div>
    );
};

export default DashboardLayout;
