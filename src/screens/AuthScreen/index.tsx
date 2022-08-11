import React from "react";
import { Outlet } from "react-router-dom";
// import Button from "../../components/ButtonComponent";
import AuthLayout from "../../layouts/AuthLayout";

const AuthScreen = () => {
    return (
        <>
            <AuthLayout>
                <Outlet />
            </AuthLayout>
        </>
    );
};

export default AuthScreen;
