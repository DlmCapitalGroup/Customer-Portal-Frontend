import React from "react";
import avatar from "../../assets/images/icon.png";
import Button from "../../components/ButtonComponent";
import { Input } from "../../components/FormElements";
import Loader from "../../components/LoaderComponent";
import { useAppSelector } from "../../store/hooks";

const Profile = () => {
    const { customer }: any = useAppSelector((state) => state.auth);
    return (
        <div className="max-w-[570px]">
            <div className="rounded-full bg-primary w-40 h-40 flex items-center justify-center mb-[52px]">
                <img alt="" src={avatar} className="w-28 h-20" />
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
            </div>
            <Button buttonType="full" disabled>
                Update Information
            </Button>
        </div>
    );
};

export default Profile;
