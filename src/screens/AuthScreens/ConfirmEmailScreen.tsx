import React from "react";
import Button from "../../components/ButtonComponent";
import OtpInput from "../../components/OtpInput";
import AuthLayout from "../../layouts/AuthLayout";
import { confirmCustomer } from "../../store/auth-slice";
import { useAppDispatch } from "../../store/hooks";

const ConfirmEmail = () => {
    const [otp, setOtp] = React.useState("");
    const onChange = (value: string) => setOtp(value);
    const dispatch = useAppDispatch();

    const confirmOtp = () => {
        dispatch(confirmCustomer(otp))
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

                <OtpInput value={otp} valueLength={6} onChange={onChange} />

                {/* <div className="flex space-x-3 mx-auto">
                    <input
                        type="tel"
                        className="w-[65px] h-[75px] border-blue-lighter bg-white-lighter focus:ring-primary rounded-[10px] text-center"
                    />
                    <input
                        type="text"
                        className="w-[65px] h-[75px] border-blue-lighter bg-white-lighter focus:ring-primary rounded-[10px] text-center"
                    />
                    <input
                        type="text"
                        className="w-[65px] h-[75px] border-blue-lighter bg-white-lighter focus:ring-primary rounded-[10px] text-center"
                    />
                    <input
                        type="text"
                        className="w-[65px] h-[75px] border-blue-lighter bg-white-lighter focus:ring-primary rounded-[10px] text-center"
                    />
                    <input
                        type="text"
                        className="w-[65px] h-[75px] border-blue-lighter bg-white-lighter focus:ring-primary rounded-[10px] text-center"
                    />
                    <input
                        type="text"
                        className="w-[65px] h-[75px] border-blue-lighter bg-white-lighter focus:ring-primary rounded-[10px] text-center"
                    />
                </div> */}

                {/* <OTPInput
                    value={otp}
                    onChange={handleChange}
                    autoFocus
                    OTPLength={6}
                    otpType="number"
                    disabled={false}
                    secure
                />
                <ResendOTP
                    onResendClick={() => console.log("Resend clicked")}
                /> */}

                <div className="text-center">
                    <Button buttonType="md" onClick={confirmOtp}>
                        Confirm
                    </Button>
                </div>

                <p className="text-base text-center text-primary/60">
                    Did not receive an OTP?{" "}
                    <a href="/" className="text-primary/80 font-semibold">
                        Resend OTP
                    </a>
                </p>
            </div>
        </AuthLayout>
    );
};

export default ConfirmEmail;
