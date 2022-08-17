import React, { useState } from 'react'
import Button from '../../components/ButtonComponent';
import DashboardLayout from '../../layouts/DashboardLayout';
import trash from "../../assets/images/trash.svg";
import building from "../../assets/images/building.svg";
import closeIcon from "../../assets/images/close-icon.svg";

interface walletcardProps {
    type?: "light" | "dark";
    children: React.ReactNode;
}

const WalletCard = (props: walletcardProps) => {
    const { type, children } = props;
    return (
        <div className={`w-[456px] h-[207px] ${type === "dark" ? "bg-primary/80 text-white-lighter" : "bg-white-light text-primary"} rounded-[20px] p-5 flex-none flex flex-col space-y-6`}>
            {children}
        </div>
    )
}

interface addcardProps {
    closeAction: () => void;
    saveAction: () => void;
}

const AddCardModal = (props: addcardProps) => {
    const { closeAction, saveAction } = props;
    return (
        <div className='fixed w-screen h-screen top-0 left-0 bg-primary/25 grid place-items-center text-primary'>
            <div className='w-[691px] h-[656px] bg-white-light py-10 rounded-[20px] relative'>
                <img alt='close icon' src={closeIcon} className="absolute right-10 cursor-pointer" onClick={closeAction} />
                <div className='mx-auto w-fit'>
                    <div className='flex flex-col space-y-10 mb-16'>
                        <div className='text-center'>
                            <h2 className='text-xl font-semibold mb-2'>Add New Card</h2>
                            <p className='text-base'>Please set up your bank card</p>
                        </div>
                        <div className='flex flex-col space-y-8 mb-16'>
                            <input type="text" className='w-[459px] h-[56px] border border-primary/5 shadow-sm rounded-lg px-4 focus:ring-primary focus:ring bg-white-lighter' placeholder='Card Name' />
                            <input type="text" className='w-[459px] h-[56px] border border-primary/5 shadow-sm rounded-lg px-4 focus:ring-primary focus:ring bg-white-lighter' placeholder='Card Number' />
                            <input type="text" className='w-[459px] h-[56px] border border-primary/5 shadow-sm rounded-lg px-4 focus:ring-primary focus:ring bg-white-lighter' placeholder='Expiry Date' />
                            <input type="text" className='w-[459px] h-[56px] border border-primary/5 shadow-sm rounded-lg px-4 focus:ring-primary focus:ring bg-white-lighter' placeholder='CVV' />
                        </div>
                    </div>
                    <Button buttonType='full' onClick={saveAction}>
                        Save Card
                    </Button>
                </div>
            </div>
        </div>
    )
}

const Overview = () => {

    const [addCard, setAddCard] = useState(false);

    const saveAction = () => {
        setAddCard(false);
    }

    const closeAction = () => {
        setAddCard(false);
    }

    return (
        <>
            <h3 className="text-xl font-semibold mb-[70px]">Transactions</h3>
            <div className='flex space-x-[34px] overflow-x-hidden mb-[100px]'>
                <WalletCard type="dark">
                    <div className='flex flex-col space-y-2'>
                        <h3 className="text-sm">Wallet Balance </h3>
                        <h2 className='text-lg font-semibold'>₦ 1,000,543.03</h2>
                    </div>

                    <div className='flex flex-col space-y-2'>
                        <h3 className="text-sm">Customer ID</h3>
                        <h2 className='text-lg font-semibold'>123948</h2>
                    </div>
                </WalletCard>
                <WalletCard>
                    <div className='flex flex-col space-y-2'>
                        <h3 className="text-sm">Total Investment</h3>
                        <h2 className='text-lg font-semibold'>₦ 1,000,543.03</h2>
                    </div>

                    <div className='flex flex-col space-y-2'>
                        <h3 className="text-sm">Customer ID</h3>
                        <h2 className='text-lg font-semibold'>123948</h2>
                    </div>
                </WalletCard>
                <WalletCard>
                    <div className='flex flex-col space-y-2'>
                        <h3 className="text-sm">Total Interest</h3>
                        <h2 className='text-lg font-semibold'>₦ 1,000,543.03</h2>
                    </div>

                    <div className='flex flex-col space-y-2'>
                        <h3 className="text-sm">Customer ID</h3>
                        <h2 className='text-lg font-semibold'>123948</h2>
                    </div>
                </WalletCard>
                <WalletCard>
                    <div className='flex flex-col space-y-2'>
                        <h3 className="text-sm">Total Investment</h3>
                        <h2 className='text-lg font-semibold'>₦ 1,000,543.03</h2>
                    </div>

                    <div className='flex flex-col space-y-2'>
                        <h3 className="text-sm">Customer ID</h3>
                        <h2 className='text-lg font-semibold'>123948</h2>
                    </div>
                </WalletCard>
                <WalletCard>
                    <div className='flex flex-col space-y-2'>
                        <h3 className="text-sm">Total Investment</h3>
                        <h2 className='text-lg font-semibold'>₦ 1,000,543.03</h2>
                    </div>

                    <div className='flex flex-col space-y-2'>
                        <h3 className="text-sm">Customer ID</h3>
                        <h2 className='text-lg font-semibold'>123948</h2>
                    </div>
                </WalletCard>
            </div>

            <div>
                {/* <h2 className="text-xl font-semibold">Sorry! You do not have any card in your wallet</h2> */}
                <h2 className='mb-10 text-lg font-semibold'>Fund Wallet From</h2>
                <div className='flex flex-col space-y-4 mr-10'>
                    {
                        [1, 2].map(item => (
                            <div className='flex space-x-[32px]'>
                                <div className='max-w-[948px] h-[152px] w-full bg-white-light rounded-[20px] shadow-sm flex items-start px-16 py-8 space-x-14 hover:ring hover:ring-primary hover:cursor-pointer'>
                                    <img alt="" src={building} />
                                    <div className='grow flex flex-col space-y-4'>
                                        <h3 className='text-base font-semibold'>Adesewa Adesewa</h3>
                                        <p className='text-base'>Guarantee Trust Bank</p>
                                    </div>
                                    <div className='text-base text-right flex flex-col space-y-4'>
                                        <p>************01234</p>
                                        <p>Mastercard</p>
                                    </div>
                                </div>

                                <div className='w-[132px] h-[152px] bg-white-light rounded-[20px] grid place-items-center hover:ring-primary hover:ring hover:cursor-pointer'>
                                    <img alt="delete card" src={trash} />
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className="mt-20">
                    <Button buttonType="lg" onClick={() => setAddCard(true)}>
                        Add Card
                    </Button>
                </div>
            </div>
            {addCard && <AddCardModal saveAction={saveAction} closeAction={closeAction} />}
        </>
    )
}

export default Overview;