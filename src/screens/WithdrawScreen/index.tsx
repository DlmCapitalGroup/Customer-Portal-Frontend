import React from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import { WalletCard } from "../FundWallet";
import chatIcon from "../../assets/images/chat-icon.svg";
import Button from "../../components/ButtonComponent";

const Withdraw = () => {
    const navigate = useNavigate();
    return (
        <DashboardLayout>
            <div className="pt-14">
                <h3 className="text-xl font-semibold mb-[70px]">
                    Withdraw Funds
                </h3>
                <div className="flex space-x-[34px] overflow-x-scroll scroll scrollbar-hide whitespace-nowrap scroll-smooth mb-[100px] slider pr-10">
                    <WalletCard
                        type="dark"
                        onClick={() => navigate("/transactions/history")}
                    >
                        <div className="flex flex-col space-y-2">
                            <h3 className="text-sm">Wallet Balance </h3>
                            <h2 className="text-lg font-semibold">
                                ₦ 1,000,543.03
                            </h2>
                        </div>

                        <div className="flex flex-col space-y-2">
                            <h3 className="text-sm">Customer ID</h3>
                            <h2 className="text-lg font-semibold">123948</h2>
                        </div>
                    </WalletCard>
                    <WalletCard>
                        <div className="flex flex-col space-y-2">
                            <h3 className="text-sm">Total Investment</h3>
                            <h2 className="text-lg font-semibold">
                                ₦ 1,000,543.03
                            </h2>
                        </div>

                        <div className="flex flex-col space-y-2">
                            <h3 className="text-sm">Customer ID</h3>
                            <h2 className="text-lg font-semibold">123948</h2>
                        </div>
                    </WalletCard>
                    <WalletCard>
                        <div className="flex flex-col space-y-2">
                            <h3 className="text-sm">Total Interest</h3>
                            <h2 className="text-lg font-semibold">
                                ₦ 1,000,543.03
                            </h2>
                        </div>

                        <div className="flex flex-col space-y-2">
                            <h3 className="text-sm">Customer ID</h3>
                            <h2 className="text-lg font-semibold">123948</h2>
                        </div>
                    </WalletCard>
                </div>

                <div className="flex justify-between max-w-[1119px] text-primary">
                    <div className="w-[691px] pt-16 bg-white-light rounded-[20px] h-[824px] shadow-sm">
                        <div className="w-[495px] mx-auto">
                            <h3 className="text-xl font-semibold mb-4">
                                Withdrawal Instruction
                            </h3>
                            <p className="text-base mb-[44px]">
                                Kindly complete the form to initiate your
                                withdrawal process
                            </p>

                            <div>
                                <div className="mb-10">
                                    <label className="text-base font-semibold text-primary">
                                        Client ID
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Client ID"
                                        className="h-[56px] w-full text-base mt-2 placeholder-primary/40 px-4 bg-white-lighter focus:ring-primary shadow-sm border border-primary/5 rounded-lg"
                                    />
                                </div>
                                <div className="mb-10">
                                    <label className="text-base font-semibold text-primary">
                                        How much do you want to withdraw?
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="0.00"
                                        className="h-[56px] w-full text-base mt-2 placeholder-primary/40 px-4 bg-white-lighter focus:ring-primary shadow-sm border border-primary/5 rounded-lg"
                                    />
                                </div>
                                <div className="mb-[99px]">
                                    <label className="text-base font-semibold text-primary">
                                        What account do you want to transfer to?
                                    </label>
                                    <select className="h-[56px] w-full text-base mt-2 placeholder-primary/40 px-4 bg-white-lighter focus:ring-primary shadow-sm border border-primary/5 rounded-lg">
                                        <option
                                            className="text-primary/10"
                                            disabled
                                            selected
                                        >
                                            Guarantee Trust Bank
                                        </option>
                                    </select>
                                </div>
                                <Button buttonType="full">Submit</Button>
                            </div>
                        </div>
                    </div>
                    <div className="w-[356px] h-[120px] rounded-[10px] shadow-sm pt-5 bg-white-light pl-4">
                        <h3 className="text-lg font-semibold">
                            Having withdrawal issues?
                        </h3>
                        <div className="flex space-x-5 items-center">
                            <p className="text-base">
                                Chat with our live agent
                            </p>
                            <img alt="" src={chatIcon} />
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Withdraw;
