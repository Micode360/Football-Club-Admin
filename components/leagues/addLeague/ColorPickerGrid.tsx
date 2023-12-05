import React, { useState } from "react";
import ColorPicker from "@/components/form/colorPicker";

interface colorPickerGridProps {
  formik?: any;
}
export default function ColorPickerGrid({ formik }: colorPickerGridProps) {
  const [color1, setColor1] = useState("#000000");
  const [color2, setColor2] = useState("#000000");

  const handleColorChange: any = (color: any, label: string, setState: any) => {
    formik.setFieldValue(label, color);
    setState(color);
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <ColorPicker
        label={"fromColor"}
        text={"Theme 1"}
        handleColorChange={(color: string) =>
          handleColorChange(color, "fromColor", setColor1)
        }
        colorView={color1}
      />

      <ColorPicker
        label={"toColor"}
        text={"Theme 2"}
        handleColorChange={(color: string) =>
          handleColorChange(color, "toColor", setColor2)
        }
        colorView={color2}
      />
    </div>
  );
}
