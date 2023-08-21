import { useCallback, useEffect, useMemo, useState } from "react";
import chevronRight from "../../assets/images/chevron-right.svg";
import closeIcon from "../../assets/images/close-icon.svg";
import Button from "../../components/ButtonComponent";
import Modal from "../../components/ModalComponent";
import Table from "../../components/TableComponent";
import DashboardLayout from "../../layouts/DashboardLayout";
import searchIcon from "../../assets/images/search-icon.svg";
import filter from "../../assets/images/Filter.svg";
import { devInstance } from "../../store/devInstance";
import { useAppSelector } from "../../store/hooks";
import { toast } from "react-toastify";
import Loader from "../../components/LoaderComponent";
import AdminLayout from "../../layouts/AdminLayout";
import Modal2 from "../../components/Modal";
import DetailsModal from "../../components/DetailsModal";

const TransactionsScreen = () => {
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
    const [transactions, setTransactions] = useState([]);
    const [previousPage, setPreviousPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentpage] = useState(1);
    const [searchField, setSearchField] = useState("");
    const [loading, setLoading] = useState(false);
    const { admin }: any = useAppSelector((state) => state.auth);
    const [menu, setMenu] = useState(false);
    const [modal2, setModal2] = useState(false);
    const [transaction, setTransaction] = useState<any>({});

    function toggleMenu(val: boolean) {
        setMenu(val);
    }

    function getDetail(rid: number, cid: number) {
        // setLoading(true);
        // devInstance
        //     .get("/Admin/GetCustomerProductSubDetails", {
        //         params: {
        //             CustomerId: cid,
        //             RequestId: rid,
        //         },
        //     })
        //     .then((res: any) => {
        //         setTransaction(res.data);
        //         console.log(res, "transaction");
        //         setModal2(true);
        //     })
        //     .catch((err: any) => toast(`${err.response.data || err.message}`))
        //     .finally(() => setLoading(false));
        // console.log(rid, "rid");
        // console.log(cid, "cid");
    }

    const fetchTransactions = useCallback((pageNumber: number) => {
        setLoading(true);
        devInstance
            .get("http://localhost:80/api/v1/investments")
            .then((res: any) => {
                setTransactions(res?.data?.data?.investments);
                // setCurrentpage(res?.data?.data.currentPage);
                // setTotalPages(res?.data?.data?.totalNumberOfPages);
                // setPreviousPage(res?.data?.data?.previousPage);
                console.log(res, "rrrrr");
            })
            .catch((err) => {
                toast.error(`${err?.message}`);
                setLoading(false);
            })
            .finally(() => setLoading(false));
    }, []);

    const filteredSearch = transactions?.filter((transaction: any) => {
        return (
            transaction?.instrumentTypeLabel
                ?.toLowerCase()
                .includes(searchField?.toLowerCase()) ||
            transaction?.customerId
                ?.toLowerCase()
                .includes(searchField?.toLowerCase()) ||
            transaction?.transactionAmount
                .toString()
                ?.toLowerCase()
                .includes(searchField?.toLowerCase()) ||
            transaction?.faceValue
                ?.toString()
                ?.toLowerCase()
                .includes(searchField?.toLowerCase())
        );
    });

    const onSearchChange = (e: any) => {
        e.preventDefault();
        setSearchField(e.target.value);
    };

    function prevPage() {
        if (currentPage > 1) {
            let current = currentPage - 1;
            fetchTransactions(current);
        }
    }

    function nextPage() {
        if (currentPage < totalPages) {
            let current = currentPage + 1;
            fetchTransactions(current);
        }
    }

    useEffect(() => {
        fetchTransactions(1);
    }, [fetchTransactions]);

    function approveReq(id: Number) {
        setLoading(true);
        devInstance
            .post(`http://localhost:80/api/v1/investments/${id}`)
            .then((response: any) => {
                toast.success("Investment was successfully Approved");
                fetchTransactions(currentPage);
                setMenu(false);
            })
            .catch((err) => {
                toast.error(`${err.message}`);
            })
            .finally(() => setLoading(false));
    }

    function declineReq(id: Number) {
        setLoading(true);
        devInstance
            .put(`http://localhost:80/api/v1/investments/${id}`)
            .then((response: any) => {
                toast.success("Investment was successfully Declined");
                fetchTransactions(currentPage);
                setMenu(false);
            })
            .catch((err) => {
                toast.error(`${err.message}`);
            })
            .finally(() => setLoading(false));
    }

    // function declineReq() {}

    return (
        <AdminLayout>
            <div className="pt-[56px] text-primary pr-10">
                <div className="flex justify-between max-w-[1119px] items-center mb-[32px]">
                    <h3 className="text-xl font-semibold">
                        Transaction History
                    </h3>
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
                    <Table
                        transactions={filteredSearch}
                        prevPage={prevPage}
                        nextPage={nextPage}
                        totalPages={totalPages}
                        currentPage={currentPage}
                        isAdmin
                        approveReq={approveReq}
                        declineReq={declineReq}
                        menu={menu}
                        toggleMenu={toggleMenu}
                        reqId={getDetail}
                    />
                </div>
                {modal2 && (
                    <DetailsModal
                        // close={() => setModal2(false)}
                        cancel={() => setModal2(false)}
                        customerDetails={transaction}
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

export default TransactionsScreen;
