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

const ChildEducationPlan = (props: _props) => {
    const { closeModal, states } = props;
    const dispatch = useAppDispatch();
    const [loading, setLoading] = React.useState(false);
    const [formData, setFormData]: any = React.useState({
        InvestmentAmount: "",
        FirstName: "",
        LastName: "",
        EmailAddress: "",
        Gender: "",
        BirthDate: "",
        Occupation: "",
        Nationality: "",
        Address: "",
        StreetAddress: "",
        City: "",
        State: "",
        Country: "",
        PhoneNumber: "",
        IsChildEducationExisting: "",
        TotalNetWorth: "",
        ChildrenNumberToEnrol: "",
        ChildFirstName: "",
        ChildLastName: "",
        ChildGender: "",
        ChildEmail: "",
        ChildSchoolName: "",
        ChildAge: "",
        ChildAddress: "",
        ChildStreetAddress: "",
        ChildCity: "",
        ChildState: "",
        ChildCountry: "",
        ChildPhoneNumber: "",
        ChildCurrentEduLevel: "",
        ChildCurrentClass: "",
        ChildCurrentTuition: "",
        LevelOfEduForChild: "",
        InvestmentPlan: "",
        ChildStudyCountry: "",
        InvestmentFreq: "",
        EstimatedChildEduTotalCost: "",
        IsTuitionFromInvestment: "",
        IsFreeEduAdvisoryService: "",
        ProductName: "",
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
                    EmailAddress: res.data.emailAddress,
                    PhoneNumber: res.data.phoneNumber,
                    Address: res.data.residentialAddress,
                    State: res.data.state,
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

    const openAccount = async (e: any) => {
        setLoading(true);
        var data = new FormData();
        data.append("Address", formData.Address);
        data.append("ChildAddress", formData.ChildAddress);
        data.append("ChildAge", formData.ChildAge);
        data.append("ChildCity", formData.ChildCity);
        data.append("ChildCountry", formData.ChildCountry);
        data.append("ChildCurrentClass", formData.ChildCurrentClass);
        data.append("ChildCurrentEduLevel", formData.ChildCurrentEduLevel);
        data.append("ChildCurrentTuition", formData.ChildCurrentTuition);
        data.append("ChildEmail", formData.ChildEmail);
        data.append("ChildFirstName", formData.ChildFirstName);
        data.append("ChildGender", formData.ChildGender);
        data.append("ChildLastName", formData.ChildLastName);
        data.append("ChildPhoneNumber", formData.ChildPhoneNumber);
        data.append("ChildrenNumberToEnrol", formData.ChildrenNumberToEnrol);
        data.append("ChildSchoolName", formData.ChildSchoolName);
        data.append("ChildState", formData.ChildState);
        data.append("ChildStreetAddress", formData.ChildStreetAddress);
        data.append("ChildStudyCountry", formData.ChildStudyCountry);
        data.append("City", formData.City);
        data.append("Country", formData.Country);
        data.append("EmailAddress", formData.EmailAddress);
        data.append(
            "EstimatedChildEduTotalCost",
            formData.EstimatedChildEduTotalCost
        );
        data.append("FirstName", formData.FirstName);
        data.append("Gender", formData.Gender);
        data.append("InvestmentAmount", formData.InvestmentAmount);
        data.append("InvestmentFreq", formData.InvestmentFreq);
        data.append("InvestmentPlan", formData.InvestmentPlan);
        data.append(
            "IsChildEducationExisting",
            formData.IsChildEducationExisting
        );
        data.append(
            "IsFreeEduAdvisoryService",
            formData.IsFreeEduAdvisoryService
        );
        data.append(
            "IsTuitionFromInvestment",
            formData.IsTuitionFromInvestment
        );
        data.append("LastName", formData.LastName);
        data.append("LevelOfEduForChild", formData.LevelOfEduForChild);
        data.append("Nationality", formData.Nationality);
        data.append("Occupation", formData.Occupation);
        data.append("PhoneNumber", formData.PhoneNumber);
        data.append("ProductName", "Child Education Plan");
        data.append("State", formData.State);
        data.append("StreetAddress", formData.StreetAddress);
        data.append("TotalNetWorth", formData.TotalNetWorth);
        data.append("BirthDate", formData.BirthDate);

        var config = {
            method: "post",
            maxBodyLength: Infinity,
            url: "https://apps.dlm.group/ASSETMGTAPI/api/v1/Transaction/ChildEducationPlan",
            headers: {
                "Content-Type": "multipart/form-data",
            },
            data: data,
        };

        devInstance(config)
            .then(function (response: any) {
                console.log(JSON.stringify(response.data));
                toast.success(`${response.message || response.data.message}`);
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
            cep
        >
            <div className="text-primary">
                {currentStepper === 0 && (
                    <div>
                        <h3 className="text-xl font-semibold text-center mb-3">
                            Child Education Plan
                        </h3>
                        <p className="mb-[29px] text-center">
                            Kindly fill the form to get started on your Child
                            Education Plan
                        </p>
                        <div className="flex flex-col gap-y-4">
                            <div>
                                <Input
                                    placeholder="How much do you want to invest (Min of 10,000) *"
                                    name="InvestmentAmount"
                                    onChange={formChange}
                                    required
                                    type="number"
                                    min={formatter(Number('10000'))}
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
                                name="EmailAddress"
                                onChange={formChange}
                                required
                                type="email"
                                value={formData.EmailAddress}
                            />

                            <Input
                                placeholder="Date Of Birth *"
                                name="BirthDate"
                                onChange={formChange}
                                required
                                type="date"
                                min="18"
                                value={formData.BirthDate}
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

                            <div className="grid grid-cols-2 gap-x-7">
                                <Select
                                    options={["Nigeria", "Ghana", "Togo"]}
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
                                    onChange={formChange}
                                    required
                                    value={formData.State || null}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-x-7">
                                <Input
                                    name="City"
                                    placeholder="City *"
                                    onChange={formChange}
                                    required
                                    value={formData.City || null}
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
                            </div>

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
                                title="Do you have an existing child education plan somewhere else? *"
                                name="IsChildEducationExisting"
                                onChange={formChange}
                                required
                                value={
                                    formData.IsChildEducationExisting || null
                                }
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
                                placeholder="Number of children you want to enrol *"
                                name="ChildrenNumberToEnrol"
                                onChange={formChange}
                                type="number"
                                value={formData.ChildrenNumberToEnrol}
                                required
                            />
                        </div>
                    </div>
                )}

                {currentStepper === 2 && (
                    <div>
                        <h3 className="text-xl font-semibold mb-[29px] text-center">
                            Your Child's Details
                        </h3>
                        <div className="flex flex-col gap-y-4">
                            <div className="grid grid-cols-2 gap-x-7">
                                <Input
                                    placeholder="First Name *"
                                    name="ChildFirstName"
                                    onChange={formChange}
                                    required
                                    value={formData.ChildFirstName}
                                    pattern="[A-Za-z]+"
                                    title="Only Alphabets are allowed"
                                />
                                <Input
                                    placeholder="last Name *"
                                    name="ChildLastName"
                                    onChange={formChange}
                                    required
                                    pattern="[A-Za-z]+"
                                    title="Only Alphabets are allowed"
                                    value={formData.ChildLastName}
                                />
                            </div>
                            <Select
                                options={["Male", "Female", "Other"]}
                                title="Gender *"
                                name="ChildGender"
                                onChange={formChange}
                                required
                                value={formData.ChildGender || null}
                            />
                            <Input
                                placeholder="Email Address *"
                                name="ChildEmail"
                                onChange={formChange}
                                required
                                type="email"
                                value={formData.ChildEmail}
                            />
                            <Input
                                placeholder="Name of School  *"
                                name="ChildSchoolName"
                                onChange={formChange}
                                pattern="^[A-Za-z]+[A-Za-z ]*$"
                                title="Only Alphabets are allowed"
                                required
                                value={formData.ChildSchoolName || null}
                            />
                            <Input
                                placeholder="Child's Age *"
                                name="ChildAge"
                                onChange={formChange}
                                type="number"
                                required
                                value={formData.ChildAge}
                            />
                            <Input
                                placeholder="Address *"
                                name="ChildAddress"
                                onChange={formChange}
                                required
                                value={formData.ChildAddress}
                            />
                            <Input
                                placeholder="Street Address *"
                                name="ChildStreetAddress"
                                onChange={formChange}
                                required
                                value={formData.ChildStreetAddress}
                            />
                            <div className="grid grid-cols-2 gap-x-7">
                                <Select
                                    options={["Nigeria", "Ghana", "Togo"]}
                                    title="Country *"
                                    name="ChildCountry"
                                    onChange={formChange}
                                    required
                                    value={formData.ChildCountry || null}
                                />
                                <Select
                                    options={states}
                                    title="State *"
                                    name="ChildState"
                                    onChange={formChange}
                                    required
                                    value={formData.ChildState || null}
                                />
                            </div>
                            <Input
                                name="ChildCity"
                                placeholder="City *"
                                onChange={formChange}
                                required
                                value={formData.ChildCity || null}
                            />
                            <Input
                                placeholder="Phone Number *"
                                name="ChildPhoneNumber"
                                onChange={formChange}
                                type="number"
                                required
                                value={formData.ChildPhoneNumber}
                            />
                            <Select
                                options={[
                                    "Pre-Elementary",
                                    "Elementary",
                                    "Primary",
                                    "Secondary",
                                    "Under-Graduate",
                                    "Graduate",
                                    "Post-Graduate",
                                ]}
                                title="Current Educational Level *"
                                name="ChildCurrentEduLevel"
                                onChange={formChange}
                                required
                                value={formData.ChildCurrentEduLevel || null}
                            />
                            <Input
                                placeholder="Current Class? *"
                                name="ChildCurrentClass"
                                onChange={formChange}
                                value={formData.ChildCurrentClass}
                                required
                            />
                            <Input
                                placeholder="Current Tuition (per term or session) *"
                                name="ChildCurrentTuition"
                                type="number"
                                onChange={formChange}
                                value={formData.ChildCurrentTuition}
                                required
                            />
                            <Select
                                options={[
                                    "Primary",
                                    "Secondary",
                                    "University",
                                    "Post-Graduate",
                                ]}
                                title="What level of education are you planning for your child? *"
                                name="LevelOfEduForChild"
                                onChange={formChange}
                                required
                                value={formData.LevelOfEduForChild || null}
                            />
                            <Select
                                options={[
                                    "Silver (Min of ₦20,000)",
                                    "Silver (Min of ₦100,000)",
                                    "Silver (Min of ₦250,000)",
                                    "Bespoke (Flexible)",
                                ]}
                                title="What category do you want to subscribe to? *"
                                name="InvestmentPlan"
                                onChange={formChange}
                                required
                                value={formData.InvestmentPlan || null}
                            />
                            <Select
                                options={["Home (Nigeria)", "Abroad (Foreign)"]}
                                required
                                title="Which country would you want your child to study in? *"
                                name="ChildStudyCountry"
                                onChange={formChange}
                                value={formData.ChildStudyCountry || null}
                            />
                            <Input
                                placeholder="What is the expected total cost of your child's education? (From current class to graduation)*"
                                name="EstimatedChildEduTotalCost"
                                onChange={formChange}
                                type="number"
                                required
                                value={formData.EstimatedChildEduTotalCost}
                            />
                            <Select
                                options={["Yes", "No"]}
                                required
                                title="Would you prefer we pay your child's school fees directly from the investment plan? *"
                                name="IsTuitionFromInvestment"
                                onChange={formChange}
                                value={formData.IsTuitionFromInvestment || null}
                            />
                            <Select
                                options={["Yes", "No"]}
                                required
                                title="Are you interested in our free educational advisory services? *"
                                name="IsFreeEduAdvisoryService"
                                onChange={formChange}
                                value={
                                    formData.IsFreeEduAdvisoryService || null
                                }
                            />
                            <p className="flex space-x-5 items-start text-base text-black mt-12">
                                <input
                                    type="checkbox"
                                    className="rounded-[5px] bg-white-lighter mt-1"
                                    required
                                />
                                <p className="-tracking-[.02em] text-xs">
                                    I confirm/hereby declare that the information provided above is complete and accurate to the best of my knowledge, belief, and understanding. I pledge to inform DLM Asset Management Limited immediately if there are any changes to this information. If any of the information provided is found to be false, untrue, misleading, or misrepresented, I understand that I may be held liable for it. 
                                    <br />
                                    <br />
                                    I hereby give DLM Asset Management Limited permission to share any of the information provided in this form at its discretion. 
                                    <br />
                                    <br />
                                    I acknowledge that a non-refundable charge of 10 naira (the naira should be in symbol) will be automatically debited from the linked bank account to add my card.
                                </p>
                            </p>
                        </div>
                    </div>
                )}
            </div>
            {loading && <Loader />}
        </StepperModal>
    );
};

export default ChildEducationPlan;
