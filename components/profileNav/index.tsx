"use client";
import { useContext } from "react";
import Image from "next/image";
import ArrowIcon from "../icons/arrow";
import { MyContext } from "@/components/layout/userContext";

interface showDropdownProperties {
  showDropdown: boolean;
  children: React.ReactNode;
}
export default function ProfileNav({
  showDropdown,
  children,
}: showDropdownProperties) {
  const { profile } = useContext(MyContext)?.myData ?? {};


  return (
    <>
      <div className="flex items-center">
        <Image
          src={profile?.profilePic?.imgUrl ?? "/234567891.svg"}
          width={50}
          height={50}
          className="w-10 h-10 rounded-full object-cover object-center mr-1"
          alt="profile pic"
          priority
        />
        <span className="hidden md:flex cursor-pointer">
          {profile && `${profile.firstName || ""} ${profile.lastName || ""}`}
          <ArrowIcon direction={showDropdown ? "up" : "down"} style="ml-1" />
        </span>
      </div>
      {children}
    </>
  );
}
