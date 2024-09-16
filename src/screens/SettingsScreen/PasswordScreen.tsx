import React from "react";
import lock from "../../assets/images/lock.svg";
import Button from "../../components/ButtonComponent";

const Eye = () => {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute right-4 mt-2 cursor-pointer"
        >
            <circle
                cx="12"
                cy="12"
                r="3"
                stroke="#09335E"
                stroke-opacity="0.25"
                stroke-width="2"
            />
            <path
                d="M20.188 10.9343C20.5762 11.4056 20.7703 11.6412 20.7703 12C20.7703 12.3588 20.5762 12.5944 20.188 13.0657C18.7679 14.7899 15.6357 18 12 18C8.36427 18 5.23206 14.7899 3.81197 13.0657C3.42381 12.5944 3.22973 12.3588 3.22973 12C3.22973 11.6412 3.42381 11.4056 3.81197 10.9343C5.23206 9.21014 8.36427 6 12 6C15.6357 6 18.7679 9.21014 20.188 10.9343Z"
                stroke="#09335E"
                stroke-opacity="0.25"
                stroke-width="2"
            />
        </svg>
    );
};

const Password = () => {
    return (
        <div>
            <div className="w-[131px] h-[131px] rounded-full grid place-items-center bg-primary mb-[83px]">
                <img alt="" src={lock} />
            </div>

            <div className="max-w-[570px]">
                <div className="flex flex-col space-y-[30px] mb-[91px]">
                    <label className="text-base font-semibold text-primary">
                        Current Password
                    </label>
                    <div className="relative flex items-center">
                        <Eye />
                        <input
                            type="password"
                            placeholder="********"
                            className="h-[56px] w-full text-base mt-2 placeholder-primary/40 pl-4 pr-12 bg-white-lighter focus:ring-primary shadow-sm border border-primary/5 rounded-lg"
                        />
                    </div>

                    <div>
                        <label className="text-base font-semibold text-primary">
                            New Password
                        </label>
                        <div className="relative flex items-center">
                            <Eye />
                            <input
                                type="password"
                                placeholder="New Password"
                                className="h-[56px] w-full text-base mt-2 placeholder-primary/40 pl-4 pr-12 bg-white-lighter focus:ring-primary shadow-sm border border-primary/5 rounded-lg"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="text-base font-semibold text-primary">
                            Confirm Password
                        </label>
                        <div className="relative flex items-center">
                            <Eye />
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                className="h-[56px] w-full text-base mt-2 placeholder-primary/40 pl-4 pr-12 bg-white-lighter focus:ring-primary shadow-sm border border-primary/5 rounded-lg"
                            />
                        </div>
                    </div>
                </div>

                <Button buttonType="full">
                    Update Password
                </Button>
            </div>
        </div>
    );
};

export default Password;
