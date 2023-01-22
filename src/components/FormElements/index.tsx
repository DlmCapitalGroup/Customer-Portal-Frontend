import React from "react";
import eyeHide from "../../assets/images/eye-hide.svg";
import eyeShow from "../../assets/images/eye.svg";

interface InputProps {
    type?: "text" | "email" | "password" | "number" | "date";
    label?: string;
    name?: string;
    value?: string;
    placeholder?: string;
    onChange?: any;
    isPassword?: boolean;
    required?: boolean;
}

const Input = (props: InputProps) => {
    const { type, label, isPassword } = props;
    const [show, setShow] = React.useState(false);
    return (
        <div>
            {label && (
                <label className="text-base font-semibold text-primary">
                    {label}
                </label>
            )}
            {isPassword ? (
                <div className="flex items-center relative">
                    <input
                        type={show ? "text" : "password"}
                        className="grow h-[56px] w-full text-base mt-2 placeholder-primary/40 px-4 bg-white-lighter focus:ring-primary active:ring-primary shadow-sm border border-primary/5 rounded-lg"
                        {...props}
                    />
                    <img
                        alt=""
                        src={show ? eyeShow : eyeHide}
                        className="absolute right-4 mt-1 cursor-pointer"
                        onClick={() => setShow(!show)}
                    />
                </div>
            ) : (
                <div className="flex items-center relative">
                    <input
                        type={type ? type : "text"}
                        className="h-[56px] w-full text-base mt-2 placeholder-primary/40 px-4 bg-white-lighter focus:ring-primary active:ring-primary shadow-sm border border-primary/5 rounded-lg"
                        {...props}
                    />
                </div>
            )}
        </div>
    );
};

export { Input };
