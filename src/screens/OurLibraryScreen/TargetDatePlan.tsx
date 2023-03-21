import React from "react";
import { toast } from "react-toastify";
import { Input, Select } from "../../components/FormElements";
import Loader from "../../components/LoaderComponent";
import StepperModal from "../../components/StepperComponent";
import { formatter } from "../../helper";
import { devInstance } from "../../store/devInstance";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { clearStepper } from "../../store/stepperSlice";

type _props = {
    closeModal?: any;
    investment?: string;
    states?: Array<string>;
    formType?: any;
    setOpenStepper?: any;
};

const TargetDatePlan = (props: _props) => {
    const { closeModal, states, setOpenStepper } = props;
    const dispatch = useAppDispatch();
    const [loading, setLoading] = React.useState(false);
    const [formData, setFormData]: any = React.useState({
        IsNewClient: "true",
        InvestmentAmount: "",
        GoalToAchieve: "",
        EstimatedAmountForGoal: "",
        ExpectedDateForGoalAchievement: "",
        InvestmentFreq: "",
        InvestmentAmountPerTime: "",
        HeardAboutUs: "",
        FirstName: "",
        LastName: "",
        Email: "",
        Address: "",
        StreetAddress: "",
        City: "",
        Country: "",
        Date: "",
        Nationality: "",
        Occupation: "",
        PhoneNumber: "",
        IdType: "",
        FirstNameNok: "",
        LastNameNok: "",
        AddressNok: "",
        StreetAddressNok: "",
        CityNok: "",
        CountryNok: "",
        PhoneNumberNok: "",
        EmailNok: "",
        RelationshipWithNok: "",
        PreferredCommunicationMode: "",
        AccountName: "",
        AccountNumber: "",
        BankName: "",
        BVN: "",
        PassportPhoto: "",
        MeansOfId: "",
        UtilityBill: "",
        UnitHolderSignature: "",
    });

    const { currentStepper }: any = useAppSelector((state) => state.stepper);
    const { customer }: any = useAppSelector((state) => state.auth);

    React.useEffect(() => {
        devInstance
            .get(
                `/Transaction/GetCustomerOnboardingDetails/${customer.emailAddress}`
            )
            .then((res) => {
                console.log(res, "response");
                setFormData({
                    ...formData,
                    LastName: res.data.surname,
                    FirstName: res.data.firstName,
                    Age: res.data.age,
                    BirthDate: res.data.birthDate.slice(0, 10),
                    Email: res.data.emailAddress,
                    PhoneNumber: res.data.phoneNumber,
                    Address: res.data.residentialAddress,
                    State: res.data.state,
                    Nationality: res.data.country,
                    Country: res.data.country,
                    Occupation: res.data.occupation,
                    IdType: res.data.idType,
                    IdNumber: res.data.idNumber,
                    BankName: res.data.bankName,
                    AccountName: res.data.accountName,
                    AccountNumber: res.data.accountNumber,
                    BVN: res.data.bvn,
                    NameNOK: res.data.nextOfKinName,
                    AddressNok: res.data.addressNOK,
                    RelationshipWithNOK: res.data.relationshipWithNOK,
                    PassportPhoto: res.data.passportPhoto,
                    MeansOfId: res.data.formOfIdentity,
                    UtilityBill: res.data.utilityBill,
                    UnitHolderSignature: res.data.unitHolderSignature,
                });
            });
    }, []);

    function clearForm() {
        setFormData({
            IsNewClient: "true",
            InvestmentAmount: "",
            GoalToAchieve: "",
            EstimatedAmountForGoal: "",
            ExpectedDateForGoalAchievement: "",
            InvestmentFreq: "",
            InvestmentAmountPerTime: "",
            HeardAboutUs: "",
            FirstName: "",
            LastName: "",
            Email: "",
            Address: "",
            StreetAddress: "",
            City: "",
            Country: "",
            Date: "",
            Nationality: "",
            Occupation: "",
            PhoneNumber: "",
            IdType: "",
            FirstNameNok: "",
            LastNameNok: "",
            AddressNok: "",
            StreetAddressNok: "",
            CityNok: "",
            CountryNok: "",
            PhoneNumberNok: "",
            EmailNok: "",
            RelationshipWithNok: "",
            PreferredCommunicationMode: "",
            AccountName: "",
            AccountNumber: "",
            BankName: "",
            BVN: "",
            PassportPhoto: "",
            MeansOfId: "",
            UtilityBill: "",
            UnitHolderSignature: "",
        });
    }

    const formChange = async (e: any) => {
        e.preventDefault();
        if (e.target.type === "radio") {
            if (e.target.value === "Yes") {
                setFormData({
                    ...formData,
                    [e.target.name]: "true",
                });
            } else {
                if (e.target.value === "No") {
                    setFormData({
                        ...formData,
                        [e.target.name]: "False",
                    });
                }
            }
        } else if (e.target.type === "file") {
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
                    setLoading(false);
                    toast(`${err}`);
                })
                .finally(() => setLoading(false));
        } else {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value,
            });
        }
        console.log(formData);
    };

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
            title: "Means Of ID",
            value: formData.MeansOfId,
        },
    ];

    const openAccount = async (e: any) => {
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
            data.append("Address", formData.Address);
            data.append("AddressNok", formData.AddressNok);
            data.append("BankName", formData.BankName);
            data.append("BVN", formData.BVN);
            data.append("City", formData.City);
            data.append("CityNok", formData.CityNok);
            data.append("CountryNok", formData.CountryNok);
            data.append("Date", formData.Date);
            data.append("Email", formData.EmailAddress);
            data.append("EmailNok", formData.EmailNok);
            data.append(
                "EstimatedAmountForGoal",
                formData.EstimatedAmountForGoal
            );
            data.append(
                "ExpectedDateForGoalAchievement",
                formData.ExpectedDateForGoalAchievement
            );
            data.append("FirstName", formData.FirstName);
            data.append("FirstNameNok", formData.FirstNameNok);
            data.append("GoalToAchieve", formData.GoalToAchieve);
            data.append("IdType", formData.IdType);
            data.append("InvestmentAmount", formData.InvestmentAmount);
            data.append(
                "InvestmentAmountPerTime",
                formData.InvestmentAmountPerTime
            );
            data.append("InvestmentFreq", formData.InvestmentFreq);
            data.append("IsNewClient", formData.IsNewClient);
            data.append("LastName", formData.LastName);
            data.append("LastNameNok", formData.LastNameNok);
            data.append("MeansOfId", formData.MeansOfId);
            data.append("Nationality", formData.Nationality);
            data.append("Occupation", formData.Occupation);
            data.append("PassportPhoto", formData.PassportPhoto);
            data.append("PhoneNumber", formData.PhoneNumber);
            data.append("PhoneNumberNok", formData.PhoneNumberNok);
            data.append(
                "PreferredCommunicationMode",
                formData.PreferredCommunicationMode
            );
            data.append("ProductName", "Target Date Plan");
            data.append("RelationshipWithNok", formData.RelationshipWithNok);
            data.append("StreetAddress", formData.StreetAddress);
            data.append("StreetAddressNok", formData.StreetAddressNok);
            data.append("UnitHolderSignature", formData.UnitHolderSignature);
            data.append("UtilityBill", formData.UtilityBill);
            data.append("HeardAboutUs", formData.HeardAboutUs);
            data.append("Country", formData.Country);

            var config = {
                method: "post",
                maxBodyLength: Infinity,
                url: "https://apps.dlm.group/ASSETMGTAPI/api/v1/Transaction/TargetDatePlanInvestment",
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                data: data,
            };

            devInstance(config)
                .then(function (response: any) {
                    console.log(JSON.stringify(response.data));
                    toast.success(
                        `${response.message || response.data.message}`
                    );
                    dispatch(clearStepper());
                    clearForm();
                    closeModal();
                })
                .catch(function (error: any) {
                    console.log(error);
                    toast.error("error");
                    setLoading(false);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    };

    function setClient(value: any) {
        setFormData({
            ...formData,
            IsANewClient: value,
        });

        console.log(formData);
    }

    return (
        <StepperModal 
            amount={formData.InvestmentAmount}
            email={formData?.EmailAddress} 
            closeModal={closeModal} 
            submitEvent={openAccount}
        >
            <div className="text-primary">
                {currentStepper === 0 && (
                    <div>
                        <h3 className="text-xl font-semibold text-center mb-3">
                            Target Date Plan Investment
                        </h3>
                        <p className="mb-[29px] text-center">
                            Kindly fill the form to get started on your Target
                            Date Plan Investment
                        </p>
                        <div className="flex flex-col gap-y-4">
                            <div className="flex justify-between w-full">
                                <div className="flex items-center gap-x-3">
                                    <input
                                        className="border-primary checked:bg-primary focus:bg-primary focus:ring-primary checked:ring-primary"
                                        name="IsNewClient"
                                        type="radio"
                                        checked
                                        onClick={() => setClient("true")}
                                    />
                                    I am a new client
                                </div>
                                <div className="flex items-center gap-x-3">
                                    <input
                                        className="border-primary checked:bg-primary"
                                        name="IsNewClient"
                                        type="radio"
                                        value="No"
                                        onClick={() => setClient("false")}
                                    />
                                    I am an existing client
                                </div>
                            </div>
                            <div>
                                <Input
                                    placeholder="How much do you want to invest (Min of 10,000) *"
                                    name="InvestmentAmount"
                                    onChange={formChange}
                                    min={formatter(Number("10000"))}
                                    required
                                    type="number"
                                    value={formData.InvestmentAmount}
                                />
                            </div>
                            <div>
                                <Input
                                    placeholder="Goal To Achieve"
                                    name="GoalToAchieve"
                                    onChange={formChange}
                                    value={formData.GoalToAchieve}
                                />
                            </div>
                            <div>
                                <Input
                                    placeholder="Estimated Amount For Goal"
                                    name="EstimatedAmountForGoal"
                                    onChange={formChange}
                                    required
                                    type="number"
                                    value={
                                        formData.EstimatedAmountForGoal || null
                                    }
                                />
                            </div>
                            <div>
                                <Input
                                    placeholder="Estimated Date For Goal Achievement"
                                    name="ExpectedDateForGoalAchievement"
                                    onChange={formChange}
                                    required
                                    type="date"
                                    value={
                                        formData.ExpectedDateForGoalAchievement ||
                                        null
                                    }
                                />
                            </div>
                            <div>
                                <Select
                                    options={["Weekly", "Monthly", "Yearly"]}
                                    required
                                    title="Investment Frquency *"
                                    name="InvestmentFreq"
                                    onChange={formChange}
                                    value={formData.InvestmentFreq || null}
                                />
                            </div>
                            <div>
                                <Input
                                    placeholder="Investment Amount PerTime"
                                    name="InvestmentAmountPerTime"
                                    onChange={formChange}
                                    required
                                    type="number"
                                    value={
                                        formData.InvestmentAmountPerTime || null
                                    }
                                />
                            </div>
                            <div>
                                <Select
                                    options={[
                                        "Referral/ Word of Mouth",
                                        "Google Search",
                                        "Instagram",
                                        "Twitter",
                                        "Facebook",
                                        "Others",
                                    ]}
                                    required
                                    title="How did you hear about us? *"
                                    name="HeardAboutUs"
                                    onChange={formChange}
                                    value={formData.HeardAboutUs || null}
                                />
                            </div>
                        </div>
                    </div>
                )}
                {currentStepper === 1 && (
                    <div>
                        <h3 className="text-xl font-semibold mb-[29px] text-center">
                            Customer Information
                        </h3>
                        <div className="flex flex-col gap-y-4">
                            <div className="grid grid-cols-2 gap-x-7">
                                <Input
                                    placeholder="First Name *"
                                    name="FirstName"
                                    onChange={formChange}
                                    required
                                    value={formData.FirstName}
                                    pattern="[A-Za-z]+"
                                    title="Only Alphabets are allowed"
                                />
                                <Input
                                    placeholder="last Name *"
                                    name="LastName"
                                    onChange={formChange}
                                    required
                                    pattern="[A-Za-z]+"
                                    title="Only Alphabets are allowed"
                                    value={formData.LastName}
                                    // value={customer?.lastName}
                                    // disabled
                                />
                            </div>
                            <Input
                                placeholder="Email Address *"
                                name="Email"
                                onChange={formChange}
                                required
                                type="email"
                                value={formData.Email}
                            />
                            <Input
                                placeholder="Address *"
                                name="Address"
                                onChange={formChange}
                                required
                                value={formData.Address}
                            />
                            <Input
                                placeholder="Street Address *"
                                name="StreetAddress"
                                onChange={formChange}
                                required
                                value={formData.StreetAddress}
                            />
                            {/* <Input
                                placeholder="Phone Number *"
                                name="PhoneNumber"
                                type="number"
                                onChange={formChange}
                                required
                                value={formData.PhoneNumber}
                            /> */}
                            {/* <Input
                                placeholder="Residential Address *"
                                name="ResidentialAddress"
                                onChange={formChange}
                                required
                                value={formData.ResidentialAddress}
                            /> */}
                            <div className="grid grid-cols-2 gap-x-7">
                                <Input
                                    name="City"
                                    placeholder="City"
                                    onChange={formChange}
                                    required
                                    value={formData.City || null}
                                />
                                <Select
                                    options={["Nigeria", "Ghana", "Togo"]}
                                    title="Country *"
                                    name="Country"
                                    onChange={formChange}
                                    required
                                    value={formData.Country || null}
                                />
                            </div>
                            <Input
                                placeholder="Date  *"
                                name="Date"
                                onChange={formChange}
                                type="date"
                                required
                                value={formData.Date || null}
                            />
                            <Input
                                placeholder="Nationality  *"
                                name="Nationality"
                                onChange={formChange}
                                pattern="^[A-Za-z]+[A-Za-z ]*$"
                                title="Only Alphabets are allowed"
                                required
                                value={formData.Nationality || null}
                            />
                            <Input
                                placeholder="Occupation  *"
                                name="Occupation"
                                onChange={formChange}
                                pattern="^[A-Za-z]+[A-Za-z ]*$"
                                title="Only Alphabets are allowed"
                                required
                                value={formData.Occupation || null}
                            />
                            <Input
                                placeholder="Phone Number  *"
                                name="PhoneNumber"
                                onChange={formChange}
                                type="number"
                                required
                                value={formData.PhoneNumber}
                            />
                            <Select
                                options={[
                                    "International Passport",
                                    "Driver's License",
                                    "National ID",
                                    "Voters Card",
                                ]}
                                title="Type of ID *"
                                name="IdType"
                                onChange={formChange}
                                value={formData.IdType || null}
                            />
                        </div>
                    </div>
                )}
                {currentStepper === 2 && (
                    <div>
                        <h3 className="text-xl font-semibold mb-[29px] text-center">
                            Next of Kin
                        </h3>
                        <div className="flex flex-col gap-y-4">
                            <Input
                                placeholder="First Name of Next of Kin's *"
                                name="FirstNameNok"
                                onChange={formChange}
                                pattern="^[A-Za-z]+[A-Za-z ]*$"
                                title="Only Alphabets are allowed"
                                required
                                value={formData.FirstNameNok}
                            />
                            <Input
                                placeholder="Last Name of Next of Kin *"
                                name="LastNameNok"
                                onChange={formChange}
                                pattern="^[A-Za-z]+[A-Za-z ]*$"
                                title="Only Alphabets are allowed"
                                required
                                value={formData.LastNameNok}
                            />
                            <Input
                                placeholder="Address *"
                                name="AddressNok"
                                onChange={formChange}
                                required
                                value={formData.AddressNok}
                            />
                            <Input
                                placeholder="Street Address *"
                                name="StreetAddressNok"
                                onChange={formChange}
                                required
                                value={formData.StreetAddressNok}
                            />

                            <div className="grid grid-cols-2 gap-x-7">
                                <Input
                                    placeholder="City *"
                                    name="CityNok"
                                    onChange={formChange}
                                    required
                                    pattern="^[A-Za-z]+[A-Za-z ]*$"
                                    title="Only Alphabets are allowed"
                                    value={formData.CityNok}
                                />
                                <Select
                                    options={["Nigeria", "Ghana", "Togo"]}
                                    title="Country *"
                                    name="CountryNok"
                                    onChange={formChange}
                                    required
                                    value={formData.CountryNok || null}
                                />
                            </div>
                            <Input
                                placeholder="Phone Number  *"
                                name="PhoneNumberNok"
                                onChange={formChange}
                                type="number"
                                required
                                value={formData.PhoneNumberNok}
                            />
                            <Input
                                placeholder="Email Address *"
                                name="EmailNok"
                                onChange={formChange}
                                required
                                type="email"
                                value={formData.EmailNok}
                            />
                            <Input
                                placeholder="Relationship with Next of Kin *"
                                name="RelationshipWithNok"
                                pattern="^[A-Za-z]+[A-Za-z ]*$"
                                title="Only Alphabets are allowed"
                                onChange={formChange}
                                required
                                value={formData.RelationshipWithNok}
                            />
                            <Select
                                options={["Email", "SMS", "Phone Call"]}
                                title="Preferred Mode of Communication *"
                                name="PreferredCommunicationMode"
                                onChange={formChange}
                                required
                                value={
                                    formData.PreferredCommunicationMode || null
                                }
                            />
                        </div>
                    </div>
                )}
                {currentStepper === 3 && (
                    <div>
                        <h3 className="text-xl font-semibold mb-[29px] text-center">
                            Bank Information
                        </h3>
                        <div className="flex flex-col gap-y-4">
                            <Input
                                placeholder="Account Name *"
                                name="AccountName"
                                onChange={formChange}
                                required
                                value={formData.AccountName}
                                pattern="^[A-Za-z]+[A-Za-z ]*$"
                                title="Only Alphabets are allowed"
                            />
                            <Input
                                placeholder="Account Number *"
                                name="AccountNumber"
                                onChange={formChange}
                                required
                                type="number"
                                value={formData.AccountNumber}
                            />
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
                            <Input
                                placeholder="BVN *"
                                name="BVN"
                                onChange={formChange}
                                required
                                type="number"
                                value={formData.BVN}
                            />
                        </div>
                    </div>
                )}

                {currentStepper === 4 && (
                    <div>
                        <h3 className="text-xl font-semibold mb-[29px] text-center">
                            KYC Information
                        </h3>
                        <div className="flex flex-col gap-y-4">
                            <Input
                                placeholder="Passport Picture *"
                                name="PassportPhoto"
                                onChange={formChange}
                                type="file"
                                uploaded={formData.PassportPhoto ? true : false}
                            />
                            <Input
                                placeholder="Means Of ID *"
                                name="MeansOfId"
                                onChange={formChange}
                                type="file"
                                uploaded={formData.MeansOfId ? true : false}
                            />
                            <Input
                                placeholder="Utility Bill *"
                                name="UtilityBill"
                                onChange={formChange}
                                type="file"
                                uploaded={formData.UtilityBill ? true : false}
                            />
                            <Input
                                placeholder="Unit holder signature *"
                                name="UnitHolderSignature"
                                onChange={formChange}
                                type="file"
                                uploaded={
                                    formData.UnitHolderSignature ? true : false
                                }
                            />
                        </div>
                        <p className="flex space-x-5 items-start text-base text-black mt-12">
                            <input
                                type="checkbox"
                                className="rounded-[5px] bg-white-lighter mt-1"
                                required
                            />
                            <p className="-tracking-[.02em] text-xs">
                                I confirm/hereby declare that the information
                                provided above is complete and accurate to the
                                best of my knowledge, belief, and understanding.
                                I pledge to inform DLM Asset Management Limited
                                immediately if there are any changes to this
                                information. If any of the information provided
                                is found to be false, untrue, misleading, or
                                misrepresented, I understand that I may be held
                                liable for it.
                                <br />
                                <br />
                                I hereby give DLM Asset Management Limited
                                permission to share any of the information
                                provided in this form at its discretion.
                                <br />
                                <br />I acknowledge that a non-refundable charge
                                of 10 naira (the naira should be in symbol) will
                                be automatically debited from the linked bank
                                account to add my card.
                            </p>
                        </p>
                    </div>
                )}
            </div>
            {loading && <Loader />}
        </StepperModal>
    );
};

export default TargetDatePlan;
