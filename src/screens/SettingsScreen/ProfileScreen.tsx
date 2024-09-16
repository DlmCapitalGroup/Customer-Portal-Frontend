import React from "react";
import avatar from "../../assets/images/avatar.svg";
import Button from "../../components/ButtonComponent";

const Profile = () => {
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
                        className="h-[56px] w-full text-base mt-2 placeholder-primary/40 px-4 bg-white-lighter focus:ring-primary shadow-sm border border-primary/5 rounded-lg"
                    />
                </div>
                <div>
                    <label className="text-base font-semibold text-primary">
                        User ID
                    </label>
                    <input
                        type="text"
                        placeholder="UserID"
                        className="h-[56px] w-full text-base mt-2 placeholder-primary/40 px-4 bg-white-lighter focus:ring-primary shadow-sm border border-primary/5 rounded-lg"
                    />
                </div>
                <div>
                    <label className="text-base font-semibold text-primary">
                        Email Address
                    </label>
                    <input
                        type="text"
                        placeholder="adesewa@emailaddress.com"
                        className="h-[56px] w-full text-base mt-2 placeholder-primary/40 px-4 bg-white-lighter focus:ring-primary shadow-sm border border-primary/5 rounded-lg"
                    />
                </div>
            </div>
            <Button buttonType="full">Update Information</Button>
        </div>
    );
};

export default Profile;
