import React from "react";
import { useNavigate } from "react-router-dom";
import ProductImage from "../../assets/images/product-image.png";

interface productCardProps {
    image?: string;
    title?: string;
    onClick?: () => void;
}

const ProductCard = (props: productCardProps) => {
    const { image, title } = props;
    return (
        <div className="max-w-[359px] shadow-sm cursor-pointer text-base text-primary" {...props}>
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

const Products = () => {
    const navigate = useNavigate();
    return (
        <div className="pt-[50px] text-primary max-w-[1100px] text-base pb-20">
            <h3 className="text-xl font-semibold mb-[15px]">
                Our Product Library
            </h3>
            <p className="mb-[73px] text-base">
                See and learn more about our products and what they have to
                offer you.
            </p>

            <div className="grid grid-cols-3 gap-x-5 gap-y-6">
                {[1, 2, 3, 4, 5, 6].map((item, index) => {
                    index = index + 1;
                    return (
                        <ProductCard
                            key={index}
                            onClick={() => navigate(`${index}`)}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default Products;
