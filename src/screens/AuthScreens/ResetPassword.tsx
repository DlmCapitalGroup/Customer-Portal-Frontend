import React, { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Button from "../../components/ButtonComponent";
import { Input } from "../../components/FormElements";
import Loader from "../../components/LoaderComponent";
import AuthLayout from "../../layouts/AuthLayout";
import { loginUser, resetPassword, setLoading } from "../../store/auth-slice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

const ResetPassword = () => {
    const [searchParams] = useSearchParams();
    const [formData, setFormData] = React.useState({
        password: "",
        confirmPassword: "",
        email: searchParams.get("email"),
        token: searchParams.get("token"),
    });

    const dispatch = useAppDispatch();
    const { loading }: any = useAppSelector((state) => state.auth);

    const formChange = (e: any) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const reset = async (e: any) => {
        e.preventDefault();
        dispatch(setLoading(true));
        let res: any = await dispatch(
            loginUser({
                username: "hamzah",
                password: "Ade@125",
            })
        );

        let errors =
            res.meta.rejectedWithValue === true ||
            res.meta.requestStatus === "rejected";

        if (!errors) {
            await dispatch(resetPassword(formData));
        }
    };

    return (
        <AuthLayout>
            <div className="text-primary w-[334px] mx-auto">
                <h1 className="text-lg font-semibold text-center mb-[30px]">
                    Reset Password
                </h1>
                {/* <p className='text-base text-center text-primary/60 pb-[40px]'>
                    Kindly create a new password
                </p> */}

                <form onSubmit={reset}>
                    <div className="mb-10">
                        <Input
                            label="New Password"
                            name="password"
                            isPassword
                            value={formData.password}
                            placeholder="Password"
                            onChange={formChange}
                            required
                        />
                    </div>
                    <div className="mb-10">
                        <label className="text-base font-semibold text-primary">
                            Confirm Password
                        </label>
                        <Input
                            isPassword
                            value={formData.confirmPassword}
                            placeholder="Confirm Password"
                            name="confirmPassword"
                            onChange={formChange}
                            required
                        />
                    </div>
                    <div className="text-center mb-10">
                        <Button buttonType="md">Reset password</Button>
                    </div>

                    <p className="text-base text-primary/50 text-center">
                        Go back to{" "}
                        <Link
                            to="/auth/sign-in"
                            className="text-primary/80 font-semibold"
                        >
                            Sign In
                        </Link>
                    </p>
                </form>
                {loading && <Loader />}
            </div>
        </AuthLayout>
    );
};

export default ResetPassword;
