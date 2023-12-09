"use client";
import React, { useState } from "react";
import EyeIcon from "../icons/eye";

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
  const [isPassword, setIsPassword] = useState<boolean>(true);
  const [passWordType, setPasswordType] = useState<string>("password");

  const handlePasswordVisibility = () => {
    setIsPassword(!isPassword);
    setPasswordType(!isPassword ? "password" : "text");
  };
  return (
    <div className="relative flex items-center">
      <input
        className={`w-full px-4 py-4 rounded-md bg-gray-100 border border-gray-200 placeholder-gray-500 text-xs focus:outline-none focus:border-gray-400 focus:bg-white mb-2 ${style}`}
        type={type === "password" ? passWordType : type}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        name={name}
      />
      {type === "password" && (
        <span
          className="absolute right-3 cursor-pointer"
          onClick={handlePasswordVisibility}
        >
          <EyeIcon closed={isPassword} style="w-4 h-4 text-custom_gray" />
        </span>
      )}
    </div>
  );
}
