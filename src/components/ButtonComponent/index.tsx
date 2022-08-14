import React from "react";

interface buttonProps {
    children: React.ReactNode;
    buttonType?: "md" | "lg" | "xl";
    onClick?: any;
    hasIcon?: Boolean;
    icon?: string;
    variant?: "light" | "dark";
}

const Button = (props: buttonProps) => {
    const {children, buttonType, variant, hasIcon, icon} = props;

    return (
        <button {...props} className={`h-[56px] ${
            buttonType === "md" ? "w-[180px]"
            :hasIcon === true ? "w-[249px]"
            :buttonType === "lg" ? "w-[420px]"
            :buttonType === "xl" ? "w-[568px]"
            :"w-[125px]"
            } ${variant === "light" ? "border-primary border text-primary hover:bg-white-light" : "bg-primary hover:bg-primary/80 text-white"} text-base rounded-[8px] font-semibold`}>
            {hasIcon && <img alt="button icon" src={icon} />}
            {children || "Button"}
        </button>
    );
}

export default Button;