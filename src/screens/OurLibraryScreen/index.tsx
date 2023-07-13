import DashboardLayout from "../../layouts/DashboardLayout";
import { Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useEffect } from "react";

const Library = () => {
    const {local} = useAppSelector((state) => state.auth)
    const dispatch = useAppDispatch()

    // useEffect(() => {
    //     if(!local) {
            
    //     }
    // }, [])
    return (
        <DashboardLayout>
            <div className="pr-5">
                <Outlet />
            </div>
        </DashboardLayout>
    );
};

export default Library;
