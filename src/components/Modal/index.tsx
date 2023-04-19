import React from "react";
import loaderIcon from "../../assets/images/loader-icon.svg";
import errorIcon from "../../assets/images/error-icon.svg";
import successIcon from "../../assets/images/success-icon.svg";
import cancelBtn from "../../assets/images/close-modal.svg";

interface modalProps {
    children?: React.ReactNode;
    cancel?: any;
    isCancel?: boolean;
}

const Modal2 = (props: modalProps) => {
    const { children, cancel, isCancel } = props;
    return (
        <div
            className="fixed w-screen min-h-screen h-full top-0 left-0 flex justify-center bg-primary/20 pt-40 z-50"
            {...props}
        >
            <div
                className={`bg-white-light shadow-sm rounded-[20px] relative w-[1000px] h-[800px] overflow-y-auto`}
            >
                {isCancel && (
                    <img
                        alt=""
                        src={cancelBtn}
                        onClick={cancel}
                        className="cursor-pointer sticky flex ml-auto mt-5 mr-5 top-5"
                    />
                )}
                {children}
            </div>
        </div>
    );
};

export default Modal2;
