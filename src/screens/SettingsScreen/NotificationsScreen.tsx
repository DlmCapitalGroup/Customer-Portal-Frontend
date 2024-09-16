import React from "react";
import bellIcon from "../../assets/images/bell.svg";
import switchRight from "../../assets/images/switch-right.svg";



const Notifications = () => {
    return (
        <div>
            <div className="w-[131px] h-[131px] rounded-full grid place-items-center bg-primary mb-[83px]">
                <img alt="" src={bellIcon} />
            </div>
            <div className="text-base flex flex-col space-y-[30px]">
              <div className="bg-white-lighter rounded-lg flex justify-between items-center h-14 px-4">
                <span>Transaction Alert</span>
                <img alt="" src={switchRight} />
              </div>
              <div className="bg-white-lighter rounded-lg flex justify-between items-center h-14 px-4">
                <span>News & Update Alert</span>
                <img alt="" src={switchRight} />
              </div>
              <div className="bg-white-lighter rounded-lg flex justify-between items-center h-14 px-4">
                <span>Password Change Alert</span>
                <img alt="" src={switchRight} />
              </div>
              <div className="bg-white-lighter rounded-lg flex justify-between items-center h-14 px-4">
                <span>Email Alert</span>
                <img alt="" src={switchRight} />
              </div>
              <div className="bg-white-lighter rounded-lg flex justify-between items-center h-14 px-4">
                <span>Library update Alert</span>
                <img alt="" src={switchRight} />
              </div>
            </div>
        </div>
    );
};

export default Notifications;
