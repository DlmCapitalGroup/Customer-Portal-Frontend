import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setAuthToken, setCustomer, setUser } from "./store/auth-slice";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { Cloudinary } from "@cloudinary/url-gen";
import jwt_decode from "jwt-decode";
import { clearStepper } from "./store/stepperSlice";

function App() {
    const { user, customer }: any = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();

    // const cld = new Cloudinary({
    //     cloud: {
    //       cloudName: 'demo',
    //     }
    //   });

    // check for token
    if (localStorage.jwtToken) {

        // Set auth token header auth
        setAuthToken(localStorage.jwtToken);
        // Decode token and get user info and exp
        const decoded: any = jwt_decode(localStorage.jwtToken);

        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
            setCustomer(null);
            setUser(null);
            setAuthToken(null);
            localStorage.removeItem("persist:root");
            clearStepper();
            localStorage.clear();
        }
        
    }

    useEffect(() => {
        if (user) {
            setAuthToken(user?.token);
            if (customer) {
                dispatch(setCustomer(customer));
            }
        }
    }, [customer, dispatch, user]);
    return (
        <div className="App" id="top">
            <Outlet />
            <ToastContainer />
        </div>
    );
}

export default App;
