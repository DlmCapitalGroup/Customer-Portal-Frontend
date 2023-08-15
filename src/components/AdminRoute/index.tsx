import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";

const AdminRoutes = ({ children, to, ...rest }: any) => {
    const { admin }: any = useAppSelector((state) => state.auth);
    // return admin?.username ? <Outlet /> : <Navigate to="/admin/sign-in" />;
    return <Outlet />
};

export default AdminRoutes;
