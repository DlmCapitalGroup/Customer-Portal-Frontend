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

// ​/api​/v1​/Transaction​/HIIPIndividualInvestment
const HiipIndividualForm = (props: _props) => {
    const { closeModal, states, formType } = props;
    const dispatch = useAppDispatch();
    const [loading, setLoading] = React.useState(false);
    const [formData, setFormData]: any = React.useState({
        InvestmentAmount: "",
        InvestmentFrequency: "",
        FirstName: "",
        Surname: "",
        MiddleName: "",
        MotherMaidenName: "",
        Gender: "",
        BirthDate: "",
        BirthPlace: "",
        Occupation: "",
        Nationality: "",
        NextOfKinName: "",
        RelationshipWithNOK: "",
        PhoneNumberNOK: "",
        ContactAddressNOK: "",
        ResidentialAddress: "",
        PostalAddress: "",
        PhoneNumber: "",
        EmailAddress: "",
        PassportPhoto: "",
        UnitHolderSignature: "",
        EmploymentStatus: "",
        Employer: "",
        EmployerPhoneNumber: "",
        EmployerAddress: "",
        FundSource: "",
        GrossAnnualIncome: "",
        BankName: "",
        AccountName: "",
        AccountNumber: "",
        Branch: "",
        BVN: "",
    });
    const { customer }: any = useAppSelector((state) => state.auth);
    const { currentStepper }: any = useAppSelector((state) => state.stepper);

    React.useEffect(() => {
        devInstance
            .get(
                `/Transaction/GetCustomerOnboardingDetails/${customer.emailAddress}`
            )
            .then((res) => {
                console.log(res, "response");
                setFormData({
                    ...formData,
                    Surname: res.data.surname,
                    FirstName: res.data.firstName,
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
                    NameNOK: res.data.nextOfKinName,
                    ContactAddressNOK: res.data.addressNOK,
                    RelationshipWithNOK: res.data.relationshipWithNOK,
                    PassportPhoto: res.data.passportPhoto,
                    FormOfIdentity: res.data.formOfIdentity,
                    UtilityBill: res.data.utilityBill,
                    UnitHolderSignature: res.data.unitHolderSignature,
                });
            });
    }, []);

    function clearForm() {
        setFormData({
            InvestmentAmount: "",
            InvestmentFrequency: "",
            FirstName: "",
            Surname: "",
            MiddleName: "",
            MotherMaidenName: "",
            Gender: "",
            BirthDate: "",
            BirthPlace: "",
            Occupation: "",
            Nationality: "",
            NextOfKinName: "",
            RelationshipWithNOK: "",
            PhoneNumberNOK: "",
            ContactAddressNOK: "",
            ResidentialAddress: "",
            PostalAddress: "",
            PhoneNumber: "",
            EmailAddress: "",
            PassportPhoto: "",
            UnitHolderSignature: "",
            EmploymentStatus: "",
            Employer: "",
            EmployerPhoneNumber: "",
            EmployerAddress: "",
            FundSource: "",
            GrossAnnualIncome: "",
            BankName: "",
            AccountName: "",
            AccountNumber: "",
            Branch: "",
            BVN: "",
        });
    }

    const formChange = async (e: any) => {
        e.preventDefault();
        if (e.target.type === "radio") {
            if (e.target.value === "individual") {
                setFormData({
                    ...formData,
                    [e.target.name]: "HIIP Individual",
                });
            } else {
                if (e.target.value === "corporate") {
                    setFormData({
                        ...formData,
                        [e.target.name]: "HIIP Corporate",
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
                    toast.error(`${err}`);
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
            title: "Form of Identity",
            value: formData.UnitHolderSignature,
        },
    ];

    const openAccount = async (e: any) => {
        if (fileErrors[0].value === "") {
            toast.error(`${fileErrors[0].title} is required`);
        }
        if (fileErrors[1].value === "") {
            toast.error(`${fileErrors[1].title} is required`);
        }

        if (fileErrors[0].value && fileErrors[1].value) {
            setLoading(true);
            var data = new FormData();
            data.append("AccountName", formData.AccountName);
            data.append("AccountNumber", formData.AccountNumber);
            data.append("BankName", formData.BankName);
            data.append("BirthDate", formData.BirthDate);
            data.append("BirthPlace", formData.BirthPlace);
            data.append("Branch", formData.Branch);
            data.append("BVN", formData.BVN);
            data.append("ContactAddressNOK", formData.ContactAddressNOK);
            data.append("EmailAddress", formData.EmailAddress);
            data.append("Employer", formData.Employer);
            data.append("EmployerAddress", formData.EmployerAddress);
            data.append("EmployerPhoneNumber", formData.EmployerPhoneNumber);
            data.append("EmploymentStatus", formData.EmploymentStatus);
            data.append("FundSource", formData.FundSource);
            data.append("Gender", formData.Gender);
            data.append("GrossAnnualIncome", formData.GrossAnnualIncome);
            data.append("InvestmentAmount", formData.InvestmentAmount);
            data.append("InvestmentFrequency", formData.InvestmentFrequency);
            data.append("MiddleName", formData.MiddleName);
            data.append("MotherMaidenName", formData.MotherMaidenName);
            data.append("Nationality", formData.Nationality);
            data.append("NextOfKinName", formData.NextOfKinName);
            data.append("Occupation", formData.Occupation);
            data.append("PassportPhoto", formData.PassportPhoto);
            data.append("PhoneNumberNOK", formData.PhoneNumberNOK);
            data.append("PostalAddress", formData.PostalAddress);
            data.append(
                "ProductName",
                "High Interest Investment Plan (Individual)"
            );
            data.append("RelationshipWithNOK", formData.RelationshipWithNOK);
            data.append("ResidentialAddress", formData.ResidentialAddress);
            data.append("UnitHolderSignature", formData.UnitHolderSignature);
            data.append("FirstName", formData.FirstName);
            data.append("Surname", formData.Surname);
            data.append("PhoneNumber", formData.PhoneNumber);

            var config = {
                method: "post",
                maxBodyLength: Infinity,
                url: "https://apps.dlm.group/ASSETMGTAPI/api/v1/Transaction/HIIPIndividualInvestment",
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
                    toast.error("Error, Try Again");
                    setLoading(false);
                })
                .finally(() => setLoading(false));
        }
    };

    return (
        <StepperModal
            closeModal={closeModal}
            submitEvent={openAccount}
            stepperTitles={[
                "",
                "Customer Information",
                "Contact Details",
                "Employment & Bank Info",
            ]}
            amount={formData.InvestmentAmount}
            email={formData?.EmailAddress}
            phone={formData.PhoneNumber}
            firstname={formData.FirstName}
            lastname={formData.Surname}
        >
            <div className="text-primary">
                {currentStepper === 0 && (
                    <div>
                        <h3 className="text-xl font-semibold text-center mb-3">
                            High Interest Investment Plan
                        </h3>
                        <p className="mb-[29px] text-center">
                            Kindly fill the form to get started on your High
                            Interest Investment Plan
                        </p>
                        <div className="flex flex-col gap-y-4">
                            <div className="flex justify-between w-full">
                                <div className="flex items-center gap-x-3">
                                    <input
                                        className="border-primary checked:bg-primary focus:bg-primary focus:ring-primary checked:ring-primary"
                                        name="formType"
                                        type="radio"
                                        value="individual"
                                        checked
                                        // onClick={() => setFormType("true")}
                                    />
                                    Individual
                                </div>
                                <div className="flex items-center gap-x-3">
                                    <input
                                        className="border-primary checked:bg-primary"
                                        name="formType"
                                        type="radio"
                                        value="corporate"
                                        onClick={() => formType("corporate")}
                                    />
                                    Corporate
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
                                    value={formData.InvestmentAmount || null}
                                />
                            </div>
                            <div>
                                <Select
                                    options={["Weekly", "Monthly", "Yearly"]}
                                    required
                                    title="Investment Frquency *"
                                    name="InvestmentFrequency"
                                    onChange={formChange}
                                    value={formData.InvestmentFrequency || null}
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
                                    placeholder="Surname *"
                                    name="Surname"
                                    onChange={formChange}
                                    required
                                    pattern="[A-Za-z]+"
                                    title="Only Alphabets are allowed"
                                    value={formData.Surname}
                                    // value={customer?.lastName}
                                    // disabled
                                />
                            </div>
                            <Input
                                placeholder="Middle Name *"
                                name="MiddleName"
                                onChange={formChange}
                                required
                                pattern="[A-Za-z]+"
                                title="Only Alphabets are allowed"
                                value={formData.MiddleName}
                                // value={customer?.lastName}
                                // disabled
                            />
                            <Input
                                placeholder="Mother’s Maiden Name *"
                                name="MotherMaidenName"
                                onChange={formChange}
                                required
                                pattern="[A-Za-z]+"
                                title="Only Alphabets are allowed"
                                value={formData.MotherMaidenName}
                                // value={customer?.lastName}
                                // disabled
                            />
                            <div className="grid grid-cols-2 gap-x-7">
                                <Select
                                    options={["Male", "Female", "Other"]}
                                    title="Gender *"
                                    name="Gender"
                                    onChange={formChange}
                                    required
                                    value={formData.Gender || null}
                                />
                                <Input
                                    placeholder="Date Of Birth *"
                                    name="BirthDate"
                                    onChange={formChange}
                                    required
                                    type="date"
                                    value={formData.BirthDate || null}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-x-7">
                                <Input
                                    placeholder="Place Of Birth *"
                                    name="BirthPlace"
                                    onChange={formChange}
                                    pattern="^[A-Za-z]+[A-Za-z ]*$"
                                    title="Only Alphabets are allowed"
                                    required
                                    value={formData.BirthPlace}
                                />
                                <Input
                                    placeholder="Occupation *"
                                    name="Occupation"
                                    onChange={formChange}
                                    pattern="^[A-Za-z]+[A-Za-z ]*$"
                                    title="Only Alphabets are allowed"
                                    required
                                    value={formData.Occupation}
                                />
                            </div>
                            <Input
                                placeholder="Nationality *"
                                name="Nationality"
                                onChange={formChange}
                                pattern="^[A-Za-z]+[A-Za-z ]*$"
                                title="Only Alphabets are allowed"
                                required
                                value={formData.Nationality}
                            />

                            <div className="grid grid-cols-2 gap-x-7">
                                <Input
                                    placeholder="Next of Kin *"
                                    name="NextOfKinName"
                                    onChange={formChange}
                                    pattern="^[A-Za-z]+[A-Za-z ]*$"
                                    title="Only Alphabets are allowed"
                                    required
                                    value={formData.NextOfKinName}
                                />
                                <Input
                                    placeholder="Relationship *"
                                    name="RelationshipWithNOK"
                                    onChange={formChange}
                                    pattern="^[A-Za-z]+[A-Za-z ]*$"
                                    title="Only Alphabets are allowed"
                                    required
                                    value={formData.RelationshipWithNOK}
                                />
                            </div>
                            <Input
                                placeholder="Next of Kin Phone Number *"
                                name="PhoneNumberNOK"
                                type="number"
                                onChange={formChange}
                                required
                                value={formData.PhoneNumberNOK}
                            />
                            <Input
                                placeholder="Next of Kin Contact Address *"
                                name="ContactAddressNOK"
                                onChange={formChange}
                                required
                                value={formData.ContactAddressNOK}
                            />
                        </div>
                    </div>
                )}
                {currentStepper === 2 && (
                    <div>
                        <h3 className="text-xl font-semibold mb-[29px] text-center">
                            Contact Details
                        </h3>
                        <div className="flex flex-col gap-y-4">
                            <Input
                                placeholder="Residential Address *"
                                name="ResidentialAddress"
                                onChange={formChange}
                                required
                                value={formData.ResidentialAddress}
                            />
                            <Input
                                placeholder="Postal Address *"
                                name="PostalAddress"
                                onChange={formChange}
                                required
                                value={formData.PostalAddress}
                            />
                            <div className="grid grid-cols-2 gap-x-7">
                                <Input
                                    placeholder="Phone Number *"
                                    name="PhoneNumber"
                                    type="number"
                                    onChange={formChange}
                                    required
                                    value={formData.PhoneNumber}
                                />
                                <Input
                                    placeholder="Email Address *"
                                    name="EmailAddress"
                                    onChange={formChange}
                                    required
                                    type="email"
                                    value={formData.EmailAddress}
                                />
                            </div>
                            <Input
                                placeholder="Passport Picture *"
                                name="PassportPhoto"
                                onChange={formChange}
                                type="file"
                                uploaded={formData.PassportPhoto ? true : false}
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
                    </div>
                )}
                {currentStepper === 3 && (
                    <div>
                        <h3 className="text-xl font-semibold mb-[29px] text-center">
                            Employment Details
                        </h3>
                        <div className="flex flex-col gap-y-4">
                            <Select
                                options={[
                                    "Unemployed",
                                    "Employed",
                                    "Self Employed",
                                ]}
                                title="Employment Status *"
                                required
                                name="EmploymentStatus"
                                onChange={formChange}
                                value={formData.EmploymentStatus || null}
                            />
                            <Input
                                placeholder="Employer *"
                                name="Employer"
                                onChange={formChange}
                                required
                                value={formData.Employer}
                            />
                            <Input
                                placeholder="Employer’s Telephone Number *"
                                name="EmployerPhoneNumber"
                                type="number"
                                onChange={formChange}
                                required
                                value={formData.EmployerPhoneNumber}
                            />
                            <Input
                                placeholder="Employer/Employment Address *"
                                name="EmployerAddress"
                                onChange={formChange}
                                required
                                value={formData.EmployerAddress}
                            />
                            <Input
                                placeholder="Source of Funds *"
                                name="FundSource"
                                onChange={formChange}
                                required
                                value={formData.FundSource}
                            />
                            <Input
                                placeholder="Gross Annual Income Details *"
                                name="GrossAnnualIncome"
                                type="number"
                                onChange={formChange}
                                required
                                value={formData.GrossAnnualIncome}
                            />
                        </div>
                    </div>
                )}

                {currentStepper === 4 && (
                    <div>
                        <h3 className="text-xl font-semibold mb-[29px] text-center">
                            Banking Details
                        </h3>
                        <div className="flex flex-col gap-y-4">
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
                            <Input
                                placeholder="BVN *"
                                name="BVN"
                                onChange={formChange}
                                required
                                type="number"
                                value={formData.BVN}
                                disabled
                            />
                            <Input
                                placeholder="Branch *"
                                name="Branch"
                                onChange={formChange}
                                required
                                value={formData.Branch}
                                pattern="^[A-Za-z]+[A-Za-z ]*$"
                                title="Only Alphabets are allowed"
                            />
                            <p className="flex space-x-5 items-start text-base text-black mt-12">
                                <input
                                    type="checkbox"
                                    className="rounded-[5px] bg-white-lighter mt-1"
                                    required
                                />
                                <p className="-tracking-[.02em] text-xs">
                                    I confirm/hereby declare that the
                                    information provided above is complete and
                                    accurate to the best of my knowledge,
                                    belief, and understanding. I pledge to
                                    inform DLM Asset Management Limited
                                    immediately if there are any changes to this
                                    information. If any of the information
                                    provided is found to be false, untrue,
                                    misleading, or misrepresented, I understand
                                    that I may be held liable for it.
                                    <br />
                                    <br />
                                    I hereby give DLM Asset Management Limited
                                    permission to share any of the information
                                    provided in this form at its discretion.
                                    <br />
                                    <br />I acknowledge that a non-refundable
                                    charge of 10 naira (the naira should be in
                                    symbol) will be automatically debited from
                                    the linked bank account to add my card.
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

export default HiipIndividualForm;
