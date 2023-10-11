"use client";
import React, { useEffect, useRef, useState } from "react";

interface dropdownProperties {
  data: Array<{}>;
  column: Array<string>;
  showDropdown: boolean;
  setShowDropdown: any;
  onClickData: string;
}

export default function DropDownMenu({
  data,
  column,
  showDropdown,
  setShowDropdown,
  onClickData,
}: dropdownProperties) {
  const [dropdownData, setDropdownData] = useState(data);
  const [dropdownColumnData, setColumnData] = useState(column);

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
          className="shadow-xl absolute top-full bg-white w-full p-2"
          ref={ref}
        >
          {dropdownData.map((data: any) => {
            return (
              <div className="py-2" key={data.id}>
                {dropdownColumnData.map((column) => (
                  <a href="#" key={column}>
                    {data[column]}
                  </a>
                ))}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
