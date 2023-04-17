import React, { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import Modal from "../../components/ModalComponent";
import { Input, Select } from "../../components/FormElements";
import closeModal from "../../assets/images/close-modal.svg";
import { devInstance } from "../../store/devInstance";
import Loader from "../../components/LoaderComponent";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const NewsModal = ({ children, close }: any) => (
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

const ActionModal = ({ children, close }: any) => (
    <div className="fixed w-screen h-screen top-0 left-0 flex items-center justify-center bg-primary/20">
        <div className="w-[300px] flex flex-col min-h-[200px] bg-white-light shadow-sm rounded-[20px] p-10 relative">
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

const DailyNews = ({
    dailyNewsForm,
    dailyNewsChange,
    setDailyNewsModal,
    newNews,
    saveDailyNews,
    updateDailyNews,
    id,
    deleteDailyNews,
}: any) => {
    return (
        <NewsModal close={() => setDailyNewsModal(false)}>
            <h3 className="mb-3 text-lg font-semibold">
                {newNews ? "Add News" : "Update News"}
            </h3>
            <div className="grow flex flex-col justify-between">
                <div className="flex flex-col gap-y-3">
                    <textarea
                        key="dailyNews"
                        className="h-[110px] w-full text-base mt-2 placeholder-primary/40 px-4 bg-white-lighter focus:ring-primary active:ring-primary shadow-sm border border-primary/5 rounded-lg"
                        value={dailyNewsForm}
                        name="dailyNews"
                        placeholder="News Content"
                        onChange={dailyNewsChange}
                    ></textarea>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex gap-x-3 items-center">
                        <button
                            className="border border-primary bg-white-lighter text-primary hover:bg-white-lighter/50 px-3 py-1.5 rounded-lg"
                            onClick={() => {
                                newNews === true
                                    ? saveDailyNews()
                                    : updateDailyNews(id);
                            }}
                        >
                            Save
                        </button>

                        <button
                            className="bg-error border border-error text-white-lighter hover:bg-error/80 px-3 py-1.5 rounded-lg"
                            onClick={() => deleteDailyNews(id)}
                        >
                            Delete
                        </button>
                    </div>
                    <button
                        className="border border-primary bg-primary text-white-lighter hover:bg-primary-lighter px-3 py-1.5 rounded-lg"
                        onClick={() => setDailyNewsModal(false)}
                    >
                        Close
                    </button>
                </div>
            </div>
        </NewsModal>
    );
};

const NewsUpdate = ({
    newNews,
    newsUpdateForm,
    setNewsUpdateModal,
    id,
    newsUpdateChange,
    saveNewsUpdate,
    updateNewsUpdate,
    deleteNewsUpdate,
}: any) => {
    return (
        <NewsModal close={() => setNewsUpdateModal(false)}>
            <h3 className="mb-3 text-lg font-semibold">
                {newNews ? "Add News" : "Update News"}
            </h3>
            <div className="grow flex flex-col gap-y-10 justify-between">
                <div className="flex flex-col gap-y-3">
                    <Input
                        placeholder="url"
                        name="url"
                        value={newsUpdateForm?.url}
                        onChange={newsUpdateChange}
                    />
                    <textarea
                        className="h-[110px] w-full text-base mt-2 placeholder-primary/40 px-4 bg-white-lighter focus:ring-primary active:ring-primary shadow-sm border border-primary/5 rounded-lg"
                        value={newsUpdateForm?.description}
                        name="description"
                        placeholder="News Content"
                        onChange={newsUpdateChange}
                    ></textarea>
                    <Select
                        options={["Yes", "No"]}
                        value={newsUpdateForm?.importantNews || null}
                        name="importantNews"
                        title="Is it Important?"
                        onChange={newsUpdateChange}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex gap-x-3 items-center">
                        <button
                            className="border border-primary bg-white-lighter text-primary hover:bg-white-lighter/50 px-3 py-1.5 rounded-lg"
                            onClick={() => {
                                newNews === true
                                    ? saveNewsUpdate()
                                    : updateNewsUpdate(id);
                            }}
                        >
                            Save
                        </button>

                        <button
                            className="bg-error border border-error text-white-lighter hover:bg-error/80 px-3 py-1.5 rounded-lg"
                            onClick={() => deleteNewsUpdate(id)}
                        >
                            Delete
                        </button>
                    </div>
                    <button
                        className="border border-primary bg-primary text-white-lighter hover:bg-primary-lighter px-3 py-1.5 rounded-lg"
                        onClick={() => setNewsUpdateModal(false)}
                    >
                        Close
                    </button>
                </div>
            </div>
        </NewsModal>
    );
};

type n = {
    description: string;
    url: string;
    importantNews: null | boolean | string;
};

const News = () => {
    const [newNews, setNewNews] = useState(true);
    const [newsUpdateModal, setNewsUpdateModal] = useState(false);
    const [dailyNewsModal, setDailyNewsModal] = useState(false);
    const [dailyNews, setDailyNews] = useState([]);
    const [newsUpdate, setNewsUpdate] = useState([]);
    const [loading, setLoading] = useState(false);
    const [dailyNewsForm, setDailyNewsForm] = useState("");
    const [dailyNewsId, setDailyNewsId] = useState<any>(null);
    const [newsUpdateId, setNewsUpdateId] = useState<any>(null);

    const [newsUpdateForm, setNewsUpdateForm] = useState<n>({
        url: "",
        description: "",
        importantNews: null,
    });
    const [actionModal, setActionModal] = useState(false);

    useEffect(() => {
        setLoading(true);
        devInstance
            .get(
                "https://apps.dlm.group/ASSETMGTAPI/api/v1/admin/GetNewsUpdates"
            )
            .then((response) => setNewsUpdate(response.data))
            .catch((err) => console.log(err))
            .finally(() => {
                setLoading(false);
            });
    }, []);
    useEffect(() => {
        setLoading(true);
        devInstance
            .get("https://apps.dlm.group/ASSETMGTAPI/api/v1/admin/GetDailyNews")
            .then((response) => {
                setDailyNews(response.data);
            })
            .catch((err) => console.log(err))
            .finally(() => {
                setLoading(false);
            });
    }, []);

    function fetchDailyNews() {
        devInstance
            .get("https://apps.dlm.group/ASSETMGTAPI/api/v1/admin/GetDailyNews")
            .then((response) => {
                setDailyNews(response.data.reverse());
            })
            .catch((err) => console.log(err))
            .finally(() => {
                setLoading(false);
            });
    }

    function fetchNewsUpdate() {
        devInstance
            .get(
                "https://apps.dlm.group/ASSETMGTAPI/api/v1/admin/GetNewsUpdates"
            )
            .then((response) => {
                setNewsUpdate(response.data.reverse());
            })
            .catch((err) => console.log(err))
            .finally(() => {
                setLoading(false);
            });
    }

    function dailyForm(val: boolean) {
        setDailyNewsModal(val);
    }

    function updateForm(val: boolean) {
        setNewsUpdateModal(val);
    }

    const dailyNewsChange = (e: any) => {
        setDailyNewsForm(e.target.value);
        console.log(e.target.value);
    };

    function deleteDailyNews(id: any) {
        console.log("hello");
        setLoading(true);
        devInstance
            .delete(
                `https://apps.dlm.group/ASSETMGTAPI/api/v1/Admin/DeleteDailyNews/${id}`
            )
            .then((response: any) => {
                console.log(response);
                toast.success("Daily News Deleted Sucessfully!");
                fetchDailyNews();
                setDailyNewsModal(false);
            })
            .catch((err: any) => {
                console.log(err);
                toast.error(`${err.message}`);
            })
            .finally(() => setLoading(false));
    }

    function addNewsUpdate() {
        setLoading(true);
        let importantNewsVal: any =
            newsUpdateForm.importantNews === "true" ? true : false;
        devInstance
            .post(
                "https://apps.dlm.group/ASSETMGTAPI/api/v1/Admin/AddNewsUpdates",
                {
                    url: newsUpdateForm.url,
                    description: newsUpdateForm.description,
                    importantNews: importantNewsVal,
                }
            )
            .then((response: any) => {
                console.log(response);
                if (response.status === 200) {
                    toast.success("Daily News Added Sucessfully!");
                    fetchNewsUpdate();
                }
                setNewsUpdateModal(false);
            })
            .catch((err: any) => {
                console.log(err);
                toast.error(`${err.message}`);
            })
            .finally(() => setLoading(false));
    }

    function updateNewsUpdate(id: any) {
        setLoading(true);
        let importantNewsVal: any =
            newsUpdateForm.importantNews === "true" ? true : false;
        devInstance
            .patch(
                `https://apps.dlm.group/ASSETMGTAPI/api/v1/Admin/UpdateNewsUpdates/${id}`,
                {
                    url: newsUpdateForm.url,
                    description: newsUpdateForm.description,
                    importantNews: importantNewsVal,
                }
            )
            .then((response: any) => {
                console.log(response);
                toast.success("News Update Updated Sucessfully!");
                fetchNewsUpdate();
                setNewsUpdateModal(false);
            })
            .catch((err: any) => {
                console.log(err);
                toast.error(`${err.message}`);
            })
            .finally(() => setLoading(false));
    }

    function deleteNewsUpdate(id: any) {
        console.log("hello");
        setLoading(true);
        devInstance
            .delete(
                `https://apps.dlm.group/ASSETMGTAPI/api/v1/Admin/DeleteNewsUpdates/${id}`
            )
            .then((response: any) => {
                console.log(response);

                toast.success("News Update Deleted Sucessfully!");
                fetchNewsUpdate();

                setNewsUpdateModal(false);
                setActionModal(false);
            })
            .catch((err: any) => {
                console.log(err);
                toast.error(`${err.message}`);
            })
            .finally(() => setLoading(false));
    }

    function newsUpdateChange(e: any) {
        setNewsUpdateForm({
            ...newsUpdateForm,
            [e.target.name]: e.target.value,
        });
        console.log(newsUpdateForm);
    }

    function updateDailyNews(id: any) {
        setLoading(true);
        devInstance
            .patch(
                `https://apps.dlm.group/ASSETMGTAPI/api/v1/Admin/UpdateDailyNews/${id}`,
                { dailyNews: dailyNewsForm }
            )
            .then((response: any) => {
                console.log(response);
                if (response.status === 200) {
                    toast.success("Daily News Updated Sucessfully!");
                    fetchDailyNews();
                }
                setDailyNewsModal(false);
            })
            .catch((err: any) => {
                console.log(err);
                toast.error(`${err.message}`);
            })
            .finally(() => setLoading(false));
    }
    function addDailyNews() {
        setLoading(true);
        devInstance
            .post(
                `https://apps.dlm.group/ASSETMGTAPI/api/v1/Admin/AddDailyNews`,
                { dailyNews: dailyNewsForm }
            )
            .then((response: any) => {
                console.log(response);
                if (response.status === 200) {
                    toast.success("Daily News Added Sucessfully!");
                    fetchDailyNews();
                }
                setDailyNewsModal(false);
            })
            .catch((err: any) => {
                console.log(err);
                toast.error(`${err.message}`);
            })
            .finally(() => setLoading(false));
    }

    return (
        <AdminLayout>
            <div className="pt-[50px] text-primary max-w-[1100px] text-base pb-20">
                <h3 className="text-xl font-semibold mb-16">News</h3>
                <div className="grid grid-cols-2 gap-10">
                    <div>
                        <h3 className="text-lg font-semibold mb-5">
                            News Update
                        </h3>
                        <button
                            className="text-xs mb-10 bg-primary border border-primary text-white-lighter hover:bg-primary/80 px-3 py-1.5 rounded-lg"
                            onClick={() => {
                                setNewNews(true);
                                setNewsUpdateForm({
                                    url: "",
                                    description: "",
                                    importantNews: null,
                                });
                                setNewsUpdateModal(true);
                            }}
                        >
                            Add +
                        </button>
                        <div className="flex flex-col gap-y-5">
                            {newsUpdate.length > 0 ? (
                                newsUpdate.map((item: any) => (
                                    <div
                                        key={item?.id}
                                        className="border border-primary/30 bg-white shadow shadow-primary/10 p-3 rounded-lg"
                                    >
                                        <a
                                            className="text-sm text-primary/70 underline"
                                            href={item.url}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            {item?.url}
                                        </a>
                                        <p className="text-sm mb-1">
                                            {item?.description}
                                        </p>
                                        <p className="flex items-center space-x-1 text-xs font-semibold">
                                            <div
                                                className={`h-2 w-2 rounded-full ${
                                                    item.importantNews
                                                        ? "bg-error"
                                                        : "bg-primary"
                                                }`}
                                            ></div>
                                            {item?.importantNews === true ? (
                                                <span className="text-error">
                                                    High Priority
                                                </span>
                                            ) : (
                                                <span className="text-primary">
                                                    Normal Priority
                                                </span>
                                            )}
                                        </p>
                                        <div className="flex gap-x-3 items-center mt-5">
                                            <button
                                                className="border text-xs border-primary bg-white-lighter text-primary hover:bg-white-lighter/50 px-3 py-1.5 rounded-lg"
                                                onClick={() => {
                                                    setNewNews(false);
                                                    setNewsUpdateForm(item);
                                                    setNewsUpdateModal(true);
                                                    setNewsUpdateId(item?.id);
                                                }}
                                            >
                                                Edit
                                            </button>

                                            <button
                                                className="bg-error text-xs border border-error text-white-lighter hover:bg-error/80 px-3 py-1.5 rounded-lg"
                                                onClick={() => {
                                                    deleteNewsUpdate(item?.id);
                                                }}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <h4 className="text-sm text-error">
                                    No News Found
                                </h4>
                            )}
                            {newsUpdateModal && (
                                <NewsUpdate
                                    id={newsUpdateId}
                                    newsUpdateForm={newsUpdateForm}
                                    setNewsUpdateModal={updateForm}
                                    newNews={newNews}
                                    newsUpdateChange={newsUpdateChange}
                                    updateNewsUpdate={updateNewsUpdate}
                                    saveNewsUpdate={addNewsUpdate}
                                    deleteNewsUpdate={deleteNewsUpdate}
                                />
                            )}
                            {actionModal && (
                                <ActionModal
                                    close={() => setActionModal(false)}
                                >
                                    <div className="grow flex flex-col justify-between">
                                        <h3>Are You Sure?</h3>
                                        <div className="flex gap-x-3 items-center justify-end">
                                            <button
                                                className="border border-primary bg-white-lighter text-primary hover:bg-white-lighter/50 px-3 py-1.5 rounded-lg"
                                                onClick={() =>
                                                    setActionModal(false)
                                                }
                                            >
                                                No
                                            </button>

                                            {/* <button
                                        className="bg-primary border border-primary text-white-lighter hover:bg-primary/80 px-3 py-1.5 rounded-lg"
                                        onMouseEnter={() => setActionModal(false)}
                                    >
                                        Yes
                                    </button> */}
                                            <a onClick={() => alert("hepl")}>
                                                fedfref
                                            </a>
                                        </div>
                                    </div>
                                </ActionModal>
                            )}
                        </div>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-5">
                            Daily News
                        </h3>
                        <button
                            className="text-xs mb-10 bg-primary border border-primary text-white-lighter hover:bg-primary/80 px-3 py-1.5 rounded-lg"
                            onClick={() => {
                                setNewNews(true);
                                setDailyNewsForm("");
                                setDailyNewsModal(true);
                            }}
                        >
                            Add +
                        </button>
                        <div className="flex flex-col gap-y-5">
                            {dailyNews.length > 0 ? (
                                dailyNews.map((item: any, index) => (
                                    <div
                                        key={index}
                                        className="border border-primary/30 bg-white-lighter p-3 rounded-lg shadow shadow-primary/10"
                                    >
                                        <p className="text-sm mb-1">
                                            {item?.dailyNews}
                                        </p>
                                        <div className="flex gap-x-3 items-center mt-5">
                                            <button
                                                className="border text-xs border-primary bg-white-lighter text-primary hover:bg-white-lighter/50 px-3 py-1.5 rounded-lg"
                                                onClick={() => {
                                                    setNewNews(false);
                                                    setDailyNewsForm(
                                                        item?.dailyNews
                                                    );
                                                    setDailyNewsId(item?.id);
                                                    setDailyNewsModal(true);
                                                }}
                                            >
                                                Edit
                                            </button>

                                            <button
                                                className="bg-error text-xs border border-error text-white-lighter hover:bg-error/80 px-3 py-1.5 rounded-lg"
                                                onClick={() =>
                                                    deleteDailyNews(item?.id)
                                                }
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <h4 className="text-sm text-error">
                                    No News Found
                                </h4>
                            )}
                        </div>
                        {dailyNewsModal && (
                            <DailyNews
                                id={dailyNewsId}
                                dailyNewsForm={dailyNewsForm}
                                setDailyNewsModal={dailyForm}
                                newNews={newNews}
                                dailyNewsChange={dailyNewsChange}
                                updateDailyNews={updateDailyNews}
                                saveDailyNews={addDailyNews}
                                deleteDailyNews={deleteDailyNews}
                            />
                        )}
                        {actionModal && (
                            <ActionModal close={() => setActionModal(false)}>
                                <div className="grow flex flex-col justify-between">
                                    <h3>Are You Sure?</h3>
                                    <div className="flex gap-x-3 items-center justify-end">
                                        <button
                                            className="border border-primary bg-white-lighter text-primary hover:bg-white-lighter/50 px-3 py-1.5 rounded-lg"
                                            onClick={() =>
                                                setActionModal(false)
                                            }
                                        >
                                            No
                                        </button>

                                        <button className="bg-primary border border-primary text-white-lighter hover:bg-primary/80 px-3 py-1.5 rounded-lg">
                                            Yes
                                        </button>
                                    </div>
                                </div>
                            </ActionModal>
                        )}
                    </div>
                </div>
            </div>
            {loading && <Loader />}
        </AdminLayout>
    );
};

// dailyNewsForm,
//     dailyNewsChange,
//     setDailyNewsModal,
//     newNews,

export default News;
