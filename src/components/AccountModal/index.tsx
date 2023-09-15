import React from "react";
import cancelBtn from "../../assets/images/close-modal.svg";
import successIcon from "../../assets/images/success-icon.svg";
import Button from "../ButtonComponent";

interface _props {
    cancel?: any;
    success?: boolean;
    // loading?: boolean;
}

const AccountModal = (props: _props) => {
    const { cancel, success } = props;
    return (
        <div
            className="fixed w-screen h-screen top-0 left-0 flex items-center justify-center bg-primary/20"
            {...props}
        >
            <div
                className={`bg-white shadow-sm rounded-[20px] max-w-[1042px] w-full border border-primary/25 py-7 px-11 ${
                    success
                        ? "flex flex-col justify-center h-[424px]"
                        : "h-[648px]"
                }`}
            >
                {success ? (
                    <div className="flex flex-col items-center gap-y-10">
                        <img alt="" src={successIcon} />
                        <p className="text-success text-[24px] font-semibold">
                            Payment Recieved!
                        </p>
                    </div>
                ) : (
                    <div>
                        <div className="flex justify-between items-center mb-11">
                            <h2 className="text-[32px] font-semibold">
                                Make payment to:
                            </h2>
                            <img
                                alt=""
                                src={cancelBtn}
                                onClick={cancel}
                                className="cursor-pointer"
                            />
                        </div>

                        <div className="bg-white-lighter w-full text-[24px] p-4 shadow-sm flex flex-col gap-y-[28px]">
                            <div>
                                <p>Bank Name</p>
                                <p className="font-semibold">
                                    UNITED BANK FOR AFRICA
                                </p>
                            </div>
                            <div>
                                <p>Account Number</p>
                                <p className="font-semibold">1023678074</p>
                            </div>
                            <div className="flex justify-between">
                                <div>
                                    <p>Amount</p>
                                    <p className="font-semibold">
                                        NGN 5,000,000
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p>Account Name</p>
                                    <p className="font-semibold">
                                        UTL Trust/DLM FIXED INCOME FUND
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mx-auto max-w-[567px] mt-[52px]">
                            <Button buttonType="full">I’ve sent it</Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AccountModal;
