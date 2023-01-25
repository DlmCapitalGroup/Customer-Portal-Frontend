import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { setAuthToken, setCustomer } from "../../store/auth-slice";
import { useAppDispatch } from "../../store/hooks";

const Auth = () => {
    const location = useLocation();
    const navigate = useNavigate();
    let localUser:any = localStorage.getItem("user");
    let user = JSON.parse(localUser);
    let localCustomer:any = localStorage.getItem("customer");
    let customer = JSON.parse(localCustomer);
    const dispatch = useAppDispatch();
    // useEffect(() => {
    //     if (user) {
    //         setAuthToken(user.token)
    //         if(customer) {
    //             dispatch(setCustomer(customer))
    //             navigate("/")
    //         }
    //     }
    //     if (location.pathname === "/auth") {
    //         navigate("/auth/sign-in");
    //     }
    // }, [customer, dispatch, location.pathname, navigate, user])
    return <Outlet />;
};

export default Auth;
