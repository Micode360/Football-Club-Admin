"use client"
import { formattedNumber } from "@/utils/reusableFunctions";
import React from "react"

interface statsCardPrperties {
    Icon: any;
    style?:string;
    text:string;
    count:number;
}


export default function StatsCard ({ Icon, style, text, count }:statsCardPrperties) {
    return (
        <div className={`flex justify-between items-center py-6 px-4 shadow-xl ${style}`}>
            {Icon && <Icon style="w-[6rem] h-[6rem] text-[#ebebeb]" />}
            <div className="flex flex-col items-center justify-center">
                <h2 className="text-6xl font-[200] text-white mb-3">{formattedNumber(count)}</h2>
                <p className="font-[400] text-[#f1eeee]">{ text }</p> 
            </div>
        </div>
    );
}