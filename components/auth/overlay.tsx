"use client"
import React from "react"
import Image from "next/legacy/image"

interface overlayProperties {
    backgroundColor:string;
    opacity: string;
    style?:string;
    styleChild?:string;
    children?:React.ReactNode;
}

export default function FormOverLay ({ backgroundColor, opacity, children, style, styleChild }:overlayProperties) {

    return (
        <div className={`md:block relative text-white ${style}`}>
        <Image
          src="/football.jfif"
          alt="ball_overlay"
          layout="fill"
          objectFit="cover"
          className="w-full h-auto"
          priority
        />
        <div className={`absolute inset-0 ${backgroundColor} ${opacity} flex justify-center items-center text-white text-xl font-bold`}>
            <div className={`text-white ${styleChild}`}>{ children }</div>
        </div>
      </div>
    );
}