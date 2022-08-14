import React from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import searchIcon from "../../assets/images/search-icon.svg";
import userIcon from "../../assets/images/user-icon-lg.svg";
import settingsIcon from "../../assets/images/settings-icon-dark.svg";
import notificationIcon from "../../assets/images/notification-icon-dark.svg";
import naira from "../../assets/images/naira.svg";

import { Link } from "react-router-dom";


const DashboardScreen = () => {
  return (
    <DashboardLayout>
      <div className="pt-[48px] pr-16 text-primary">
        <div className="flex justify-between items-center mb-[60px]">
          <div className="relative flex items-center">
            <input type="search" className="w-[789px] h-[56px] px-4 bg-white-lighter border-none rounded-lg focus:ring-primary" placeholder="Search" />
            <img alt="search" src={searchIcon} className="absolute right-4" />
          </div>
          <div className="flex items-center space-x-[38px]">
            <Link to="/">
              <img alt="" src={notificationIcon} />
            </Link>
            <Link to="/">
              <img alt="" src={settingsIcon} />
            </Link>
            <img alt="" src={userIcon} />
          </div>
        </div>

        <div className="w-[1119px]">
          <h2 className="text-xl font-semibold mb-[40px]">Overview</h2>

          <div className="h-[328px] flex justify-between">
            <div className="w-[456px] h-full bg-white-light shadow-sm rounded-[20px]">
              <div className="py-3 text-center flex text-base divide-x h-full">
                <div className="basis-1/2 flex flex-col divide-y">
                  <div className="basis-1/3 flex items-center justify-center">
                    <div>
                      <p>Net Asset (₦)</p>
                      <p className="font-semibold">₦ 100,000.03</p>
                    </div>
                  </div>
                  <div className="basis-1/3 flex items-center justify-center">
                    <div>
                      <p>Wallet</p>
                      <p className="font-semibold">$100,000.03</p>
                    </div>
                  </div>
                  <div className="basis-1/3 flex items-center justify-center">
                    <div>
                      <p>Savings</p>
                      <p className="font-semibold">$100,000.03</p>
                    </div>
                  </div>
                </div>
                <div className="basis-1/2 flex flex-col divide-y">
                  <div className="basis-1/3 flex items-center justify-center">
                    <div>
                      <p>Net Asset ($)</p>
                      <p className="font-semibold">$100,000.03</p>
                    </div>
                  </div>
                  <div className="basis-1/3 flex items-center justify-center">
                    <div>
                      <p>Returns</p>
                      <p className="font-semibold">$100,000.03</p>
                    </div>
                  </div>
                  <div className="basis-1/3 flex items-center justify-center">
                    <div>
                      <p>Net Asset ($)</p>
                      <p className="font-semibold">$100,000.03</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[624px] h-full bg-white-light shadow-sm rounded-[20px]"></div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default DashboardScreen;