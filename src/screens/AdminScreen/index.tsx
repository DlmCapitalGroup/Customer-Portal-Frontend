import React, { useCallback, useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import Table from "../../components/TableComponent";
import { devInstance } from "../../store/devInstance";
import Loader from "../../components/LoaderComponent";
import { useNavigate } from "react-router-dom";
import { formatter } from "../../helper";
import closeModal from "../../assets/images/close-modal.svg";
import Button from "../../components/ButtonComponent";
import { toast } from "react-toastify";
import { useAppSelector } from "../../store/hooks";
import Table2 from "../../components/CustomersTable.tsx";
import Modal2 from "../../components/Modal";
import DetailsModal from "../../components/DetailsModal";

const AdminScreen = () => {
    const [loading, setLoading] = useState(false);
    const [customers, setCustomers] = useState([]);
    const [enquiries, setEnquiries] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [transactionsLength, setTransactionsLength] = useState(0);
    const [customerLength, setCustomerLength] = useState(0);
    const [products, setProducts] = useState([]);
    const { admin }: any = useAppSelector((state) => state.auth);
    const [menu, setMenu] = useState(false);
    const [news, setNews] = useState([]);
    const [transaction, setTransaction] = useState<any>({});
    const [modal2, setModal2] = useState(false);
    const [modal, setModal] = useState(false);
    const navigate = useNavigate();
    const [modal3, setModal3] = useState(false);
    const [cid, setCid] = useState<null | number>(null);
    const [customer, setCustomer] = useState<any>({});
    const [menu2, setMenu2] = useState(false);

    useEffect(() => {
        setLoading(true);
        devInstance
            .get(
                "https://apps.dlm.group/ASSETMGTAPI/api/v1/Admin/GetAllCustomers"
            )
            .then((response: any) => {
                setCustomers(response.data.data.pageItems);
                setCustomerLength(response.data.data.totalNumberOfItems);
            })
            .catch((err) => console.log(err))
            .finally(() => {
                setLoading(false);
            });

        devInstance
            .get(
                "https://apps.dlm.group/ASSETMGTAPI/api/v1/Transaction/GetAllInquiries"
            )
            .then((response: any) => {
                setEnquiries(response.data.data.pageItems);
            })
            .catch((err) => console.log(err))
            .finally(() => {
                setLoading(false);
            });

        devInstance
            .get(
                "https://apps.dlm.group/ASSETMGTAPI/api/v1/Admin/GetNewsUpdates"
            )
            .then((response: any) => {
                setNews(response.data);
                // console.log(response.data)
            })
            .catch((err) => console.log(err))
            .finally(() => {
                setLoading(false);
            });

        devInstance
            .get(
                "https://apps.dlm.group/ASSETMGTAPI/api/v1/Admin/GetProductIds"
            )
            .then((response: any) => {
                setProducts(response.data.data);
                // console.log(response.data)
            })
            .catch((err) => console.log(err))
            .finally(() => {
                setLoading(false);
            });

        devInstance(
            "https://apps.dlm.group/ASSETMGTAPI/api/v1/Admin/GetAllCustomersRequests"
        )
            .then((response: any) => {
                setTransactions(response.data.data.pageItems);
                setTransactionsLength(response.data.data.totalNumberOfItems);
                console.log(response.data.data.pageItems);
            })
            .catch((err) => console.log(err))
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const getProdId = (productId: any) => {
        return products.find((el: any) => productId === el.productId);
    };

    function getCustomerDetails(id: number) {
        setLoading(true);
        devInstance
            .get(`/Admin/GetCustomerInfoAndTransactions/${id}`)
            .then((res: any) => {
                setCustomer(res?.data);
                setCid(id);
                console.log(res, "transaction");
                setModal(true);
            })
            .catch((err: any) => toast(`${err.response.data || err.message}`))
            .finally(() => setLoading(false));
    }

    function getDetail(rid: number, cid: number) {
        setLoading(true);
        devInstance
            .get("/Admin/GetCustomerProductSubDetails", {
                params: {
                    CustomerId: cid,
                    RequestId: rid,
                },
            })
            .then((res: any) => {
                setTransaction(res.data);
                console.log(res, "transaction");
                setModal2(true);
            })
            .catch((err) => console.log(err))
            .finally(() => setLoading(false));
        console.log(rid, "rid");
        console.log(cid, "cid");
    }

    const TransactionList = () => {
        if (transactions?.length > 0) {
            return (
                <>
                    {transactions
                        ?.slice(0, 9)
                        .map((item: any, index: number) => (
                            <div className="flex items-center">
                                <div className="basis-1/4 pl-[20px]">
                                    <h3>{item?.transactionType}</h3>
                                </div>
                                <div className="basis-1/4 text-center">
                                    <h3>
                                        {formatter(item?.transactionAmount)}
                                    </h3>
                                </div>
                                <div className="basis-1/4 text-center">
                                    <h3>
                                        {new Date(
                                            item?.transactionDate
                                        ).toLocaleDateString()}
                                    </h3>
                                </div>
                                <div className="basis-1/4 text-center">
                                    <h3>{item?.requestId}</h3>
                                </div>
                                <div className="basis-1/4 text-center">
                                    <h3>{item.customerId}</h3>
                                </div>
                                <div className="basis-1/4 flex justify-end pr-[10px] text-white-lighter">
                                    <div
                                        className={`basis-1/4 text-right relative flex justify-end items-center`}
                                    >
                                        {/* <div className="absolute bg-white-lighter border border-primary/30 p-3 w-80 rounded"></div> */}
                                        <h3
                                            className={`${
                                                item?.transactionStatus.toLowerCase() ===
                                                "approved"
                                                    ? "text-success"
                                                    : item?.transactionStatus.toLowerCase() ===
                                                      "pending"
                                                    ? "text-primary"
                                                    : "text-error"
                                            } capitalize w-28 cursor-pointer text-sm`}
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
                                        </h3>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="#09335E"
                                            className="w-6 h-6 cursor-pointer"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                                            />
                                        </svg>
                                    </div>
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

    const fetchTransactions = useCallback((pageNumber?: number) => {
        setLoading(true);
        devInstance
            .get("/Admin/GetAllCustomersRequests/", {
                params: {
                    pageNumber: pageNumber,
                },
            })
            .then((res: any) => {
                setTransactions(res?.data?.data?.pageItems);
                console.log(res, "rrrrr");
            })
            .catch((err) => {
                toast.error(`${err?.message}`);
                setLoading(false);
            })
            .finally(() => setLoading(false));
    }, []);

    function approveReq(reqId: number, prodId: string) {
        setLoading(true);
        devInstance
            .post("/Admin/ApproveInvestment", {
                productId: prodId,
                requestId: reqId,
                userId: admin?.userId,
                status: "approve",
            })
            .then((response: any) => {
                toast.success("Investment was successfully Approved");
                fetchTransactions();
                setMenu(false);
            })
            .catch((err) => {
                toast.error(`${err.message}`);
            })
            .finally(() => setLoading(false));
    }

    function declineReq(reqId: number, prodId: string) {
        setLoading(true);
        devInstance
            .post("/Admin/ApproveInvestment", {
                productId: prodId,
                requestId: reqId,
                userId: admin?.userId,
                status: "decline",
            })
            .then((response: any) => {
                toast.success("Investment was successfully Declined");
                fetchTransactions();
                setMenu(false);
            })
            .catch((err) => {
                toast.error(`${err.message}`);
            })
            .finally(() => setLoading(false));
    }

    const toggleMenu = (val: boolean) => {
        setMenu(val);
    };

    const toggleMenu2 = (val: boolean) => {
        setMenu(val);
    };

    function activateCustomer(id: number) {
        setLoading(true);
        devInstance
            .post("/Admin/EnableCustomer", {
                adminId: admin.userId,
                customerId: id,
            })
            .then(() => {
                toast.success("Customer has been Enabled Successfully");
                fetchCustomers(1);
                setMenu(false);
            })
            .catch((err) => toast.error(`${err.response.data}`))
            .finally(() => setLoading(false));
    }

    function deactivateCustomer(id: number) {
        setLoading(true);
        devInstance
            .post("/Admin/DisableCustomer", {
                adminId: admin.userId,
                customerId: id,
            })
            .then(() => {
                toast.success("Customer has been Disabled Successfully");
                fetchCustomers(1);
                setMenu(false);
            })
            .catch((err) => toast.error(`${err.response.data || err.message}`))
            .finally(() => setLoading(false));
    }

    const fetchCustomers = useCallback((pageNumber: number) => {
        setLoading(true);
        devInstance
            .get("/Admin/GetAllCustomers", {
                params: {
                    pageNumber: pageNumber,
                },
            })
            .then((res: any) => {
                setCustomers(res?.data?.data?.pageItems);
                console.log(res, "rrrrr");
            })
            .catch((err) => {
                toast.error(`${err?.message}`);
                setLoading(false);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const CustomerList = () => {
        if (customers?.length > 0) {
            return (
                <>
                    {customers?.slice(0, 9).map((item: any, index: number) => (
                        <div className="flex items-center">
                            <div className="basis-1/4 pl-[20px]">
                                <h3>{item?.customerId}</h3>
                            </div>
                            <div className="basis-1/4 text-center">
                                <h3>{item.firstName + " " + item.lastName}</h3>
                            </div>
                            <div className="basis-1/4 text-center">
                                <h3>{item.email}</h3>
                            </div>
                            <div className="basis-1/4 flex justify-end pr-[10px]">
                                <button
                                    disabled
                                    className={`bg-error capitalize w-28 disabled:opacity-70 text-center flex justify-center items-center gap-x-1 cursor-pointer p-1 text-xs rounded-md`}
                                    // onClick={() => {

                                    // }}
                                >
                                    Disable
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
                                </button>
                            </div>
                        </div>
                    ))}
                </>
            );
        } else {
            return (
                <div className="pl-[20px] text-center text-error">
                    <h3>No Customers Found</h3>
                </div>
            );
        }
    };

    const Modal = ({ children, close }: any) => (
        <div className="fixed w-screen h-screen top-0 left-0 flex items-center justify-center bg-primary/20">
            <div className="w-[800px] flex flex-col min-h-[400px] bg-white-light shadow-sm rounded-[20px] p-10 relative">
                <img
                    alt=""
                    src={closeModal}
                    className="w-5 absolute top-10 right-10 cursor-pointer"
                    onClick={close}
                />
                <>{children}</>
            </div>
        </div>
    );

    return (
        <AdminLayout>
            <div className="pt-[50px] text-primary max-w-[1100px] text-base pb-64 mr-5">
                <h3 className="text-xl font-semibold mb-[15px]">Overview</h3>
                <div className="grid grid-cols-4 gap-5 mt-10">
                    <div
                        className="min-h-[200px] border text-center text-white-lighter border-primary/10 bg-primary shadow-sm rounded-xl flex justify-center items-center cursor-pointer"
                        onClick={() => navigate("/admin/customers")}
                    >
                        <div>
                            <h3 className="font-semibold">Customers</h3>
                            <p className="text-3xl font-semibold">
                                {customerLength}
                            </p>
                        </div>
                    </div>
                    <div
                        className="min-h-[200px] border text-center text-white-lighter border-primary/10 bg-primary shadow-sm rounded-xl flex justify-center items-center cursor-pointer"
                        onClick={() => navigate("/admin/transactions")}
                    >
                        <div>
                            <h3 className="font-semibold">
                                Total Transactions
                            </h3>
                            <p className="text-3xl font-semibold">
                                {transactionsLength}
                            </p>
                        </div>
                    </div>
                    <div
                        className="min-h-[200px] border text-center text-white-lighter border-primary/10 bg-primary shadow-sm rounded-xl flex justify-center items-center cursor-pointer"
                        onClick={() => navigate("/admin/products")}
                    >
                        <div>
                            <h3 className="font-semibold">Total Products</h3>
                            <p className="text-3xl font-semibold">
                                {products.length}
                            </p>
                        </div>
                    </div>
                    <div
                        className="min-h-[200px] border text-center text-white-lighter border-primary/10 bg-primary shadow-sm rounded-xl flex justify-center items-center cursor-pointer"
                        onClick={() => navigate("/admin/news")}
                    >
                        <div>
                            <h3 className="font-semibold">Total News</h3>
                            <p className="text-3xl font-semibold">
                                {news.length}
                            </p>
                        </div>
                    </div>
                    <div
                        className="min-h-[200px] border text-center text-white-lighter border-primary/10 bg-primary shadow-sm rounded-xl flex justify-center items-center cursor-pointer"
                        onClick={() => navigate("/admin/enquiries")}
                    >
                        <div>
                            <h3 className="font-semibold">Total Enquiries</h3>
                            <p className="text-3xl font-semibold">
                                {enquiries.length}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-20">
                    <h2 className="text-xl font-semibold mb-5">Customers</h2>
                    <div className="h-[365px]">
                        <div className="w-full rounded-[20px] bg-white-lighter h-full">
                            <div className="text-sm w-full rounded-[20px] bg-white-light h-[365px]">
                                <div className="flex flex-col h-[500px] overflow-hidden">
                                    <div className="flex flex-col grow overflow-y-auto">
                                        <Table2
                                            customers={customers}
                                            menu={menu}
                                            activateCustomer={activateCustomer}
                                            deactivateCustomer={
                                                deactivateCustomer
                                            }
                                            toggleMenu={toggleMenu}
                                            cid={getCustomerDetails}
                                        />
                                    </div>
                                </div>
                                <p
                                    className="font-semibold text-sm text-right mr-5 cursor-pointer mt-5"
                                    onClick={() => navigate("/admin/customers")}
                                >
                                    View more
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-64">
                    <h2 className="text-xl font-semibold mb-5">Transactions</h2>
                    <div className="h-[365px]">
                        <div className="w-full rounded-[20px] bg-white-lighter h-full">
                            <div className="text-sm w-full rounded-[20px] bg-white-light h-[365px]">
                                {/* <div className="flex bg-primary rounded-[20px] h-[45.2px] text-white items-center text-sm xl:text-base py-2">
                                        <div className="basis-1/4 pl-[20px]">
                                            <h3>Type</h3>
                                        </div>
                                        <div className="basis-1/4 text-center">
                                            <h3>Amount</h3>
                                        </div>
                                        <div className="basis-1/4 text-center">
                                            <h3>Date</h3>
                                        </div>
                                        <div className="basis-1/4 text-center">
                                            <h3>Request Id</h3>
                                        </div>
                                        <div className="basis-1/4 text-center">
                                            <h3>Customer Id</h3>
                                        </div>
                                        <div className="basis-1/4 text-right pr-[20px]">
                                            <h3>Status</h3>
                                        </div>
                                    </div> */}
                                <div>
                                    <div className="flex flex-col h-[500px] overflow-x-hidden overflow-y-auto">
                                        <div className="flex flex-col">
                                            <Table
                                                transactions={transactions}
                                                // prevPage={prevPage}
                                                // nextPage={nextPage}
                                                // totalPages={totalPages}
                                                // currentPage={currentPage}
                                                isAdmin
                                                type="B"
                                                approveReq={approveReq}
                                                declineReq={declineReq}
                                                menu={menu}
                                                toggleMenu={toggleMenu2}
                                                reqId={getDetail}
                                            />
                                        </div>
                                    </div>
                                    <p
                                        className="font-semibold text-sm text-right mr-5 cursor-pointer mt-5"
                                        onClick={() =>
                                            navigate("/admin/transactions")
                                        }
                                    >
                                        View more
                                    </p>
                                </div>
                                {modal && (
                                    <DetailsModal
                                        cancel={(e: any) => {
                                            // e.stopPropagation();
                                            setModal(false);
                                        }}
                                        title="Customer Details"
                                        customerDetails={
                                            customer.customerDetails
                                        }
                                        hasTransactions
                                        reqId={getDetail}
                                        transactions={customer.data.pageItems}
                                        isAdmin
                                        type="B"
                                        approveReq={approveReq}
                                        declineReq={declineReq}
                                        menu={menu2}
                                        toggleMenu={toggleMenu2}
                                    />
                                )}
                            </div>
                            {modal2 && (
                                <DetailsModal
                                    close={(e: any) => {
                                        // e.stopPropagation();
                                        setModal2(false);
                                    }}
                                    customerDetails={transaction}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {loading && <Loader />}
        </AdminLayout>
    );
};

export default AdminScreen;
