import React from "react";
import { useRouter } from "next/navigation";
import BinIcon from "@/components/icons/binIcon";
import EyeIcon from "@/components/icons/eye";
import MessageIcon from "@/components/icons/messageIcon";

interface AdminCardProps {
  currentUser?: boolean;
  userRole: string;
  data: any;
  setState: () => void;
  setPreviewState: () => void;
}

export default function AdminCard({
  currentUser,
  userRole,
  data,
  setState,
  setPreviewState,
}: AdminCardProps) {
  const router = useRouter();

  return (
    <div className="flex flex-col justify-center items-center w-[11.813rem] rounded-lg bg-white p-4 shadow-lg">
      <div>
        <img
          src={
            data.profilePic.imgUrl ? data.profilePic?.imgUrl : "/234567891.svg"
          }
          className={`${
            currentUser ? "border-4 border-custom_red" : ""
          } rounded-full object-cover object-center w-20 h-20 mb-2`}
          alt="profile photo"
        />
      </div>
      <h3 className="font-[700]">
        
        {currentUser ? "You" : `${data.firstName} ${data.lastName}`}
      </h3>
      <p className="text-gray-600 mb-2">
        {!data.role
          ? "unknown"
          : data.role.charAt(0).toUpperCase() + data.role.slice(1)}
      </p>
      <p className="text-xs mb-1">
        {!data.role
          ? "no designated role"
          : data.role === "Super Admin"
            ? "Overseer of accounts"
            : "Creator of news"}
      </p>
      <div className="flex justify-between w-full p-2">
        <EyeIcon
          properties="outline"
          setOnClick={setPreviewState}
          style="!w-5 !h-5 text-gray-600 cursor-pointer"
        />
        <MessageIcon
          properties="outline"
          setOnClick={() => router.push("/messages")}
          active={false}
          style="!w-5 !h-5 text-gray-600 cursor-pointer"
        />

        {userRole === "Super Admin" && (
          <BinIcon
            type={"outline"}
            setOnClick={setState}
            style="!w-5 !h-5 text-red-700 cursor-pointer"
          />
        )}
      </div>
    </div>
  );
}
