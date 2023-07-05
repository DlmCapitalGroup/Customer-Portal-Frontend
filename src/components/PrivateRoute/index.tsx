import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";

const PrivateRoutes = ({ children, to, ...rest }: any) => {
    const { customer }: any = useAppSelector((state) => state.auth);
    return customer?.id ? <Outlet /> : <Navigate to="/auth/sign-in" />;
};

export default PrivateRoutes;
