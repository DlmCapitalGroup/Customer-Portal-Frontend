import React, { useState } from "react";
import Button from "../../components/ButtonComponent";
import OtpInput from "../../components/OtpInput";
import { useLocation, useNavigate } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout";
import {
    confirmCustomer,
    loginCustomer,
    resendOtpCode,
    setAuthToken,
    setLoading,
    updateCustomer,
} from "../../store/auth-slice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { toast } from "react-toastify";
import axios from "axios";
import { devInstance } from "../../store/devInstance";
import { store } from "../../store";
import Loader from "../../components/LoaderComponent";

const ConfirmEmail = () => {
    const dispatch = useAppDispatch();
    const location: any = useLocation();
    const navigate = useNavigate();
    const { loading, user }: any = useAppSelector((state) => state.auth);

    let stateParams = location?.state?.data;
    let localStateParams: any = localStorage.getItem("customerRegRes");
    let parsedLocalStateParams = JSON.parse(localStateParams);

    let localCustomer: any = localStorage.getItem("customerRegData");
    let customer = JSON.parse(localCustomer);

    console.log(stateParams, "stateParams");

    const [state, setState]: any = useState({
        email: stateParams?.email || parsedLocalStateParams?.email,
        token: stateParams?.token || parsedLocalStateParams?.token,
        otp: "",
    });

    const onChange = (value: string) => setState({ ...state, otp: value });

    const confirmOtp = async () => {
        dispatch(setLoading(true));
        let res: any = await dispatch(confirmCustomer(state));
        if (res && customer) {
            const resp: any = await dispatch(
                loginCustomer({
                    username: customer.username,
                    password: customer.password,
                })
            );

            let errors =
                resp.meta.rejectedWithValue === true ||
                resp.meta.requestStatus === "rejected";

            if (!errors) {
                localStorage.removeItem("customerRegRes");
                localStorage.removeItem("customerRegData");
                navigate("/dashboard");
            }
        }
    };

    const resendOtp = async () => {
        dispatch(setLoading(true));
        setAuthToken(user.token);
        if (customer) {
            await dispatch(resendOtpCode(customer.email));
        }
    };

    return (
        <AuthLayout>
            <div className="flex flex-col space-y-10">
                <div className="w-[354px] mx-auto texst-center flex flex-col space-y-10">
                    <h2 className="text-primary text-lg font-semibold">
                        Confirm your email address
                    </h2>

                    <p className="text-primary/60 text-base">
                        We’ve sent a 6 digit code to you, Please enter it below
                    </p>
                </div>

                <OtpInput
                    value={state.otp}
                    valueLength={6}
                    onChange={onChange}
                />

                <div className="text-center">
                    <Button buttonType="md" onClick={confirmOtp}>
                        {loading ? (
                            <svg
                                role="status"
                                className="inline w-6 h-6 text-white animate-spin"
                                viewBox="0 0 100 101"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                    fill="#E5E7EB"
                                />
                                <path
                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                    fill="currentColor"
                                />
                            </svg>
                        ) : (
                            "Confirm"
                        )}
                    </Button>
                </div>

                <p className="text-base text-center text-primary/60">
                    Did not receive an OTP?{" "}
                    <span
                        className="text-primary/80 font-semibold cursor-pointer"
                        onClick={resendOtp}
                    >
                        Resend OTP
                    </span>
                </p>
            </div>
            {loading && <Loader />}
        </AuthLayout>
    );
};

export default ConfirmEmail;
