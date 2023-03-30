import React, { useState } from "react";
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
import { toast } from "react-toastify";
import { devInstance } from "../../store/devInstance";
import chevronRight from "../../assets/images/chevron-right.svg";
import chevronDown from "../../assets/images/chevron-down.svg";

const LandingScreen = () => {
    const navigate = useNavigate();
    const { customer }: any = useAppSelector((state) => state.auth);
    const [activeFaq, setActiveFaq] = useState<any>(null);

    const faqs = [
        {
            title: "What is the minimum amount for an investment?",
        },
        {
            title: "How do I create an investment?",
        },
        {
            title: "How much is the interest on fixed income fund?",
        },
        {
            title: "What is the minimum amount for an investment?",
        },
        {
            title: "Can I liquidate my investment at anytime?",
        },
        {
            title: "Can I create an investment portfolio for my child?",
        },
    ];

    const [contactForm, setContactForm] = useState({
        fullname: "",
        email: "",
        phone: "",
        inquiry: "",
    });

    const [newsLetter, setNewsLetter] = useState("");
    const [cLoading, setCLoading] = useState(false);
    const [nLoading, setNLoading] = useState(false);

    const contactFormAction = async () => {
        setCLoading(true);

        var data = new FormData();
        data.append("FullName", contactForm.fullname);
        data.append("EmailAddress", contactForm.email);
        data.append("PhoneNumber", contactForm.phone);
        data.append("Inquiry", contactForm.inquiry);

        var config = {
            method: "post",
            maxBodyLength: Infinity,
            url: "https://apps.dlm.group/ASSETMGTAPI/api/v1/Transaction/MakeInquiries",
            data: data,
        };

        devInstance(config)
            .then(function (response: any) {
                if (response) {
                    toast.success(
                        "Thank you, we have received your question we will be in touch with you."
                    );
                    setContactForm({
                        ...contactForm,
                        fullname: "",
                        email: "",
                        phone: "",
                        inquiry: "",
                    });
                }
            })
            .catch(function (error: any) {
                toast.error("Failed, Please try again later.");
            })
            .finally(() => setCLoading(false));
    };

    const newsLetterFormAction = async () => {
        setNLoading(true);
        var data = {
            EmailAddress: newsLetter,
        };

        var config = {
            method: "post",
            url: "https://apps.dlm.group/ASSETMGTAPI/api/v1/Transaction/AddEmailForNewsletter",
            data: data,
        };

        devInstance(config)
            .then(function (response: any) {
                if (response) {
                    toast.success(
                        "Thank you for subscribing to our news letter."
                    );
                    setNewsLetter("");
                }
            })
            .catch(function (error: any) {
                toast.error("Failed, Please try again later.");
            })
            .finally(() => setNLoading(false));
    };

    if (customer?.customerId) {
        return <Navigate to="/dashboard" />;
    } else {
        return (
            <div className="text-primary min-h-screen bg-[#DBE1E6]">
                <div className="min-h-screen flex flex-col">
                    <nav>
                        <div className="container max-w-[1440px] flex items-center justify-between px-10 lg:px-20 py-10">
                            <img alt="" src={logoDark} />

                            <div className="flex items-center gap-x-10 text-[18px] font-semibold">
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
                                <a
                                    href="/auth/sign-in"
                                    className="cursor-pointer"
                                >
                                    Sign In
                                </a>
                                <Button
                                    buttonType="md"
                                    onClick={() => navigate("/auth/sign-up")}
                                >
                                    Sign Up
                                </Button>
                            </div>
                        </div>
                    </nav>
                    <div className="container max-w-[1440px] flex items-center justify-between gap-x-10 px-10 lg:px-20 py-10 grow">
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
                            <Button
                                buttonType="lg"
                                onClick={() => navigate("/auth/sign-up")}
                            >
                                Get Started
                            </Button>
                        </div>
                        <img alt="" src={heroImage} />
                    </div>
                </div>
                {/* <Marquee gradient={false} speed={60} className="bg-primary/60">
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
                </Marquee> */}
                <div className="border-primary/60">
                    <div
                        className="container max-w-[1440px] px-10 lg:px-20 py-20"
                        id="products"
                    >
                        <h1 className="text-[40px] font-semibold text-center mb-10">
                            Our Products
                        </h1>
                        <div className="grid grid-cols-3 gap-x-10 gap-y-5">
                            <div className="flex flex-col gap-y-[18px] p-5 hover:shadow-xl hover:shadow-primary/10 rounded-md hover:bg-[#E1E6EA] transition-all delay-150 duration-300 ease-in-out">
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
                            <div className="flex flex-col gap-y-[18px] p-5 hover:shadow-xl hover:shadow-primary/10 rounded-md hover:bg-[#E1E6EA]">
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
                            <div className="flex flex-col gap-y-[18px] p-5 hover:shadow-xl hover:shadow-primary/10 rounded-md hover:bg-[#E1E6EA]">
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
                            <div className="flex flex-col gap-y-[18px] p-5 hover:shadow-xl hover:shadow-primary/10 rounded-md hover:bg-[#E1E6EA]">
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
                            <div className="flex flex-col gap-y-[18px] p-5 hover:shadow-xl hover:shadow-primary/10 rounded-md hover:bg-[#E1E6EA]">
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
                            <div className="flex flex-col gap-y-[18px] p-5 hover:shadow-xl hover:shadow-primary/10 rounded-md hover:bg-[#E1E6EA]">
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
                    <div className="container max-w-[1440px] px-10 lg:px-20 py-10">
                        <h1 className="text-[40px] font-semibold text-center my-10">
                            What they say about us
                        </h1>
                        <p className="text-lg font-normal text-center mb-10">
                            Let the words and testimonials of our clients speak
                            for us
                        </p>
                        <div className="grid grid-cols-2 gap-x-20">
                            <div className="flex flex-col gap-y-5 rounded-lg items-center bg-[#E1E6EA] shadow-xl shadow-primary/10 h-[384px] justify-center px-10 z-[1]">
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
                            <div className="flex flex-col gap-y-5 items-center rounded-lg bg-[#E1E6EA] shadow-primary/10 shadow-xl h-[384px] justify-center px-10 z-[1]">
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
                        className="container max-w-[945px] px-10 lg:px-20 py-10 flex flex-col"
                        id="faqs"
                    >
                        <h1 className="text-[40px] font-semibold text-center my-10">
                            Have any question for us?
                        </h1>
                        <p className="text-lg font-normal text-center mb-10">
                            Check out our FAQ. An answer may already be
                            available
                        </p>
                        <div className="grow min-h-[574px] py-10 rounded-lg">
                            <div className="mx-auto max-w-[566px] flex flex-col gap-y-5">
                                {faqs.map((el, index) => (
                                    <div
                                        className="cursor-pointer min-h-[72px] border-primary/10 bg-[#FAFAFF] rounded-lg px-4 flex flex-col"
                                        onClick={() => {
                                            if (index === activeFaq) {
                                                setActiveFaq(null);
                                            } else {
                                                setActiveFaq(index);
                                            }
                                        }}
                                        key={index}
                                    >
                                        <div className="flex items-center h-[72px] justify-between font-semibold">
                                            <span>{el.title}</span>
                                            {index === activeFaq ? (
                                                <img alt="" src={chevronDown} />
                                            ) : (
                                                <img
                                                    alt=""
                                                    src={chevronRight}
                                                />
                                            )}
                                        </div>
                                        {activeFaq === index && (
                                            <div className="pb-5 sm:pr-8 lg:pr-10">
                                                Yes, you can. Simply create an
                                                account for your child, select a
                                                product of your choice and fund
                                                the account accordingly
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="pt-10">
                    <div
                        className="container max-w-[945px] px-10 lg:px-20 py-10 flex flex-col"
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
                                <Input
                                    placeholder="Full Name"
                                    value={contactForm.fullname}
                                    onChange={(e: any) =>
                                        setContactForm({
                                            ...contactForm,
                                            fullname: e.target.value,
                                        })
                                    }
                                />
                                <Input
                                    placeholder="Email Address"
                                    type="email"
                                    onChange={(e: any) =>
                                        setContactForm({
                                            ...contactForm,
                                            email: e.target.value,
                                        })
                                    }
                                    value={contactForm.email}
                                    required
                                />
                                <Input
                                    placeholder="Phone Number"
                                    type="number"
                                    onChange={(e: any) =>
                                        setContactForm({
                                            ...contactForm,
                                            phone: e.target.value,
                                        })
                                    }
                                    value={contactForm.phone}
                                    required
                                />
                                <textarea
                                    className="h-[110px] w-full mb-4 text-base mt-2 placeholder-primary/40 px-4 bg-white-lighter focus:ring-primary active:ring-primary shadow-sm border border-primary/5 rounded-lg"
                                    placeholder="Your question"
                                    onChange={(e: any) =>
                                        setContactForm({
                                            ...contactForm,
                                            inquiry: e.target.value,
                                        })
                                    }
                                    value={contactForm.inquiry}
                                    required
                                ></textarea>
                                <Button
                                    onClick={() => contactFormAction()}
                                    buttonType="full"
                                >
                                    {cLoading ? "Please wait..." : "Submit"}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="min-h-[600px] bg-[#09335E33] mt-20">
                    <div className="max-w-[1440px] container px-10 lg:px-20 py-10">
                        <div className="flex justify-between items-center">
                            <h1 className="text-[40px] font-semibold text-center my-10">
                                Have any question for us?
                            </h1>
                            <div className="flex items-center gap-x-4">
                                <div className="-mt-2 w-full">
                                    <Input
                                        placeholder="Email Address"
                                        type="email"
                                        value={newsLetter}
                                        onChange={(e: any) =>
                                            setNewsLetter(e.target.value)
                                        }
                                        required
                                        transparent
                                    />
                                </div>
                                <Button
                                    onClick={() => newsLetterFormAction()}
                                    buttonType="md"
                                >
                                    {nLoading ? "Please wait..." : "Subscribe"}
                                </Button>
                            </div>
                        </div>
                        <div className="grid grid-cols-3 my-[100px]">
                            <div className="flex flex-col gap-y-4 w-fit">
                                <p className="text-lg font-semibold">
                                    Quick Links
                                </p>
                                {/* <p className="text-lg">Products</p>
                                <p className="text-lg">Contact Us</p> */}
                                <Link
                                    to="products"
                                    smooth={true}
                                    className="cursor-pointer text-lg"
                                >
                                    Our Product
                                </Link>
                                <Link
                                    to="contact"
                                    smooth={true}
                                    className="cursor-pointer text-lg"
                                >
                                    Contact Us
                                </Link>
                                <a
                                    href="/auth/sign-up"
                                    className="text-lg cursor-pointer"
                                >
                                    Sign Up
                                </a>
                                <a
                                    href="/auth/sign-in"
                                    className="text-lg cursor-pointer"
                                >
                                    Sign In
                                </a>
                            </div>
                            <div className="flex flex-col gap-y-4 w-fit">
                                <p className="text-lg cursor-pointer font-semibold">
                                    Socials
                                </p>
                                <a
                                    rel="noreferrer"
                                    target="_blank"
                                    href="https://instagram.com/dlmasset?igshid=YmMyMTA2M2Y="
                                    className="text-lg cursor-pointer"
                                >
                                    Instagram
                                </a>
                                <a
                                    rel="noreferrer"
                                    target="_blank"
                                    href="https://www.linkedin.com/company/citihomes-finance-company/"
                                    className="text-lg cursor-pointer"
                                >
                                    LinkedIn
                                </a>
                                <a
                                    rel="noreferrer"
                                    target="_blank"
                                    href="https://twitter.com/dlmasset?s=21&t=cBFg4EKCm-TVQKnv_dMVtg"
                                    className="text-lg cursor-pointer"
                                >
                                    Twitter
                                </a>
                                <a
                                    rel="noreferrer"
                                    target="_blank"
                                    href="https://www.facebook.com/DLMAssetManagement?mibextid=LQQJ4d"
                                    className="text-lg cursor-pointer"
                                >
                                    Facebook
                                </a>
                            </div>
                            <div className="flex flex-col gap-y-4 w-fit">
                                <p className="text-lg cursor-pointer font-semibold">
                                    Resources
                                </p>
                                <Link
                                    to="faqs"
                                    smooth={true}
                                    className="text-lg cursor-pointer"
                                >
                                    FAQs
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-t-primary px-10 lg:px-20 py-10 text-center text-lg">
                        &copy; 2023 All Rights Reserved
                    </div>
                </div>
            </div>
        );
    }
};

export default LandingScreen;
