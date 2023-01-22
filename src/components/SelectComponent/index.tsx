import React from "react";
import radioChecked from "../../assets/images/radio-checked.svg";
import radioUnchecked from "../../assets/images/radio-unchecked.svg";
import chevronDown from "../../assets/images/chevron-down.svg";

type selectProps = {
    options?: Array<any>;
    title?: string;
    setOption?: any;
    toggleSelect?: () => void;
    selected?: string;
    required?: boolean;
};

const Select = (props: selectProps) => {
    const [select, setSelect] = React.useState(false);
    const { options, title, setOption, selected } = props;
    function toggleSelect() {
        setSelect(!select);
    }
    return (
        <div className="relative">
            <div
                className="h-14 border bg-white-lighter border-primary/10 rounded-lg flex items-center px-4 cursor-pointer justify-between"
                onClick={toggleSelect}
            >
                {title || "Select"}
                <img alt="" src={chevronDown} />
            </div>
            {select && (
                <div className="absolute w-full z-50 flex flex-col gap-y-4 pt-4 pb-14 border border-primary/10 rounded-br-[20px] rounded-bl-[20px] bg-white-lighter">
                    {options ? (
                        options.map((option, index) => (
                            <div
                                key={index}
                                onClick={() => setOption(option)}
                                className="px-4 flex items-center gap-x-4 cursor-pointer text-sm"
                            >
                                <img
                                    alt=""
                                    src={
                                        option === selected
                                            ? radioChecked
                                            : radioUnchecked
                                    }
                                />{" "}
                                {option}
                            </div>
                        ))
                    ) : (
                        <div className="p-4 flex items-center gap-x-4 cursor-pointer">
                            Demo Option
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Select;
