import React from "react";
import { toast } from "react-toastify";
import { Input, Select } from "../../components/FormElements";
import Loader from "../../components/LoaderComponent";
import StepperModal from "../../components/StepperComponent";
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

const RetirementPlanSubscription = (props: _props) => {
    const { closeModal, states, setOpenStepper } = props;
    const dispatch = useAppDispatch();
    const [loading, setLoading] = React.useState(false);
    const [formData, setFormData]: any = React.useState({
        InvestmentAmount: "",
        FirstName: "",
        LastName: "",
        Gender: "",
        Email: "",
        Age: "",
        Occupation: "",
        Address: "",
        StreetAddress: "",
        City: "",
        Country: "",
        PhoneNumber: "",
        IsExistRetirementPlan: "",
        TotalNetWorth: "",
        NoOfDependents: "",
        YearsOfWork: "",
        RetirementTime: "",
        RsaBalance: "",
        IsSalaryEarner: "",
        IsEntrepreneur: "",
        OtherIncomeSources: "",
        IsExistFinancialPlan: "",
        IsSecureCashFlow: "",
        InvestmentNotInterestedIn: "",
        EarningsExpectations: "",
        InvestmentPlanDetailsInFiveYears: "",
        Nationality: "",
        IsInterestedInFinPlanAdvisoryServices: "",
        KnowledgeLevelInInvestment: "",
        SubscriptionCategory: "",
        InvestmentFreq: "",
        AfterRetirementPlan: "",
        PassportPhoto: "",
        UtilityBill: "",
        MeansOfId: "",
        UnitHolderSignature: "",
        ProductName: "",
    });
    const { currentStepper }: any = useAppSelector((state) => state.stepper);

    function clearForm() {
        setFormData({
            InvestmentAmount: "",
            FirstName: "",
            LastName: "",
            Gender: "",
            Email: "",
            Age: "",
            Occupation: "",
            Address: "",
            StreetAddress: "",
            City: "",
            Country: "",
            PhoneNumber: "",
            IsExistRetirementPlan: "",
            TotalNetWorth: "",
            NoOfDependents: "",
            YearsOfWork: "",
            RetirementTime: "",
            RsaBalance: "",
            IsSalaryEarner: "",
            IsEntrepreneur: "",
            OtherIncomeSources: "",
            IsExistFinancialPlan: "",
            IsSecureCashFlow: "",
            InvestmentNotInterestedIn: "",
            EarningsExpectations: "",
            InvestmentPlanDetailsInFiveYears: "",
            Nationality: "",
            IsInterestedInFinPlanAdvisoryServices: "",
            KnowledgeLevelInInvestment: "",
            SubscriptionCategory: "",
            InvestmentFreq: "",
            AfterRetirementPlan: "",
            PassportPhoto: "",
            UtilityBill: "",
            MeansOfId: "",
            UnitHolderSignature: "",
            ProductName: "",
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
            title: "Means of ID",
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
            data.append("Address", formData.Address);
            data.append("AfterRetirementPlan", formData.AfterRetirementPlan);
            data.append("Age", formData.Age);
            data.append("City", formData.City);
            data.append("Country", formData.Country);
            data.append("EarningsExpectations", formData.EarningsExpectations);
            data.append("Email", formData.Email);
            data.append("FirstName", formData.FirstName);
            data.append("Gender", formData.Gender);
            data.append("InvestmentAmount", formData.InvestmentAmount);
            data.append("InvestmentFreq", formData.InvestmentFreq);
            data.append(
                "InvestmentNotInterestedIn",
                formData.InvestmentNotInterestedIn
            );
            data.append(
                "InvestmentPlanDetailsInFiveYears",
                formData.InvestmentPlanDetailsInFiveYears
            );
            data.append("IsEntrepreneur", formData.IsEntrepreneur);
            data.append("IsExistFinancialPlan", formData.IsExistFinancialPlan);
            data.append(
                "IsExistRetirementPlan",
                formData.IsExistRetirementPlan
            );
            data.append(
                "IsInterestedInFinPlanAdvisoryServices",
                formData.IsInterestedInFinPlanAdvisoryServices
            );
            data.append("IsSalaryEarner", formData.IsSalaryEarner);
            data.append("IsSecureCashFlow", formData.IsSecureCashFlow);
            data.append(
                "KnowledgeLevelInInvestment",
                formData.KnowledgeLevelInInvestment
            );
            data.append("LastName", formData.LastName);
            data.append("FirstName", formData.FirstName);
            data.append("MeansOfId", formData.MeansOfId);
            data.append("Nationality", formData.Nationality);
            data.append("NoOfDependents", formData.NoOfDependents);
            data.append("Occupation", formData.Occupation);
            data.append("OtherIncomeSources", formData.OtherIncomeSources);
            data.append("PassportPhoto", formData.PassportPhoto);
            data.append("PhoneNumber", formData.PhoneNumber);
            data.append("ProductName", "Retirement Plan Subscription");
            data.append("RetirementTime", formData.RetirementTime);
            data.append("RsaBalance", formData.RsaBalance);
            data.append("StreetAddress", formData.StreetAddress);
            data.append("SubscriptionCategory", formData.SubscriptionCategory);
            data.append("TotalNetWorth", formData.TotalNetWorth);
            data.append("UnitHolderSignature", formData.UnitHolderSignature);
            data.append("UtilityBill", formData.UtilityBill);
            data.append("YearsOfWork", formData.YearsOfWork);

            var config = {
                method: "post",
                maxBodyLength: Infinity,
                url: "https://apps.dlm.group/ASSETMGTAPI/api/v1/Transaction/RetirementPlanInvestment",
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
            stepperTitles={["", "Customer Information", "KYC"]}
            closeModal={closeModal}
            submitEvent={openAccount}
            rPlan
        >
            <div className="text-primary">
                {currentStepper === 0 && (
                    <div>
                        <h3 className="text-xl font-semibold text-center mb-3">
                            Retirement Plan Subscription
                        </h3>
                        <p className="mb-[29px] text-center">
                            Kindly fill the form to get started on your
                            Retirement Plan Subscription
                        </p>
                        <div className="flex flex-col gap-y-4">
                            <div>
                                <Input
                                    placeholder="How much do you want to invest (Min of 10,000) *"
                                    name="InvestmentAmount"
                                    onChange={formChange}
                                    required
                                    type="number"
                                    value={formData.InvestmentAmount}
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
                                />
                            </div>
                            <Select
                                options={["Male", "Female", "Other"]}
                                title="Gender *"
                                name="Gender"
                                onChange={formChange}
                                required
                                value={formData.Gender || null}
                            />
                            <Input
                                placeholder="Email Address *"
                                name="Email"
                                onChange={formChange}
                                required
                                type="email"
                                value={formData.Email}
                            />

                            <Input
                                placeholder="Age *"
                                name="Age"
                                onChange={formChange}
                                required
                                type="number"
                                min="18"
                                value={formData.Age}
                                // disabled
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
                                placeholder="Nationality  *"
                                name="Nationality"
                                onChange={formChange}
                                pattern="^[A-Za-z]+[A-Za-z ]*$"
                                title="Only Alphabets are allowed"
                                required
                                value={formData.Nationality || null}
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
                                options={["Yes", "No"]}
                                title="Do You Have An Existing Retirement Plan *"
                                name="IsExistRetirementPlan"
                                onChange={formChange}
                                required
                                value={formData.IsExistRetirementPlan || null}
                            />
                            <Input
                                placeholder="What is your total net-worth? *"
                                name="TotalNetWorth"
                                onChange={formChange}
                                type="number"
                                value={formData.TotalNetWorth}
                                required
                            />
                            <Input
                                placeholder="How many dependents do you have? *"
                                name="NoOfDependents"
                                onChange={formChange}
                                type="number"
                                value={formData.NoOfDependents}
                                required
                            />
                            <Input
                                placeholder="How many years have you been working? *"
                                name="YearsOfWork"
                                onChange={formChange}
                                type="number"
                                value={formData.YearsOfWork}
                                required
                            />
                            <Input
                                placeholder="When would you want to retire? *"
                                name="RetirementTime"
                                onChange={formChange}
                                value={formData.RetirementTime}
                                required
                            />
                            <Input
                                placeholder="How much do you have in your RSA *"
                                name="RsaBalance"
                                onChange={formChange}
                                type="number"
                                value={formData.RsaBalance}
                                required
                            />
                            <Select
                                options={["Yes", "No"]}
                                title="Are You A Salary Earner *"
                                name="IsSalaryEarner"
                                onChange={formChange}
                                value={formData.IsSalaryEarner || null}
                                required
                            />
                            <Select
                                options={["Yes", "No"]}
                                title="Are You An Entrepreneur *"
                                name="IsEntrepreneur"
                                onChange={formChange}
                                value={formData.IsEntrepreneur || null}
                                required
                            />
                            <Input
                                placeholder="Outside your primary job or business, what other income sources do you have? (you can list them) *"
                                name="OtherIncomeSources"
                                onChange={formChange}
                                required
                                value={formData.OtherIncomeSources}
                            />
                            <Select
                                options={["Yes", "No"]}
                                title="Do You Have An Existing Financial Plan *"
                                name="IsExistFinancialPlan"
                                onChange={formChange}
                                required
                                value={formData.IsExistFinancialPlan || null}
                            />
                            <Select
                                options={["Yes", "No"]}
                                title="Do You Have A Secure Cashflow? *"
                                name="IsSecureCashFlow"
                                onChange={formChange}
                                required
                                value={formData.IsSecureCashFlow || null}
                            />
                            <Select
                                options={[
                                    "Interest Bearing",
                                    "Gambling",
                                    "Tobacco & Cigarette",
                                    "Enviromental Polluting Assets",
                                    "I don't care",
                                    "Other",
                                ]}
                                title="What are the types of investments that do not align with your social beliefs (asset classes you do not want your funds invested in)? *"
                                name="InvestmentNotInterestedIn"
                                onChange={formChange}
                                required
                                value={
                                    formData.InvestmentNotInterestedIn || null
                                }
                            />
                            <textarea
                                name="EarningsExpectations"
                                onChange={formChange}
                                className="h-[110px] w-full text-base mt-2 placeholder-primary/40 px-4 bg-white-lighter focus:ring-primary active:ring-primary shadow-sm border border-primary/5 rounded-lg"
                                value={formData.EarningsExpectations}
                                placeholder="What are your expectations as it concerns earnings?"
                            ></textarea>
                            <textarea
                                name="InvestmentPlanDetailsInFiveYears"
                                onChange={formChange}
                                className="h-[110px] w-full text-base mt-2 placeholder-primary/40 px-4 bg-white-lighter focus:ring-primary active:ring-primary shadow-sm border border-primary/5 rounded-lg"
                                value={
                                    formData.InvestmentPlanDetailsInFiveYears
                                }
                                placeholder="kindly give details of your investment plan within the next 5 years."
                            ></textarea>

                            <Select
                                options={["Yes", "No"]}
                                title="Are you interested in our free financial planning advisory services? *"
                                name="IsInterestedInFinPlanAdvisoryServices"
                                onChange={formChange}
                                required
                                value={
                                    formData.IsInterestedInFinPlanAdvisoryServices ||
                                    null
                                }
                            />

                            <Select
                                options={[
                                    "Highly Knowledgeable",
                                    "Fairly Knowledgeable",
                                    "Not Knowledgeable",
                                ]}
                                title="What’s your level of knowledge regarding investments? *"
                                name="KnowledgeLevelInInvestment"
                                onChange={formChange}
                                required
                                value={
                                    formData.KnowledgeLevelInInvestment || null
                                }
                            />

                            <Select
                                options={[
                                    "Silver (Min of ₦20,000)",
                                    "Silver (Min of ₦100,000)",
                                    "Silver (Min of ₦250,000)",
                                    "Bespoke (Flexible)",
                                ]}
                                title="What category do you want to subscribe to? *"
                                name="SubscriptionCategory"
                                onChange={formChange}
                                required
                                value={formData.SubscriptionCategory || null}
                            />

                            <Input
                                placeholder="What would you like to do after retirement? *"
                                name="AfterRetirementPlan"
                                onChange={formChange}
                                required
                                value={formData.AfterRetirementPlan}
                            />
                        </div>
                    </div>
                )}

                {currentStepper === 2 && (
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
                                I hereby declare that the details furnished
                                above are true and correct to the best of my
                                knowledge, information and belief and i
                                undertake to inform DLM Asset Management Limited
                                of any changes therein, immediately in the event
                                that any of the above information is found to be
                                false or untrue or misleading or misrepresented,
                                I am aware that I may be held liable for it. I
                                hereby cosnsent to DLM Asset Management Limited
                                sharing any of the information furnished in this
                                form as it deems appropriate and as may be
                                required by regulatory authorities.
                            </p>
                        </p>
                    </div>
                )}
            </div>
            {loading && <Loader />}
        </StepperModal>
    );
};

export default RetirementPlanSubscription;
