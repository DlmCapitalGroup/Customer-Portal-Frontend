import React from 'react'
import DashboardLayout from '../../layouts/DashboardLayout';
import { Outlet } from 'react-router-dom';

const Transactions = () => {
    return (
        <>
            <DashboardLayout>
                <div className="pt-[56px] text-primary">
                    <Outlet />
                </div>
            </DashboardLayout>
        </>
    )
}

export default Transactions;