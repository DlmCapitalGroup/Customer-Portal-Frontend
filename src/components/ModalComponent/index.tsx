import React from "react";
import loaderIcon from "../../assets/images/loader-icon.svg";
import errorIcon from "../../assets/images/error-icon.svg";
import successIcon from "../../assets/images/success-icon.svg";

interface modalProps {
    children?: React.ReactNode;
    type?: "success" | "pending" | "error" | string;
    modalText?: string;
    size?: "sm" | "lg" | "md" | string
}

const Modal = (props: modalProps) => {
    const { children, type, modalText, size } = props;
    return (
        <div className="fixed w-screen h-screen top-0 left-0 flex items-center justify-center bg-primary/20">
            <div className={`${size === "sm" ? "w-[500px] min-h-[300px]" : size === "md" ? "w-[691px] min-h-[636px]" : "w-[1042px] min-h-[424px]"} bg-white-light shadow-sm rounded-[20px]`}>
                {children || (
                    // <div className='w-full h-full text-center pt-32 text-primary'>
                    //     <h1 className='text-3xl'>Modal</h1>
                    //     <p className='text-base'>This is a modal</p>
                    // </div>
                    <div className="w-full h-full flex justify-center items-center">
                        <div className="flex flex-col space-y-14">
                            <div
                                className={`${
                                    type === "pending"
                                        ? "rounded-full w-16 h-16 animate-spin"
                                        : "w-fit"
                                } mx-auto`}
                            >
                                <img
                                    alt=""
                                    src={
                                        type === "success"
                                            ? successIcon
                                            : type === "pending"
                                            ? loaderIcon
                                            : errorIcon
                                    }
                                />
                            </div>
                            <h3 className={`text-lg ${type === "success" ? "text-success" : type === "pending" ? "text-primary" : "text-error"} font-semibold text-center`}>
                                {type === "success" ? (
                                    `${modalText || "Card Added Successfully!"}`
                                ) : type === "pending" ? (
                                    `${modalText || "data is loading"}`
                                ) : (
                                    <span>
                                        Unsuccessful! <br /> Please try again.
                                    </span>
                                )}
                            </h3>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Modal;
