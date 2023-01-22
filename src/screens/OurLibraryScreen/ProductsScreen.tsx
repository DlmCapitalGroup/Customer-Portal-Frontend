import React from "react";
import { useNavigate } from "react-router-dom";
import ProductImage from "../../assets/images/product-image.png";
import newsImage from "../../assets/images/news-image.png";

interface cardProps {
    image?: string;
    title?: string;
    onClick?: () => void;
}

const ProductCard = (props: cardProps) => {
    const { image, title } = props;
    return (
        <div
            className="max-w-[359px] shadow-sm cursor-pointer text-base text-primary"
            {...props}
        >
            <div className="w-full h-[248px] rounded-t-[20px]">
                <img
                    className="object-top object-cover w-full h-full"
                    alt=""
                    src={ProductImage}
                />
            </div>
            <div className="p-6 bg-white-light rounded-b-[20px]">
                <p className="text-lg">Fixed Deposit Investment</p>
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
                <img alt="" src={newsImage} className="w-full object-cover object-center h-full rounded-[10px]" />
            </div>
            <div className="grow">
                <p className="text-base">Latest product news about the recent...</p>
            </div>
        </div>
    );
};

const Products = () => {
    const navigate = useNavigate();
    return (
        <div className="pt-[50px] text-primary max-w-[1100px] text-base pb-20">
            <h3 className="text-xl font-semibold mb-[15px]">
                Products Library
            </h3>
            <p className="mb-[73px] text-base">
                See and learn more about our products and what they have to
                offer you.
            </p>

            <div className="grid grid-cols-3 gap-x-5 gap-y-6 mb-20">
                {[1, 2, 3, 4, 5, 6].map((item, index) => {
                    index = index + 1;
                    return (
                        <ProductCard
                            key={index}
                            onClick={() => navigate(`products/${index}`)}
                        />
                    );
                })}
            </div>

            <h3 className="text-lg font-semibold mb-5">Latest Product News </h3>
            <div className="grid grid-cols-3 gap-x-20 gap-y-6 mb-5">
                {[1, 2, 3].map((item, index) => {
                    index = index + 1;
                    return (
                        <NewsCard
                            key={index}
                            onClick={() => navigate(`news/${index}`)}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default Products;
