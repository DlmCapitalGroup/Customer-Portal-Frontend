import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "../../components/ButtonComponent";
import AuthLayout from "../../layouts/AuthLayout";
import { Input } from "../../components/FormElements";
import { loginCustomer, loginUser, setLoading } from "../../store/auth-slice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

const Eye = ({ onClick }: any) => {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute right-4 mt-2 cursor-pointer"
            onClick={onClick}
        >
            <circle
                cx="12"
                cy="12"
                r="3"
                stroke="#09335E"
                stroke-opacity="0.25"
                stroke-width="2"
            />
            <path
                d="M20.188 10.9343C20.5762 11.4056 20.7703 11.6412 20.7703 12C20.7703 12.3588 20.5762 12.5944 20.188 13.0657C18.7679 14.7899 15.6357 18 12 18C8.36427 18 5.23206 14.7899 3.81197 13.0657C3.42381 12.5944 3.22973 12.3588 3.22973 12C3.22973 11.6412 3.42381 11.4056 3.81197 10.9343C5.23206 9.21014 8.36427 6 12 6C15.6357 6 18.7679 9.21014 20.188 10.9343Z"
                stroke="#09335E"
                stroke-opacity="0.25"
                stroke-width="2"
            />
        </svg>
    );
};

function Login() {
    const [eye, setEye] = React.useState(false);
    const [formData, setFormData] = React.useState({
        ClientId: "",
        password: "",
    });

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { user, loading, customer }: any = useAppSelector(
        (state) => state.auth
    );

    const formChange = (e: any) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const login = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(setLoading());
        await dispatch(
            loginUser({
                username: "hamzah",
                password: "Ade@125",
            })
        );
        await dispatch(
            loginCustomer(
                // formData
                { username: "ifytest", password: "Dlmtest123#" }
            )
        );
        await navigate("/");
    };

    return (
        <AuthLayout>
            <div className="max-w-[334px] w-full mx-auto">
                <form onSubmit={login}>
                    <div className="mb-10">
                        <Input
                            placeholder="Client ID"
                            name="ClientId"
                            value={formData.ClientId}
                            label="Client ID"
                            onChange={formChange}
                        />
                    </div>
                    <div>
                        <label className="text-base font-semibold text-primary">
                            Password
                        </label>
                        <div className="relative flex items-center">
                            <Eye onClick={() => setEye(!eye)} />
                            <input
                                type={eye ? "password" : "text"}
                                name="password"
                                value={formData.password}
                                onChange={formChange}
                                placeholder="Password"
                                className="h-[56px] w-full text-base mt-2 placeholder-primary/40 pl-4 pr-12 bg-white-lighter focus:ring-primary shadow-sm border border-primary/5 rounded-lg"
                            />
                        </div>
                    </div>
                    <div className="text-right mt-3 mb-10">
                        <Link
                            to="/auth/forgot-password"
                            className="text-base font-normal text-primary/60"
                        >
                            Forgot Password
                        </Link>
                    </div>
                    <div className="text-center mb-10">
                        <Button buttonType="md" loading={loading}>
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
                                "Log In"
                            )}
                        </Button>
                    </div>

                    <p className="text-base text-primary/50 text-center">
                        Don’t have an account?{" "}
                        <Link
                            to="/auth/sign-up"
                            className="text-primary/80 font-semibold"
                        >
                            Sign Up
                        </Link>
                    </p>
                </form>
            </div>
        </AuthLayout>
    );
}

export default Login;
