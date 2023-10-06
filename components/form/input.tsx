"use client";
import React from "react";

interface inputProperties {
  type: string;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  name?: string;
  style?: string;
}

export default function Input({
  type,
  placeholder,
  onChange,
  onBlur,
  value,
  name,
  style,
}: inputProperties) {
  return (
    <div>
      <input
        className={`w-full px-4 py-4 rounded-md bg-gray-100 border border-gray-200 placeholder-gray-500 text-xs focus:outline-none focus:border-gray-400 focus:bg-white mb-2 ${style}`}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        name={name}
      />
    </div>
  );
}
