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
    const products = [
        {
            title: "Fixed Income Fund",
            thumb: r1,
            desc: "The DLM Fixed Income Fund, a SEC-registered mutual fund that invests in fixed income assets, offers a unique opportunity for investors with a minimum investment of N10,000. The fund boasts a 15% return as of today, one of the highest in the market. Investors can top up with N10,000 at any time, making it a great tool for developing a savings culture and financial discipline. Withdrawals after one month are not subject to penalty fees and there are no hidden charges. On average, the fund performs better than typical savings accounts offered by banks.",
        },
        {
            title: "High Interest Investment Plan",
            thumb: r6,
            desc: "This high-yield investment opportunity offers investors the chance to earn returns above a typical savings account with fixed investment returns over a specified period. On maturity, there is the option to roll over investments and the flexibility to migrate to other investment plans without incurring any penalty fees.",
        },
        {
            title: "Child Education Plan",
            thumb: r5,
            desc: "The Child Education Plan is a great way to secure the future of your child by providing you with the ability to plan and fund their education, from primary through tertiary levels. Investments can be made on a monthly, quarterly, or yearly basis, with three different investment plans to choose from: Silver (minimum of N20,000), Gold (minimum of N100,000), and Platinum (minimum of N250,000). Clients have the option to customize their investment plans to suit their individual needs and an advisor will provide pertinent and useful information and guide the client through the entire planning process.",
        },
        {
            title: "Target Date Plan",
            thumb: r7,
            desc: "The DLM Asset Management Target Date Plan is tailored to meet the needs of investors who have a specific financial goal in mind and the discipline to reach it. The plan involves a disciplined investment process and is locked in for the selected length of time chosen by the subscriber at the time of subscription. This plan is designed for individuals, families, and organizations that have a set financial goal to achieve and offers flexibility with a flexible plan date and the option for subscribers to choose either monthly, quarterly, or annual contribution. The account can be run in either dollars or naira, with a minimum investment of N20,000.00 in Naira and $10,000.00 in Dollars. The plan guarantees a return of 10% per annum (as of today) and subscribers have access to a free financial planning session with a wealth advisor.",
        },
        {
            title: "Retirement plan subscription",
            thumb: r8,
            desc: "The DLM Asset Management Retirement Planning is a solution tailored for employers and employees who are planning for their post-retirement life. It provides the opportunity to plan for retirement with experienced professionals and own a diverse range of assets, while also having access to best-in-class wealth advisory services. The plan is designed to help clients design their future and manage the various risks associated with retirement, including longevity risks and investment risks, while also helping to organize and manage their assets.",
        },
    ];

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
            <h3 className="text-xl font-semibold mb-[15px]">
                Products Library
            </h3>
            <p className="mb-[73px] text-base">
                See and learn more about our products and what they have to
                offer you.
            </p>

            <div className="flex flex-col gap-y-6 mb-20">
                <div className="flex justify-between gap-x-3 xl:gap-x-5">
                    {products.slice(0, 3).map((i, index) => {
                        const item = i.title.toLowerCase().replace(/\s+/g, "-");

                        return (
                            <ProductCard
                                title={i.title}
                                key={index}
                                image={i.thumb}
                                onClick={() => {
                                    navigate(`/products/${item}`, {
                                        state: {
                                            selectedProduct: i.title,
                                        },
                                    });
                                }}
                            />
                        );
                    })}
                </div>
                <div className="flex justify-between gap-x-3 xl:gap-x-5">
                    {products.slice(3).map((i, index) => {
                        const item = i.title.toLowerCase().replace(/\s+/g, "-");

                        return (
                            <ProductCard
                                title={i.title}
                                key={index}
                                image={i.thumb}
                                onClick={() => {
                                    navigate(`/products/${item}`, {
                                        state: {
                                            selectedProduct: i.title,
                                        },
                                    });
                                }}
                            />
                        );
                    })}
                </div>
            </div>

            <h3 className="text-xl font-semibold mb-5">Latest Product News </h3>
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
            </div>
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
