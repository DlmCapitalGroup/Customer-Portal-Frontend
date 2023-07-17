import React from "react";
import radioChecked from "../../assets/images/radio-checked.svg";
import radioUnchecked from "../../assets/images/radio-unchecked.svg";
import chevronDown from "../../assets/images/chevron-down.svg";

type selectProps = {
    options?: Array<any>;
    title?: string;
    setOption?: any;
    toggleSelect?: () => void;
    selected?: any;
    required?: boolean;
};

const Select = (props: selectProps) => {
    const [select, setSelect] = React.useState(false);
    const { options, title, setOption, selected } = props;
    function toggleSelect() {
        setSelect(!select);
    }

    function setValue(option: any) {
        setTimeout(() => {
            toggleSelect();
        }, 400);
        setOption(option);
    }

    return (
        <div className="relative">
            <div
                className={`h-14 border bg-white-lighter border-primary/10 rounded-lg flex items-center px-4 cursor-pointer justify-between ${
                    !selected && "text-primary/30"
                }`}
                onClick={toggleSelect}
            >
                {selected?.label || selected || title || "Select"}
                <img alt="" src={chevronDown} />
            </div>
            {select && (
                <div className="absolute w-full z-50 flex flex-col gap-y-4 pt-4 pb-14 border border-primary/10 rounded-br-[20px] rounded-bl-[20px] bg-white-lighter h-fit max-h-64 overflow-y-auto">
                    {options ? (
                        options.map((option, index) => {
                            let item = option;
                            return (
                                <div
                                    key={index}
                                    onClick={() => setValue(item)}
                                    className="px-4 flex items-center gap-x-4 cursor-pointer text-sm"
                                >
                                    <img
                                        alt=""
                                        src={
                                            item === selected
                                                ? radioChecked
                                                : radioUnchecked
                                        }
                                    />{" "}
                                    {item?.label || item}
                                </div>
                            );
                        })
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
