import React, { useState } from "react";
import { toast } from "react-toastify";
import { Input, Select } from "../../components/FormElements";
import Loader from "../../components/LoaderComponent";
import StepperModal from "../../components/StepperComponent";
import { formatter } from "../../helper";
import { devInstance } from "../../store/devInstance";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { clearStepper } from "../../store/stepperSlice";
import AccountModal from "../../components/AccountModal";

interface _props {
    closeModal?: any;
    states?: Array<any>;
    instrumentTypeName?: String;
    instrumentTypeLabel?: String;
}

const IndividualForm = (props: _props) => {
    const [loading, setLoading] = React.useState(false);
    const { closeModal, instrumentTypeName, instrumentTypeLabel } = props;
    const dispatch = useAppDispatch();
    const { currentStepper } = useAppSelector((state) => state.stepper);
    const { customer }: any = useAppSelector((state) => state.auth);
    const [formData, setFormData]: any = useState({
        instrumentTypeName: instrumentTypeName,
        instrumentTypeLabel: instrumentTypeLabel,
        customerId: customer?.id,
        // startDate: "",
        // tenure: 365,
        // currency: "NGN",
        faceValue: "",
        // currentRate: "",
        // autoRollover: "",
    });

    const [accountModal, setAccountModal] = useState(false);

    function clearForm() {
        setFormData({
            instrumentTypeName: instrumentTypeName,
            instrumentTypeLabel: instrumentTypeLabel,
            customerId: customer?.id,
            startDate: "",
            tenure: 365,
            currency: "NGN",
            faceValue: "",
            currentRate: "",
            autoRollover: "",
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
                        [e.target.name]: data.secure_url,
                    });
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

    const openAccount = async () => {
        setLoading(true);
        try {
            // const cashAcc = await devInstance.get(
            //     `https://zas-dev.zanibal.com/api/v1/finance/account/customer/id/${customer?.id}`
            // );

            // if (cashAcc) {
            //     console.log(
            //         cashAcc?.data?.result[0],
            //         "Cash Account get successful"
            //     );

            //     const cashTrans = await devInstance.post(
            //         "https://zas-dev.zanibal.com/api/v1/finance/cash-transaction/create",
            //         {
            //             partnerId: customer?.id,
            //             cashAccountId: cashAcc?.data?.result[0]?.id,
            //             amount: formData.faceValue,
            //             currency: "NGN",
            //             transMethod: "ECHANNEL",
            //             transType: "RECEIPT",
            //         }
            //     );

            //     if (cashTrans) {
            //         console.log("cash transaction post successful");

            //         const postCashTransRes = await devInstance.put(
            //             `https://zas-dev.zanibal.com/api/v1/finance/cash-transaction/post/id/${cashTrans?.data?.msgArgs[0]}`
            //         );

            //         if (postCashTransRes) {
            //             console.log(
            //                 postCashTransRes,
            //                 "cash transaction confirmed"
            //             );

            //             const investRes = await devInstance.post(
            //                 "https://zas-dev.zanibal.com/api/v1/order/terminstrument/submit",
            //                 formData
            //             );

            //             if (investRes) {
            //                 console.log("investment taken");
            //                 const postInvestRes = await devInstance.put(
            //                     `https://zas-dev.zanibal.com/api/v1/order/terminstrument/post/${investRes?.data?.msgArgs[0]}`
            //                 );

            //                 if (postInvestRes) {
            //                     dispatch(clearStepper());
            //                     clearForm();
            //                     closeModal();
            //                     toast.success("Investment Successful");
            //                 }
            //             }
            //         }
            //     }
            // }

            const res = await devInstance.post(
                "https://assetmgt-api.dlm.group/api/v1/investments",
                formData
            );
            if (res) {
                toast.success("Investment has been taken");
                dispatch(clearStepper());
                clearForm();
                closeModal();
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <StepperModal
            amount={formData.faceValue}
            email={customer?.emailAddress1}
            closeModal={closeModal}
            submitEvent={openAccount}
            phone={customer.cellPhone}
            firstname={customer.firstName}
            lastname={customer.lastName}
            newClient={false}
        >
            <div className="text-primary">
                {currentStepper === 0 && (
                    <div>
                        <h3 className="text-xl font-semibold text-center mb-3">
                            {instrumentTypeLabel}
                        </h3>
                        <p className="mb-[29px] text-center">
                            Kindly fill the form to get started on your fixed
                            income fund investment
                        </p>
                        <div className="flex flex-col gap-y-4">
                            <div>
                                <Input
                                    placeholder="How much do you want to invest (Min of 10,000) *"
                                    name="faceValue"
                                    onChange={formChange}
                                    required
                                    type="number"
                                    min={formatter(Number("10000"))}
                                    value={formData.faceValue || null}
                                />
                            </div>
                            {/* <div>
                                <Input
                                    placeholder="Current Rate"
                                    name="currentRate"
                                    onChange={formChange}
                                    required
                                    type="number"
                                    value={formData.currentRate || null}
                                />
                            </div>
                            <div>
                                <Select
                                    options={["Yes", "No"]}
                                    required
                                    title="Auto Rollover *"
                                    name="autoRollover"
                                    onChange={formChange}
                                    value={formData.autoRollover || null}
                                />
                            </div> */}

                            {/* <div>
                                <Input
                                    placeholder="Start Date"
                                    name="startDate"
                                    onChange={formChange}
                                    type="date"
                                    value={
                                        formData.startDate.slice(0, 10) || null
                                    }
                                />
                            </div> */}
                            <p className="flex space-x-5 items-start text-base text-black mt-12">
                                <input
                                    type="checkbox"
                                    className="rounded-[5px] bg-white-lighter mt-1"
                                    // required
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
                                    that I may be held liable for it. I hereby
                                    give DLM Asset Management Limited permission
                                    to share any of the information provided in
                                    this form at its discretion. I acknowledge
                                    that a non-refundable charge of 10 naira
                                    will be automatically debited from the
                                    linked bank account to add my card.
                                    <a
                                        href="/TC.pdf"
                                        target="_blank"
                                        className="text-[15px] ml-4 text-[#0066cc]"
                                        rel="noopener noreferrer"
                                    >
                                        Learn more
                                    </a>
                                </p>
                            </p>
                        </div>
                    </div>
                )}
                {accountModal && (
                    <AccountModal cancel={() => setAccountModal(false)} />
                )}
                {loading && <Loader />}
            </div>
        </StepperModal>
    );
};

export default IndividualForm;
