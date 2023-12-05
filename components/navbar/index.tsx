"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import DropDownMenu from "../dropDownMenu";
import Logo from "../icons/logo";
import MessageIcon from "../icons/message";
import NotificationIcon from "../icons/notificationIcon";
import ProfileNav from "../profileNav";
import {
  profileNavData,
} from "../../utils/constantdatas";

export default function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [onClickData, setOnClickData] = useState("");
  const [ url, setUrl ] = useState("");

  useEffect(() => {
    setUrl(window.location.pathname.split("/")[1]);
  }, []);

  return (
    <nav className="fixed top-0 left-0 md:pl-[6rem] right-0 z-[11] bg-white flex items-center justify-between shadow-xl py-2 px-4 md:py-4 md:px-6">
      <div className="flex items-center">
        <Link className="flex items-center" href="/">
            <Logo width={40} height={40} style="w-[100] h-auto" />
            <h1 className="hidden md:block text-xs md:text-xl font-[400]">
              The <span className="text-custom_orange font-[600]">League</span>
            </h1>
        </Link>
        <span className="hidden md:block text-basic font-[600] mx-2">/</span>
        <h1 className="hidden md:block text-basic font-[600] text-custom_gray">{url === ""?"Darshboard":url.replace(/^\w/, (c: string) => c.toUpperCase())}</h1>
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
                showDropdown={showDropdown}
                setShowDropdown={setShowDropdown} 
                onClickData={onClickData}
                style="w-[8rem] right-0 md:right-none bg-white rounded-md"
              />  
          </ProfileNav>            
        </div>
      </div>
    </nav>
  );
}
