import React from "react";
import { Link } from "react-router-dom";
const CustomButton = ({
  link,
  label,
  handleOnClick,
  extraClasses = "",
  disabled = false,
  style = 1,
}) => {
  return link ? (
    !disabled ? (
      <Link to={link}>
        {style === 1 ? (
          <button
            onClick={handleOnClick}
            className={`transition delay-75 text-white tracking-wide uppercase border-2 border-red rounded p-2 hover:bg-red ease-in-out w-full ${extraClasses}`}
          >
            {label}
          </button>
        ) : style === 2 ? (
          <button
            onClick={handleOnClick}
            className={`transition delay-75 text-white tracking-wide bg-red p-2 rounded-md shadow-md  uppercase w-full ${extraClasses}`}
          >
            {label}
          </button>
        ) : null}
      </Link>
    ) : style === 1 ? (
      <button className="text-white opacity-30 tracking-wide uppercase border-2 border-red rounded p-2 w-full">
        {label}
      </button>
    ) : style === 2 ? (
      <button className="text-white opacity-30 tracking-wide uppercase bg-red p-2 rounded-md shadow-md  w-full">
        {label}
      </button>
    ) : null
  ) : !disabled ? (
    style === 1 ? (
      <button
        onClick={handleOnClick}
        className={`transition delay-75 text-white tracking-wide uppercase border-2 border-red rounded p-2 hover:bg-red ease-in-out w-full ${extraClasses}`}
      >
        {label}
      </button>
    ) : style === 2 ? (
      <button
        onClick={handleOnClick}
        className={`transition delay-75 text-white tracking-wide uppercase bg-red p-2 rounded-md shadow-md ease-in-out w-full ${extraClasses}`}
      >
        {label}
      </button>
    ) : null
  ) : style === 1 ? (
    <button className="text-white opacity-30 tracking-wide uppercase border-2 border-red rounded p-2 w-full">
      {label}
    </button>
  ) : style === 2 ? (
    <button className="text-white opacity-30 tracking-wide uppercase bg-red p-2 rounded-md shadow-md  w-full">
      {label}
    </button>
  ) : null;
};

export default CustomButton;
