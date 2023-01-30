import React from "react";
import avatar from "../../assets/images/avatar.svg";
import Button from "../../components/ButtonComponent";
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
                    <label className="text-base font-semibold text-primary">
                        Full Name
                    </label>
                    <input
                        type="text"
                        placeholder="Adesewa Adesewa"
                        value={
                            customer &&
                            customer?.firstName + " " + customer?.lastName
                        }
                        className="h-[56px] w-full text-base capitalize mt-2 placeholder-primary/40 px-4 bg-white-lighter focus:ring-primary shadow-sm border border-primary/5 rounded-lg"
                        disabled
                    />
                </div>
                <div>
                    <label className="text-base font-semibold text-primary">
                        Username
                    </label>
                    <input
                        type="text"
                        placeholder="Username"
                        value={customer?.portalUsername || customer?.customerId}
                        className="h-[56px] w-full text-base mt-2 placeholder-primary/40 px-4 bg-white-lighter focus:ring-primary shadow-sm border border-primary/5 rounded-lg"
                        disabled
                    />
                </div>
                <div>
                    <label className="text-base font-semibold text-primary">
                        Email Address
                    </label>
                    <input
                        type="text"
                        placeholder="adesewa@emailaddress.com"
                        value={customer?.emailAddress}
                        className="h-[56px] w-full text-base mt-2 placeholder-primary/40 px-4 bg-white-lighter focus:ring-primary shadow-sm border border-primary/5 rounded-lg"
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
