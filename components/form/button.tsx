"use client";
import React from "react";

interface buttonProperties {
  type: "button" | "submit" | "reset" | undefined;
  children: React.ReactNode;
  style?: string;
}

export default function Button({ type, children, style }: buttonProperties) {
  return (
    <button
      className={`mt-5 tracking-wide font-semibold text-gray-100 w-full py-2 rounded-md transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none ${style}`}
      type={type}
    >
      {children}
    </button>
  );
}
