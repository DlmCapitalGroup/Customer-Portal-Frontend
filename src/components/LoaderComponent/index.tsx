import React from "react";

const Loader = () => {
    return (
        <div className="grid place-items-center z-50 fixed left-0 top-0 w-screen h-screen bg-primary/70">
            <div className="lds-spinner">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
};

export default Loader;
