import React from "react";
import BinIcon from "@/components/icons/binIcon";
import EyeIcon from "@/components/icons/eye";
import MessageIcon from "@/components/icons/messageIcon";

interface AdminCardProps {
  setState:() => void;
  setPreviewState:() => void;
}

export default function AdminCard({ setState, setPreviewState }: AdminCardProps) {
  return (
    <div className="flex flex-col justify-center items-center w-[11.813rem] rounded-lg bg-white p-4 shadow-lg">
      <div>
        <img
          src={"/mp.webp"}
          className="rounded-full object-cover object-center w-20 h-20 mb-2"
          alt="profile photo"
        />
      </div>
      <h3 className="font-[700]">Jeremy Card</h3>
      <p className="text-gray-600 mb-2">Editor</p>
      <p className="text-xs mb-1">Creation of news</p>
      <div className="flex justify-between w-full p-2">
        <EyeIcon
          properties="outline"
          setOnClick={setPreviewState}
          style="!w-5 !h-5 text-gray-600 cursor-pointer"
        />
        <MessageIcon
          properties="outline"
          setOnClick={()=>""}
          active={false}
          style="!w-5 !h-5 text-gray-600 cursor-pointer"
        />
        <BinIcon
          type={"outline"}
          setOnClick={setState}
          style="!w-5 !h-5 text-red-700 cursor-pointer"
        />
      </div>
    </div>
  );
}
