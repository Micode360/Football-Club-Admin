import React from "react";
import SearchIcon from "../icons/searchIcon";

interface SearchBar {
  setState: any;
  style?: string;
  placeholder?:string;
}

export default function SearchBar({ setState, style, placeholder }: SearchBar) {
  return (
    <div className={`py-4 px-4 ${style}`}>
      <div className="flex items-center border rounded-md px-2 w-full">
        <SearchIcon />
        <input
          className="rounded-md outline-none text-xs px-3 py-2 w-full"
          type="text"
          onChange={(e: any) => setState(e.target.value)}
          placeholder={placeholder? placeholder:"Search here..."}
        />
      </div>
    </div>
  );
}
