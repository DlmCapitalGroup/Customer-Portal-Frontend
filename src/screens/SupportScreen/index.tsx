import { useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import messageIcon from "../../assets/images/message-icon.svg";
import searchIcon from "../../assets/images/search-icon.svg";
import messageIconLight from "../../assets/images/message-icon-light.svg";
import editIcon from "../../assets/images/edit-icon.svg";
import trashSmall from "../../assets/images/trash-sm.svg";
import closeIcon from "../../assets/images/close-icon.svg";
import attachmentIcon from "../../assets/images/attachment-icon.svg";
import Button from "../../components/ButtonComponent";
import chevronRightDouble from "../../assets/images/chevron-right-double.svg";
import chatIcon from "../../assets/images/chat-icon.svg";
import ticketVoucher from "../../assets/images/ticket-voucher.svg";
import radioUnchecked from "../../assets/images/radio-unchecked.svg";
import radioChecked from "../../assets/images/radio-checked.svg";
import userIcon1 from "../../assets/images/user-icon1.svg";
import chatIcon2 from "../../assets/images/chat-icon2.svg";
import checkSent from "../../assets/images/check-sent.svg";
import checkSuccess from "../../assets/images/check-success.svg";
import checkFailed from "../../assets/images/check-failed.svg";

interface ticketCardProps {
    ticketId?: number;
    ticketDate?: string;
    ticketTime?: string;
    ticketDescription?: string;
    ticketStatus?: string;
}

const TicketCard = (props: ticketCardProps) => {
    const { ticketStatus } = props;
    return (
        <div className="w-full min-h-[263px] bg-white-light rounded-2xl pt-3 px-4 text-primary">
            <div className="flex space-x-3 items-start mb-4">
                <img alt="" src={ticketVoucher} />
                <div className="grow flex flex-col space-y-4">
                    <div className="flex justify-between">
                        <h3 className="text-lg font-semibold">
                            Ticket #2022-0001
                        </h3>
                        <img alt="" src={radioUnchecked} />
                    </div>
                    <p className="text-base">4:20pm/27/4/22</p>
                    <p className="text-base">
                        I have been trying to create an Investment but for some
                        reason, it’s saying error and so far, my account has
                        been upgraded and I have enough money in my account to
                        book the investment.
                    </p>
                </div>
            </div>
            <div className="flex justify-between">
                <div className="flex items-center space-x-2">
                    <img alt="" src={userIcon1} />
                    <p className="text-sm">Adesewa Adesewa</p>
                </div>

                <div className="flex items-center space-x-7">
                    <div className="flex items-center">
                        <img alt="" src={attachmentIcon} />
                        <span className="text-sm">2</span>
                    </div>
                    <div className="flex items-center">
                        <img alt="" src={chatIcon2} />
                        <span className="text-sm">16</span>
                    </div>
                    <div className="flex">
                        {ticketStatus === "sent" && (
                            <img alt="" src={checkSent} />
                        )}
                        {ticketStatus === "success" && (
                            <img alt="" src={checkSuccess} />
                        )}
                        {ticketStatus === "failed" && (
                            <img alt="" src={checkFailed} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const TicketsTab = () => {
    return (
        <div className="flex flex-col space-y-4">
            {[1, 2, 3, 4].map((item, index) => (
                <TicketCard key={index} ticketStatus="sent" />
            ))}
        </div>
    );
};

const PendingTab = () => {
    return (
        <div className="flex flex-col space-y-4">
            {[1, 2, 3, 4].map((item, index) => (
                <TicketCard key={index} ticketStatus="sent" />
            ))}
        </div>
    );
};

const ResolvedTab = () => {
    return (
        <div className="flex flex-col space-y-4">
            {[1, 2, 3, 4].map((item, index) => (
                <TicketCard key={index} ticketStatus="success" />
            ))}
        </div>
    );
};

// const SearchTab = () => {
//     return (
//         <div>
//             <h1>Search Tab</h1>
//         </div>
//     );
// };

const NewTicketForm = ({ closeForm }: any) => {
    return (
        <div className="w-full bg-white-light py-16 relative rounded-[20px] shadow-sm">
            <img
                src={closeIcon}
                alt=""
                className="absolute top-8 right-8 cursor-pointer"
                onClick={closeForm}
            />
            <div className="max-w-[495px] mx-auto">
                <h2 className="text-center font-semibold text-xl mb-4">
                    Inquiries
                </h2>
                <p className="text-base mb-[51px]">
                    Kindly fill the form to make any inquiries you may have.
                </p>

                <div className="flex flex-col space-y-10">
                    <div>
                        <label className="text-base font-semibold text-primary mb-1">
                            What do you want to inquire about?
                        </label>
                        <select className="h-[56px] w-full border border-primary/5 shadow-sm text-base rounded-sm">
                            <option value="">Select a product</option>
                        </select>
                    </div>

                    <div>
                        <label className="text-base font-semibold text-primary mb-1">
                            What’s your question?
                        </label>
                        <textarea
                            placeholder="What's your question"
                            className="w-full border text-base border-primary/5 shadow-sm h-[177px] p-5 rounded-sm"
                        ></textarea>
                    </div>

                    <div>
                        <div className="text-base h-14 w-full relative flex items-center justify-between border border-primary/5 shadow-sm rounded-sm px-4">
                            <span>Add attachment</span>
                            <img alt="" src={attachmentIcon} />
                        </div>
                    </div>
                </div>

                <div className="mx-auto w-[224px] mt-16">
                    <Button buttonType="full">Submit</Button>
                </div>
            </div>
        </div>
    );
};

const Support = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [ticketForm, setTicketForm] = useState(false);
    const [hoveredTicket, setHoveredTicket]: any = useState(0);

    const closeForm = () => {
        setTicketForm(false);
    };

    const questions = [
        "Account Creation",
        "How do I create an Investment?",
        "How do I see my recent transations?",
        "Adding a new bank card",
        "What is the interest on loan?",
        "What do I need to get a loan?",
        "How do I create an Investment",
    ];

    const tabs = ["tickets", "pending", "resolved"];

    return (
        <DashboardLayout>
            <div className="flex justify-between items-start pt-14 text-primary max-w-[1250px] mr-10">
                <div className="w-[400px]">
                    <div className="mb-[40px]">
                        <h3 className="text-xl font-semibold mb-4">
                            Do you have a question?
                        </h3>
                        <p className="text-base">
                            Type your question or search for a keyword
                        </p>
                    </div>

                    <div className="w-[399px] flex items-center relative mb-[79px]">
                        <input
                            type="search"
                            placeholder="Type here..."
                            className="h-[56px] w-full text-base mt-2 placeholder-primary px-4 bg-white-lighter focus:ring-primary shadow-sm border border-primary/5 rounded-lg"
                        />
                        <img
                            src={searchIcon}
                            alt="search"
                            className="absolute right-4 mt-2"
                        />
                    </div>

                    <div className="space-y-3 mb-10">
                        {questions.map((question: string, index: number) => (
                            <span
                                key={index}
                                className="p-3 hover:border border-primary w-fit rounded-lg flex space-x-5 hover:cursor-pointer text-base"
                                onMouseEnter={() => setHoveredTicket(index)}
                                onMouseLeave={() => setHoveredTicket(null)}
                            >
                                <span>{question}</span>
                                {hoveredTicket === index && (
                                    <img alt="" src={chevronRightDouble} />
                                )}
                            </span>
                        ))}
                    </div>

                    <div className="w-[356px] h-[120px] bg-white-light rounded-[10px] p-4">
                        <h3 className="font-semibold text-lg">
                            Still have questions?
                        </h3>
                        <div className="flex items-center space-x-10">
                            <p className="text-base">
                                Chat with our live agent
                            </p>
                            <img alt="" src={chatIcon} />
                        </div>
                    </div>
                </div>

                <div className="w-[650px]">
                    <div className="flex items-center text-base space-x-16">
                        <div className="flex justify-between grow items-center">
                            {tabs.map((tab, index) => (
                                <span
                                    className={`${
                                        index === 0 &&
                                        "flex space-x-4 items-center"
                                    } cursor-pointer font-semibold ${
                                        activeTab === index
                                            ? "text-primary"
                                            : "text-primary/60"
                                    }`}
                                    onClick={() => setActiveTab(index)}
                                >
                                    {index === 0 &&
                                        (activeTab === index ? (
                                            <img alt="" src={messageIcon} />
                                        ) : (
                                            <img
                                                alt=""
                                                src={messageIconLight}
                                            />
                                        ))}
                                    <span>{tab}</span>
                                </span>
                            ))}
                        </div>

                        <span
                            className="w-16 h-14 bg-white-lighter grid place-items-center rounded-lg cursor-pointer"
                        >
                            <img alt="" src={searchIcon} />
                        </span>
                    </div>
                    <hr className="mt-5 mb-[62px] border-primary/20 w-full" />

                    <div className="flex justify-between items-center mb-[54px]">
                        <button className="shadow bg-white-light w-[213px] h-[56px] rounded-lg flex items-center justify-center">
                            <img alt="" src={editIcon} />
                            <span
                                className="ml-2 text-base"
                                onClick={() => setTicketForm(true)}
                            >
                                Add new ticket
                            </span>
                        </button>

                        <div className="w-16 h-14 bg-white-lighter grid place-items-center rounded-lg">
                            <img alt="" src={trashSmall} />
                        </div>
                    </div>

                    <div>
                        {ticketForm ? (
                            <NewTicketForm closeForm={closeForm} />
                        ) : activeTab === 0 ? (
                            <TicketsTab />
                        ) : activeTab === 1 ? (
                            <PendingTab />
                        ) : (
                            <ResolvedTab />
                        )}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Support;
