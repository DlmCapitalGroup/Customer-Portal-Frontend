import React, { MutableRefObject, useRef } from "react";
import eyeHide from "../../assets/images/eye-hide.svg";
import eyeShow from "../../assets/images/eye.svg";
import attachment from "../../assets/images/attachment-icon.svg";

interface InputProps {
    type?: "text" | "email" | "password" | "number" | "date" | "file" | "image";
    label?: string;
    name?: string;
    title?: string;
    value?: string;
    placeholder?: string;
    onChange?: any;
    isPassword?: boolean;
    required?: boolean;
    values?: string;
    uploaded?: boolean;
    disabled?: boolean;
    isNumber?: boolean;
    max?: string;
    min?: string;
    ref?: any;
    pattern?: string;
    onInvalid?: any;
    transparent?: boolean;
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
    ref?: any;
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
                {options?.map((option) => {
                    let item = option.title || option;
                    return (
                        <option
                            value={
                                item === "Yes"
                                    ? "true"
                                    : item === "No"
                                    ? "false"
                                    : item
                            }
                        >
                            {item}
                        </option>
                    );
                })}
            </select>
        </div>
    );
};

const Input = (props: InputProps) => {
    const {
        type,
        label,
        isPassword,
        placeholder,
        value,
        uploaded,
        transparent,
    } = props;
    const [show, setShow] = React.useState(false);
    const inputFile = useRef() as MutableRefObject<HTMLInputElement>;
    const inputFile1: any = useRef() as MutableRefObject<HTMLInputElement>;
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
                        pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#.])[A-Za-z\d@$!%*#.?&]{7,}$"
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
            ) : type === "file" ? (
                <div
                    className={`h-[56px] w-full flex items-center text-base mt-2 placeholder-primary/40 px-4 bg-white-lighter focus:ring-primary active:ring-primary shadow-sm border border-primary/5 rounded-lg relative hover:cursor-pointer`}
                    onClick={() => inputFile.current.click()}
                >
                    <p className="text-primary">
                        {placeholder}{" "}
                        {uploaded && (
                            <span className="text-success font-bold text-xs">
                                File Added
                            </span>
                        )}
                    </p>
                    <img alt="" src={attachment} className="absolute right-4" />
                    <input
                        type="file"
                        className="hidden"
                        ref={inputFile}
                        {...props}
                    />
                </div>
            ) : type === "date" ? (
                <div
                    className="h-[56px] flex items-center w-full text-base mt-2 placeholder-primary/40 px-4 bg-white-lighter focus:ring-primary active:ring-primary shadow-sm border border-primary/5 rounded-lg relative"
                    onClick={() => inputFile1.current.showPicker()}
                >
                    <p className="text-primary absolute w-full">
                        {value || placeholder}
                    </p>
                    <input
                        type="date"
                        className="opacity-0"
                        ref={inputFile1}
                        {...props}
                    />
                </div>
            ) : (
                <div>
                    <input
                        type={type ? type : "text"}
                        className={`h-[56px] w-full text-base mt-2 px-4 bg-white-lighter focus:ring-primary active:ring-primary shadow-sm border rounded-lg ${
                            transparent
                                ? "bg-transparent border-primary placeholder-primary"
                                : "border-primary/5 placeholder-primary/40"
                        }`}
                        {...props}
                    />
                </div>
            )}
        </div>
    );
};

export { Input, Select };
