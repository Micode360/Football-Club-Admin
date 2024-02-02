import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import ArrowIcon from "../icons/arrow";

interface SelectCheckboxInputProps {
  formik?: any;
  options: Array<{
    label?: string;
    value?: string;
  }>;
  name?: string;
  onChange?: any;
  onBlur?: any;
  placeholder?: string;
  style?: string;
}

export default function SelectCheckboxtInput({
  formik,
  options,
  name,
  placeholder,
  style,
}: SelectCheckboxInputProps) {
  const [open, setOpen] = useState<boolean>(false);

  const ref = useRef() as any;

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        event.target.className !== "checkbox-label"
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [setOpen]);

  const toggleCheckbox:any = (value: string) => {
    const index = formik.values.categories.indexOf(value);
    if (index === -1) {
      formik.setFieldValue(name, [...formik.values.categories, value]);
    } else {
      const newValues = [...formik.values.categories];
      newValues.splice(index, 1);
      formik.setFieldValue(name, newValues);
    }
  };
  const clearSelection = () => {
    formik.setFieldValue(name, []);
  };

  return (
    <div className="relative flex items-center">
      <div className="flex items-center border bg-gray-100 border-gray-200 w-full rounded-md">
        <div
          className={`w-full px-4 py-4 text-xs bg-gray-100 placeholder-gray-500 focus:outline-none focus:border-gray-400 focus:bg-white ${style}`}
          onClick={() => setOpen(!open)}
        >
          {formik?.values?.categories && formik?.values?.categories?.length < 1
            ? placeholder || "Select..."
            : formik?.values?.categories?.join(", ")}
        </div>
        <span className="cursor-pointer px-2" onClick={() => setOpen(!open)}>
          <ArrowIcon direction={open ? "up" : "down"} style="!w-5 !h-5" />
        </span>
      </div>
      {open && (
        <ul
          ref={ref}
          className="absolute top-12 z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-[8rem] overflow-y-scroll"
        >
          {options.map((option: any) => (
            <li
              key={option.value}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-xs flex items-center"
            >
              {option.value !== "select" && (
                <input
                  className="mr-1"
                  type="checkbox"
                  id={option.value}
                  value={option.value}
                  checked={formik?.values?.categories?.includes(option.value)}
                  onChange={() => toggleCheckbox(option.value)}
                />
              )}
              <label htmlFor={option.value} className="checkbox-label">
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
              </label>
            </li>
          ))}
          <li className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-xs">
            <button onClick={clearSelection}>Clear Selection</button>
          </li>
        </ul>
      )}
    </div>
  );
}
