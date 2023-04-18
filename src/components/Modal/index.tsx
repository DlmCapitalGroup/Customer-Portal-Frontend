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
            className="fixed w-screen h-screen top-0 left-0 flex items-center justify-center bg-primary/20 z-50"
            {...props}
        >
            <div
                className={`bg-white-light shadow-sm rounded-[20px] relative w-[1000px] min-h-[800px]`}
            >
                {isCancel && (
                    <img
                        alt=""
                        src={cancelBtn}
                        onClick={cancel}
                        className="cursor-pointer absolute right-5 top-5"
                    />
                )}
                {children}
            </div>
        </div>
    );
};

export default Modal2;
