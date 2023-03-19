import React, { useState } from "react";
import { toast } from "react-toastify";
import { Input, Select } from "../../components/FormElements";
import StepperModal from "../../components/StepperComponent";
import { setLoading } from "../../store/auth-slice";
import { devInstance } from "../../store/devInstance";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { clearStepper } from "../../store/stepperSlice";

interface _props {
    closeModal?: any;
    states?: Array<any>;
}

const FixedIncomeFund = (props: _props) => {
    const { closeModal, states } = props;
    const dispatch = useAppDispatch();
    const { currentStepper } = useAppSelector((state) => state.stepper);
    const [formData, setFormData]: any = useState({
        IsANewClient: "true",
        InvestmentAmount: "",
        HearAboutUs: "",
        IsAJointApplicant: "",
        JointApplicantsName: "",
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
        IdIssueDate: "",
        ExpiryDate: "",
        NameNOK: "",
        ResidentialAddressNOK: "",
        CityNOK: "",
        EmailAddressNOK: "",
        RelationshipWithNOK: "",
        PrefCommunicationMode: "",
        AccountName: "",
        AccountNumber: "",
        BankName: "",
        BVN: "",
        InterestReinvestment: "",
        Nationality: "",
        ResidenceJurisdiction: "",
        UsTin: "",
        PassportPhoto: "",
        FormOfIdentity: "",
        UtilityBill: "",
        UnitHolderSignature: "",
    });

    function clearForm() {
        setFormData({
            IsANewClient: "true",
            InvestmentAmount: "",
            HearAboutUs: "",
            IsAJointApplicant: "",
            JointApplicantsName: "",
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
            IdIssueDate: "",
            ExpiryDate: "",
            NameNOK: "",
            ResidentialAddressNOK: "",
            CityNOK: "",
            EmailAddressNOK: "",
            RelationshipWithNOK: "",
            PrefCommunicationMode: "",
            AccountName: "",
            AccountNumber: "",
            BankName: "",
            BVN: "",
            InterestReinvestment: "",
            Nationality: "",
            ResidenceJurisdiction: "",
            UsTin: "",
            PassportPhoto: "",
            FormOfIdentity: "",
            UtilityBill: "",
            UnitHolderSignature: "",
        });
    }

    function setClient(value: any) {
        setFormData({
            ...formData,
            IsANewClient: value,
        });
        console.log(formData);
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
            data.append("ProductName", "Fixed Income Fund");
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
                    clearForm();
                    closeModal();
                })
                .catch(function (error: any) {
                    console.log(error);
                    toast.error("Error, Try Again");
                    setLoading(false);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    };

    return (
        <StepperModal closeModal={closeModal} submitEvent={openAccount}>
            <div className="text-primary">
                {currentStepper === 0 && (
                    <div>
                        <h3 className="text-xl font-semibold text-center mb-3">
                            Fixed Income Fund Investment
                        </h3>
                        <p className="mb-[29px] text-center">
                            Kindly fill the form to get started on your fixed
                            income fund investment
                        </p>
                        <div className="flex flex-col gap-y-4">
                            <div className="flex justify-between w-full">
                                <div className="flex items-center gap-x-3">
                                    <input
                                        className="border-primary checked:bg-primary focus:bg-primary focus:ring-primary checked:ring-primary"
                                        name="IsANewClient"
                                        type="radio"
                                        checked
                                        onClick={() => setClient("true")}
                                    />
                                    I am a new client
                                </div>
                                <div className="flex items-center gap-x-3">
                                    <input
                                        className="border-primary checked:bg-primary"
                                        name="IsANewClient"
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
                                    required
                                    type="number"
                                    value={formData.InvestmentAmount || null}
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
                                    name="HearAboutUs"
                                    onChange={formChange}
                                    value={formData.HearAboutUs || null}
                                />
                            </div>
                            <div>
                                <Select
                                    options={["Yes", "No"]}
                                    title="Is this a joint applicant? *"
                                    name="IsAJointApplicant"
                                    onChange={formChange}
                                    required
                                    value={formData.IsAJointApplicant || null}
                                />
                            </div>
                            {formData.IsAJointApplicant === "true" && (
                                <div>
                                    <Input
                                        placeholder="Joint applicants name"
                                        name="JointApplicantsName"
                                        onChange={formChange}
                                        value={
                                            formData.JointApplicantsName || null
                                        }
                                    />
                                </div>
                            )}
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
                                placeholder="Age *"
                                name="Age"
                                onChange={formChange}
                                required
                                max="99"
                                min="18"
                                type="number"
                                value={formData.Age}
                            />
                            <Input
                                placeholder="Date Of Birth *"
                                name="BirthDate"
                                onChange={formChange}
                                required
                                type="date"
                                value={formData.BirthDate || null}
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
                                placeholder="Phone Number *"
                                name="PhoneNumber"
                                type="number"
                                onChange={formChange}
                                required
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
                                    placeholder="state"
                                    onChange={formChange}
                                    required
                                    value={formData.State || null}
                                />
                            </div>
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
                                    options={[
                                        "International Passport",
                                        "Driver's License",
                                        "National ID",
                                        "Voters Card",
                                    ]}
                                    title="Type of ID *"
                                    name="IdType"
                                    onChange={formChange}
                                    value={formData.State || null}
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
                            {(formData.IdType === "Driver's License" ||
                                formData.IdType === "National ID") && (
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
                                placeholder="Name of Next of Kin *"
                                name="NameNOK"
                                onChange={formChange}
                                pattern="^[A-Za-z]+[A-Za-z ]*$"
                                title="Only Alphabets are allowed"
                                required
                                value={formData.NameNOK}
                            />
                            <Input
                                placeholder="Residential Address *"
                                name="ResidentialAddressNOK"
                                onChange={formChange}
                                required
                                value={formData.ResidentialAddressNOK}
                            />
                            <Input
                                placeholder="City *"
                                name="CityNOK"
                                onChange={formChange}
                                required
                                pattern="^[A-Za-z]+[A-Za-z ]*$"
                                title="Only Alphabets are allowed"
                                value={formData.CityNOK}
                            />
                            <Input
                                placeholder="Email Address *"
                                name="EmailAddressNOK"
                                onChange={formChange}
                                required
                                type="email"
                                value={formData.EmailAddressNOK}
                            />
                            <Input
                                placeholder="Relationship with Next of Kin *"
                                name="RelationshipWithNOK"
                                pattern="^[A-Za-z]+[A-Za-z ]*$"
                                title="Only Alphabets are allowed"
                                onChange={formChange}
                                required
                                value={formData.RelationshipWithNOK}
                            />
                            <Select
                                options={["Email", "SMS", "Phone Call"]}
                                title="Preferred Mode of Communication *"
                                name="PrefCommunicationMode"
                                onChange={formChange}
                                required
                                value={formData.PrefCommunicationMode || null}
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
                            <div className="flex flex-col space-y-1">
                                <Select
                                    options={["Yes", "No"]}
                                    title="Do you want to reinvest Interest/Dividend? *"
                                    required
                                    name="InterestReinvestment"
                                    onChange={formChange}
                                    value={
                                        formData.InterestReinvestment || null
                                    }
                                />
                                <small>
                                    Dividend/Redemption payments will only be
                                    made to the bank details above
                                </small>
                            </div>
                            <Select
                                options={["Nigeria", "Ghana", "Togo"]}
                                title="Nationality *"
                                name="Nationality"
                                required
                                onChange={formChange}
                                value={formData.Nationality || null}
                            />
                            <textarea
                                name="ResidenceJurisdiction"
                                onChange={formChange}
                                className="h-[110px] w-full text-base mt-2 placeholder-primary/40 px-4 bg-white-lighter focus:ring-primary active:ring-primary shadow-sm border border-primary/5 rounded-lg"
                                value={formData.ResidenceJurisdiction}
                                placeholder="If you have residence in a jurisdiction other than Nigeria, please state the jurisdiction "
                            ></textarea>
                            <textarea
                                name="UsTin"
                                onChange={formChange}
                                className="h-[110px] w-full text-base mt-2 placeholder-primary/40 px-4 bg-white-lighter focus:ring-primary active:ring-primary shadow-sm border border-primary/5 rounded-lg"
                                value={formData.UsTin}
                                placeholder="If you are a US citizen or US tax resident, please provide your US Tax Identification Number"
                            ></textarea>
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
                                placeholder="Form of Identity (Govt ID) *"
                                name="FormOfIdentity"
                                onChange={formChange}
                                type="file"
                                uploaded={
                                    formData.FormOfIdentity ? true : false
                                }
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
        </StepperModal>
    );
};

export default FixedIncomeFund;
