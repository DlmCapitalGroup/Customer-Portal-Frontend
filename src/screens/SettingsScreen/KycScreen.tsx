import React, { useCallback } from "react";
import { toast } from "react-toastify";
import lock from "../../assets/images/lock.svg";
import Button from "../../components/ButtonComponent";
import { Input } from "../../components/FormElements";
import Loader from "../../components/LoaderComponent";
import { devInstance } from "../../store/devInstance";
import { useAppSelector } from "../../store/hooks";

const Kyc = () => {
    const { customer, local }: any = useAppSelector((state) => state.auth);
    const [loading, setLoading] = React.useState(false);
    const [formData, setFormData] = React.useState({
        customerId: customer?.id,
        email: customer?.email,
        passportPicture: "",
        formOfIdentity: "",
        utilityBill: "",
        unitHolderSignature: "",
    });

    const [disabled, setDisabled] = React.useState(false);

    function triggerError() {
        toast.error("Please Update Your Profile");
    }

    const getKycInfo = useCallback(() => {
        setLoading(true);
        devInstance
            .get(
                `https://apps.dlm.group/ASSETMGTAPI/api/v1/Transaction/GetKycDocuments/${customer?.id}`,
                {
                    headers: {
                        Authorization: `Bearer ${local}`,
                    },
                }
            )
            .then((res) => {
                console.log(res, "response");
                setFormData({
                    ...formData,
                    passportPicture: res?.data?.passportPicture,
                    formOfIdentity: res?.data?.formOfIdentity,
                    utilityBill: res?.data?.utilityBill,
                    unitHolderSignature: res?.data?.unitHolderSignature,
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
        getKycInfo();
    }, [getKycInfo]);

    const addKycInfo = () => {
        setLoading(true);
        devInstance
            .post(
                "https://apps.dlm.group/ASSETMGTAPI/api/v1/Transaction/AddKycDocuments",
                { ...formData },
                {
                    headers: {
                        Authorization: `Bearer ${local}`,
                    },
                }
            )
            .then((res) => {
                console.log(res, "response");
                getKycInfo();
                toast.success("KYC updated sucessfully!");
            })
            .catch((err) => {
                console.log(err);
                toast.error("Error updating KYC, try again!");
                setLoading(false);
            })
            .finally(() => setLoading(false));
    };

    const formChange = (e: any) => {
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
                // console.log(formData);
            })
            .catch((err) => {
                setLoading(false);
                toast.error(`${err}`);
            })
            .finally(() => setLoading(false));
    };

    function checkKyc() {
        if (
            formData.passportPicture &&
            formData.unitHolderSignature &&
            formData.utilityBill &&
            formData.formOfIdentity
        )
            return true;
    }

    const subject = "KYC Update";
    const groupEmail = "asset@dlm.group";

    return (
        <form
            className="pr-10 lg:pr-0"
            onSubmit={(e: any) => {
                e.preventDefault();
                if (checkKyc()) {
                    window.open(
                        `mailto:${groupEmail}?subject=${encodeURIComponent(
                            subject
                        )}&body=`
                    );
                } else {
                    addKycInfo();
                }
            }}
        >
            {/* {msg && <p className="text-error mb-5">{msg}</p>} */}
            <div className="w-[131px] h-[131px] rounded-full grid place-items-center bg-primary mb-[81px]">
                <img alt="" src={lock} />
            </div>

            <div className="flex flex-col space-y-[30px] mb-[70px]">
                <Input
                    placeholder="Passport Picture *"
                    name="passportPicture"
                    onChange={formChange}
                    type="file"
                    uploaded={formData.passportPicture ? true : false}
                    disabled={disabled}
                    required
                />
                <Input
                    placeholder="Form of Identity (Govt ID) *"
                    name="formOfIdentity"
                    onChange={formChange}
                    type="file"
                    uploaded={formData.formOfIdentity ? true : false}
                    disabled={disabled}
                    required
                />
                <Input
                    placeholder="Utility Bill *"
                    name="utilityBill"
                    onChange={formChange}
                    type="file"
                    uploaded={formData.utilityBill ? true : false}
                    disabled={disabled}
                    required
                />
                <Input
                    placeholder="Unit holder signature *"
                    name="unitHolderSignature"
                    onChange={formChange}
                    type="file"
                    uploaded={formData.unitHolderSignature ? true : false}
                    disabled={disabled}
                    required
                />
            </div>
            {checkKyc() && (
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

export default Kyc;
