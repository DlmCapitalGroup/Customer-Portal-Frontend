import React from "react";
import avatar from "../../assets/images/avatar.svg";
import Button from "../../components/ButtonComponent";
import { Input } from "../../components/FormElements";
import Loader from "../../components/LoaderComponent";
import { useAppSelector } from "../../store/hooks";

const Profile = () => {
    // const [loading, setLoadiing] = React.useState(false);
    const { customer }: any = useAppSelector((state) => state.auth);
    return (
        <div className="max-w-[570px]">
            <img alt="" src={avatar} className="rounded-full mb-[52px]" />

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
            {/* {loading && <Loader />} */}
        </div>
    );
};

export default Profile;
