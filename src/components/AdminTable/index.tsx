import React from "react";
import chevronRight from "../../assets/images/chevron-right.svg";
import chevronLeft from "../../assets/images/chevron-left.svg";
import { formatter } from "../../helper";

type tableProps = {
    transactions?: Array<any>;
    currentPage?: number;
    totalPages?: number;
    prevPage?: any;
    nextPage?: any;
};

const AdminTable = (props: tableProps) => {
    const { transactions, currentPage, totalPages, prevPage, nextPage }: any =
        props;

    return (
        <div className="text-sm max-w-[1119px] h-full grow flex flex-col">
            <div className="rounded-[20px] bg-white-light flex flex-col grow">
                <div className="flex bg-primary rounded-[20px] h-[65.2px] text-white items-center text-base">
                    <div className="basis-1/4 pl-[54px]">
                        <h3>Type</h3>
                    </div>
                    <div className="basis-1/4 text-center">
                        <h3>Amount</h3>
                    </div>
                    <div className="basis-1/4 text-center">
                        <h3>Date</h3>
                    </div>
                    <div className="basis-1/4 text-right pr-[54px]">
                        <h3>Status</h3>
                    </div>
                </div>
                <div className="flex flex-col gap-y-10 py-10 grow min-h-[500px] overflow-x-hidden">
                    {/* <TransactionList /> */}
                </div>
            </div>
            <div className="flex justify-end mt-6 items-center">
                {/* <p className="font-semibold text-base cursor-pointer">
                    Generate Statement
                </p> */}
                <div className="flex space-x-[32px]">
                    <div className="flex space-x-[20px] justify-center items-center">
                        <div
                            className="border-primary border-2 p-2 cursor-pointer"
                            onClick={prevPage}
                        >
                            <img alt="" src={chevronLeft} />
                        </div>
                        <p className="text-base font-semibold">
                            {currentPage || 1} - {totalPages || 10} of{" "}
                            {totalPages || 10}
                        </p>
                        <div
                            className="border-primary border-2 p-2 cursor-pointer"
                            onClick={nextPage}
                        >
                            <img alt="" src={chevronRight} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminTable;
