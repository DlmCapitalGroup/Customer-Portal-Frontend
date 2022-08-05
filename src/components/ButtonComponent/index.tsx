import React from "react";

interface buttonProps {
    children: React.ReactNode;
    buttonType?: "md" | "lg" | "xl";
    onClick?: any;
    hasIcon?: Boolean;
    icon?: string;
}

const Button = ({ children, buttonType, hasIcon, icon, ...props }: buttonProps) => {
    return (
        <button {...props} className={`h-[56px] ${
            buttonType === "md" ? "w-[180px]"
            :hasIcon === true ? "w-[249px]"
            :buttonType === "lg" ? "w[420px]"
            :buttonType === "xl" ? "w-[568px]"
            :"w-[125px]"
            } text-base rounded-[8px] bg-primary hover:bg-primary/80 text-white font-semibold`}>
            {hasIcon && <img alt="button icon" src={icon} />}
            {children || "Button"}
        </button>
    );
}

export default Button;