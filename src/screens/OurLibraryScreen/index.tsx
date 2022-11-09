import React from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { Outlet } from "react-router-dom";

const Library = () => {
    return (
        <DashboardLayout>
            <div className="pr-5">
                <Outlet />
            </div>
        </DashboardLayout>
    );
};

export default Library;
