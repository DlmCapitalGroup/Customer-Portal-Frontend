import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Button from "../../components/ButtonComponent";
import AuthLayout from "../../layouts/AuthLayout";
import { loginUser, setLoading } from "../../store/auth-slice";
import { devInstance } from "../../store/devInstance";
import { useAppDispatch } from "../../store/hooks";

const ForgotPassword = () => {
    const dispatch = useAppDispatch();
    const [email, setEmail] = React.useState("");
    function setDetail(e: any) {
        setEmail(e.target.value);
    }
    const forgotPassword = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(setLoading());
        await dispatch(
            loginUser({
                username: "hamzah",
                password: "Ade@125",
            })
        );

        const res = await devInstance.post("/Authentication/ForgotPassword", {
            email: email,
        });
        console.log(res);
    };

    return (
        <AuthLayout>
            <div className="text-primary w-[334px] mx-auto">
                <h1 className="text-lg font-semibold text-center mb-[30px]">
                    Forgot Password
                </h1>
                <p className="text-base text-center text-primary/60 pb-[40px]">
                    Enter Email
                </p>

                <form onSubmit={forgotPassword}>
                    <div className="mb-10">
                        <label className="text-base font-semibold text-primary">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="Email"
                            className="h-[56px] w-full text-base mt-2 placeholder-primary/40 px-4 bg-white-lighter focus:ring-primary shadow-sm border border-primary/5 rounded-lg"
                            onChange={setDetail}
                        />
                    </div>

                    <div className="text-center mb-10">
                        <Button buttonType="md">Submit</Button>
                    </div>

                    <p className="text-base text-primary/50 text-center">
                        Go back to{" "}
                        <Link
                            to="/sign-in"
                            className="text-primary/80 font-semibold"
                        >
                            Sign In
                        </Link>
                    </p>
                </form>
            </div>
        </AuthLayout>
    );
};

export default ForgotPassword;
