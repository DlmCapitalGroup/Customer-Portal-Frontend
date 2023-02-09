import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setAuthToken, setCustomer } from "./store/auth-slice";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { Cloudinary } from "@cloudinary/url-gen";

function App() {
    const { user, customer }: any = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();

    // const cld = new Cloudinary({
    //     cloud: {
    //       cloudName: 'demo',
    //     }
    //   });

    useEffect(() => {
        if (user) {
            setAuthToken(user?.token);
            if (customer) {
                dispatch(setCustomer(customer));
            }
        }
    }, [customer, dispatch, user]);
    return (
        <div className="App">
            <Outlet />
            <ToastContainer />
        </div>
    );
}

export default App;
