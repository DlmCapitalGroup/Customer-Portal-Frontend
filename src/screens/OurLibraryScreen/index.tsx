import React from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { Outlet } from "react-router-dom";
import Modal from "../../components/ModalComponent";
import Button from "../../components/ButtonComponent";

type selectProps = {
    options?: Array<any>;
    title?: string;
    setOption?: () => void;
    toggleSelect?: () => void;
};

const Select = (props: selectProps) => {
    const { options, title, setOption, toggleSelect } = props;
    return (
        <div>
            <div
                className="h-14 border border-primary/10 rounded-lg flex items-center px-4"
                onClick={toggleSelect}
            >
                {title || "Select"}
            </div>
            <div className="flex flex-col gap-y-4">
                {options &&
                    options.map((option, index) => (
                        <div key={index} onClick={setOption}>
                            {option}
                        </div>
                    ))}
            </div>
        </div>
    );
};

const Library = () => {
    const [serviceModal, setServiceModal] = React.useState(true);
    const showServiceModal = () => {
        setServiceModal(!serviceModal);
    };
    return (
        <DashboardLayout>
            <div className="pr-5">
                <Outlet />
            </div>
            {serviceModal && (
                <Modal size="md">
                    <div className="w-[571px] mx-auto mt-24 text-primary">
                        <div className="text-center mb-14">
                            <h4 className="font-semibold text-xl mb-4">
                                Our Services
                            </h4>
                            <p className="text-base">
                                Select a product you want to get started with
                                and fill the form to get started
                            </p>
                        </div>
                        <div className="mb-32">
                            <Select />
                        </div>

                        <Button buttonType="full">Proceed</Button>
                    </div>
                </Modal>
            )}
        </DashboardLayout>
    );
};

export default Library;
