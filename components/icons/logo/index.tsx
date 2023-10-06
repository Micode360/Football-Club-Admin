"use client";
import React from "react";
import Image from "next/image";

interface LogoProperties {
  width: number | `${number}` | undefined;
  height: number | `${number}` | undefined;
  style?: string;
}

export default function Logo({ width, height, style }: LogoProperties) {
  return (
    <>
      <Image
        src="/football_dummy_logo.png"
        alt="logo"
        width={width}
        height={height}
        className={`${style}`}
      />
    </>
  );
}
