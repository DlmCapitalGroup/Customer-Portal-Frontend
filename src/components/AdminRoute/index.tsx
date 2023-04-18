import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";

const AdminRoutes = ({ children, to, ...rest }: any) => {
    const { admin }: any = useAppSelector((state) => state.auth);
    return admin?.firstName ? <Outlet /> : <Navigate to="/admin/sign-in" />;
};

export default AdminRoutes;
