import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductImage from "../../assets/images/product-image.png";
import r1 from "../../assets/images/r1.svg";
// import n1 from "../../assets/images/n1.svg";
// import n2 from "../../assets/images/n2.svg";
// import n3 from "../../assets/images/n3.svg";
import r5 from "../../assets/images/r5.svg";
import r6 from "../../assets/images/r6.svg";
import r7 from "../../assets/images/r7.svg";
import r8 from "../../assets/images/r8.svg";
import Loader from "../../components/LoaderComponent";
import AdminLayout from "../../layouts/AdminLayout";
import Button from "../../components/ButtonComponent";
import { devInstance } from "../../store/devInstance";
import { toast } from "react-toastify";
import { useAppSelector } from "../../store/hooks";
import closeModal from "../../assets/images/close-modal.svg";

interface cardProps {
    image?: string;
    title?: string;
    isValid?: boolean;
    disabled?: boolean;
    enable?: any;
    disable?: any;
    onClick?: () => void;
}

const ProductCard = (props: cardProps) => {
    const [hover, setHover] = useState(false);
    const { image, title, isValid, enable, disable } = props;
    return (
        <div
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            className="w-full overflow-hidden shadow-sm text-base text-primary relative"
            {...props}
        >
            {hover && (
                <div className="absolute top-0 left-0 flex items-center justify-center h-full w-full bg-primary/20 rounded-[20px]">
                    <div className="z-10">
                        {isValid === false ? (
                            <button
                                className="bg-success border-success text-white-lighter hover:bg-success/80 px-4 py-2 rounded-lg"
                                onClick={enable}
                            >
                                Enable
                            </button>
                        ) : (
                            <button
                                className="bg-error border-error text-white-lighter hover:bg-error/80 px-4 py-2 rounded-lg"
                                onClick={disable}
                            >
                                Disable
                            </button>
                        )}
                    </div>
                </div>
            )}
            <div
                className={`w-full h-[248px] rounded-t-[20px] ${
                    isValid === false && "blur-sm"
                }`}
            >
                <img
                    className="object-top object-cover w-full h-full rounded-t-[20px]"
                    alt=""
                    src={image || ProductImage}
                />
            </div>
            <div className="p-3 bg-white-light rounded-b-[20px] text-center h-[80px] xl:h-[100px] flex justify-center items-center">
                <p className="text-[18px] 2xl:text-lg">{title}</p>
            </div>
        </div>
    );
};

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

const ProductsAdmin = () => {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [actionModal, setActionModal] = useState(false);
    const [productId, setProductId] = useState("");
    const { admin }: any = useAppSelector((state) => state.auth);

    useEffect(() => {
        setLoading(true);
        devInstance
            .get(
                "https://apps.dlm.group/ASSETMGTAPI/api/v1/admin/GetProductIds"
            )
            .then((response) => {
                setProducts(response.data.data);
                console.log(response.data.data);
            })
            .catch((err) => console.log(err))
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const fetchProducts = () => {
        setLoading(true);
        devInstance
            .get(
                "https://apps.dlm.group/ASSETMGTAPI/api/v1/admin/GetProductIds"
            )
            .then((response) => {
                setProducts(response.data.data);
                console.log(response.data.data);
            })
            .catch((err) => console.log(err))
            .finally(() => {
                setLoading(false);
            });
    };

    function disableProduct() {
        setLoading(true);
        devInstance
            .post(
                "https://apps.dlm.group/ASSETMGTAPI/api/v1/Admin/DisableProduct",
                {
                    productId: productId,
                    userId: admin.userId,
                }
            )
            .then((res) => {
                console.log(res);
                toast.success("Product has been Disabled");
                setActionModal(false);
                fetchProducts();
            })
            .catch((err) => toast.error(`${err.message}`))
            .finally(() => setLoading(false));
    }
    function enableProduct(id: any) {
        setLoading(true);
        devInstance
            .post(
                "https://apps.dlm.group/ASSETMGTAPI/api/v1/Admin/EnableProduct",
                {
                    productId: id,
                    userId: admin.userId,
                }
            )
            .then((res) => {
                console.log(res);
                toast.success("Product has been Enabled");
                fetchProducts();
            })
            .catch((err) => toast.error(`${err.message}`))
            .finally(() => setLoading(false));
    }

    return (
        <AdminLayout>
            <div className="pt-[50px] text-primary max-w-[1100px] text-base pb-20">
                <h3 className="text-xl font-semibold mb-[15px]">
                    Products Library
                </h3>

                <div className="flex flex-col gap-y-6 mb-20">
                    <div className="flex justify-between gap-x-3 xl:gap-x-5">
                        {products.slice(0, 3).map((i: any, index) => {
                            return (
                                <ProductCard
                                    title={i.productName}
                                    key={index}
                                    image={i.thumb}
                                    isValid={
                                        i.isDisabled === false ? true : false
                                    }
                                    enable={() => enableProduct(i.productId)}
                                    disable={() => {
                                        setProductId(i.productId);
                                        setActionModal(true);
                                    }}
                                />
                            );
                        })}
                    </div>
                    <div className="flex justify-between gap-x-3 xl:gap-x-5">
                        {products.slice(3).map((i: any, index) => {
                            return (
                                <ProductCard
                                    title={i.productName}
                                    key={index}
                                    image={i.thumb}
                                    isValid={
                                        i.isDisabled === false ? true : false
                                    }
                                    enable={() => enableProduct(i.productId)}
                                    disable={() => {
                                        setProductId(i.productId);
                                        setActionModal(true);
                                    }}
                                />
                            );
                        })}
                    </div>
                    {actionModal && (
                        <ActionModal
                            close={() => {
                                setActionModal(false);
                                setProductId("");
                            }}
                        >
                            <div className="grow flex flex-col justify-between">
                                <h3 className="font-semibold">Are You Sure?</h3>
                                <div className="flex gap-x-3 items-center justify-end">
                                    <button
                                        className="border border-primary bg-white-lighter text-primary hover:bg-white-lighter/50 px-3 py-1.5 rounded-lg"
                                        onClick={() => {
                                            setActionModal(false);
                                            setProductId("");
                                        }}
                                    >
                                        No
                                    </button>

                                    <button
                                        className="bg-error border border-error text-white-lighter hover:bg-error/80 px-3 py-1.5 rounded-lg"
                                        onClick={disableProduct}
                                    >
                                        Yes
                                    </button>
                                </div>
                            </div>
                        </ActionModal>
                    )}
                </div>
                {loading && <Loader />}
            </div>
        </AdminLayout>
    );
};

export default ProductsAdmin;
