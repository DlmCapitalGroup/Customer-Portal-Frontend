import React, { useState } from "react";
import Table from "../../components/TableComponent";
import Modal from "../../components/ModalComponent";
import chevronRight from "../../assets/images/chevron-right.svg";
import closeIcon from "../../assets/images/close-icon.svg";
import Button from "../../components/ButtonComponent";

const History = () => {
    const [modal, setModal] = useState(true);
    const [modalText, setModalText] = useState("");
    const [modalType, setModalType] = useState("");
    const [dropDown, setDropDown] = useState(false);
    return (
        <>
            <h3 className="text-xl font-semibold mb-8">Transaction History</h3>
            <Table />
            {modal && (
                <Modal modalText={modalText} type={modalType}>
                    {!modalType && (
                        <div className="w-full h-full pt-[25px] px-10">
                            <div className="flex justify-between mb-10">
                                <h3 className="text-xl font-semibold">
                                    Filter Transactions
                                </h3>
                                <img alt="" src={closeIcon} />
                            </div>

                            <div className="flex justify-between mb-10 items-center">
                                <p className="text-base font-semibold">Date</p>

                                <div className="w-[394px] flex justify-between">
                                    <div className="bg-white-lighter flex w-[185px] h-[56px] items-center text-base justify-between shadow-sm p-4 border border-primary/5 rounded-lg cursor-pointer">
                                        <span>Start Date</span>
                                        <img
                                            alt=""
                                            src={chevronRight}
                                            className="w-[18px] h-[18px]"
                                        />
                                    </div>

                                    <div className="bg-white-lighter flex w-[185px] h-[56px] items-center text-base justify-between shadow-sm p-4 border border-primary/5 rounded-lg cursor-pointer">
                                        <span>End Date</span>
                                        <img
                                            alt=""
                                            src={chevronRight}
                                            className="w-[18px] h-[18px]"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-between mb-16 items-center">
                                <p className="text-base font-semibold">
                                    Transaction Type
                                </p>

                                <div className="w-[394px] flex flex-col shadow-sm border border-primary/5 rounded-md relative">
                                    <div
                                        className="bg-white-lighter flex w-full h-[56px] items-center text-base justify-between p-4 rounded-lg cursor-pointer"
                                        onClick={() => setDropDown(!dropDown)}
                                    >
                                        <span>All</span>
                                        <img
                                            alt=""
                                            src={chevronRight}
                                            className="w-[18px] h-[18px]"
                                        />
                                    </div>

                                    {dropDown && (
                                        <div className="w-full absolute flex flex-col bg-white-lighter border border-primary/5 border-t-0 mt-[56px] rounded-b-[20px] divide-y rounded-t-lg divide-primary/20 px-2">
                                            {["Credit", "Debit"].map((item) => (
                                                <div className="h-56px py-4 px-2 cursor-pointer">
                                                    {item}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="text-center">
                                <Button
                                    buttonType="xl"
                                    onClick={() => {
                                        setModalType("pending");
                                        setModalText("Fetching Records");
                                        setTimeout(() => {
                                            setModalText("");
                                            setModalType("error");
                                        }, 2000);
                                        setTimeout(() => {
                                            setModal(false);
                                        }, 3000);
                                    }}
                                >
                                    Display Records
                                </Button>
                            </div>
                        </div>
                    )}
                </Modal>
            )}
        </>
    );
};

export default History;
