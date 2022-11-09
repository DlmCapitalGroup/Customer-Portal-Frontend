import React from "react";
import { useTable } from "react-table";
import chevronRight from "../../assets/images/chevron-right.svg";
import chevronLeft from "../../assets/images/chevron-left.svg";

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

const Table = () => {
    return (
        <div className="text-sm max-w-[1119px]">
            <div className="rounded-[20px] bg-white-light">
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
                <div className="flex flex-col space-y-10 py-10">
                    {[
                        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
                    ].map((item, index) => (
                        <div className="flex items-center">
                            <div className="basis-1/4 pl-[54px]">
                                <h3>Car Investment</h3>
                            </div>
                            <div className="basis-1/4 text-center">
                                <h3>500,000.67</h3>
                            </div>
                            <div className="basis-1/4 text-center">
                                <h3>13 June, 2022</h3>
                            </div>
                            <div className="basis-1/4 text-right pr-[54px]">
                                {index % 3 === 0 ? (
                                    <h3 className="text-error">Failed</h3>
                                ) : (
                                    <h3 className="text-success">Successful</h3>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex justify-between mt-6 items-center">
                <p className="font-semibold text-base cursor-pointer">
                    Generate Statement
                </p>
                <div className="flex space-x-[32px]">
                    <p className="text-base font-semibold">1 - 10 of 10</p>
                    <div className="flex space-x-[66px]">
                        <img alt="" src={chevronLeft} />
                        <img alt="" src={chevronRight} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Table;
