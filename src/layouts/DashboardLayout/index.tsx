import React, { useEffect, useState } from "react";
// import logoSm from "../../assets/images/logo-sm.svg";
import logoLg from "../../assets/images/logo-lg.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import dashboardIcon from "../../assets/images/dashboard-icon.svg";
import transactionsIcon from "../../assets/images/transactions-icon.svg";
// import planIcon from "../../assets/images/plan-icon.svg";
// import supportIcon from "../../assets/images/support-icon.svg";
// import notificationIcon from "../../assets/images/notification-icon.svg";
import settingsIcon from "../../assets/images/settings-icon.svg";
import logoutIcon from "../../assets/images/logout-icon.svg";
import userIcon from "../../assets/images/icon.png";
import activeIcon from "../../assets/images/active-icon.svg";
import notebookIcon from "../../assets/images/notebook.svg";
import dashboardBg from "../../assets/images/bg-dashboard.svg";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { logout, setLoading } from "../../store/auth-slice";
import Loader from "../../components/LoaderComponent";
import Marquee from "react-fast-marquee";
import Button from "../../components/ButtonComponent";
import { devInstance } from "../../store/devInstance";
import { toast } from "react-toastify";
import { Input, Select } from "../../components/FormElements";
import cancelBtn from "../../assets/images/close-modal.svg";

interface dashboardProps {
    children: React.ReactNode;
    onClick?: any;
}

