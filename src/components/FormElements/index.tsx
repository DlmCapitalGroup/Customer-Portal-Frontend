import React from "react";

type InputProps = {
    type?: "text" | "email" | "password" | "number";
    label?: string;
    name?: string;
    value?: string;
    placeholder?: string;
    onChange?: () => {};
};

const Input = (props: InputProps) => {
    const { type, label, name, value, placeholder, onChange } = props;
    return (
        <div>
            {label && (
                <label className="text-base font-semibold text-primary">
                    {label}
                </label>
            )}
            <input
                type={type ? type : "text"}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
                className="h-[56px] w-full text-base mt-2 placeholder-primary/40 px-4 bg-white-lighter focus:ring-primary active:ring-primary shadow-sm border border-primary/5 rounded-lg"
            />
        </div>
    );
};

export { Input };
