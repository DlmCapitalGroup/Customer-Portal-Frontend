import React, { useState } from "react";
// import { useTable } from "react-table";
import chevronRight from "../../assets/images/chevron-right.svg";
import chevronLeft from "../../assets/images/chevron-left.svg";
import { formatter } from "../../helper";

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
    cid?: any;
    type?: "B";
};

// const Table = (props: any) => {
//   const {columns, data} = props;

//   const {
//     getTableProps,
//     getTableBodyProps,
//     headerGroups,
//     rows,
//     prepareRow,
//   } = useTable({ columns, data })
//     return (
//       <table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
//        <thead>
//          {headerGroups.map((headerGroup: { getHeaderGroupProps: () => JSX.IntrinsicAttributes & React.ClassAttributes<HTMLTableRowElement> & React.HTMLAttributes<HTMLTableRowElement>; headers: any[]; }) => (
//            <tr {...headerGroup.getHeaderGroupProps()}>
//              {headerGroup.headers.map((column: { getHeaderProps: () => JSX.IntrinsicAttributes & React.ClassAttributes<HTMLTableHeaderCellElement> & React.ThHTMLAttributes<HTMLTableHeaderCellElement>; render: (arg0: string) => string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; }) => (
//                <th
//                  {...column.getHeaderProps()}
//                  style={{
//                    borderBottom: 'solid 3px red',
//                    background: 'aliceblue',
//                    color: 'black',
//                    fontWeight: 'bold',
//                  }}
//                >
//                  {column.render('Header')}
//                </th>
//              ))}
//            </tr>
//          ))}
//        </thead>
//        <tbody {...getTableBodyProps()}>
//          {rows.map((row) => {
//            prepareRow(row)
//            return (
//              <tr {...row.getRowProps()}>
//                {row.cells.map((cell: { getCellProps: () => JSX.IntrinsicAttributes & React.ClassAttributes<HTMLTableDataCellElement> & React.TdHTMLAttributes<HTMLTableDataCellElement>; render: (arg0: string) => string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; }) => {
//                  return (
//                    <td
//                      {...cell.getCellProps()}
//                      style={{
//                        padding: '10px',
//                        border: 'solid 1px gray',
//                        background: 'papayawhip',
//                      }}
//                    >
//                      {cell.render('Cell')}
//                    </td>
//                  )
//                })}
//              </tr>
//            )
//          })}
//        </tbody>
//      </table>
//     );
// };

const Table2 = (props: tableProps) => {
    const {
        customers,
        currentPage,
        totalPages,
        prevPage,
        nextPage,
        activateCustomer,
        deactivateCustomer,
        toggleMenu,
        cid,
        menu,
        type,
    } = props;
    const [toggleId, setToggleId] = useState<null | number>(null);

    const CustomersList = () => {
        if (customers && customers?.length > 0) {
            return (
                <>
                    {customers?.map((item: any, index: number) => (
                        <div
                            className="flex items-center hover:cursor-pointer"
                            key={index}
                            onClick={() => {
                                // cid(item.customerId);
                                // setToggleId(null);
                                // toggleMenu(false);
                            }}
                        >
                            <div className="basis-1/4 pl-[54px]">
                                <h3>{item?.customerId}</h3>
                            </div>
                            <div className="basis-1/4 text-center capitalize">
                                <h3>
                                    {item?.firstName} {item?.lastName}
                                </h3>
                            </div>
                            <div className="basis-1/4 text-center">
                                <h3>{item?.email}</h3>
                            </div>
                            <div className="basis-1/4 text-right relative flex justify-end items-center pr-10">
                                {toggleId === item?.customerId &&
                                    menu === true &&
                                    item?.transactionStatus !== "approved" && (
                                        <div
                                            className={`absolute bg-white-lighter border border-primary/30 w-48 rounded mr-8 top-0 z-10 shadow text-base text-center font-semibold ${
                                                (index ===
                                                    customers.length - 1 ||
                                                    index ===
                                                        customers.length - 2) &&
                                                "-top-16"
                                            }`}
                                        >
                                            {item?.isActive === true ? (
                                                <div
                                                    className="p-3 text-error hover:bg-primary/10 cursor-pointer"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        deactivateCustomer(
                                                            item?.customerId
                                                        );
                                                    }}
                                                >
                                                    Deactivate
                                                </div>
                                            ) : (
                                                <div
                                                    className="p-3 text-success hover:bg-primary/10 cursor-pointer"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        activateCustomer(
                                                            item?.customerId
                                                        );
                                                    }}
                                                >
                                                    Activate
                                                </div>
                                            )}

                                            <div
                                                className="p-3 hover:bg-primary/10 cursor-pointer"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setToggleId(null);
                                                    toggleMenu(false);
                                                }}
                                            >
                                                Cancel
                                            </div>
                                        </div>
                                    )}
                                <h3
                                    className={`capitalize w-28 cursor-pointer text-sm font-bold ${
                                        item?.isActive === true
                                            ? "text-success"
                                            : "text-error"
                                    }`}
                                >
                                    <span>
                                        {item.isActive === true
                                            ? "Active"
                                            : "InActive"}
                                    </span>
                                </h3>
                                {type !== "B" && (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-6 h-6 cursor-pointer"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            if (menu === true) {
                                                setToggleId(null);
                                                toggleMenu(false);
                                            } else {
                                                setToggleId(item?.customerId);
                                                toggleMenu(true);
                                            }
                                        }}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                                        />
                                    </svg>
                                )}
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
                    <div className="basis-1/4 pl-[54px]">
                        <h3>ID</h3>
                    </div>
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
                        <h3>Status</h3>
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

export default Table2;
