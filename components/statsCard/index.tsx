"use client";
import Image from "next/image";
import { formattedNumber } from "@/utils/utilsFunctions";
import React from "react";

interface statsCardPrperties {
  Icon: any;
  style?: string;
  text: string;
  count: number;
}

export default function StatsCard({
  Icon,
  style,
  text,
  count,
}: statsCardPrperties) {
  return (
    <div
      className={`flex justify-between items-center relative py-6 md:py-8 2xl:py-14 px-4 shadow-xl rounded ${style} overflow-hidden`}
    >
      {Icon && (
        <Icon style="w-[3rem] h-[3rem] md:w-[6rem] md:h-[6rem] text-[#ebebeb]" />
      )}
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-3xl  md:text-6xl font-[200] text-white mb-3">
          {formattedNumber(count)}
        </h2>
        <p className="font-[400] text-[#f1eeee]">{text}</p>
      </div>
      <Image
        src="/curvy_lines.svg"
        alt="logo"
        width={100}
        height={100}
        className={`absolute top-0 md:top-[100px] bottom-[-15px] right-[4rem] scale-[4] opacity-95`}
      />
    </div>
  );
}
