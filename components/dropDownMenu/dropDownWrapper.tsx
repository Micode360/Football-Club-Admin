"use client";
import React, { useEffect, useRef, useState } from "react";


interface dropdownMenuWrapperProperties {
  showDropdown: boolean;
  setShowDropdown: any;
  onClickData: string;
  style?: string;
  children: React.ReactNode;
}

export default function DropDownMenuWrapper({
  showDropdown,
  setShowDropdown,
  onClickData,
  style,
  children
}: dropdownMenuWrapperProperties) {
  const ref = useRef() as any;

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        event.target.className !== onClickData
      ) {
        setShowDropdown(false);
        return;
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [onClickData, setShowDropdown, showDropdown]);

  return (
    <>
      {showDropdown && (
        <div
          className={`shadow-xl absolute top-full md:w-full ${style}`}
          ref={ref}
        >
         { children }
        </div>
      )}
    </>
  );
}