const DashboardLayout = (props: dashboardProps) => {
    const [loading, setLoading] = React.useState(false);
    const [stepper, setStepper] = useState(false);
    const { customer }: any = useAppSelector((state) => state.auth);
    const { children, onClick } = props;
    const [currentStep, setCurrentStep] = React.useState(1);
    const location = useLocation();
    const navigate = useNavigate();
    console.log(location.pathname);
    const dispatch = useAppDispatch();
    const [formData, setFormData] = React.useState<any>({
        FirstName: "",
        Surname: "",
        Age: "",
        BirthDate: "",
        EmailAddress: "",
        PhoneNumber: "",
        ResidentialAddress: "",
        State: "",
        Country: "",
        Occupation: "",
        IdType: "",
        IdNumber: "",
        BankName: "",
        AccountName: "",
        AccountNumber: "",
        BVN: "",
        NextOfKinName: "",
        AddressNOK: "",
        RelationshipWithNOK: "",
        PassportPhoto: "",
        FormOfIdentity: "",
        UtilityBill: "",
        UnitHolderSignature: "",
        PostalCode: "",
        PlaceOfBirth: "",
    });
    const states = [
        "Abia",
        "Adamawa",
        "Akwa Ibom",
        "Anambra",
        "Bauchi",
        "Bayelsa",
        "Benue",
        "Borno",
        "Cross River",
        "Delta",
        "Ebonyi",
        "Edo",
        "Ekiti",
        "Enugu",
        "FCT - Abuja",
        "Gombe",
        "Imo",
        "Jigawa",
        "Kaduna",
        "Kano",
        "Katsina",
        "Kebbi",
        "Kogi",
        "Kwara",
        "Lagos",
        "Nasarawa",
        "Niger",
        "Ogun",
        "Ondo",
        "Osun",
        "Oyo",
        "Plateau",
        "Rivers",
        "Sokoto",
        "Taraba",
        "Yobe",
        "Zamfara",
    ];
    const [updateProfileForm, setUpdateProfileForm] = React.useState(false);
    console.log(updateProfileForm, "updateProfileForm");

    const dashboardLinks = [
        {
            name: "dashboard",
            icon: dashboardIcon,
            path: "/",
        },
        {
            name: "transactions",
            icon: transactionsIcon,
            path: "/transactions",
        },
        // {
        //     name: "plan",
        //     icon: planIcon,
        //     path: "#",
        // },
        {
            name: "Our Products",
            icon: notebookIcon,
            path: "/products",
        },
        // {
        //     name: "support",
        //     icon: supportIcon,
        //     path: "/support",
        // },
        // {
        //     name: "notifications",
        //     icon: notificationIcon,
        //     path: "#",
        // },
        {
            name: "settings",
            icon: settingsIcon,
            path: "/settings/profile",
        },
        {
            name: `${
                customer?.firstName.charAt(0).toUpperCase() +
                customer?.firstName.slice(1).toLowerCase() +
                " " +
                customer?.lastName.charAt(0).toUpperCase() +
                customer?.lastName.slice(1).toLowerCase()
            }`,
            icon: userIcon,
            path: "/settings/profile",
        },
        {
            name: "Logout",
            icon: logoutIcon,
            path: "#",
        },
    ];

    const findMissingFormdata = () => {
        return !!(
            formData.FirstName &&
            formData.Surname &&
            formData.Age &&
            formData.BirthDate &&
            formData.EmailAddress &&
            formData.PhoneNumber &&
            formData.ResidentialAddress &&
            formData.State &&
            formData.Country &&
            formData.Occupation &&
            formData.IdType &&
            formData.IdNumber &&
            formData.BankName &&
            formData.AccountName &&
            formData.AccountNumber &&
            formData.BVN &&
            formData.NextOfKinName &&
            formData.AddressNOK &&
            formData.RelationshipWithNOK &&
            formData.PassportPhoto &&
            formData.FormOfIdentity &&
            formData.UtilityBill &&
            formData.UnitHolderSignature &&
            formData.PostalCode &&
            formData.PlaceOfBirth
        );
    };

    function prevFunction() {
        if (currentStep > 1) {
            setCurrentStep((prev) => prev - 1);
        } else {
            setStepper(false);
        }
    }

    function formChange(e: any) {
        if (e.target.type === "file") {
            setLoading(true);
            const data = new FormData();
            data.append("file", e.target.files[0]);
            data.append("upload_preset", "assetmanagement");
            fetch("https://api.cloudinary.com/v1_1/hammy06/image/upload", {
                method: "post",
                mode: "cors",
                body: data,
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data.secure_url);
                    setFormData({
                        ...formData,
                        [e.target.name]: data,
                    });
                    console.log(formData);
                })
                .catch((err) => {
                    toast(`${err}`);
                    setLoading(false);
                })
                .finally(() => setLoading(false));
        } else {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value,
            });
        }
        console.log(formData);
        // setformData({ ...formData, [e.target.name]: e.target.value });
    }

    function nextFunction(e: any) {
        e.preventDefault();
        if (currentStep < 2) {
            setCurrentStep((prev) => prev + 1);
        } else {
            accountOnboarding();
        }
    }

    const fileErrors = [
        {
            title: "Passport Photo",
            value: formData.PassportPhoto,
        },
        {
            title: "Utility Bill",
            value: formData.UtilityBill,
        },
        {
            title: "Unit Holder Signature",
            value: formData.UnitHolderSignature,
        },
        {
            title: "Form of Identity",
            value: formData.FormOfIdentity,
        },
    ];

    const accountOnboarding = () => {
        if (fileErrors[0].value === "") {
            toast.error(`${fileErrors[0].title} is required`);
        }
        if (fileErrors[1].value === "") {
            toast.error(`${fileErrors[1].title} is required`);
        }
        if (fileErrors[2].value === "") {
            toast.error(`${fileErrors[2].title} is required`);
        }
        if (fileErrors[3].value === "") {
            toast.error(`${fileErrors[3].title} is required`);
        }

        if (
            fileErrors[0].value &&
            fileErrors[1].value &&
            fileErrors[2].value &&
            fileErrors[3].value
        ) {
            setLoading(true);
            var data = new FormData();
            data.append("AccountName", formData.AccountName);
            data.append("AccountNumber", formData.AccountNumber);
            data.append("AddressNOK", formData.AddressNOK);
            data.append("Age", formData.Age);
            data.append("BankName", formData.BankName);
            data.append("BirthDate", formData.BirthDate);
            data.append("BVN", formData.BVN);
            data.append("Country", formData.Country);
            data.append("EmailAddress", formData.EmailAddress);
            data.append("FirstName", formData.FirstName);
            data.append("FormOfIdentity", formData.FormOfIdentity);
            data.append("IdNumber", formData.IdNumber);
            data.append("IdType", formData.IdType);
            data.append("NextOfKinName", formData.NextOfKinName);
            data.append("Occupation", formData.Occupation);
            data.append("PassportPhoto", formData.PassportPhoto);
            data.append("PhoneNumber", formData.PhoneNumber);
            data.append("RelationshipWithNOK", formData.RelationshipWithNOK);
            data.append("ResidentialAddress", formData.ResidentialAddress);
            data.append("State", formData.State);
            data.append("Surname", formData.Surname);
            data.append("UnitHolderSignature", formData.UnitHolderSignature);
            data.append("UtilityBill", formData.UtilityBill);
            data.append("PostalCode", formData.PostalCode);
            data.append("PlaceOfBirth", formData.PlaceOfBirth);

            var config = {
                method: "post",
                maxBodyLength: Infinity,
                url: "https://apps.dlm.group/ASSETMGTAPI/api/v1/Transaction/InvestmentOnboarding",
                data: data,
            };

            devInstance(config)
                .then(function (response: any) {
                    console.log(JSON.stringify(response.data));
                    toast.success(`${response.data.message}`);
                    setStepper(false);
                    navigate("/products");
                })
                .catch(function (error: any) {
                    console.log(error);
                    setLoading(false);
                    toast.error("Failed");
                })
                .finally(() => setLoading(false));
        }
    };

    useEffect(() => {
        setLoading(true);
        devInstance
            .get(
                `/Transaction/GetCustomerOnboardingDetails/${customer.customerId}`
            )
            .then((res) => {
                console.log(res, "response 22");
                setFormData({
                    ...formData,
                    Surname: res.data.surname,
                    Age: res.data.age,
                    BirthDate: res.data.birthDate.slice(0, 10),
                    EmailAddress: res.data.emailAddress,
                    PhoneNumber: res.data.phoneNumber,
                    ResidentialAddress: res.data.residentialAddress,
                    State: res.data.state,
                    Country: res.data.country,
                    Occupation: res.data.occupation,
                    IdType: res.data.idType,
                    IdNumber: res.data.idNumber,
                    BankName: res.data.bankName,
                    AccountName: res.data.accountName,
                    AccountNumber: res.data.accountNumber,
                    BVN: res.data.bvn,
                    NextOfKinName: res.data.nextOfKinName,
                    AddressNOK: res.data.addressNOK,
                    RelationshipWithNOK: res.data.relationshipWithNOK,
                    PassportPhoto: res.data.passportPhoto,
                    FormOfIdentity: res.data.formOfIdentity,
                    UtilityBill: res.data.utilityBill,
                    UnitHolderSignature: res.data.unitHolderSignature,
                });
                console.log(formData);
                if (!findMissingFormdata) {
                    setUpdateProfileForm(true);
                }
            })
            .catch((err) => {
                console.log(err);
                setUpdateProfileForm(true);
                setLoading(false);
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="w-full min-h-screen bg-primary-light">
            <div className="sticky top-0 w-full z-10">
                <Marquee
                    gradient={false}
                    speed={60}
                    className="bg-primary text-white py-3"
                >
                    I can be a React component, multiple React components, or
                    just some text.
                </Marquee>
            </div>
            <div className="fixed left-0 top-0 w-[210px] z-20 transition ease-in-out delay-150 duration-300 h-screen py-[40px] bg-primary rounded-tr-3xl rounded-br-3xl flex flex-col">
                <img
                    alt=""
                    src={dashboardBg}
                    className="fixed bottom-[100px] ml-6 -z-10"
                />
                <div className="pl-[15px] mb-[76px]">
                    <img alt="" src={logoLg} />
                </div>
                <div className="flex flex-col justify-between grow">
                    <div className="flex flex-col space-y-10">
                        {dashboardLinks.slice(0, 4).map((link, index) => (
                            <Link
                                to={link.path}
                                className="flex pl-[15px] items-center text-sm xl:text-base"
                            >
                                {location.pathname === link.path && (
                                    <img
                                        alt=""
                                        src={activeIcon}
                                        className="absolute left-0"
                                    />
                                )}
                                <img alt="" src={link?.icon} />{" "}
                                <span className="text-base text-white ml-[25px] capitalize">
                                    {link.name}
                                </span>
                            </Link>
                        ))}
                    </div>

                    <div className="flex flex-col space-y-10">
                        {dashboardLinks.slice(4).map((link, index) => (
                            <Link
                                to={index === 0 ? link.path : ""}
                                className="flex pl-[15px] items-center"
                                onClick={() => {
                                    index === 1 && setLoading(true);
                                    index === 1 &&
                                        setTimeout(() => {
                                            dispatch(logout());
                                            setLoading(false);
                                        }, 1500);
                                }}
                            >
                                <img
                                    alt=""
                                    src={link.icon}
                                    className={index === 0 ? "w-6 h-6" : ""}
                                />{" "}
                                <span className="text-base text-white ml-[25px] capitalize">
                                    {link?.name && link?.name}
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
            <div className="ml-[250px] pb-20">
                {updateProfileForm && (
                    <div className="py-6 mt-10 bg-primary text-white px-8 text-base font-bold flex justify-between items-center mb-10 rounded-xl">
                        <span>Please Complete your profile</span>
                        <Button
                            variant="light"
                            buttonType="md"
                            onClick={() => {
                                setStepper(true);
                                console.log(customer);
                            }}
                        >
                            Update Profile
                        </Button>
                    </div>
                )}
                {children}
            </div>
            {stepper && (
                <div className="fixed top-0 left-0 w-screen h-screen grid place-items-center overflow-y-auto py-20 bg-primary/30 text-primary">
                    <form
                        className="w-[691px] min-h-[1028px] bg-white-light rounded-[20px] flex flex-col my-40"
                        onSubmit={nextFunction}
                    >
                        <div className="w-[570px] mx-auto py-6 grow flex flex-col justify-between">
                            <div>
                                <div className="relative">
                                    <img
                                        alt=""
                                        src={cancelBtn}
                                        className="absolute -right-10 cursor-pointer"
                                        onClick={() => setStepper(false)}
                                    />
                                    <h3 className="font-semibold text-center text-xl mb-10">
                                        Update Customer Profile
                                    </h3>
                                </div>
                                {currentStep === 1 && (
                                    <div className="flex flex-col gap-y-4">
                                        <div className="grid grid-cols-2 gap-x-8">
                                            <Input
                                                placeholder="First Name *"
                                                name="FirstName"
                                                pattern="[A-Za-z]+"
                                                title="Only Alphabets are allowed"
                                                onChange={formChange}
                                                value={formData.FirstName}
                                            />
                                            <Input
                                                placeholder="Surname *"
                                                name="Surname"
                                                pattern="[A-Za-z]+"
                                                title="Only Alphabets are allowed"
                                                onChange={formChange}
                                                value={formData.Surname}
                                            />
                                        </div>
                                        <Input
                                            placeholder="Age *"
                                            name="Age"
                                            type="number"
                                            min="18"
                                            max="99"
                                            onChange={formChange}
                                            value={formData.Age}
                                            required
                                        />
                                        <Input
                                            placeholder="Date of Birth *"
                                            name="BirthDate"
                                            type="date"
                                            onChange={formChange}
                                            value={formData.BirthDate}
                                            required
                                        />
                                        <Input
                                            placeholder="Email Address *"
                                            name="EmailAddress"
                                            type="email"
                                            required
                                            onChange={formChange}
                                            value={formData.EmailAddress}
                                        />
                                        <Input
                                            placeholder="Phone Number *"
                                            name="PhoneNumber"
                                            type="number"
                                            required
                                            onChange={formChange}
                                            value={formData.PhoneNumber}
                                        />
                                        <Input
                                            placeholder="Residential Address *"
                                            name="ResidentialAddress"
                                            onChange={formChange}
                                            required
                                            value={formData.ResidentialAddress}
                                        />

                                        <div className="grid grid-cols-2 gap-x-7">
                                            <Select
                                                options={[
                                                    "Nigeria",
                                                    "Ghana",
                                                    "Togo",
                                                ]}
                                                title="Country *"
                                                name="Country"
                                                onChange={formChange}
                                                required
                                                value={formData.Country || null}
                                            />
                                            <Select
                                                options={states}
                                                title="State *"
                                                name="State"
                                                placeholder="state"
                                                onChange={formChange}
                                                required
                                                value={formData.state || null}
                                            />
                                        </div>
                                        <Input
                                            placeholder="Postal Code *"
                                            name="PostalCode"
                                            onChange={formChange}
                                            required
                                            value={formData.PostalCode}
                                        />
                                        <Input
                                            placeholder="Place of Birth *"
                                            name="PlaceOfBirth"
                                            onChange={formChange}
                                            required
                                            value={formData.PlaceOfBirth}
                                        />
                                        <Input
                                            placeholder="Occupation *"
                                            name="Occupation"
                                            pattern="^[A-Za-z]+[A-Za-z ]*$"
                                            title="Only Alphabets are allowed"
                                            onChange={formChange}
                                            required
                                            value={formData.Occupation}
                                        />
                                        <div className="grid grid-cols-2 gap-x-7">
                                            <Select
                                                options={[
                                                    "International Passport",
                                                    "Driver's License",
                                                    "National ID",
                                                    "Voters Card",
                                                ]}
                                                title="Type of ID *"
                                                required
                                                name="IdType"
                                                onChange={formChange}
                                                value={formData.IdType || null}
                                            />
                                            <Input
                                                placeholder="ID Number *"
                                                name="IdNumber"
                                                onChange={formChange}
                                                required
                                                type="number"
                                                value={formData.IdNumber}
                                            />
                                        </div>
                                        {(formData.IdType ===
                                            "Driver's License" ||
                                            formData.IdType ===
                                                "International Passport") && (
                                            <div className="grid grid-cols-2 gap-x-7">
                                                <Input
                                                    placeholder="ID Issue Date *"
                                                    name="IdIssueDate"
                                                    onChange={formChange}
                                                    required
                                                    type="date"
                                                    value={formData.IdIssueDate}
                                                />
                                                <Input
                                                    placeholder="Expiry Date *"
                                                    name="ExpiryDate"
                                                    onChange={formChange}
                                                    required
                                                    type="date"
                                                    value={formData.ExpiryDate}
                                                />
                                            </div>
                                        )}
                                        <Select
                                            options={[
                                                "Links Microfinance Bank",
                                                "Zenith Bank",
                                                "UBA",
                                                "GT Bank",
                                            ]}
                                            title="Bank Name *"
                                            required
                                            name="BankName"
                                            onChange={formChange}
                                            value={formData.BankName || null}
                                        />
                                        <div className="grid grid-cols-2 gap-x-7">
                                            <Input
                                                placeholder="Account Name *"
                                                name="AccountName"
                                                onChange={formChange}
                                                required
                                                pattern="^[A-Za-z]+[A-Za-z ]*$"
                                                title="Only Alphabets are allowed"
                                                value={formData.AccountName}
                                            />
                                            <Input
                                                placeholder="Account Number *"
                                                name="AccountNumber"
                                                type="number"
                                                onChange={formChange}
                                                required
                                                value={formData.AccountNumber}
                                            />
                                        </div>
                                        <Input
                                            placeholder="BVN *"
                                            name="BVN"
                                            onChange={formChange}
                                            required
                                            type="number"
                                            value={formData.BVN}
                                        />

                                        {/* <div className="relative">
                                        <div className="absolute">
                                            <Input
                                                placeholder="Date of Birth *"
                                                name="BirthDate"
                                                type="date"
                                                onChange={formChange}
                                                value={formData.BirthDate}
                                                ref={dobRef}
                                            />
                                        </div>
                                        <div
                                            className="h-[56px] flex items-center justify-between w-full text-base mt-2 placeholder-primary/40 px-4 cursor-pointer bg-white-lighter focus:ring-primary active:ring-primary shadow-sm border border-primary/5 rounded-lg"
                                            onClick={() =>
                                                // dob.current.setOpen(true)
                                                console.log(dobRef)
                                            }
                                        >
                                            <p>Date of Birth</p>
                                            <img alt="" src={chevronDown} />
                                        </div>
                                    </div> */}
                                    </div>
                                )}
                                {currentStep === 2 && (
                                    <div className="flex flex-col gap-y-4">
                                        <Input
                                            placeholder="Next of Kin Name *"
                                            name="NextOfKinName"
                                            onChange={formChange}
                                            pattern="^[A-Za-z]+[A-Za-z ]*$"
                                            title="Only Alphabets are allowed"
                                            required
                                            value={formData.NextOfKinName}
                                        />
                                        <Input
                                            placeholder="Next of Kin Address *"
                                            name="AddressNOK"
                                            onChange={formChange}
                                            required
                                            value={formData.AddressNOK}
                                        />
                                        <Input
                                            placeholder="Relationship With Next of Kin *"
                                            name="RelationshipWithNOK"
                                            pattern="^[A-Za-z]+[A-Za-z ]*$"
                                            title="Only Alphabets are allowed"
                                            onChange={formChange}
                                            required
                                            value={formData.RelationshipWithNOK}
                                        />
                                        <Input
                                            placeholder="Update Passport Photo *"
                                            name="PassportPhoto"
                                            onChange={formChange}
                                            type="file"
                                            uploaded={
                                                formData.PassportPhoto
                                                    ? true
                                                    : false
                                            }
                                            // values={formData?.PassportPhoto || null}
                                        />
                                        <Input
                                            placeholder="Update Valid ID (Govt ID) *"
                                            name="FormOfIdentity"
                                            onChange={formChange}
                                            type="file"
                                            uploaded={
                                                formData.FormOfIdentity
                                                    ? true
                                                    : false
                                            }
                                            // values={formData?.FormOfIdentity || null}
                                        />
                                        <Input
                                            placeholder="Update Utility Bill *"
                                            name="UtilityBill"
                                            onChange={formChange}
                                            type="file"
                                            uploaded={
                                                formData.UtilityBill
                                                    ? true
                                                    : false
                                            }
                                            // values={formData?.UtilityBill || null}
                                        />
                                        <Input
                                            placeholder="Update Signature *"
                                            name="UnitHolderSignature"
                                            onChange={formChange}
                                            type="file"
                                            uploaded={
                                                formData.UnitHolderSignature
                                                    ? true
                                                    : false
                                            }
                                            // values={
                                            //     formData?.UnitHolderSignature || null
                                            // }
                                        />
                                    </div>
                                )}
                            </div>

                            {/* <button type="button" onClick={accountOnboarding}>
                            sefsfsfgf
                        </button> */}

                            <div className="mt-14 flex justify-between">
                                <Button
                                    buttonType="md"
                                    onClick={prevFunction}
                                    type="button"
                                >
                                    {currentStep > 1 ? "Back" : "Cancel"}
                                </Button>

                                <button
                                    type="submit"
                                    className="w-[180px] border-primary border rounded-[8px] hover:bg-primary/5 font-semibold"
                                >
                                    {currentStep === 2 ? "Submit" : "Next"}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            )}
            {loading && <Loader />}
        </div>
    );
};

export default DashboardLayout;
