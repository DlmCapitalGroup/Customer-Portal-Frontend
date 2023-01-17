import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const Auth = () => {
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        if (location.pathname === "/auth") {
            navigate("/auth/sign-in");
        }
    });
    return <Outlet />;
};

export default Auth;
