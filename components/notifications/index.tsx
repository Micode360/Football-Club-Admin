import React, { useState } from "react";
import parse from "html-react-parser";
import { DaysAgo } from "@/utils/utilsFunctions";
import Link from "next/link";
import DropDownMenu from "../dropDownMenu";
import EllipsisIcon from "../icons/ellipsisIcon";
import notificationHooksAndProps from "@/hooks/notifications/notificationHooks";

interface MessageProperties {
  listId: String;
  sender: string;
  message: string;
  time: string;
  read: boolean;
  profilePic: string;
  action: any;
  textHeadingsStyle?: string;
  timeStyle?: string;
  noDropDown?: boolean;
}

export default function MessageContainer({
  listId,
  sender,
  message,
  time,
  read,
  profilePic,
  action,
  textHeadingsStyle,
  timeStyle,
  noDropDown,
}: MessageProperties) {
  const [showDropdown, setShowDropdown] = useState(false);
  const { markNotificationAsRead, notificationDropdownData } =
    notificationHooksAndProps();
  return (
    <section
      style={{ background: read ? "#ffffff" : "#c1dffb" }}
      id="nav_case"
      className="flex items-center justify-between cursor-pointer border-b py-3 px-4"
    >
      <div className="flex items-center">
        {!profilePic || profilePic === "" ? (
          <div className="w-10 h-10 bg-gray-800 flex items-center justify-center mr-4 text-white rounded-full">
            !
          </div>
        ) : (
          <img
            src={profilePic}
            className="rounded-full object-cover object-center w-10 h-10 mr-4"
            alt="profile photo"
          />
        )}
        <Link
          onClick={() => markNotificationAsRead(listId, "single")}
          href={{
            pathname: action.path,
            query: {
              request: sender,
            },
          }}
        >
          <div className={`${textHeadingsStyle} text-md`}>
            {message && parse(message)}
          </div>
          <div className={`${timeStyle} text-xs`}>
            {DaysAgo(parseInt(time, 10))}
          </div>
        </Link>
      </div>

      {!noDropDown && (
        <div
          onClick={(e: any) => setShowDropdown(!showDropdown)}
          id="dropdown"
          className="relative text-xs"
        >
          <EllipsisIcon property={"horizontal"} />
          <DropDownMenu
            data={notificationDropdownData(listId, "single")}
            showDropdown={showDropdown}
            setShowDropdown={setShowDropdown}
            style="right-0 md:right-none bg-white rounded-md !w-fit"
          />
        </div>
      )}
    </section>
  );
}
