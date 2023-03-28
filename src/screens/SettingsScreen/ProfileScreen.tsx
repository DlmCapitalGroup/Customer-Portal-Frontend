import React from "react";
import avatar from "../../assets/images/icon.png";
import Button from "../../components/ButtonComponent";
import { Input } from "../../components/FormElements";
import Loader from "../../components/LoaderComponent";
import { devInstance } from "../../store/devInstance";
import { useAppSelector } from "../../store/hooks";

const Profile = () => {
    const { customer }: any = useAppSelector((state) => state.auth);
    const [formData, setFormData] = React.useState({
        BVN: "",
        Address: "",
        PhoneNumber: "",
        UnitHolderSignature: "",
        Country: "",
        State: "",
        PostalCode: "",
    });
    React.useEffect(() => {
        devInstance
            .get(
                `/Transaction/GetCustomerOnboardingDetails/${customer.customerId}`
            )
            .then((res) => {
                console.log(res, "response");
                setFormData({
                    ...formData,
                    BVN: res.data.bvn,
                    Address: res.data.residentialAddress,
                    PhoneNumber: res.data.phoneNumber,
                    Country: res.data.country,
                    State: res.data.state,
                    PostalCode: res.data.postalCode,
                });
            });
    }, []);

    const subject = "Profile Update";
    const groupEmail = "asset@dlm.group";

    return (
        <div className="max-w-[570px]">
            <div className="rounded-full bg-primary w-[131px] h-[131px] flex items-center justify-center mb-[81px]">
                <img alt="" src={avatar} className="w-24 h-16" />
            </div>
            <div className="flex flex-col space-y-[30px] mb-[91px]">
                <div>
                    <Input
                        label="Full Name"
                        placeholder="Adesewa Adesewa"
                        value={
                            customer &&
                            customer?.firstName + " " + customer?.lastName
                        }
                        disabled
                    />
                </div>
                <div>
                    <Input
                        label="Username"
                        placeholder="Username"
                        value={customer?.portalUsername || customer?.customerId}
                        disabled
                    />
                </div>
                <div>
                    <Input
                        label="Email Address"
                        placeholder="adesewa@emailaddress.com"
                        value={customer?.emailAddress}
                        disabled
                    />
                </div>
                <div>
                    <Input
                        label="Phone Number"
                        placeholder="Phone Number"
                        value={formData.PhoneNumber}
                        disabled
                    />
                </div>
                <div>
                    <Input
                        label="BVN"
                        placeholder="BVN"
                        value={formData.BVN}
                        disabled
                    />
                </div>
                <div>
                    <Input
                        label="Residential Address"
                        placeholder="Residential Address"
                        value={formData.Address}
                        disabled
                    />
                </div>
                <div>
                    <Input
                        label="Country"
                        placeholder="Country"
                        value={formData.Country}
                        disabled
                    />
                </div>
                <div>
                    <Input
                        label="State"
                        placeholder="State"
                        value={formData.State}
                        disabled
                    />
                </div>
                <div>
                    <Input
                        label="Postal Code"
                        placeholder="Postal Code"
                        value={formData.PostalCode}
                        disabled
                    />
                </div>
            </div>
            {/* <Button buttonType="full">Update Information</Button>, */}
            <Button
                buttonType="full"
                onClick={() =>
                    window.open(
                        `mailto:${groupEmail}?subject=${encodeURIComponent(
                            subject
                        )}&body=`
                    )
                }
            >
                Update Information
            </Button>
        </div>
    );
};

export default Profile;
