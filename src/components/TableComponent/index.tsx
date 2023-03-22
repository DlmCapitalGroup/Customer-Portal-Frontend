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
    const { transactions, currentPage, totalPages, prevPage, nextPage }: any =
        props;

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
                            <div className="basis-1/4 text-right pr-[54px]">
                                <h3
                                    className={`${
                                        item.transactionStatus === "EXECUTED"
                                            ? "text-success"
                                            : "text-error"
                                    }`}
                                >
                                    {item.transactionStatus}
                                </h3>
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
                    <div className="basis-1/4 text-right pr-[54px]">
                        <h3>Status</h3>
                    </div>
                </div>
                <div className="flex flex-col gap-y-10 py-10 grow max-h-[500px] overflow-x-hidden">
                    <TransactionList />
                </div>
            </div>
            <div className="flex justify-end mt-6 items-center">
                {/* <p className="font-semibold text-base cursor-pointer">
                    Generate Statement
                </p> */}
                <div className="flex space-x-[32px]">
                    <p className="text-base font-semibold">
                        {currentPage || 1} - {totalPages || 10} of{" "}
                        {totalPages || 10}
                    </p>
                    <div className="flex space-x-[66px]">
                        <img
                            alt=""
                            src={chevronLeft}
                            className="cursor-pointer"
                            onClick={prevPage}
                        />
                        <img
                            alt=""
                            src={chevronRight}
                            className="cursor-pointer"
                            onClick={nextPage}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Table;
