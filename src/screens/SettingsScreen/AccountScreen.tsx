import React from "react";
import accountIcon from "../../assets/images/account.svg";
import Button from "../../components/ButtonComponent";

const Account = () => {
    return (
        <div>
            <div className="w-[131px] h-[131px] rounded-full grid place-items-center bg-primary mb-[83px]">
                <img alt="" src={accountIcon} />
            </div>
            <div className="flex flex-col space-y-14 max-w-[570px]">
                <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-lg">Block Account</h3>
                    <div className="w-[235px]">
                        <Button buttonType="full">Proceed</Button>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-lg">Unblock Account</h3>
                    <div className="w-[235px]">
                        <Button buttonType="full">Proceed</Button>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-lg">Report Account</h3>
                    <div className="w-[235px]">
                        <Button buttonType="full">Proceed</Button>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-lg">Delete Account</h3>
                    <div className="w-[235px]">
                        <Button buttonType="full">Proceed</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Account;
