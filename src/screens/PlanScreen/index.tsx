import { useState } from "react";
import building from "../../assets/images/building.svg";
import chevronRight from "../../assets/images/chevron-right.svg";
import closeIcon from "../../assets/images/close-icon.svg";
import Button from "../../components/ButtonComponent";
import Modal from "../../components/ModalComponent";
import DashboardLayout from "../../layouts/DashboardLayout";
import { WalletCard } from "../TransactionsScreen/OverviewScreen";

interface addcardProps {
    closeAction: () => void;
    saveAction: () => void;
}

const AddCardModal = (props: addcardProps) => {
    const { closeAction, saveAction } = props;
    return (
        <div className="fixed w-screen h-screen top-0 left-0 bg-primary/25 grid place-items-center text-primary">
            <div className="w-[691px] h-[656px] bg-white-light py-10 rounded-[20px] relative">
                <img
                    alt="close icon"
                    src={closeIcon}
                    className="absolute right-10 cursor-pointer"
                    onClick={closeAction}
                />
                <div className="mx-auto w-fit">
                    <div className="flex flex-col space-y-10 mb-16">
                        <div className="text-center">
                            <h2 className="text-xl font-semibold mb-2">
                                Add New Card
                            </h2>
                            <p className="text-base">
                                Please set up your bank card
                            </p>
                        </div>
                        <div className="flex flex-col space-y-8 mb-16">
                            <input
                                type="text"
                                className="w-[459px] h-[56px] border border-primary/5 shadow-sm rounded-lg px-4 focus:ring-primary focus:ring bg-white-lighter"
                                placeholder="Card Name"
                            />
                            <input
                                type="text"
                                className="w-[459px] h-[56px] border border-primary/5 shadow-sm rounded-lg px-4 focus:ring-primary focus:ring bg-white-lighter"
                                placeholder="Card Number"
                            />
                            <input
                                type="text"
                                className="w-[459px] h-[56px] border border-primary/5 shadow-sm rounded-lg px-4 focus:ring-primary focus:ring bg-white-lighter"
                                placeholder="Expiry Date"
                            />
                            <input
                                type="text"
                                className="w-[459px] h-[56px] border border-primary/5 shadow-sm rounded-lg px-4 focus:ring-primary focus:ring bg-white-lighter"
                                placeholder="CVV"
                            />
                        </div>
                    </div>
                    <Button buttonType="full" onClick={saveAction}>
                        Save Card
                    </Button>
                </div>
            </div>
        </div>
    );
};

const Plan = () => {
    const [addCard, setAddCard] = useState(false);
    const [modal, setModal] = useState(false);
    const [modalText, setModalText] = useState("");
    const [modalType, setModalType] = useState("");
    const [modalSize, setModalSize] = useState("");

    const saveAction = () => {
        setModalText("Saving Card Details");
        setModal(true);
        setModalType("pending");
        setTimeout(() => {
            setModalText("Card Added Successfully");
            setModalType("success");
        }, 2000);
        revertModal();
    };

    const revertModal = () => {
        setTimeout(() => {
            setModalType("");
            setModal(false);
            setModalText("");
            setAddCard(false);
            if (modalSize) {
                setModalSize("");
            }
        }, 3000);
    };

    const closeAction = () => {
        setAddCard(false);
    };

    return (
        <DashboardLayout>
            <div className="pt-[50px] text-primary">
                <h3 className="text-xl font-semibold mb-[15px]">
                    Investment Plan
                </h3>
                <p className="mb-[34px] text-base">
                    Create, book your investment plan and have it running when
                    you want
                </p>
                <div className="flex space-x-[34px] overflow-x-scroll scroll scrollbar-hide whitespace-nowrap scroll-smooth mb-[100px] slider pr-10">
                    <WalletCard type="dark">
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
                </div>

                <div className="mb-20 max-w-[948px]">
                    <h2 className="mb-10 text-lg font-semibold">
                        How Much Do You Want To Book
                    </h2>
                    <input
                        type="text"
                        placeholder="Amount"
                        className="h-[56px] w-full text-base placeholder-primary/40 px-4 bg-white-lighter focus:ring-primary shadow-sm border-none rounded-lg"
                    />
                </div>

                <div>
                    {/* <h2 className="text-xl font-semibold">Sorry! You do not have any card in your wallet</h2> */}
                    <h2 className="mb-10 text-lg font-semibold">Invest From</h2>
                    <div className="flex flex-col space-y-4 pr-10">
                        {[1, 2].map((item) => (
                            <div className="flex space-x-[32px]">
                                <div className="max-w-[948px] h-[152px] w-full bg-white-light rounded-[20px] shadow-sm flex items-start px-16 py-8 space-x-14 hover:ring hover:ring-primary hover:cursor-pointer">
                                    <img alt="" src={building} />
                                    <div className="grow flex flex-col space-y-4">
                                        <h3 className="text-base font-semibold">
                                            Adesewa Adesewa
                                        </h3>
                                        <p className="text-base">
                                            Guarantee Trust Bank
                                        </p>
                                    </div>
                                    <div className="text-base text-right flex flex-col space-y-4">
                                        <p>************01234</p>
                                        <p>Mastercard</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-14">
                    <h2 className="mb-10 text-lg font-semibold">
                        Schedule Time
                    </h2>

                    <div className="w-[900px] flex justify-between">
                        <div className="bg-white-lighter flex w-[320px] h-[56px] items-center text-base justify-between shadow-sm p-4 border border-primary/5 rounded-lg cursor-pointer">
                            <span>Start Date</span>
                            <img
                                alt=""
                                src={chevronRight}
                                className="w-[18px] h-[18px]"
                            />
                        </div>

                        <div className="bg-white-lighter flex w-[420px] h-[56px] items-center text-base justify-between shadow-sm p-4 border border-primary/5 rounded-lg cursor-pointer">
                            <span>Transaction Frequency</span>
                            <img
                                alt=""
                                src={chevronRight}
                                className="w-[18px] h-[18px]"
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-20">
                    <Button buttonType="lg" onClick={() => setAddCard(true)}>
                        Add Card
                    </Button>
                </div>

                {addCard && (
                    <AddCardModal
                        saveAction={saveAction}
                        closeAction={closeAction}
                    />
                )}

                {modal && (
                    <Modal
                        modalText={modalText}
                        type={modalType}
                        size={modalSize}
                    >
                    </Modal>
                )}
            </div>
        </DashboardLayout>
    );
};

export default Plan;
