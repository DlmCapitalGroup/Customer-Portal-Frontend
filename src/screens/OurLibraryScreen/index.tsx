import React from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { Outlet } from "react-router-dom";

const Library = () => {
    return (
        <DashboardLayout>
            <Outlet />
        </DashboardLayout>
    );
};

export default Library;
