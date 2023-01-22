import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setAuthToken, setCustomer } from "./store/auth-slice";
import { useAppDispatch } from "./store/hooks";

function App() {
    let localUser:any = localStorage.getItem("user");
    let user = JSON.parse(localUser);
    let localCustomer:any = localStorage.getItem("customer");
    let customer = JSON.parse(localCustomer);
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (user) {
            setAuthToken(user.token)
            if(customer) {
                dispatch(setCustomer(customer))
            }
        }
    }, [customer, dispatch, user])
    return (
        <div className="App">
            <Outlet />
            <ToastContainer />
        </div>
    );
}

export default App;
