import React, { useEffect, useState } from "react";
// import logoSm from "../../assets/images/logo-sm.svg";
import logoLg from "../../assets/images/logo-lg.svg";
import { Link, useLocation } from "react-router-dom";
import dashboardIcon from "../../assets/images/dashboard-icon.svg";
import transactionsIcon from "../../assets/images/transactions-icon.svg";
// import planIcon from "../../assets/images/plan-icon.svg";
// import supportIcon from "../../assets/images/support-icon.svg";
// import notificationIcon from "../../assets/images/notification-icon.svg";
import settingsIcon from "../../assets/images/settings-icon.svg";
import logoutIcon from "../../assets/images/logout-icon.svg";
import userIcon from "../../assets/images/icon.png";
import activeIcon from "../../assets/images/active-icon.svg";
import notebookIcon from "../../assets/images/notebook.svg";
import dashboardBg from "../../assets/images/bg-dashboard.svg";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { logout, setLoading } from "../../store/auth-slice";
import Loader from "../../components/LoaderComponent";
import Marquee from "react-fast-marquee";

interface dashboardProps {
    children: React.ReactNode;
    onClick?: any;
}

const DashboardLayout = (props: dashboardProps) => {
    const { loading, customer }: any = useAppSelector((state) => state.auth);
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
        {
            name: "Our Products",
            icon: notebookIcon,
            path: "/products",
        },
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
            path: "/settings/profile",
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
            path: "/settings/profile",
        },
        {
            name: "Logout",
            icon: logoutIcon,
            path: "#",
        },
    ];

    return (
        <div className="w-full min-h-screen bg-primary-light">
            <div className="sticky top-0 w-full z-10">
                <Marquee
                    gradient={false}
                    className="bg-primary text-white py-3"
                >
                    I can be a React component, multiple React components, or
                    just some text.
                </Marquee>
            </div>
            <div className="fixed left-0 top-0 w-[210px] z-20 transition ease-in-out delay-150 duration-300 h-screen py-[40px] bg-primary rounded-tr-3xl rounded-br-3xl flex flex-col">
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
                        {dashboardLinks.slice(0, 4).map((link, index) => (
                            <Link
                                to={link.path}
                                className="flex pl-[15px] items-center text-sm xl:text-base"
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
                        {dashboardLinks.slice(4).map((link, index) => (
                            <Link
                                to={index === 0 ? link.path : ""}
                                className="flex pl-[15px] items-center"
                                onClick={() => {
                                    index === 1 && dispatch(setLoading(true));
                                    index === 1 &&
                                        setTimeout(() => {
                                            dispatch(logout());
                                        }, 1500);
                                }}
                            >
                                <img
                                    alt=""
                                    src={link.icon}
                                    className={index === 0 ? "w-6 h-6" : ""}
                                />{" "}
                                <span className="text-base text-white ml-[25px] capitalize">
                                    {link?.name && link?.name}
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
            <div className="ml-[250px] pb-20">{children}</div>
            {loading && <Loader />}
        </div>
    );
};

export default DashboardLayout;
