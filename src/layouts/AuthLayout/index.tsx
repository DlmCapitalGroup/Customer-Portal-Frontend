import React, { useEffect } from "react";
import Logo from "../../assets/images/logo.svg";
import Spinner from "../../assets/images/spinner.svg";
import LeftBgImg from "../../assets/images/left-bg-img.svg";
import RightBgImg from "../../assets/images/right-bg-img.svg";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";

interface AuthLayoutProps {
    children: React.ReactNode;
    loading?: boolean;
}

const AuthLayout = (props: AuthLayoutProps) => {
    const navigate = useNavigate();
    const { children, loading } = props;
    const location = useLocation();

    const { user, customer }: any = useAppSelector((state) => state.auth);

    return (
        <div className="min-h-screen w-full grid place-items-center bg-primary-light py-10">
            <div className="fixed top-0 h-screen w-full flex justify-between items-center">
                <img alt="" src={LeftBgImg} className="absolute left-0 z-0" />
                <img alt="" src={RightBgImg} className="absolute right-0 z-0" />
            </div>
            <div
                className={`${
                    location.pathname === "/auth/confirm-email"
                        ? "w-[606px]"
                        : loading
                        ? "w-[298px] h-[385px]"
                        : "w-[500px]"
                } rounded-[20px] shadow-md bg-white-light py-5 z-50`}
                {...props}
            >
                <div>
                    <img
                        alt="logo"
                        src={Logo}
                        className="mx-auto w-[122px] h-[122px] mb-10"
                    />
                    {loading ? (
                        <img
                            alt=""
                            src={Spinner}
                            className="mx-auto animate-spin w-[132px] h-[132px]"
                        />
                    ) : (
                        <>{children}</>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
