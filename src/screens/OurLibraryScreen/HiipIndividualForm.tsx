import React from "react";
import { toast } from "react-toastify";
import { Input, Select } from "../../components/FormElements";
import Loader from "../../components/LoaderComponent";
import StepperModal from "../../components/StepperComponent";
import { devInstance } from "../../store/devInstance";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { clearStepper, clearForm } from "../../store/stepperSlice";

type _props = {
    closeModal?: any;
    investment?: string;
    states?: Array<string>;
    formType?: any;
    setOpenStepper?: any;
};

// ​/api​/v1​/Transaction​/HIIPIndividualInvestment
const HiipIndividualForm = (props: _props) => {
    const { closeModal, states, setOpenStepper } = props;
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
        ProductName: "",
    });
    const { currentStepper }: any = useAppSelector((state) => state.stepper);

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
            title: "Form of Identity",
            value: formData.FormOfIdentity,
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
            // setTimeout(() => {
            //     setLoading(false);
            //     toast.success("Account Opened Successfully!");
            //     setOpenStepper(false);
            //     dispatch(clearStepper());
            //     navigate("/");
            // }, 3000);
            var data = new FormData();
            data.append("AccountName", formData.AccountName || "NA");
            data.append(
                "AccountNumber",
                formData.AccountNumber || "1234567890"
            );
            data.append("Age", formData.Age || "18");
            data.append("BirthDate", formData.BirthDate || "2022-01-01");
            data.append("BankName", formData.BankName || "NA");
            data.append("BVN", formData.BVN);
            data.append("CityNOK", formData.CityNOK || "NA");
            data.append("Country", formData.Country || "NA");
            data.append("EmailAddress", formData.EmailAddress);
            data.append("EmailAddressNOK", formData.EmailAddressNOK);
            data.append("ExpiryDate", formData.ExpiryDate || "2022-01-01");
            data.append("FormOfIdentity", formData.FormOfIdentity);
            data.append("IdIssueDate", formData.IdIssueDate || "2022-01-01");
            data.append("IdNumber", formData.IdNumber);
            data.append("IdType", formData.IdType || "NA");
            data.append(
                "InterestReinvestment",
                formData.InterestReinvestment || "true"
            );
            data.append("InvestmentAmount", formData.InvestmentAmount || "200");
            data.append(
                "IsAJointApplicant",
                formData.IsAJointApplicant || "true"
            );
            data.append("IsANewClient", formData.IsANewClient || "true");
            data.append(
                "JointApplicantsName",
                formData.JointApplicantsName || "NA"
            );
            data.append("NameNOK", formData.NameNOK || "NA");
            data.append("Nationality", formData.Nationality || "NA");
            data.append("Occupation", formData.Occupation || "NA");
            data.append("PassportPhoto", formData.PassportPhoto || "NA");
            data.append("PhoneNumber", formData.PhoneNumber || "NA");
            data.append(
                "PrefCommunicationMode",
                formData.PrefCommunicationMode
            );
            data.append("ProductName", "HIIP Individual");
            data.append(
                "RelationshipWithNOK",
                formData.RelationshipWithNOK || "NA"
            );
            data.append("ResidentialAddress", formData.ResidentialAddress);
            data.append(
                "ResidentialAddressNOK",
                formData.ResidentialAddressNOK
            );
            data.append("State", formData.State || "NA");
            data.append("UnitHolderSignature", formData.UnitHolderSignature);
            data.append("UtilityBill", formData.UtilityBill);
            data.append("HearAboutUs", formData.HearAboutUs);
            data.append("FirstName", formData.FirstName);
            data.append("Surname", formData.Surname);
            data.append(
                "ResidenceJurisdiction",
                formData.ResidenceJurisdiction
            );
            data.append("UsTin", formData.UsTin);

            var config = {
                method: "post",
                maxBodyLength: Infinity,
                url: "https://apps.dlm.group/ASSETMGTAPI/api/v1/Transaction/FixedIncomeFundInvestment",
                data: data,
            };

            devInstance(config)
                .then(function (response: any) {
                    console.log(JSON.stringify(response.data));
                    toast.success(
                        `${response.message || response.data.message}`
                    );
                    dispatch(clearStepper());
                    dispatch(clearForm());
                    setOpenStepper();
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
                                        name="IsANewClient"
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
                                        name="IsANewClient"
                                        type="radio"
                                        value="corporate"
                                        // onClick={() => setClient("false")}
                                    />
                                    Corporate
                                </div>
                            </div>
                            <div>
                                <Input
                                    placeholder="How much do you want to invest (Min of 10,000) *"
                                    name="InvestmentAmount"
                                    onChange={formChange}
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
                                    name="InvestmentFrequency "
                                    onChange={formChange}
                                    value={formData.HearAboutUs || null}
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

                            <Select
                                options={["Nigeria", "Ghana", "Togo"]}
                                title="Nationality *"
                                name="Nationality"
                                onChange={formChange}
                                required
                                value={formData.Nationality || null}
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
                        </div>
                    </div>
                )}
            </div>
            {loading && <Loader />}
        </StepperModal>
    );
};

export default HiipIndividualForm;
