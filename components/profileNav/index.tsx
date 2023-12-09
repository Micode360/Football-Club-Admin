"use client";
import Image from "next/image";
import ArrowIcon from "../icons/arrow";

interface showDropdownProperties {
  showDropdown: boolean;
  children: React.ReactNode;
}
export default function ProfileNav({
  showDropdown,
  children,
}: showDropdownProperties) {
  return (
    <>
      <div className="flex items-center">
        <Image
          src={"/234567891.svg"}
          width={50}
          height={50}
          className="w-[60] h-auto rounded-full"
          alt="profile pic"
          priority
        />
        <span className="hidden md:flex cursor-pointer">
          Miracle King
          <ArrowIcon
            direction={showDropdown ? "up" : "down"}
            style="ml-1"
          />
        </span>
      </div>
      {children}
    </>
  );
}
