import React, { useEffect, useLayoutEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { setCustomer, setUser } from "./store/auth-slice";
import { useAppSelector } from "./store/hooks";

function App() {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, customer }: any = useAppSelector((state) => state.auth);
    const localUser: any = localStorage.getItem("user");
    const localCustomer: any = localStorage.getItem("customer");
    const customerRef = JSON.parse(localCustomer);
    const userRef = JSON.parse(localUser);
    // useLayoutEffect(() => {
    //     if (customerRef && userRef) {
    //         setUser(userRef);
    //         setCustomer(customerRef);
    //     }
    // }, [customerRef, userRef]);
    // useEffect(() => {
    //     if((location.pathname === "/auth/sign-in") && (user && customer) ) {
    //         navigate("/", {replace: true})
    //     }
    //     else {
    //         if (user === null && customer === null && location.pathname !== "/auth/*") {
    //             navigate("/auth/sign-in", {replace: true})
    //         }
    //     }
    // }, [user, customer, navigate, location.pathname]);
    return (
        <div className="App">
            <Outlet />
        </div>
    );
}

export default App;
