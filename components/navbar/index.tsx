"use client";
import { useState } from "react";
import DropDownMenu from "../dropDownMenu";
import Logo from "../icons/logo";
import MessageIcon from "../icons/message";
import NotificationIcon from "../icons/notificationIcon";
import ProfileNav from "../profileNav";
import {
  profileNavData,
  profileNavAttributes,
} from "../../utils/constantdatas";

export default function Navbar() {
  let title = "Darsboard";
  const [showDropdown, setShowDropdown] = useState(false);
  const [onClickData, setOnClickData] = useState("");

  return (
    <nav className="flex items-center justify-between shadow-xl py-4 px-6">
      <div className="flex items-center">
        <Logo width={60} height={60} style="w-[60] h-auto" />
        <h1 className="text-xl font-[400]">
          The <span className="text-custom_orange font-[600]">League</span>
        </h1>
        <span className="text-basic font-[600] mx-2">/</span>
        <h1 className="text-basic font-[600] text-custom_gray">{title}</h1>
      </div>

      <div className="flex items-center">
        <span className="mx-4">
          <NotificationIcon
            style="text-custom_gray cursor-pointer"
            active={true}
          />
        </span>
        <span className="mx-4">
          <MessageIcon style="text-custom_gray cursor-pointer" active={true} />
        </span>
        <div
          onClick={(e:any) => {
            setShowDropdown(!showDropdown)
            setOnClickData(e.target.className)
          }}
          className="relative"
        >
          <ProfileNav showDropdown={showDropdown}>
              <DropDownMenu
                data={profileNavData}
                column={profileNavAttributes}
                showDropdown={showDropdown}
                setShowDropdown={setShowDropdown}
                onClickData={onClickData}
              />  
          </ProfileNav>            
        </div>
      </div>
    </nav>
  );
}
