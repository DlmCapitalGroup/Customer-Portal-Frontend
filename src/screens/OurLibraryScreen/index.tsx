import React, { useEffect } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { Outlet, useNavigate } from "react-router-dom";
import Modal from "../../components/ModalComponent";
import Button from "../../components/ButtonComponent";
import Select from "../../components/SelectComponent";

const Library = () => {
    const [serviceModal, setServiceModal] = React.useState(false);
    const [investment, setInvestment] = React.useState("");
    const navigate = useNavigate();

    const showServiceModal = () => {
        setServiceModal(!serviceModal);
    };

    function setOption(value: any) {
        setInvestment(value);
    }

    function openInvestment() {
        if (investment) {
            navigate(
                `products/${investment.toLowerCase().replace(/\s+/g, "-")}`
            );
            setServiceModal(false);
        }
    }

    // useEffect(() => {
    //     console.log(investment);
    // });

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
                            <Select
                                title={`${investment || "Select a product"}`}
                                options={[
                                    "Fixed Income Fund Investment",
                                    "Fixed Asset Income",
                                    "Fixed Deposit Fund Investment",
                                    "Child Education Plan",
                                    "High Interest Investment Plan",
                                    "Target Date Plan",
                                ]}
                                setOption={setOption}
                                selected={investment}
                            />
                        </div>

                        <Button buttonType="full" onClick={openInvestment}>
                            Proceed
                        </Button>
                    </div>
                </Modal>
            )}
        </DashboardLayout>
    );
};

export default Library;
