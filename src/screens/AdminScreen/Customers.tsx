import { useCallback, useEffect, useMemo, useState } from "react";
import chevronRight from "../../assets/images/chevron-right.svg";
import closeIcon from "../../assets/images/close-icon.svg";
import Button from "../../components/ButtonComponent";
import Modal from "../../components/ModalComponent";
import DashboardLayout from "../../layouts/DashboardLayout";
import searchIcon from "../../assets/images/search-icon.svg";
import filter from "../../assets/images/Filter.svg";
import { devInstance } from "../../store/devInstance";
import { useAppSelector } from "../../store/hooks";
import { toast } from "react-toastify";
import Loader from "../../components/LoaderComponent";
import AdminLayout from "../../layouts/AdminLayout";
import Table2 from "../../components/CustomersTable.tsx";
import Modal2 from "../../components/Modal";
import Table from "../../components/TableComponent";

const Customers = () => {
    const data = useMemo(
        () => [
            {
                col1: "Hello",
                col2: "World",
            },
            {
                col1: "react-table",
                col2: "rocks",
            },
            {
                col1: "whatever",
                col2: "you want",
            },
        ],
        []
    );

    const columns = useMemo(
        () => [
            {
                Header: "Column 1",
                accessor: "col1", // accessor is the "key" in the data
            },
            {
                Header: "Column 2",
                accessor: "col2",
            },
        ],
        []
    );
    const [modal, setModal] = useState(false);
    const [modalText, setModalText] = useState("");
    const [modalType, setModalType] = useState("");
    const [dropDown, setDropDown] = useState(false);
    const [customers, setCustomers] = useState([]);
    const [previousPage, setPreviousPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentpage] = useState(1);
    const [searchField, setSearchField] = useState("");
    const [menu, setMenu] = useState(false);
    const [loading, setLoading] = useState(false);
    const { admin }: any = useAppSelector((state) => state.auth);
    const [modal2, setModal2] = useState(false);
    const [customer, setCustomer] = useState<any>({});
    const [cid, setCid] = useState<null | number>(null);
    const [transaction, setTransaction] = useState({});
    const [modal3, setModal3] = useState(false);
    const [menu2, setMenu2] = useState(false);

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
                setCurrentpage(res?.data?.data.currentPage);
                setTotalPages(res?.data?.data?.totalNumberOfPages);
                setPreviousPage(res?.data?.data?.previousPage);
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

    const filteredSearch = customers?.filter((customer: any) => {
        return (
            customer?.customerId
                ?.toString()
                ?.toLowerCase()
                .includes(searchField?.toLowerCase()) ||
            customer?.firstName
                ?.toLowerCase()
                .includes(searchField?.toLowerCase()) ||
            customer?.lastName
                ?.toLowerCase()
                .includes(searchField?.toLowerCase()) ||
            (
                customer?.firstName.toLowerCase() +
                " " +
                customer?.lastName.toLowerCase()
            ).includes(searchField?.toLowerCase()) ||
            customer?.email?.toLowerCase().includes(searchField?.toLowerCase())
        );
    });
    const onSearchChange = (e: any) => {
        e.preventDefault();
        setSearchField(e.target.value);
    };

    function prevPage() {
        if (currentPage > 1) {
            let current = currentPage - 1;
            fetchCustomers(current);
        }
    }

    function nextPage() {
        if (currentPage < totalPages) {
            let current = currentPage + 1;
            fetchCustomers(current);
        }
    }

    function activateCustomer(id: number) {
        setLoading(true);
        devInstance
            .post("/Admin/EnableCustomer", {
                adminId: admin.userId,
                customerId: id,
            })
            .then(() => {
                toast.success("Customer has been Enabled Successfully");
                fetchCustomers(currentPage);
                setMenu(false);
            })
            .catch((err) => toast.error(`${err.message}`))
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
                fetchCustomers(currentPage);
                setMenu(false);
            })
            .catch((err) => toast.error(`${err.message}`))
            .finally(() => setLoading(false));
    }

    useEffect(() => {
        fetchCustomers(1);
    }, [fetchCustomers]);

    function toggleMenu(val: boolean) {
        setMenu(val);
    }
    function toggleMenu2(val: boolean) {
        setMenu2(val);
    }
    function getCustomerDetails(id: number) {
        setLoading(true);
        devInstance
            .get(`/Admin/GetCustomerInfoAndTransactions/${id}`)
            .then((res: any) => {
                setCustomer(res?.data);
                console.log(res, "transaction");
                setModal2(true);
                setCid(id);
            })
            .catch((err: any) => toast(`${err.response.data || err.message}`))
            .finally(() => setLoading(false));
    }

    function getDetail(rid: number) {
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
                setModal3(true);
            })
            .catch((err: any) => toast(`${err.response.data || err.message}`))
            .finally(() => setLoading(false));
        console.log(rid, "rid");
        console.log(cid, "cid");
    }

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
                fetchCustomers(currentPage);
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
                fetchCustomers(currentPage);
                setMenu(false);
            })
            .catch((err) => {
                toast.error(`${err.message}`);
            })
            .finally(() => setLoading(false));
    }

    const DetailsModal = ({
        title,
        customerDetails,
        hasTransactions,
        transactions,
        reqId,
        cancel,
    }: any) => {
        return (
            <Modal2 isCancel cancel={cancel}>
                <div className="max-w-3xl container pb-20 pt-10 flex flex-col gap-y-3">
                    {title && (
                        <p className="mb-10 text-center text-lg font-semibold">
                            {title}
                        </p>
                    )}
                    {customerDetails?.firstName &&
                        (customerDetails.lastName ||
                            customerDetails.surname) && (
                            <p className="grid grid-cols-2">
                                <b className="mr-10">Full Name:</b>
                                {customerDetails?.firstName}{" "}
                                {customerDetails?.lastName ||
                                    customerDetails?.surname}
                            </p>
                        )}
                    {customerDetails?.age && (
                        <p className="grid grid-cols-2">
                            <b className="mr-10">Age:</b>
                            {customerDetails?.age}
                        </p>
                    )}
                    {customerDetails?.emailAddress && (
                        <p className="grid grid-cols-2">
                            <b className="mr-10">Email Address:</b>
                            {customerDetails?.emailAddress}
                        </p>
                    )}
                    {customerDetails?.birthDate && (
                        <p className="grid grid-cols-2">
                            <b className="mr-10">Birth Date:</b>
                            {customerDetails?.birthDate
                                .slice(0, 10)
                                .split("-")
                                .reverse()
                                .join("-")}
                        </p>
                    )}
                    {(customerDetails?.phoneNumber ||
                        customerDetails?.phone) && (
                        <p className="grid grid-cols-2">
                            <b className="mr-10">Phone Number:</b>
                            {customerDetails?.phoneNumber ||
                                customerDetails?.phone}
                        </p>
                    )}
                    {(customerDetails?.country ||
                        customerDetails?.nationality) && (
                        <p className="grid grid-cols-2">
                            <b className="mr-10">Country:</b>
                            {customerDetails?.country ||
                                customerDetails?.nationality}
                        </p>
                    )}
                    {customerDetails?.state && (
                        <p className="grid grid-cols-2">
                            <b className="mr-10">State:</b>
                            {customerDetails?.state}
                        </p>
                    )}
                    {customerDetails?.residentialAddress && (
                        <p className="grid grid-cols-2">
                            <b className="mr-10">Residential Address:</b>
                            {customerDetails?.residentialAddress}
                        </p>
                    )}
                    {customerDetails?.postalCode && (
                        <p className="grid grid-cols-2">
                            <b className="mr-10">Postal Code:</b>
                            {customerDetails?.postalCode}
                        </p>
                    )}
                    {customerDetails?.placeOfBirth && (
                        <p className="grid grid-cols-2">
                            <b className="mr-10">Place Of Birth:</b>
                            {customerDetails?.placeOfBirth}
                        </p>
                    )}

                    {customerDetails?.occupation && (
                        <p className="grid grid-cols-2">
                            <b className="mr-10">Occupation:</b>
                            {customerDetails?.occupation}
                        </p>
                    )}
                    {customerDetails?.idType && (
                        <p className="grid grid-cols-2">
                            <b className="mr-10">ID Type:</b>
                            {customerDetails?.idType}
                        </p>
                    )}
                    {customerDetails?.idNumber && (
                        <p className="grid grid-cols-2">
                            <b className="mr-10">Id Number:</b>
                            {customerDetails?.idNumber}
                        </p>
                    )}
                    {(customerDetails?.bankName || customerDetails?.bank) && (
                        <p className="grid grid-cols-2">
                            <b className="mr-10">Bank:</b>
                            {customerDetails?.bankName || customerDetails?.bank}
                        </p>
                    )}
                    {customerDetails?.accountName && (
                        <p className="grid grid-cols-2">
                            <b className="mr-10">Account Name:</b>
                            {customerDetails?.accountName}
                        </p>
                    )}
                    {customerDetails?.accountNumber && (
                        <p className="grid grid-cols-2">
                            <b className="mr-10">Account Number:</b>
                            {customerDetails?.accountNumber}
                        </p>
                    )}
                    {customerDetails?.bvn && (
                        <p className="grid grid-cols-2">
                            <b className="mr-10">BVN:</b>
                            {customerDetails?.bvn}
                        </p>
                    )}
                    {customerDetails?.nextOfKinName && (
                        <p className="grid grid-cols-2">
                            <b className="mr-10">Next Of KinName:</b>
                            {customerDetails?.nextOfKinName}
                        </p>
                    )}
                    {(customerDetails?.addressNOK ||
                        customerDetails?.residentialAddressNOK) && (
                        <p className="grid grid-cols-2">
                            <b className="mr-10">Next Of Kin Address:</b>
                            {customerDetails?.addressNOK ||
                                customerDetails?.residentialAddressNOK}
                        </p>
                    )}
                    {customerDetails?.relationshipWithNOK && (
                        <p className="grid grid-cols-2">
                            <b className="mr-10">
                                Relationship with Next Of Kin:
                            </b>
                            {customerDetails?.relationshipWithNOK}
                        </p>
                    )}

                    {customerDetails?.formOfIdentity && (
                        <p className="grid grid-cols-2">
                            <b className="mr-10">Form Of Identity:</b>
                            {customerDetails?.formOfIdentity}
                        </p>
                    )}
                    {customerDetails?.passportPhoto && (
                        <p className="grid grid-cols-2">
                            <b className="mr-10">Passport Photo:</b>
                            {customerDetails?.passportPhoto}
                        </p>
                    )}
                    {customerDetails?.utilityBill && (
                        <p className="grid grid-cols-2">
                            <b className="mr-10">Utility Bill:</b>
                            {customerDetails?.utilityBill}
                        </p>
                    )}
                    {customerDetails?.unitHolderSignature && (
                        <p className="grid grid-cols-2">
                            <b className="mr-10">Unit Holder Signature:</b>
                            {customerDetails?.unitHolderSignature}
                        </p>
                    )}
                    {hasTransactions && (
                        <div className="mt-10">
                            <p className="mb-10 text-center text-base font-semibold">
                                Transactions
                            </p>
                            <div className="h-[300px] overflow-y-auto">
                                <Table
                                    transactions={transactions}
                                    prevPage={prevPage}
                                    nextPage={nextPage}
                                    totalPages={totalPages}
                                    currentPage={currentPage}
                                    isAdmin
                                    type="B"
                                    approveReq={approveReq}
                                    declineReq={declineReq}
                                    menu={menu2}
                                    toggleMenu={toggleMenu2}
                                    reqId={reqId}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </Modal2>
        );
    };

    return (
        <AdminLayout>
            <div className="pt-[56px] text-primary pr-10">
                <div className="flex justify-between max-w-[1119px] items-center mb-[32px]">
                    <h3 className="text-xl font-semibold">Customers</h3>
                    <div className="flex items-center space-x-10">
                        <div className="relative flex items-center">
                            <input
                                type="search"
                                className="w-[309px] h-[56px] px-4 bg-white-lighter border-none rounded-lg focus:ring-primary"
                                placeholder="Search"
                                onChange={onSearchChange}
                            />
                            <img
                                alt="search"
                                src={searchIcon}
                                className="absolute right-4"
                            />
                        </div>

                        {/* <div
                            className="w-[100px] h-14 flex justify-center items-center bg-white-lighter rounded-lg cursor-pointer"
                            onClick={() => setModal(true)}
                        >
                            <img alt="" src={filter} />
                        </div> */}
                    </div>
                </div>
                <div className="min-h-[500px] flex flex-col">
                    <Table2
                        customers={filteredSearch}
                        prevPage={prevPage}
                        nextPage={nextPage}
                        totalPages={totalPages}
                        currentPage={currentPage}
                        menu={menu}
                        activateCustomer={activateCustomer}
                        deactivateCustomer={deactivateCustomer}
                        toggleMenu={toggleMenu}
                        cid={getCustomerDetails}
                    />
                </div>
                {modal2 && (
                    <DetailsModal
                        cancel={() => setModal2(false)}
                        title="Customer Details"
                        customerDetails={customer.customerDetails}
                        hasTransactions
                        reqId={getDetail}
                        transactions={customer.data.pageItems}
                    />
                )}
                {modal3 && (
                    <DetailsModal
                        cancel={() => setModal3(false)}
                        // title="Customer Details"
                        customerDetails={transaction}
                        // hasTransactions
                        // reqId={getDetail}
                    />
                )}
                {modal && (
                    <Modal modalText={modalText} type={modalType}>
                        {!modalType && (
                            <div className="w-full h-full pt-[25px] px-10">
                                <div className="flex justify-between mb-10">
                                    <h3 className="text-xl font-semibold">
                                        Filter Transactions
                                    </h3>
                                    <img
                                        alt=""
                                        src={closeIcon}
                                        className="cursor-pointer"
                                        onClick={() => setModal(false)}
                                    />
                                </div>

                                <div className="flex justify-between mb-10 items-center">
                                    <p className="text-base font-semibold">
                                        Date
                                    </p>

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
                                            onClick={() =>
                                                setDropDown(!dropDown)
                                            }
                                        >
                                            <span>All</span>
                                            <img
                                                alt=""
                                                src={chevronRight}
                                                className="w-[18px] h-[18px]"
                                            />
                                        </div>

                                        {dropDown && (
                                            <div className="w-full absolute flex flex-col bg-white-lighter border border-primary/5 border-t-0 mt-[58px] rounded-b-[20px] divide-y shadow-sm divide-primary/20 px-2">
                                                {["Credit", "Debit"].map(
                                                    (item) => (
                                                        <div className="h-56px py-4 px-2 cursor-pointer">
                                                            {item}
                                                        </div>
                                                    )
                                                )}
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
            </div>
            {loading && <Loader />}
        </AdminLayout>
    );
};

export default Customers;
