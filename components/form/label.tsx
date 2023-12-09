"use client";
import React from "react";

interface labelProperties {
  label: string;
  text: string;
  notImportant?: boolean;
}

export default function Label({ label, text, notImportant }: labelProperties) {
  return (
    <>
      <label className="text-xs text-gray-900 font-medium" htmlFor={label}>
        {text} {notImportant ? "" : <sup className="text-red-500">*</sup>}{" "}
      </label>
    </>
  );
}
