import React from "react";
import { AiOutlineSearch } from "react-icons/ai";

const SearchBar = ({handleInputChange}) => {
  return (
    <div className="relative">
      <input type="text" className="w-full bg-charcoal rounded-md p-1 text-white" onChange={handleInputChange} />
      <span className="absolute right-2 top-1 text-white text-2xl">
        <AiOutlineSearch />
      </span>
    </div>
  );
};

export default SearchBar;
