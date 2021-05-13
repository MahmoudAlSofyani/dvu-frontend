import React from "react";
import { Link } from "react-router-dom";
const CustomButton = ({
  link,
  label,
  handleOnClick,
  extraClasses = "",
  disabled = false,
  styleType = 1,
  small = false,
}) => {
  return link ? (
    !disabled ? (
      <Link to={link}>
        {styleType === 1 ? (
          <button
            onClick={handleOnClick}
            className={`font-bold transition delay-75 text-white tracking-wide uppercase border-2 border-red rounded p-2 hover:bg-red ease-in-out  ${extraClasses}`}
          >
            {label}
          </button>
        ) : styleType === 2 ? (
          <button
            onClick={handleOnClick}
            className={`font-bold transition delay-75 text-white tracking-wide bg-red p-2 rounded-md shadow-md  uppercase  ${extraClasses}`}
          >
            {label}
          </button>
        ) : null}
      </Link>
    ) : styleType === 1 ? (
      <button className="font-bold text-white opacity-30 tracking-wide uppercase border-2 border-red rounded p-2 ">
        {label}
      </button>
    ) : styleType === 2 ? (
      <button className="font-bold text-white opacity-30 tracking-wide uppercase bg-red p-2 rounded-md shadow-md  ">
        {label}
      </button>
    ) : null
  ) : !disabled ? (
    styleType === 1 ? (
      <button
        onClick={handleOnClick}
        className={`font-bold transition delay-75 text-white tracking-wide uppercase border-2 border-red rounded p-2 hover:bg-red ease-in-out  ${extraClasses}`}
      >
        {label}
      </button>
    ) : styleType === 2 ? (
      <button
        onClick={handleOnClick}
        className={`font-bold transition delay-75 text-white tracking-wide uppercase bg-red ${
          small ? "px-2 py-1" : "p-2"
        } rounded-md shadow-md ease-in-out  ${extraClasses} `}
      >
        {label}
      </button>
    ) : null
  ) : styleType === 1 ? (
    <button className="font-bold text-white opacity-30 tracking-wide uppercase border-2 border-red rounded p-2 ">
      {label}
    </button>
  ) : styleType === 2 ? (
    <button className="font-bold text-white opacity-30 tracking-wide uppercase bg-red p-2 rounded-md shadow-md  ">
      {label}
    </button>
  ) : null;
};

export default CustomButton;
