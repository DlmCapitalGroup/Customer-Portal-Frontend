import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductImage from "../../assets/images/product-image.png";
import newsImage from "../../assets/images/news-image.png";
import r1 from "../../assets/images/r1.svg";
import n1 from "../../assets/images/n1.svg";
import n2 from "../../assets/images/n2.svg";
import n3 from "../../assets/images/n3.svg";
import r5 from "../../assets/images/r5.svg";
import r6 from "../../assets/images/r6.svg";
import r7 from "../../assets/images/r7.svg";
import r8 from "../../assets/images/r8.svg";
import Loader from "../../components/LoaderComponent";
import Button from "../../components/ButtonComponent";
import Modal from "../../components/ModalComponent";
import { useAppSelector } from "../../store/hooks";
import Select from "../../components/SelectComponent";
import { devInstance } from "../../store/devInstance";

interface cardProps {
    image?: string;
    title?: string;
    isValid?: boolean;
    onClick?: () => void;
}

const ProductCard = (props: cardProps) => {
    const { image, title } = props;
    return (
        <div
            className="w-full shadow-sm cursor-pointer text-base text-primary"
            {...props}
        >
            <div className="w-full h-[248px] rounded-t-[20px]">
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

const NewsCard = (props: cardProps) => {
    const { image, title } = props;
    return (
        <div
            className="h-[72px] shadow-sm cursor-pointer text-base text-primary flex space-x-4"
            {...props}
        >
            <div className="w-[200px] h-[66px]">
                <img
                    alt=""
                    src={image}
                    className="w-full object-cover object-center h-full rounded-[10px]"
                />
            </div>
            <div className="grow">
                <p className="xl:text-base leading-tight">{title}</p>
            </div>
        </div>
    );
};

const Products = () => {
    const [loading, setLoading] = useState(true);
    const [investment, setInvestment] = React.useState("");
    const navigate = useNavigate();
    const { customer }: any = useAppSelector((state) => state.auth);
    const [serviceModal, setServiceModal] = React.useState(false);
    const [apiProducts, setApiProducts] = React.useState([]);
    const [products, setProducts] = useState([]);
    const [grid, setGrid] = useState(false)

    useEffect(() => {
        setLoading(true)
        devInstance
            .get("/Admin/GetProductIds")
            .then((res: any) => {
                setProducts(res.data.data);
                console.log(res, "afesdd");
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            })
            .finally(() => setLoading(false));
    }, []);

    function setOption(value: any) {
        setInvestment(value);
    }

    const showServiceModal = () => {
        setServiceModal(!serviceModal);
        productModal();
    };

    function productModal() {
        localStorage.setItem("productModal", "true");
    }

    function openInvestment() {
        const item = investment.toLowerCase().replace(/\s+/g, "-");
        navigate(`/products/${item}`, {
            state: {
                selectedProduct: investment,
            },
        });
        setServiceModal(false);
        productModal();
    }

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
            let modal = localStorage.getItem("productModal");
            if (modal !== "true") {
                setServiceModal(true);
            }
        }, 3000);
    }, []);

    return (
        <div className="pt-[50px] text-primary max-w-[1100px] text-base pb-20">
            <h3 className="text-lg lg:text-xl font-semibold mb-[15px]">
                Products Library
            </h3>
            <p className="mb-[73px] text-base">
                See and learn more about our products and what they have to
                offer you.
            </p>

            <div className="flex flex-col gap-y-10 lg:gap-y-6 mb-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 xl:gap-5">
                    {products?.slice(0, 3).map((i: any, index) => {
                        if (!i.isDisabled) {
                            const item = i?.productName
                                .toLowerCase()
                                .replace(/\s+/g, "-");

                            return (
                                <ProductCard
                                    title={i?.productName}
                                    key={index}
                                    image={i?.imageUrl}
                                    onClick={() => {
                                        navigate(`/products/${item}`, {
                                            state: {
                                                selectedProduct: i?.productName,
                                            },
                                        });
                                    }}
                                />
                            );
                        }
                    })}
                </div>
                <div className="flex flex-col lg:flex-row justify-between gap-10 lg:gapx-5">
                    {products?.slice(3).map((i: any, index: number) => {
                        if (!i.isDisabled) {
                            const item = i?.productName
                                .toLowerCase()
                                .replace(/\s+/g, "-");
                            return (
                                <ProductCard
                                    title={i?.productName}
                                    key={index}
                                    image={i?.imageUrl}
                                    onClick={() => {
                                        navigate(`/products/${item}`, {
                                            state: {
                                                selectedProduct: i?.productName,
                                            },
                                        });
                                    }}
                                />
                            );
                        }
                    })}
                </div>
            </div>

            {/* <h3 className="text-xl font-semibold mb-5">Latest Product News </h3>
            <div className="grid grid-cols-3 gap-x-[60px] gap-y-6 mb-5 text-[18]">
                {[
                    {
                        title: "Naira Swap: Nigeria Runs Risk Of CBN-Induced Recession...",
                        image: n1,
                    },
                    {
                        title: "Govs direct states to join suit against FG over naira swap...",
                        image: n2,
                    },
                    {
                        title: "Economic challenges may close down more businesses – NECA...",
                        image: n3,
                    },
                ].map((item, index) => {
                    index = index + 1;
                    return (
                        <NewsCard
                            key={index}
                            image={item.image}
                            onClick={() => navigate(`news/${index}`)}
                            title={item.title}
                        />
                    );
                })}
            </div> */}
            {serviceModal && (
                <Modal
                    size="md"
                    title={`${customer?.firstName}`}
                    isCancel
                    cancel={showServiceModal}
                >
                    <div className="w-[571px] mx-auto mt-24 text-primary">
                        <div className="text-center mb-14">
                            <h4 className="font-semibold text-xl mb-4">
                                Here Are The Services We Offer
                            </h4>
                            <p className="text-base">
                                Select a product you want to get started with
                                and fill the form to create an account
                            </p>
                        </div>
                        <div className="mb-32">
                            <Select
                                title={`${investment || "Select a product"}`}
                                options={products}
                                setOption={setOption}
                                selected={investment}
                            />
                        </div>

                        <Button
                            buttonType="full"
                            disabled={!investment.length}
                            onClick={openInvestment}
                        >
                            Proceed
                        </Button>
                    </div>
                </Modal>
            )}
            {loading && <Loader />}
        </div>
    );
};

export default Products;
