"use client"
import React from "react";

interface labelProperties {
  label: string;
  text: string;
}

export default function Label({ label, text }:labelProperties) {
  return (
    <>
      <label className="text-xs text-gray-900 font-medium" htmlFor={label}>{text} <sup className="text-red-500">*</sup></label>
    </>
  );
}
