import React, { useState } from "react";
// import { useTable } from "react-table";
import chevronRight from "../../assets/images/chevron-right.svg";
import chevronLeft from "../../assets/images/chevron-left.svg";

type tableProps = {
    customers?: Array<any>;
    currentPage?: number;
    totalPages?: number;
    activateCustomer?: any;
    deactivateCustomer?: any;
    prevPage?: any;
    nextPage?: any;
    isAdmin?: boolean;
    children?: React.ReactNode;
    toggleMenu?: any;
    menu?: boolean;
};

const Table3 = (props: tableProps) => {
    const {
        customers,
        currentPage,
        totalPages,
        prevPage,
        nextPage,
        activateCustomer,
        deactivateCustomer,
        toggleMenu,
        menu,
    } = props;
    const [toggleId, setToggleId] = useState<null | number>(null);

    const CustomersList = () => {
        if (customers && customers?.length > 0) {
            return (
                <>
                    {customers?.map((item: any, index: number) => (
                        <div className="flex items-center" key={index}>
                            <div className="basis-1/4 pl-[54px]">
                                <h3>{item?.fullName}</h3>
                            </div>
                            <div className="basis-1/4 text-center capitalize">
                                <h3>{item?.emailAddress}</h3>
                            </div>
                            <div className="basis-1/4 text-center">
                                <h3>{item?.phoneNumber}</h3>
                            </div>
                            <div className="basis-1/4 text-center">
                                <h3>{item?.inquiry}</h3>
                            </div>
                        </div>
                    ))}
                </>
            );
        } else {
            return (
                <div className="pl-[20px] text-center text-error">
                    <h3>No Transactions Found</h3>
                </div>
            );
        }
    };

    return (
        <div className="text-sm max-w-[1119px] h-full grow flex flex-col">
            <div className="rounded-[20px] bg-white-light flex flex-col grow">
                <div className="flex bg-primary rounded-[20px] h-[65.2px] text-white items-center text-base sticky top-0 z-10">
                    {/* <div className="basis-1/4 pl-[54px]">
                        <h3>ID</h3>
                    </div> */}
                    <div className="basis-1/4 text-center">
                        <h3>FullName</h3>
                    </div>
                    <div className="basis-1/4 text-center">
                        <h3>Email Address</h3>
                    </div>
                    {/* {isAdmin && (
                        <>
                            <div className="basis-1/4 text-center">
                                <h3>Request ID</h3>
                            </div>
                            <div className="basis-1/4 text-right pr-[54px]">
                                <h3>Customer ID</h3>
                            </div>
                        </>
                    )} */}
                    <div className="basis-1/4 text-right pr-[54px]">
                        <h3>Phone</h3>
                    </div>
                    <div className="basis-1/4 text-right pr-[54px]">
                        <h3>Message</h3>
                    </div>
                </div>
                <div className="flex flex-col gap-y-10 py-10 grow min-h-[500px] overflow-x-hidden">
                    <CustomersList />
                </div>
            </div>
            {totalPages && (
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
            )}
        </div>
    );
};

export default Table3;
