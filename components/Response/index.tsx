"use client";
import React from "react";
import XIcon from "../icons/xIcon";

interface ResponseProperties {
  text: string;
  type: "inline" | "text only";
  style?: string;
  close?: boolean;
  setHook?: React.Dispatch<React.SetStateAction<string>>;
}

export default function ErrorResponse({
  text,
  type,
  style,
  close,
  setHook,
}: ResponseProperties) {
  return (
    <>
      {type === "inline" ? (
        <div
          className={`relative p-3 mb-3 rounded-md w-full text-center ${style}`}
        >
          {text}
          {close && (
            <span
              className="absolute right-4"
              onClick={() => (setHook ? setHook : "")}
            >
              <XIcon type="circle" style="w-6 h-6 cursor-pointer" />
            </span>
          )}
        </div>
      ) : (
        ""
      )}
    </>
  );
}
