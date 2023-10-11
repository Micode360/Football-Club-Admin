"use client";
import Image from "next/image";
import ArrowVertical from "../icons/arrowVertical";

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
        />
        <span className="flex cursor-pointer">
          Miracle King
          <ArrowVertical
            direction={showDropdown ? "up" : "down"}
            style="ml-1"
          />
        </span>
      </div>
      {children}
    </>
  );
}
