import React, { useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Button from "../../components/ButtonComponent";
import { Input } from "../../components/FormElements";
import Loader from "../../components/LoaderComponent";
import AuthLayout from "../../layouts/AuthLayout";
import { loginUser, resetPassword, setLoading } from "../../store/auth-slice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

const ResetPassword = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [formData, setFormData] = React.useState({
        newPassword: "",
        confirmPassword: "",
        email: searchParams.get("email"),
        token: searchParams.get("token"),
    });
    const [error, setError] = React.useState("");

    // useEffect(() => {
    //      console.log(searchParams.get("email"), "ello")
    // })

    const dispatch = useAppDispatch();
    const { loading }: any = useAppSelector((state) => state.auth);

    const formChange = (e: any) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    useEffect(() => {
        if (
            formData.newPassword.length > 0 &&
            formData.confirmPassword.length > 0
        ) {
            if (formData.newPassword !== formData.confirmPassword) {
                setError("Passwords do not match");
            } else {
                setError("");
            }
        }
    }, [formData.confirmPassword, formData.newPassword]);

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
            let res: any = await dispatch(resetPassword(formData));
            let errors =
                res.meta.rejectedWithValue === true ||
                res.meta.requestStatus === "rejected";
            if (!errors) {
                navigate("/auth/sign-in");
            }
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
                    <div className="flex flex-col gap-y-10">
                        <div>
                            <Input
                                label="New Password"
                                name="newPassword"
                                isPassword
                                value={formData.newPassword}
                                placeholder="Password"
                                onChange={formChange}
                                required
                            />
                        </div>
                        <div>
                            <Input
                                label="Confirm Password"
                                isPassword
                                value={formData.confirmPassword}
                                placeholder="Confirm Password"
                                name="confirmPassword"
                                onChange={formChange}
                                required
                            />
                        </div>

                        {error && (
                            <p className="text-center text-error">
                                Password does not match
                            </p>
                        )}

                        <div className="text-center">
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
                    </div>
                </form>
                {loading && <Loader />}
            </div>
        </AuthLayout>
    );
};

export default ResetPassword;
