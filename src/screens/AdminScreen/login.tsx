import React, { useState } from "react";
import AuthLayout from "../../layouts/AuthLayout";
import { Input } from "../../components/FormElements";
import Loader from "../../components/LoaderComponent";
import Button from "../../components/ButtonComponent";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";
import { loginAdmin, loginUser, setUser } from "../../store/auth-slice";

const LoginAdmin = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const formChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const login = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        // let data = JSON.stringify({
        // username: formData.username,
        // password: formData.password,
        // });

        // let config = {
        //     method: "post",
        //     maxBodyLength: Infinity,
        //     url: "https://apps.dlm.group/ASSETMGTAPI/api/v1/Admin/LoginAdmin",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     data: data,
        // };

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
            let res: any = await dispatch(
                loginAdmin({
                    username: formData.username,
                    password: formData.password,
                })
            );
            let errors =
                res.meta.rejectedWithValue === true ||
                res.meta.requestStatus === "rejected";
            if (!errors) {
                navigate("/admin/dashboard");
                setLoading(false);
            }
            // devInstance
            //     .request(config)
            //     .then((response: any) => {
            //         dispatch(setAdmin(response.data.data));
            //         toast.success(
            //             `${response.message || response.data.message}`
            //         );
            //         if (response) {
            //             navigate("/admin/dashboard");
            //         }
            //         console.log(JSON.stringify(response.data));
            //     })
            //     .catch((error) => {
            //         console.log(error);
            //     })
            //     .finally(() => {
            //         setLoading(false);
            //     });
        } else {
            setLoading(false);
        }
    };

    return (
        <AuthLayout>
            <div className="max-w-[334px] w-full mx-auto">
                <form onSubmit={login}>
                    <div className="mb-10">
                        <Input
                            placeholder="Username"
                            name="username"
                            value={formData.username}
                            label="Username"
                            onChange={formChange}
                            required
                        />
                    </div>
                    <div>
                        <label className="text-base font-semibold text-primary">
                            Password
                        </label>
                        <div className="relative flex items-center">
                            <Input
                                isPassword
                                value={formData.password}
                                placeholder="Password"
                                name="password"
                                onChange={formChange}
                                required
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
                </form>
            </div>
            {loading && <Loader />}
        </AuthLayout>
    );
};

export default LoginAdmin;
