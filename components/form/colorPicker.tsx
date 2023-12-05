import React, { useEffect, useState, useRef } from "react";
import { HexColorPicker } from "react-colorful";
import Label from "@/components/form/label";

interface ColorPickerProperties {
  label?: string | undefined;
  text?: string | undefined;
  handleColorChange: (color: string) => void;
  colorView: string;
}

export default function ColorPicker({
  label,
  text,
  handleColorChange,
  colorView,
}: ColorPickerProperties) {
  const ref = useRef() as any;
  const [onClickData, setOnClickData] = useState("");
  const [buttonOneClick, setButtonOneClick] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        event.target.className !== onClickData
      ) {
        setButtonOneClick(false);
        return;
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [onClickData, setButtonOneClick, buttonOneClick]);

  const handleColorClick: any = (e: any) => {
    setOnClickData(e.target.className);
    setButtonOneClick(true);
  };

  return (
    <div className="relative">
      {label && text? <Label label={label} text={text} notImportant={true} />:""}
      <button
        type="button"
        className="p-1 rounded h-14 w-full border border-1"
        name="fromColor"
        onClick={handleColorClick}
      >
        <div
          style={{ backgroundColor: colorView }}
          className="w-full h-full rounded"
        ></div>
      </button>
      {buttonOneClick && (
        <div ref={ref} className="colorpickr">
          <div className="absolute top-full md:w-full">
            <HexColorPicker color={colorView} onChange={handleColorChange} />
          </div>
        </div>
      )}
    </div>
  );
}
