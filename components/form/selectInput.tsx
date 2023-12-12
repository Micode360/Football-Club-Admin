import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import ArrowIcon from "../icons/arrow";

interface SelectInputProps {
  formik?: any;
  options: Array<{
    imagePath?: string;
    value?: string;
  }>;
  name?: string;
  onChange?: any;
  onBlur?: any;
  placeholder?: string;
  style?: string;
}

export default function SelectInput({
  formik,
  options,
  name,
  placeholder,
  style,
}: SelectInputProps) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [open, isOpen] = useState<boolean>(false);
  const [onClickData, setOnClickData] = useState<string>("");

  const ref = useRef() as any;

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        event.target.className !== onClickData
      ) {
        isOpen(false);
        return;
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [onClickData, isOpen, open]);

  const filteredOptions = options.filter((option: any) =>
    searchTerm === ""
      ? option.value.split(" ").join().toLowerCase()
      : option.value
          .split(" ")
          .join()
          .toLowerCase()
          .includes(searchTerm.split(" ").join().toLowerCase()),
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    formik.setFieldValue(name, {
      value: e.target.value,
    });
    if (e.target.value === "") isOpen(false);
    else isOpen(true);
    setSearchTerm(e.target.value);
  };

  const chooseValue = (option: any) => {
    setSearchTerm(option.value);
    formik.setFieldValue(name, {
      imgPath: option.imagePath,
      value: option.value,
    });
    isOpen(false);
  };

  return (
    <div className="relative flex items-center">
      <div className="flex items-center border bg-gray-100 border-gray-200 w-full rounded-md">
        <input
          className={`w-full px-4 py-4 text-xs bg-gray-100 placeholder-gray-500 focus:outline-none focus:border-gray-400 focus:bg-white ${style}`}
          type="text"
          placeholder={placeholder || "Search..."}
          onChange={handleInputChange}
          value={(name && formik.values[name].value) || ""}
          name={name}
        />
        <span className="cursor-pointer px-2" onClick={() => isOpen(!open)}>
          <ArrowIcon direction={open ? "up" : "down"} style="!w-5 !h-5" />
        </span>
      </div>
      {open && (
        <ul
          ref={ref}
          className="absolute top-12 z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-[8rem] overflow-y-scroll"
        >
          {filteredOptions.map((option: any) => (
            <li
              key={option.value}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-xs flex items-center"
              onClick={() => chooseValue(option)}
            >
              {option.imagePath && (
                <Image
                  className="w-3 h-3 mr-2 rounded-full"
                  src={option.imagePath}
                  alt="league_logo"
                  width={3}
                  height={3}
                  priority
                />
              )}
              {option.value}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
