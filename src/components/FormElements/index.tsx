import React from "react";
import eyeHide from "../../assets/images/eye-hide.svg";
import eyeShow from "../../assets/images/eye.svg";

interface InputProps {
    type?: "text" | "email" | "password" | "number" | "date" | "file" | "image";
    label?: string;
    name?: string;
    value?: string;
    placeholder?: string;
    onChange?: any;
    isPassword?: boolean;
    required?: boolean;
    disabled?: boolean;
    isNumber?: boolean;
    max?: string;
    min?: string;
}

interface SelectProps {
    label?: string;
    name?: string;
    value?: string;
    placeholder?: string;
    onChange?: any;
    required?: boolean;
    disabled?: boolean;
    options?: Array<any>;
    title?: string;
    pattern?: string;
}

const Select = (props: SelectProps) => {
    const { label, options, title } = props;
    return (
        <div className="w-full" {...props}>
            {label && (
                <label className="text-base font-semibold text-primary">
                    {label}
                </label>
            )}
            <select
                className="h-[56px] w-full text-base mt-2 placeholder-primary/40 px-4 bg-white-lighter focus:ring-primary active:ring-primary shadow-sm border border-primary/5 rounded-lg"
                {...props}
            >
                <option selected disabled>
                    {title || "Select"}
                </option>
                {options?.map((option) => (
                    <option value={option}>{option}</option>
                ))}
            </select>
        </div>
    );
};

const Input = (props: InputProps) => {
    const { type, label, isPassword } = props;
    const [show, setShow] = React.useState(false);
    return (
        <div className="w-full">
            {label && (
                <label className="text-base font-semibold text-primary">
                    {label}
                </label>
            )}
            {isPassword ? (
                <div className="flex items-center relative">
                    <input
                        type={show ? "text" : "password"}
                        title="Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
                        pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#.])[A-Za-z\d@$!%*#.?&]{8,}$"
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
                <div>
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

export { Input, Select };
