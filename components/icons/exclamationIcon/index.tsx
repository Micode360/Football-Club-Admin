"use client";
import React from "react";

interface ExIconProperties {
  style?: string;
  type: "circle" | "solid";
}

export default function ExIcon({ style, type }: ExIconProperties) {
  return (
    <>
      {type === "circle" ? (
         <svg
         className="mx-auto mb-4 w-12 h-12"
         aria-hidden="true"
         xmlns="http://www.w3.org/2000/svg"
         fill="none"
         viewBox="0 0 20 20"
       >
         <path
           stroke="currentColor"
           strokeLinecap="round"
           strokeLinejoin="round"
           strokeWidth={1}
           d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
         />
       </svg>
      ) : (
        ""
      )}
    </>
  );
}
