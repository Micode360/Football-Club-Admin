"use client";
import React from "react";

interface ellipsisIconProperties {
  style?: string;
  property: "outline" | "solid" | "circle";
  setOnClick?: () => void;
}

export default function EllipsisIcon({
  style,
  property,
  setOnClick,
}: ellipsisIconProperties) {
  return (
    <>
      {property === "outline" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          onClick={setOnClick}
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={`w-6 h-6 ${style}`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
          />
        </svg>
      ) : property === "circle" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          onClick={setOnClick}
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={`w-6 h-6 ${style}`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ) : (
        ""
      )}
    </>
  );
}
