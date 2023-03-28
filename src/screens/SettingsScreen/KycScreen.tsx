import React from "react";
import { toast } from "react-toastify";
import lock from "../../assets/images/lock.svg";
import Button from "../../components/ButtonComponent";
import { Input } from "../../components/FormElements";
import Loader from "../../components/LoaderComponent";
import { devInstance } from "../../store/devInstance";
import { useAppSelector } from "../../store/hooks";

const Kyc = () => {
    const { customer }: any = useAppSelector((state) => state.auth);
    const [loading, setLoading] = React.useState(false);
    const [formData, setFormData] = React.useState({
        PassportPhoto: "",
        FormOfIdentity: "",
        UtilityBill: "",
        UnitHolderSignature: "",
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
                    PassportPhoto: res.data.passportPhoto,
                    FormOfIdentity: res.data.formOfIdentity,
                    UtilityBill: res.data.utilityBill,
                    UnitHolderSignature: res.data.unitHolderSignature,
                });
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            })
            .finally(() => setLoading(false));
    }, []);

    const subject = "KYC Update";
    const groupEmail = "asset@dlm.group";

    return (
        <div>
            {/* {msg && <p className="text-error mb-5">{msg}</p>} */}
            <div className="w-[131px] h-[131px] rounded-full grid place-items-center bg-primary mb-[81px]">
                <img alt="" src={lock} />
            </div>

            <div className="flex flex-col space-y-[30px] mb-[70px]">
                <Input
                    placeholder="Passport Picture *"
                    name="PassportPhoto"
                    // onChange={formChange}
                    type="file"
                    uploaded={formData.PassportPhoto ? true : false}
                    disabled
                />
                <Input
                    placeholder="Form of Identity (Govt ID) *"
                    name="FormOfIdentity"
                    // onChange={formChange}
                    type="file"
                    uploaded={formData.FormOfIdentity ? true : false}
                    disabled
                />
                <Input
                    placeholder="Utility Bill *"
                    name="UtilityBill"
                    // onChange={formChange}
                    type="file"
                    uploaded={formData.UtilityBill ? true : false}
                    disabled
                />
                <Input
                    placeholder="Unit holder signature *"
                    name="UnitHolderSignature"
                    // onChange={formChange}
                    type="file"
                    uploaded={formData.UnitHolderSignature ? true : false}
                    disabled
                />
            </div>
            <p className="mb-[21px] text-center text-primary font-semibold text-sm">
                To change your account information please send an email <br />
                <span className="font-bold">asset@dlm.group</span>
            </p>

            <Button
                buttonType="full"
                onClick={() => {
                    if (!formData.PassportPhoto) {
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

export default Kyc;
