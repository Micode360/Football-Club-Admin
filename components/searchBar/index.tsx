import React from "react";
import SearchIcon from "../icons/searchIcon";

interface SearchBar {
  setState: any;
}

export default function SearchBar({ setState }: SearchBar) {
  return (
    <div className="py-4 px-4">
      <div className="flex items-center border rounded-md px-2">
        <SearchIcon />
        <input
          className="rounded-md outline-none text-xs px-3 py-2"
          type="text"
          onChange={(e: any) => setState(e.target.value)}
          placeholder="Search here..."
        />
      </div>
    </div>
  );
}
