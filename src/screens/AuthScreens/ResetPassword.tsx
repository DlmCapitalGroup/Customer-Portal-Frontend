import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import Button from "../../components/ButtonComponent";
import { Input } from "../../components/FormElements";
import AuthLayout from "../../layouts/AuthLayout";

const ResetPassword = () => {
    const [searchParams] = useSearchParams();
    const [formData, setFormData] = React.useState({
        password: "",
        confirmPassword: "",
        email: searchParams.get('email'),
        token: searchParams.get('token')

    });

    const reset = () => {};

    const formChange = (e: any) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
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
                        <label className="text-base font-semibold text-primary">
                            New Password
                        </label>
                        <Input
                            isPassword
                            value={formData.password}
                            placeholder="Password"
                            name="password"
                            onChange={formChange}
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
                        />
                    </div>
                    <div className="text-center mb-10">
                        <Button buttonType="md">Save</Button>
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

export default ResetPassword;
