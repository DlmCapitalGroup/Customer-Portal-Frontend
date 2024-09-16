import React from "react";

interface sheetProps {
    children: React.ReactNode;
}

const Sheet = (props: sheetProps) => {
    const { children } = props;
    return (
        <div className="bg-white rounded-2xl" {...props}>
            {children}
        </div>
    )
}

export default Sheet;