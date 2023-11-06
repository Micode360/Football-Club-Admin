"use client";
import React, { useEffect, useRef, useState } from "react";

interface dropdownProperties {
  data: Array<{}>;
  showDropdown: boolean;
  setShowDropdown: any;
  onClickData: string;
  style?: string;
}

export default function DropDownMenu({
  data,
  showDropdown,
  setShowDropdown,
  onClickData,
  style
}: dropdownProperties) {
  const [dropdownData, setDropdownData] = useState(data);


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
          className={`shadow-xl absolute top-full bg-white md:w-full p-2 ${style}`}
          ref={ref}
        >
          {dropdownData.map((data: any) => {
            return (
              <div className="py-2" key={data.id}>
                 {data.type === "link" ? (
                  <a href={data.path} key={data.id}>
                    {data.name}
                  </a>
                ) : data.type === "itemClickCallbacks" ? (
                  <span className="cursor-pointer" onClick={()=>data.function()} key={data.id}>
                    {data.name}
                  </span>
                ) : null}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
