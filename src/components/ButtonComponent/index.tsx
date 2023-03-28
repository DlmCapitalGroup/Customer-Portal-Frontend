import React from "react";

interface buttonProps {
    children: React.ReactNode;
    buttonType?: "md" | "lg" | "xl" | "full";
    onClick?: any;
    hasIcon?: Boolean;
    icon?: string;
    variant?: "light" | "dark";
    loading?: Boolean;
    disabled?: any;
    type?: "button" | "submit";
}

const Button = (props: buttonProps) => {
    const { children, buttonType, variant, hasIcon, icon, loading, disabled } =
        props;

    return (
        <button
            {...props}
            className={`h-[56px] ${
                buttonType === "md"
                    ? "w-[180px]"
                    : hasIcon === true
                    ? "w-[249px]"
                    : buttonType === "lg"
                    ? "w-[420px]"
                    : buttonType === "xl"
                    ? "w-[568px]"
                    : buttonType === "full"
                    ? "w-full"
                    : "w-[125px]"
            } ${
                variant === "light"
                    ? "border-primary border text-primary bg-white-lighter hover:bg-white-light"
                    : disabled
                    ? "bg-primary/60 hover:bg-primary/60 text-white"
                    : "bg-primary hover:bg-primary/80 text-white"
            } text-base rounded-[8px] font-semibold`}
            disabled={(loading ? true : false) || disabled}
        >
            {hasIcon && <img alt="button icon" src={icon} />}
            {children || "Button"}
        </button>
    );
};

export default Button;
