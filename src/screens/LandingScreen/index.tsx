import React from "react";
import logoDark from "../../assets/images/logo-dark.svg";
import Button from "../../components/ButtonComponent";
import heroImage from "../../assets/images/hero-image.svg";
import hero2 from "../../assets/images/hero2.svg";
import fif from "../../assets/images/fif.svg";
import hiip from "../../assets/images/hiip.svg";
import childEdu from "../../assets/images/child-edu.svg";
import tdp from "../../assets/images/tdp.svg";
import retirement from "../../assets/images/retirement.svg";
import fdp from "../../assets/images/fdf.svg";
import avatar2 from "../../assets/images/avatar2.svg";
import { Input } from "../../components/FormElements";
import circle2 from "../../assets/images/circle2.svg";
import Marquee from "react-fast-marquee";
import { Navigate, useNavigate } from "react-router-dom";
import { Link } from "react-scroll";
import { useAppSelector } from "../../store/hooks";

const LandingScreen = () => {
    const navigate = useNavigate();
    const { customer }: any = useAppSelector((state) => state.auth);
    if (customer) {
        return <Navigate to="/dashboard" />;
    } else {
        return (
            <div className="text-primary min-h-screen bg-[#DBE1E6]">
                <div className="min-h-screen flex flex-col">
                    <nav>
                        <div className="container max-w-[1440px] flex items-center justify-between lg:px-10 px-5 py-10">
                            <img alt="" src={logoDark} />

                            <div className="flex items-center gap-x-10 text-[18px] font-semibold">
                                <Link
                                    to="about"
                                    smooth={true}
                                    className="cursor-pointer"
                                >
                                    About Us
                                </Link>
                                <Link
                                    to="products"
                                    smooth={true}
                                    className="cursor-pointer"
                                >
                                    Our Product
                                </Link>
                                <Link
                                    to="contact"
                                    smooth={true}
                                    className="cursor-pointer"
                                >
                                    Contact Us
                                </Link>
                                <a onClick={() => navigate("/auth/sign-in")}>
                                    Sign In
                                </a>
                                <Button
                                    buttonType="md"
                                    onClick={() => navigate("/auth/sign-up")}
                                >
                                    Get Started
                                </Button>
                            </div>
                        </div>
                    </nav>
                    <div className="container max-w-[1440px] flex items-center justify-between lg:px-10 px-5 py-10 grow">
                        <div className="max-w-3xl flex flex-col gap-y-10">
                            <h1 className="text-3xl font-semibold relative">
                                Grow your wealth in the best possible way
                                <img
                                    alt=""
                                    src={hero2}
                                    className="absolute -bottom-5 -left-10"
                                />
                            </h1>
                            <p className="text-lg mb-3">
                                Get access to top tier wealth advisory, grow
                                your wealth with informed investment portfolios
                                and whatever is left there as well. It will be
                                amazing and all you have to do is get started.
                            </p>
                            <div className="flex items-center gap-x-20">
                                <Button
                                    buttonType="md"
                                    onClick={() => navigate("/auth/sign-up")}
                                >
                                    Sign Up
                                </Button>
                                <Button buttonType="md" variant="light">
                                    Learn More
                                </Button>
                            </div>
                        </div>
                        <img alt="" src={heroImage} />
                    </div>
                </div>
                <Marquee gradient={false} speed={60} className="bg-primary/60">
                    <div className="flex w-full justify-around py-5 px-20">
                        <h1 className="text-[40px] font-semibold">
                            Client Name
                        </h1>
                        <h1 className="text-[40px] font-semibold">
                            Client Name
                        </h1>
                        <h1 className="text-[40px] font-semibold">
                            Client Name
                        </h1>
                    </div>
                </Marquee>
                <div className=" border-b-4 border-dashed border-primary/60">
                    <div
                        className="container max-w-[1440px] lg:px-10 px-5 py-20"
                        id="products"
                    >
                        <h1 className="text-[40px] font-semibold text-center mb-10">
                            Our Products
                        </h1>
                        <div className="grid grid-cols-3 gap-x-10 gap-y-5">
                            <div className="flex flex-col gap-y-[18px] p-5 hover:shadow-xl rounded-md hover:bg-[#E1E6EA] transition-all delay-150 duration-300 ease-in-out">
                                <img
                                    alt=""
                                    src={fif}
                                    className="w-[60px] h-[60px]"
                                />
                                <h3 className="text-lg font-semibold">
                                    Fixed Income Fund
                                </h3>
                                <p className="text-lg font-normal">
                                    Fixed Income Fund Fixed Income Fund Fixed
                                    Income Fund Fixed Income Fund
                                </p>
                            </div>
                            <div className="flex flex-col gap-y-[18px] p-5 hover:shadow-xl rounded-md hover:bg-[#E1E6EA]">
                                <img
                                    alt=""
                                    src={hiip}
                                    className="w-[60px] h-[60px]"
                                />
                                <h3 className="text-lg font-semibold">
                                    High Interest Investment Plan
                                </h3>
                                <p className="text-lg font-normal">
                                    Fixed Income Fund Fixed Income Fund Fixed
                                    Income Fund Fixed Income Fund
                                </p>
                            </div>
                            <div className="flex flex-col gap-y-[18px] p-5 hover:shadow-xl rounded-md hover:bg-[#E1E6EA]">
                                <img
                                    alt=""
                                    src={childEdu}
                                    className="w-[60px] h-[60px]"
                                />
                                <h3 className="text-lg font-semibold">
                                    Child Education Plan
                                </h3>
                                <p className="text-lg font-normal">
                                    Fixed Income Fund Fixed Income Fund Fixed
                                    Income Fund Fixed Income Fund
                                </p>
                            </div>
                            <div className="flex flex-col gap-y-[18px] p-5 hover:shadow-xl rounded-md hover:bg-[#E1E6EA]">
                                <img
                                    alt=""
                                    src={tdp}
                                    className="w-[60px] h-[60px]"
                                />
                                <h3 className="text-lg font-semibold">
                                    Target Date Plan
                                </h3>
                                <p className="text-lg font-normal">
                                    Fixed Income Fund Fixed Income Fund Fixed
                                    Income Fund Fixed Income Fund
                                </p>
                            </div>
                            <div className="flex flex-col gap-y-[18px] p-5 hover:shadow-xl rounded-md hover:bg-[#E1E6EA]">
                                <img
                                    alt=""
                                    src={retirement}
                                    className="w-[60px] h-[60px]"
                                />
                                <h3 className="text-lg font-semibold">
                                    Retirement Plan
                                </h3>
                                <p className="text-lg font-normal">
                                    Fixed Income Fund Fixed Income Fund Fixed
                                    Income Fund Fixed Income Fund
                                </p>
                            </div>
                            <div className="flex flex-col gap-y-[18px] p-5 hover:shadow-xl rounded-md hover:bg-[#E1E6EA]">
                                <img
                                    alt=""
                                    src={fdp}
                                    className="w-[60px] h-[60px]"
                                />
                                <h3 className="text-lg font-semibold">
                                    Fixed Deposit Fund
                                </h3>
                                <p className="text-lg font-normal">
                                    Fixed Income Fund Fixed Income Fund Fixed
                                    Income Fund Fixed Income Fund
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative">
                    <div
                        className="container max-w-[1440px] lg:px-10 px-5 py-10"
                        id="about"
                    >
                        <h1 className="text-[40px] font-semibold text-center my-10">
                            What they say about us
                        </h1>
                        <p className="text-lg font-normal text-center mb-10">
                            Let the words and testimonials of our clients speak
                            for us
                        </p>
                        <div className="grid grid-cols-2 gap-x-20">
                            <div className="flex flex-col gap-y-5 items-center bg-[#E1E6EA] shadow-xl h-[384px] justify-center px-10 z-[1]">
                                <img
                                    alt=""
                                    src={avatar2}
                                    className="w-[104px] h-[104px]"
                                />
                                <div className="flex flex-col gap-y-2">
                                    <h5 className="text-lg font-semibold text-center">
                                        David Adekunle
                                    </h5>
                                    <p className="text-[18px] text-center">
                                        CFO FoodCo
                                    </p>
                                </div>
                                <p className="text-lg font-normal">
                                    Let the words and testimonials of our
                                    clients speak for us. We are so proud of the
                                    stuff
                                </p>
                            </div>
                            <div className="flex flex-col gap-y-5 items-center bg-[#E1E6EA] shadow-xl h-[384px] justify-center px-10 z-[1]">
                                <img
                                    alt=""
                                    src={avatar2}
                                    className="w-[104px] h-[104px]"
                                />
                                <div className="flex flex-col gap-y-2">
                                    <h5 className="text-lg font-semibold text-center">
                                        David Adekunle
                                    </h5>
                                    <p className="text-[18px] text-center">
                                        CFO FoodCo
                                    </p>
                                </div>
                                <p className="text-lg font-normal">
                                    Let the words and testimonials of our
                                    clients speak for us. We are so proud of the
                                    stuff
                                </p>
                            </div>
                        </div>
                    </div>
                    <img
                        alt=""
                        src={circle2}
                        className="absolute -bottom-96 left-20 z-0"
                    />
                </div>
                <div className="pt-[100px]">
                    <div
                        className="container max-w-[945px] lg:px-10 px-5 py-10 flex flex-col"
                        id="contact"
                    >
                        <h1 className="text-[40px] font-semibold text-center my-10">
                            Have any question for us?
                        </h1>
                        <p className="text-lg font-normal text-center mb-10">
                            Fill the form with your questions or inquiries and
                            we will get in touch shortly
                        </p>
                        <div className="bg-[#E1E6EA] grow min-h-[574px] py-10 shadow-xl rounded-lg">
                            <div className="mx-auto max-w-[566px] flex flex-col gap-y-5">
                                <Input placeholder="Full Name" />
                                <Input
                                    placeholder="Email Address"
                                    type="email"
                                />
                                <Input
                                    placeholder="Phone Number"
                                    type="number"
                                />
                                <textarea
                                    className="h-[110px] w-full mb-4 text-base mt-2 placeholder-primary/40 px-4 bg-white-lighter focus:ring-primary active:ring-primary shadow-sm border border-primary/5 rounded-lg"
                                    placeholder="Your question"
                                ></textarea>
                                <Button buttonType="full">Submit</Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="min-h-[600px] bg-[#09335E33] mt-20">
                    <div className="max-w-[1440px] container px-10 py-10">
                        <div className="flex justify-between items-center">
                            <h1 className="text-[40px] font-semibold text-center my-10">
                                Have any question for us?
                            </h1>
                            <div className="flex items-center gap-x-4">
                                <div className="-mt-2 w-full">
                                    <Input
                                        placeholder="Email Address"
                                        type="email"
                                    />
                                </div>
                                <Button buttonType="md">Subscribe</Button>
                            </div>
                        </div>
                        <div className="grid grid-cols-3 my-[100px]">
                            <div className="flex flex-col gap-y-4">
                                <p className="text-lg font-semibold">
                                    Quick Links
                                </p>
                                <p className="text-lg">Products</p>
                                <p className="text-lg">Contact Us</p>
                                <p className="text-lg">Sign Up</p>
                                <p className="text-lg">Sign In</p>
                            </div>
                            <div className="flex flex-col gap-y-4">
                                <p className="text-lg font-semibold">Socials</p>
                                <p className="text-lg">Instagram</p>
                                <p className="text-lg">LinkedIn</p>
                                <p className="text-lg">Email</p>
                                <p className="text-lg">Facebook</p>
                            </div>
                            <div className="flex flex-col gap-y-4">
                                <p className="text-lg font-semibold">
                                    Resources
                                </p>
                                <p className="text-lg">FAQ</p>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-t-primary py-10 text-center text-lg">
                        &copy; 2023 All Rights Reserved
                    </div>
                </div>
            </div>
        );
    }
};

export default LandingScreen;
