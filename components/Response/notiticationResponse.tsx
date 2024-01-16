"use client";
import React from "react";
import XIcon from "../icons/closeIcon";

interface ResponseProperties {
  isOpen: {
    status: boolean | string;
    message: string;
    color: string;
  };
  style?: string;
  setIsOpen: React.Dispatch<
    React.SetStateAction<{
      status: boolean | string;
      message: string;
      color: string;
    }>
  >;
}

export default function NotiticationResponse({
  isOpen,
  style,
  setIsOpen,
}: ResponseProperties) {
  return (
    <>
      {isOpen.status === "pending"?
      (
        <div
          className={`flex items-center justify-between px-4 py-2 h-fit bg-custom_blue fixed top-[15%] left-1/2 -translate-x-1/2 z-[999999999] rounded-full ${style} text-white `}
        >
          <div className="boxes_loader mx-6 !h-[16px] scale-[0.7] !left-[-28px]"></div>
        </div>
      )
      :isOpen.status ? (
        <div
          style={{
            backgroundColor:
              isOpen.color === "green"
                ? "#2f6632"
                : isOpen.color === "red"
                  ? "#b42e29"
                  : isOpen.color === "blue"
                    ? "bg-custom_blue"
                    : "",
          }}
          className={`flex items-center justify-between text-center px-4 py-2 h-fit fixed top-[15%] left-1/2 -translate-x-1/2 z-[999999999] rounded-full ${style} text-white `}
        >
          <span className="mx-4">{isOpen.message}</span>
          <XIcon
            setOnClick={() =>
              setIsOpen({ status: false, message: "", color: "" })
            }
            type="circle"
            style="w-5 h-5 cursor-pointer"
          />
        </div>
      ) : (
        ""
      )}
    </>
  );
}
