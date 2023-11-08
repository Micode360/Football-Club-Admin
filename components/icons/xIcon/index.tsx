"use client";
import React from "react";

interface XIconProperties {
  style?: string;
  type: "circle" | "solid";
  setOnClick?:()=> void;
}

export default function XIcon({ style, type, setOnClick }: XIconProperties) {
  return (
    <>
      {type === "circle" ? (
        <svg
          onClick={setOnClick}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={`${style}`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ) : (
        ""
      )}
    </>
  );
}
