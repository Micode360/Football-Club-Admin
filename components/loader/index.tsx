import React from "react";

interface pageloaderProperties {
    text: string;
}

export default function MyOnPageLoader({ text }:pageloaderProperties) {
  return (
    <div className="bg-custom_orange flex items-center text-white text-xs shadow-md border border-custom_orange py-2 px-4 rounded cursor-pointer w-fit">
      <p className="mr-4"> { text } </p>
      <div className="boxes_loader mx-2 !h-[16px] scale-[0.7] !left-[-28px]"></div>
    </div>
  );
}
