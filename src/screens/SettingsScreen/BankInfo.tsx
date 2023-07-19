import React, { useCallback } from "react";
import { toast } from "react-toastify";
import avatar from "../../assets/images/icon.png";
import Button from "../../components/ButtonComponent";
import { Input } from "../../components/FormElements";
import Loader from "../../components/LoaderComponent";
import { devInstance } from "../../store/devInstance";
import { useAppSelector } from "../../store/hooks";

const BankInfo = () => {
    const { customer, local }: any = useAppSelector((state) => state.auth);
    const [loading, setLoading] = React.useState(false);
    const [msg, setMsg] = React.useState("");
    const [formData, setFormData] = React.useState({
        bankname: "",
        accountName: "",
        accountNumber: "",
        bvn: "",
        email: customer?.email,
        customerId: customer?.id,
    });

    const [disabled, setDisabled] = React.useState(false);

    function triggerError() {
        toast.error("Please Update Your Profile");
    }

    const formChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const getBankInfo = useCallback(() => {
        setLoading(true);
        devInstance
            .get(
                `https://apps.dlm.group/ASSETMGTAPI/api/v1/Transaction/GetBankInfo/${customer.id}`
            )
            .then((res) => {
                console.log(res, "response");
                setFormData({
                    ...formData,
                    bvn: res.data.bvn,
                    bankname: res.data.bankname,
                    accountNumber: res.data.accountNumber,
                    accountName: res.data.accountName,
                });
                setDisabled(true);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            })
            .finally(() => setLoading(false));
    }, []);

    React.useEffect(() => {
        getBankInfo();
    }, [getBankInfo]);

    function checkBank() {
        if (
            formData.bvn &&
            formData.bankname &&
            formData.accountName &&
            formData.accountNumber
        )
            return true;
    }

    const addBankInfo = () => {
        setLoading(true);
        devInstance
            .post(
                `https://apps.dlm.group/ASSETMGTAPI/api/v1/Transaction/AddBankInfo`,
                { ...formData }
            )
            .then((res) => {
                getBankInfo();
                toast.success("Bank info updated successfully!");
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
                toast.error("Error updating KYC, try again!");
            })
            .finally(() => setLoading(false));
    };

    const subject = "Bank Info Update";
    const groupEmail = "asset@dlm.group";

    return (
        <form
            className="max-w-[570px] pr-10 lg:pr-0"
            onSubmit={(e: any) => {
                e.preventDefault();
                if (checkBank()) {
                    window.open(
                        `mailto:${groupEmail}?subject=${encodeURIComponent(
                            subject
                        )}&body=`
                    );
                } else {
                    addBankInfo();
                }
            }}
        >
            <div className="rounded-full bg-primary w-[131px] h-[131px] flex items-center justify-center mb-[81px]">
                <img alt="" src={avatar} className="w-24 h-16" />
            </div>
            <div className="flex flex-col space-y-[30px] mb-[91px]">
                <div>
                    <Input
                        label="Bank Name"
                        placeholder="Bank Name"
                        name="bankname"
                        value={formData.bankname}
                        onChange={formChange}
                        disabled={disabled}
                    />
                </div>
                <div>
                    <Input
                        label="Account Name"
                        placeholder="Account Name"
                        name="accountName"
                        value={formData.accountName}
                        onChange={formChange}
                        disabled={disabled}
                    />
                </div>
                <div>
                    <Input
                        label="Account Number"
                        placeholder="Account Number"
                        type="number"
                        name="accountNumber"
                        value={formData.accountNumber}
                        onChange={formChange}
                        disabled={disabled}
                    />
                </div>
                <div>
                    <Input
                        label="BVN"
                        placeholder="BVN"
                        value={formData.bvn}
                        type="number"
                        onChange={formChange}
                        disabled={disabled}
                        name="bvn"
                    />
                </div>
            </div>
            {/* <Button buttonType="full">Update Information</Button>, */}
            {checkBank() && (
                <p className="mb-[21px] text-center text-primary font-semibold text-sm">
                    To change your account information please send an email{" "}
                    <br />
                    <span className="font-bold">asset@dlm.group</span>
                </p>
            )}
            <Button buttonType="full">Update Information</Button>
            {/* {loading && <Loader />} */}
        </form>
    );
};

export default BankInfo;
