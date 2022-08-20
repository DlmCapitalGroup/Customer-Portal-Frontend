import React from "react";
import productImageLg from "../../assets/images/product-image-lg.png";
import Button from "../../components/ButtonComponent";

const Product = () => {
    return (
        <div className="pt-[50px] text-primary max-w-[1120px] text-base pb-20">
            <h3 className="text-xl font-semibold mb-[15px]">
                Fixed Deposit Investment
            </h3>
            <p className="mb-[73px] text-base">
                See and learn more about our products and what they have to
                offer you.
            </p>
            <div>
                <div className="mb-10">
                    <img alt="" src={productImageLg} />
                </div>

                <p className="mb-20">
                    See and learn more about our products and what they have to
                    offer you. See and learn more about our products and what
                    they have to offer you.See and learn more about our products
                    and what they have to offer you. See and learn more about
                    our products and what they have to offer you. See and learn
                    more about our products and what they have to offer you. See
                    and learn more about our products and what they have to
                    offer you. See and learn more about our products and what
                    they have to offer you.See and learn more about our products
                    and what they have to offer you.See and learn more about our
                    products and what they have to offer you.See and learn more
                    about our products and what they have to offer you.See and
                    learn more about our products and what they have to offer
                    you.See and learn more about our products and what they have
                    to offer you. See and learn more about our products and what
                    they have to offer you.
                </p>

                <div className="text-center">
                    <Button buttonType="lg">Get Started</Button>
                </div>
            </div>
        </div>
    );
};

export default Product;