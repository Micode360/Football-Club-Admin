"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import DropDownMenu from "../dropDownMenu";
import Logo from "../icons/logo";
import MessageIcon from "../icons/messageIcon";
import NotificationIcon from "../icons/notificationIcon";
import ProfileNav from "../profileNav";
import { profileNavData } from "../../utils/constantdatas";
import DropDownMenuWrapper from "../dropDownMenu/dropDownWrapper";
import MessageContainer from "../notifications";
import ModalWrapper from "../modal/modalWrapper";
import SubAdminPreview from "../settings/admins/adminPreview";

export default function Navbar() {
  const [previewModal, setPreviewModal] = useState<boolean>(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNotificationDropdown, setShowNotificationDropdown] =
    useState(false);
  const [showMessageDropdown, setShowMessageDropdown] = useState(false);
  const [isProfile, setIsProfile] = useState("");
  const [isNotification, setIsNotification] = useState("");
  const [isMessage, setIsMessage] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(window.location.pathname.split("/")[1]);
  }, []);

  const notificationMessages = [
    {
      id: 1,
      message: "James Card created a new Article for the Premier League",
      time: "2 days ago",
      read: true,
    },
    {
      id: 2,
      message: "John Doe published a review for the Champions League",
      time: "3 days ago",
      read: true,
    },
    {
      id: 3,
      message: "Emily Smith shared a video in the Europa League group",
      time: "4 days ago",
      read: true,
    },
    {
      id: 4,
      message: "Mark Johnson commented on your post in the La Liga discussion",
      time: "5 days ago",
      read: true,
    },
    {
      id: 5,
      message: "Samantha White liked your photo in the Serie A community",
      time: "6 days ago",
      read: true,
    },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 md:pl-[6rem] right-0 z-[11] bg-white flex items-center justify-between shadow-xl py-2 px-4 md:py-4 md:px-6">
        <div className="flex items-center">
          <Link className="flex items-center" href="/">
            <Logo width={40} height={40} style="w-[100] h-auto" />
            <h1 className="hidden md:block text-xs md:text-xl font-[400]">
              The <span className="text-custom_orange font-[600]">League</span>
            </h1>
          </Link>
          <span className="hidden md:block text-basic font-[600] mx-2">/</span>
          <h1 className="hidden md:block text-basic font-[600] text-custom_gray">
            {url === ""
              ? "Darshboard"
              : url.replace(/^\w/, (c: string) => c.toUpperCase())}
          </h1>
        </div>

        <div className="flex items-center relative">
          <span
            onClick={(e: any) => {
              setShowNotificationDropdown(!showNotificationDropdown);
              setIsNotification(e.target.className);
            }}
            className="notification mx-4"
          >
            <NotificationIcon
              style="text-custom_gray cursor-pointer"
              active={true}
            />
            <DropDownMenuWrapper
              showDropdown={showNotificationDropdown}
              setShowDropdown={setShowNotificationDropdown}
              onClickData={isNotification}
              style="w-[75vw] md:w-fit right-0 md:right-none bg-white rounded-md"
            >
              <h4 className="text-base border-b p-2 mb-2">Notifications</h4>
              {notificationMessages.map(({ id, message, time }) => (
                <MessageContainer
                  key={id}
                  message={message}
                  time={time}
                  read={false}
                  textHeadingsStyle="text-xs"
                  timeStyle="text-xs"
                />
              ))}
              <div className="w-full text-center py-2 text-white bg-custom_orange">
                <Link className="hover:underline" href="/">
                  View All
                </Link>
              </div>
            </DropDownMenuWrapper>
          </span>
          <span
            onClick={(e: any) => {
              setShowMessageDropdown(!showMessageDropdown);
              setIsMessage(e.target.className);
            }}
            className="mx-4"
          >
            <MessageIcon
              style="text-custom_gray cursor-pointer"
              active={true}
            />
            <DropDownMenuWrapper
              showDropdown={showMessageDropdown}
              setShowDropdown={setShowMessageDropdown}
              onClickData={isMessage}
              style="w-[75vw] md:w-fit right-0 md:right-none bg-white rounded-md"
            >
              <h4 className="text-base border-b p-2 mb-2">Messages</h4>
              {notificationMessages.map(({ id, message, time }) => (
                <MessageContainer
                  key={id}
                  message={message}
                  time={time}
                  read={false}
                  textHeadingsStyle="text-xs"
                  timeStyle="text-xs"
                />
              ))}
              <div className="w-full text-center py-2 text-white bg-custom_blue">
                <Link className="hover:underline" href="/">
                  View All
                </Link>
              </div>
            </DropDownMenuWrapper>
          </span>
          <div
            onClick={(e: any) => {
              setShowDropdown(!showDropdown);
              setIsProfile(e.target.className);
            }}
            className="relative"
          >
            <ProfileNav showDropdown={showDropdown}>
              <DropDownMenu
                data={profileNavData}
                showDropdown={showDropdown}
                setShowDropdown={setShowDropdown}
                onClickData={isProfile}
                style="w-[8rem] right-0 md:right-none bg-white rounded-md"
              />
            </ProfileNav>
          </div>
        </div>
      </nav>
      <ModalWrapper
        isOpen={previewModal}
        setIsOpen={setPreviewModal}
        style={"!px-0 !pt-12"}
      >
        <SubAdminPreview />
      </ModalWrapper>
    </>
  );
}
