import React from "react";
import Button from "../../components/ButtonComponent";
import productImageLg from "../../assets/images/product-image-lg.png";
import newsAvatar from "../../assets/images/news-avatar.png";
import facebook from ".././../assets/images/facebook.svg";
import twitter from ".././../assets/images/twitter.svg";
import link from ".././../assets/images/link.svg";

const NewsPostScreen = () => {
    return (
        <div className="pt-[50px] text-primary max-w-[1120px] text-base pb-10">
            <div className="flex justify-between mb-[122px]">
                <div className="flex space-x-[30px] items-center">
                    <img alt="" src={newsAvatar} />
                    <div className="flex flex-col justify-between h-full py-1">
                        <h3 className="text-lg font-semibold">
                            DLM Asset Management
                        </h3>
                        <div className="text-base flex items-center space-x-4">
                            <p>Aug 15, 2022</p>
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                            <p>5 min read</p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center space-x-14">
                    <div className="flex items-center space-x-10">
                        <img alt="" src={facebook} />
                        <img alt="" src={twitter} />
                        <img alt="" src={link} />
                    </div>

                    <div className="w-[200px]">
                        <Button buttonType="full">Create an account</Button>
                    </div>
                </div>
            </div>
            <h3 className="text-xl font-semibold mb-[15px]">
                How to best hedge your fund against the falling naira
            </h3>
            <p className="mb-[73px] text-base">
                Learn how to secure your wealth during inflation
            </p>
            <div>
                <div className="mb-10">
                    <img alt="" src={productImageLg} />
                </div>

                <p>
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
            </div>
        </div>
    );
};

export default NewsPostScreen;
