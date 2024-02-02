"use client";
import React from "react";

interface cameraIconProperties {
  style?: string;
  property: "outline" | "solid" | "circle-plus";
  setOnClick?: (e:any) => void;
}

export default function CircleIcon({
  style,
  property,
  setOnClick,
}: cameraIconProperties) {
  return (
    <>
      {property === "circle-plus" ? (
        <svg
          onClick={setOnClick}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={`w-6 h-6 ${style}`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      ) : (
        ""
      )}
    </>
  );
}
