import React from "react";
import { Link } from "react-router-dom";
const CustomButton = ({ link, label, handleOnClick, extraClasses = "" }) => {
  return link ? (
    <Link to={link}>
      <button
        onClick={handleOnClick}
        className={`transition delay-75 text-white tracking-wide uppercase border-2 border-red rounded p-2 hover:bg-red ease-in-out w-full ${extraClasses}`}
      >
        {label}
      </button>
    </Link>
  ) : (
    <button
      onClick={handleOnClick}
      className={`transition delay-75 text-white tracking-wide uppercase border-2 border-red rounded p-2 hover:bg-red ease-in-out w-full ${extraClasses}`}
    >
      {label}
    </button>
  );
};

export default CustomButton;
