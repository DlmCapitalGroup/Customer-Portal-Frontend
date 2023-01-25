import { Link } from "react-router-dom";
import Button from "../../components/ButtonComponent";
import { Input } from "../../components/FormElements";
import AuthLayout from "../../layouts/AuthLayout";

const UpdatePassword = () => {
    
    return (
        <AuthLayout>
            <div className="text-primary w-[334px] mx-auto">
                <h1 className="text-lg font-semibold text-center mb-[30px]">
                    Forgot Password
                </h1>
                <p className="text-base text-center text-primary/60 pb-[40px]">
                    Kindly create a new password
                </p>

                <form>
                    <div className="mb-10">
                        <Input
                            label="New Password"
                            placeholder="newPassword"
                            name="password"
                            isPassword
                        />
                    </div>
                    <div className="mb-10">
                        <Input
                            label="Confirm Password"
                            placeholder="confirmPassword"
                            name="password"
                            isPassword
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

export default UpdatePassword;
