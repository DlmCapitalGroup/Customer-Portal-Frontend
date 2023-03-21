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

const HiipCorporateForm = (props: _props) => {
    const { closeModal, states, formType } = props;
    const dispatch = useAppDispatch();
    const [loading, setLoading] = React.useState(false);
    const [formData, setFormData]: any = React.useState({
        InvestmentAmount: "",
        InvestmentFrequency: "",
        CompanyName: "",
        RegistrationDate: "",
        RCNumber: "",
        EmailAddress: "",
        ContactPersonFirstName: "",
        ContactPersonMiddleName: "",
        ContactPersonLastName: "",
        CorporatePhoneNumber: "",
        PassportPicture: "",
        BusinessNature: "",
        Industry: "",
        EmployerSize: "",
        AnnualRevenue: "",
        CompanyAddress: "",
        State: "",
        City: "",
        Country: "",
        Postalcode: "",
        Bank: "",
        AccountName: "",
        AccountNumber: "",
        Branch: "",
        BVN: "",
        ChiefContactSign: "",
        AccountOfficer: "",
        AccountOfficerSign: "",
        ComplianceOfficer: "",
        ComplianceOfficerSign: "",
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
                    Bank: res.data.Bank,
                    AccountName: res.data.accountName,
                    AccountNumber: res.data.accountNumber,
                    BVN: res.data.bvn,
                    NameNOK: res.data.NextOfKinName,
                    ResidentialAddressNOK: res.data.ContactAddressNOK,
                    RelationshipWithNOK: res.data.relationshipWithNOK,
                    PassportPicture: res.data.passportPhoto,
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
            CompanyName: "",
            RegistrationDate: "",
            RCNumber: "",
            EmailAddress: "",
            ContactPersonFirstName: "",
            ContactPersonMiddleName: "",
            ContactPersonLastName: "",
            CorporatePhoneNumber: "",
            PassportPicture: "",
            BusinessNature: "",
            Industry: "",
            EmployerSize: "",
            AnnualRevenue: "",
            CompanyAddress: "",
            State: "",
            City: "",
            Country: "",
            Postalcode: "",
            Bank: "",
            AccountName: "",
            AccountNumber: "",
            Branch: "",
            BVN: "",
            ChiefContactSign: "",
            AccountOfficer: "",
            AccountOfficerSign: "",
            ComplianceOfficer: "",
            ComplianceOfficerSign: "",
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
            value: formData.PassportPicture,
        },
        {
            title: "Chief Contact Signature",
            value: formData.ChiefContactSign,
        },
        {
            title: "Compliance Contact Signature",
            value: formData.ComplianceOfficerSign,
        },
        {
            title: "Account Officer Signature",
            value: formData.AccountOfficerSign,
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
            // setTimeout(() => {
            //     setLoading(false);
            //     toast.success("Account Opened Successfully!");
            //     setOpenStepper(false);
            //     dispatch(clearStepper());
            //     navigate("/");
            // }, 3000);
            var data = new FormData();
            data.append("AccountName", formData.AccountName);
            data.append("AccountNumber", formData.AccountNumber);
            data.append("AccountOfficer", formData.AccountOfficer);
            data.append("AccountOfficerSign", formData.AccountOfficerSign);
            data.append("AnnualRevenue", formData.AnnualRevenue);
            data.append("Bank", formData.Bank);
            data.append("Branch", formData.Branch);
            data.append("BusinessNature", formData.BusinessNature);
            data.append("BVN", formData.BVN);
            data.append("ChiefContactSign", formData.ChiefContactSign);
            data.append("City", formData.City);
            data.append("CompanyAddress", formData.CompanyAddress);
            data.append("CompanyName", formData.CompanyName);
            data.append("ComplianceOfficer", formData.ComplianceOfficer);
            data.append("ComplianceOfficerSign", formData.ComplianceOfficer);
            data.append(
                "ContactPersonFirstName",
                formData.ContactPersonFirstName
            );
            data.append(
                "ContactPersonLastName",
                formData.ContactPersonLastName
            );
            data.append(
                "ContactPersonMiddleName",
                formData.ContactPersonMiddleName
            );
            data.append("CorporatePhoneNumber", formData.CorporatePhoneNumber);
            data.append("Country", formData.Country);
            data.append("EmailAddress", formData.EmailAddress);
            data.append("EmployerSize", formData.EmployerSize);
            data.append("Industry", formData.Industry);
            data.append("InvestmentAmount", formData.InvestmentAmount);
            data.append("InvestmentFrequency", formData.InvestmentFrequency);
            data.append("PassportPicture", formData.PassportPicture);
            data.append("Postalcode", formData.Postalcode);
            data.append(
                "ProductName",
                "Corporate High Interest Investment Plan"
            );
            data.append("RCNumber", formData.RCNumber);
            data.append("RegistrationDate", formData.RegistrationDate);
            data.append("State", formData.State);

            var config = {
                method: "post",
                maxBodyLength: Infinity,
                url: "https://apps.dlm.group/ASSETMGTAPI/api/v1/Transaction/HIIPCorporateInvestment",
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

    return (
        <StepperModal
            closeModal={closeModal}
            submitEvent={openAccount}
            stepperTitles={[
                "",
                "Customer Info",
                "Contact Details",
                "Bank Info",
            ]}
            iCorp
            amount={formData.InvestmentAmount}
            email={formData?.EmailAddress}
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
                                        onClick={() => formType("individual")}
                                    />
                                    Individual
                                </div>
                                <div className="flex items-center gap-x-3">
                                    <input
                                        className="border-primary checked:bg-primary"
                                        name="formType"
                                        type="radio"
                                        checked
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
                            Company Information
                        </h3>
                        <div className="flex flex-col gap-y-4">
                            <Input
                                placeholder="Company/Business Name *"
                                name="CompanyName"
                                onChange={formChange}
                                required
                                value={formData.CompanyName}
                            />
                            <div className="grid grid-cols-2 gap-x-7">
                                <Input
                                    placeholder="Date of Registration *"
                                    name="RegistrationDate"
                                    onChange={formChange}
                                    type="date"
                                    required
                                    value={formData.RegistrationDate}
                                    // value={customer?.lastName}
                                    // disabled
                                />
                                <Input
                                    placeholder="RC Number *"
                                    name="RCNumber"
                                    onChange={formChange}
                                    required
                                    type="number"
                                    value={formData.RCNumber}
                                    // value={customer?.lastName}
                                    // disabled
                                />
                            </div>
                            <Input
                                placeholder="Email Address *"
                                name="EmailAddress"
                                onChange={formChange}
                                required
                                value={formData.EmailAddress}
                            />
                            <Input
                                placeholder="Contact Person’s First Name *"
                                name="ContactPersonFirstName"
                                onChange={formChange}
                                required
                                value={formData.ContactPersonFirstName}
                                pattern="[A-Za-z]+"
                                title="Only Alphabets are allowed"
                            />
                            <Input
                                placeholder="Contact Person’s Middle Name *"
                                name="ContactPersonMiddleName"
                                onChange={formChange}
                                required
                                pattern="[A-Za-z]+"
                                title="Only Alphabets are allowed"
                                value={formData.ContactPersonMiddleName}
                                // value={customer?.lastName}
                                // disabled
                            />
                            <Input
                                placeholder="Contact Person’s Last Name *"
                                name="ContactPersonLastName"
                                onChange={formChange}
                                required
                                pattern="[A-Za-z]+"
                                title="Only Alphabets are allowed"
                                value={formData.ContactPersonLastName}
                                // value={customer?.lastName}
                                // disabled
                            />

                            <Input
                                placeholder="Corporate Phone Number *"
                                name="CorporatePhoneNumber"
                                onChange={formChange}
                                required
                                type="number"
                                value={formData.CorporatePhoneNumber}
                            />

                            <Input
                                placeholder="Upload Passport Picture *"
                                name="PassportPicture"
                                onChange={formChange}
                                type="file"
                                uploaded={
                                    formData.PassportPicture ? true : false
                                }
                            />
                        </div>
                    </div>
                )}
                {currentStepper === 2 && (
                    <div>
                        <h3 className="text-xl font-semibold mb-[29px] text-center">
                            Company Contact Details
                        </h3>
                        <div className="flex flex-col gap-y-4">
                            <Input
                                placeholder="Nature of Business *"
                                name="BusinessNature"
                                onChange={formChange}
                                required
                                value={formData.BusinessNature}
                            />
                            <Input
                                placeholder="Industry *"
                                name="Industry"
                                onChange={formChange}
                                required
                                value={formData.Industry}
                            />
                            <Input
                                placeholder="Employer Size *"
                                name="EmployerSize"
                                type="number"
                                onChange={formChange}
                                required
                                value={formData.EmployerSize}
                            />
                            <Input
                                placeholder="Annual Revenue *"
                                name="AnnualRevenue"
                                type="number"
                                onChange={formChange}
                                required
                                value={formData.AnnualRevenue}
                            />
                            <Input
                                placeholder="Company Address *"
                                name="CompanyAddress"
                                onChange={formChange}
                                required
                                value={formData.CompanyAddress}
                            />
                            <div className="grid grid-cols-2 gap-x-7">
                                <Select
                                    options={states}
                                    title="State *"
                                    name="State"
                                    placeholder="state"
                                    onChange={formChange}
                                    required
                                    value={formData.State || null}
                                />
                                <Input
                                    placeholder="City *"
                                    name="City"
                                    onChange={formChange}
                                    required
                                    value={formData.City}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-x-7">
                                <Select
                                    options={["Nigeria", "Ghana", "Togo"]}
                                    title="Country *"
                                    name="Country"
                                    onChange={formChange}
                                    required
                                    value={formData.Country || null}
                                />
                                <Input
                                    placeholder="Postal Code *"
                                    name="Postalcode"
                                    onChange={formChange}
                                    type="number"
                                    required
                                    value={formData.Postalcode}
                                />
                            </div>
                            {/* <Input
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
                            /> */}
                        </div>
                    </div>
                )}
                {currentStepper === 3 && (
                    <div>
                        <h3 className="text-xl font-semibold mb-[29px] text-center">
                            Company Banking Details
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
                                name="Bank"
                                onChange={formChange}
                                value={formData.Bank || null}
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
                                placeholder="Branch *"
                                name="Branch"
                                onChange={formChange}
                                required
                                value={formData.Branch}
                                pattern="^[A-Za-z]+[A-Za-z ]*$"
                                title="Only Alphabets are allowed"
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
                                placeholder="Chief Contact Signature *"
                                name="ChiefContactSign"
                                onChange={formChange}
                                type="file"
                                uploaded={
                                    formData.ChiefContactSign ? true : false
                                }
                            />
                            <Input
                                placeholder="Account Officer *"
                                name="AccountOfficer"
                                onChange={formChange}
                                required
                                value={formData.AccountOfficer}
                                pattern="^[A-Za-z]+[A-Za-z ]*$"
                                title="Only Alphabets are allowed"
                            />
                            <Input
                                placeholder="Account Officer Signature *"
                                name="AccountOfficerSign"
                                onChange={formChange}
                                type="file"
                                uploaded={
                                    formData.AccountOfficerSign ? true : false
                                }
                            />
                            <Input
                                placeholder="Compliance Officer *"
                                name="ComplianceOfficer"
                                onChange={formChange}
                                required
                                value={formData.ComplianceOfficer}
                                pattern="^[A-Za-z]+[A-Za-z ]*$"
                                title="Only Alphabets are allowed"
                            />
                            <Input
                                placeholder="Compliance Officer Signature *"
                                name="ComplianceOfficerSign"
                                onChange={formChange}
                                type="file"
                                uploaded={
                                    formData.ComplianceOfficerSign
                                        ? true
                                        : false
                                }
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

export default HiipCorporateForm;
