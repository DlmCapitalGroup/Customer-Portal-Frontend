import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/ButtonComponent";
import AuthLayout from "../../layouts/AuthLayout";
import {
    registerCustomer,
    loginUser,
    setLoading,
} from "../../store/auth-slice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Input, Select } from "../../components/FormElements";
import Loader from "../../components/LoaderComponent";
import { toast } from "react-toastify";

const Register = () => {
    const [formData, setFormData] = React.useState({
        active: "true",
        channel: "WEB",
        firstName: "",
        lastName: "",
        cellPhone: "",
        emailAddress1: "",
        portalUserName: "",
        portalPassword: "",
        partnerType: "INDIVIDUAL",
    });

    const [error, setError] = React.useState("");

    const navigate = useNavigate();

    const dispatch = useAppDispatch();
    const { loading }: any = useAppSelector((state) => state.auth);

    const formChange = (e: any) => {
        setFormData(() => ({
            ...formData,
            [e.target.name]: e.target.value,
        }));

        console.log(formData);
    };

    // useEffect(() => {
    //     if (
    //         formData.password.length > 0 &&
    //         formData.confirmPassword.length > 0
    //     ) {
    //         if (formData.password !== formData.confirmPassword) {
    //             setError("Passwords do not match");
    //         } else {
    //             setError("");
    //         }
    //     }
    // }, [formData.confirmPassword, formData.password]);

    const register = async (e: any) => {
        e.preventDefault();

        setLoading(true);
        let data: any = new FormData();
        data.append("username", "apiuser-asset");
        data.append("password", "d*gj5jYM@aSseT");

        let res: any = await dispatch(loginUser(data));
        let errors =
            res.meta.rejectedWithValue === true ||
            res.meta.requestStatus === "rejected";

        if (!errors) {
            let signupRes: any = await dispatch(registerCustomer(formData));
            console.log(signupRes, "signupRes");

            let errors =
                res.meta.rejectedWithValue === true ||
                res.meta.requestStatus === "rejected";

            if (!errors) {
                toast.success("Account Created Successfully, Please sign in");
                navigate("/auth/sign-in");
            } else {
                toast.error("Error Creating Account");
            }
        }
    };

    return (
        <AuthLayout>
            <div className="max-w-[334px] w-full mx-auto">
                <form onSubmit={register} className="flex flex-col gap-y-10">
                    <div>
                        <Input
                            label="First Name"
                            type="text"
                            placeholder="First Name"
                            name="firstName"
                            onChange={formChange}
                            required
                            value={formData.firstName}
                        />
                    </div>
                    <div>
                        <Input
                            label="Last Name"
                            type="text"
                            placeholder="Last Name"
                            name="lastName"
                            onChange={formChange}
                            required
                            value={formData.lastName}
                        />
                    </div>
                    <div>
                        <Input
                            label="Email Address"
                            type="email"
                            placeholder="Email Address"
                            name="emailAddress1"
                            onChange={formChange}
                            required
                            value={formData.emailAddress1}
                        />
                    </div>
                    <div>
                        <Input
                            label="Phone Number"
                            type="number"
                            max="99999999999"
                            placeholder="Phone Number"
                            name="cellPhone"
                            onChange={formChange}
                            required
                            value={formData.cellPhone}
                        />
                    </div>

                    <div>
                        <Input
                            label="Username"
                            placeholder="Username"
                            name="portalUserName"
                            onChange={formChange}
                            required
                            value={formData.portalUserName}
                        />
                    </div>

                    <div>
                        <Input
                            isPassword
                            label="Password"
                            placeholder="Password"
                            name="portalPassword"
                            onChange={formChange}
                            required
                            value={formData.portalPassword}
                        />
                    </div>

                    <div>
                        <Select
                            options={["INDIVIDUAL"]}
                            label="Partner Type"
                            placeholder="Partner Type"
                            name="partnerType"
                            onChange={formChange}
                            required
                            disabled
                            value={formData.partnerType}
                        />
                    </div>

                    <p className="flex space-x-3 items-center text-base text-black w-[350px]">
                        <input
                            type="checkbox"
                            className="rounded-[5px] bg-white-lighter"
                            required
                        />
                        <p className="-tracking-[.02em]">
                            I agree with the{" "}
                            <a href="/" className="text-blue-light">
                                terms and conditions
                            </a>
                        </p>
                    </p>
                    <div>
                        <div className="text-center">
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
                                    "Sign Up"
                                )}
                            </Button>
                        </div>

                        <p className="text-base text-primary/50 text-center">
                            Already have an account?{" "}
                            <Link
                                to="/auth/sign-in"
                                className="text-primary/80 font-semibold"
                            >
                                Sign In
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
            {loading && <Loader />}
        </AuthLayout>
    );
};

export default Register;
