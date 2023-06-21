import React from "react";
import { toast } from "react-toastify";
import avatar from "../../assets/images/icon.png";
import Button from "../../components/ButtonComponent";
import { Input } from "../../components/FormElements";
import Loader from "../../components/LoaderComponent";
import { devInstance } from "../../store/devInstance";
import { useAppSelector } from "../../store/hooks";

const BankInfo = () => {
    const { customer }: any = useAppSelector((state) => state.auth);
    const [loading, setLoading] = React.useState(false);
    const [msg, setMsg] = React.useState("");
    const [formData, setFormData] = React.useState({
        BankName: "",
        AccountNumber: "",
        AccountName: "",
        BVN: "",
    });

    function triggerError() {
        toast.error("Please Update Your Profile");
    }
    React.useEffect(() => {
        setLoading(true);
        devInstance
            .get(
                `/Transaction/GetCustomerOnboardingDetails/${customer.customerId}`
            )
            .then((res) => {
                console.log(res, "response");
                setFormData({
                    ...formData,
                    BVN: res.data.bvn,
                    BankName: res.data.bankName,
                    AccountNumber: res.data.accountNumber,
                    AccountName: res.data.accountName,
                });
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            })
            .finally(() => setLoading(false));
    }, []);

    const subject = "Bank Info Update";
    const groupEmail = "asset@dlm.group";

    return (
        <div className="max-w-[570px] pr-10 lg:pr-0">
            <div className="rounded-full bg-primary w-[131px] h-[131px] flex items-center justify-center mb-[81px]">
                <img alt="" src={avatar} className="w-24 h-16" />
            </div>
            <div className="flex flex-col space-y-[30px] mb-[91px]">
                <div>
                    <Input
                        label="Bank Name"
                        placeholder="Bank Name"
                        disabled
                        value={formData.BankName}
                    />
                </div>
                <div>
                    <Input
                        label="Account Name"
                        placeholder="Account Name"
                        disabled
                        value={formData.AccountName}
                    />
                </div>
                <div>
                    <Input
                        label="Account Number"
                        placeholder="Account Number"
                        disabled
                        type="number"
                        value={formData.AccountNumber}
                    />
                </div>
                <div>
                    <Input
                        label="BVN"
                        placeholder="BVN"
                        value={formData.BVN}
                        disabled
                        type="number"
                    />
                </div>
            </div>
            {/* <Button buttonType="full">Update Information</Button>, */}
            <p className="mb-[21px] text-center text-primary font-semibold text-sm">
                To change your account information please send an email <br />
                <span className="font-bold">asset@dlm.group</span>
            </p>
            <Button
                buttonType="full"
                onClick={() => {
                    if (!formData.BankName) {
                        triggerError();
                    } else {
                        window.open(
                            `mailto:${groupEmail}?subject=${encodeURIComponent(
                                subject
                            )}&body=`
                        );
                    }
                }}
            >
                Update Information
            </Button>
            {loading && <Loader />}
        </div>
    );
};

export default BankInfo;
