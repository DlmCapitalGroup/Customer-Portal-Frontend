import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";

const PrivateRoutes = ({ children, to, ...rest }: any) => {
    const { customer }: any = useAppSelector((state) => state.auth);
    return customer.customerId ? <Outlet /> : <Navigate to="/auth/sign-in" />;
    // return <Outlet />
};

export default PrivateRoutes;
