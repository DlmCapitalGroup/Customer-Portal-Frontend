import React from "react";
// import { useTable } from "react-table";
import chevronRight from "../../assets/images/chevron-right.svg";
import chevronLeft from "../../assets/images/chevron-left.svg";
import { formatter } from "../../helper";

type tableProps = {
    transactions?: Array<any>;
    currentPage?: number;
    totalPages?: number;
    prevPage?: any;
    nextPage?: any;
    isAdmin?: boolean;
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

const Table = (props: tableProps) => {
    const {
        transactions,
        currentPage,
        totalPages,
        prevPage,
        nextPage,
        isAdmin,
    }: any = props;

    const TransactionList = () => {
        if (transactions.length > 0) {
            return (
                <>
                    {transactions?.map((item: any, index: any) => (
                        <div className="flex items-center" key={index}>
                            <div className="basis-1/4 pl-[54px]">
                                <h3>{item.transactionType}</h3>
                            </div>
                            <div className="basis-1/4 text-center">
                                <h3>{formatter(item.transactionAmount)}</h3>
                            </div>
                            <div className="basis-1/4 text-center">
                                <h3>
                                    {new Date(
                                        item?.transactionDate
                                    ).toLocaleDateString()}
                                </h3>
                            </div>
                            {isAdmin && (
                                <>
                                    <div className="basis-1/4 text-center">
                                        <h3>{item?.requestId}</h3>
                                    </div>
                                    <div className="basis-1/4 text-center">
                                        <h3>{item?.customerId}</h3>
                                    </div>
                                </>
                            )}
                            <div
                                className={`basis-1/4 text-right ${
                                    isAdmin
                                        ? "flex justify-end pr-14"
                                        : "pr-[54px]"
                                }`}
                            >
                                {isAdmin ? (
                                    <h3
                                        className={`${
                                            item?.transactionStatus.toLowerCase() ===
                                            "approved"
                                                ? "bg-success"
                                                : item?.transactionStatus.toLowerCase() ===
                                                  "pending"
                                                ? "bg-primary"
                                                : "bg-error"
                                        } capitalize w-28 text-center text-white-lighter flex justify-center items-center gap-x-1 cursor-pointer p-1 text-xs rounded-md`}
                                        // onClick={() => {
                                        //     // setModalStatus(
                                        //     //     item?.transactionStatus.toLowerCase()
                                        //     // );
                                        //     // setOpenModal(true);
                                        // }}
                                    >
                                        <span>
                                            {item?.transactionStatus.toLowerCase() ===
                                            "approved"
                                                ? "successful"
                                                : item?.transactionStatus}
                                        </span>
                                        <span>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="w-4 h-4"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                                />
                                            </svg>
                                        </span>
                                    </h3>
                                ) : (
                                    <h3
                                        className={`${
                                            item.transactionStatus ===
                                            "approved"
                                                ? "text-success"
                                                : item.transactionStatus ===
                                                  "declined"
                                                ? "text-error"
                                                : "text-primary"
                                        } capitalize`}
                                    >
                                        {item.transactionStatus === "approved"
                                            ? "successful"
                                            : item.transactionStatus}
                                    </h3>
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
                    {isAdmin && (
                        <>
                            <div className="basis-1/4 text-center">
                                <h3>Request ID</h3>
                            </div>
                            <div className="basis-1/4 text-right pr-[54px]">
                                <h3>Customer ID</h3>
                            </div>
                        </>
                    )}
                    <div className="basis-1/4 text-center">
                        <h3>Status</h3>
                    </div>
                </div>
                <div className="flex flex-col gap-y-10 py-10 grow min-h-[500px] overflow-x-hidden">
                    <TransactionList />
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

export default Table;
