import React from "react";

type _props = {
    checked?: Boolean;
    options?: Array<any>;
    label?: string;
};

const SelectComponent = (props: _props) => {
    const { checked, label, options } = props;
    return (
        <div>
            <p>{label || "select"}</p>
            {/* <div className="w-8 h-8 border border-[#E0E0FF] rounded-full grid place-items-center">
                {checked && (
                    <div className="w-3 h-3 rounded-full bg-primary"></div>
                )}
            </div> */}
        </div>
    );
};

export default SelectComponent;
