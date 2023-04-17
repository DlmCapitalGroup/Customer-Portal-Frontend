import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/ButtonComponent";

const NotFound = () => {
    const navigate = useNavigate();
    return (
        <div className="w-full h-screen flex items-center justify-center">
            <div className="flex flex-col gap-y-5 items-center">
                <h3 className="text-4xl font-bold text-primary">
                    Page Not Found!
                </h3>
                <Button buttonType="lg" onClick={() => navigate("/")}>
                    Back to home
                </Button>
            </div>
        </div>
    );
};

export default NotFound;
