import React from "react";
import { BiChevronLeft } from "react-icons/bi";
// import { Link } from "react-router-dom";
import Link from "next/link";
import CustomButton from "../custom-button";

const SectionHeader = ({
  heading,
  backLink,
  buttonLink,
  buttonLabel,
  subHeading,
  handleButtonOnClick,
}) => {
  return (
    <>
      {/* <div className="flex flex-row justify-between">
        <div className="flex flex-row">
          {backLink ? (
            <Link to={backLink}>
              <BiChevronLeft className="text-white text-3xl" />
            </Link>
          ) : null}
          <h6 className="text-white font-bold font-display uppercase tracking-widest text-xl">
            {heading}
          </h6>
        </div>

        {buttonLink ? (
          <Link to={buttonLink}>
            <button className="bg-red text-white px-2 rounded-md uppercase">
              {buttonLabel}
            </button>
          </Link>
        ) : null}

        {handleButtonOnClick ? (
          <button
            className="bg-red text-white px-2 rounded-md uppercase"
            onClick={handleButtonOnClick}
          >
            {buttonLabel}
          </button>
        ) : null}
      </div> */}
      <div>
        <div
          className={`flex ${
            buttonLink || handleButtonOnClick ? "justify-between" : null
          }`}
        >
          {backLink ? (
            <Link href={backLink}>
              <BiChevronLeft className="text-white text-3xl" />
            </Link>
          ) : null}
          <h6 className="text-white font-bold uppercase tracking-widest text-xl">
            {heading}
          </h6>
          {/* {buttonLink ? (
            <Link href={buttonLink} passHref>
              <CustomButton label={buttonLabel} styleType={2} small />
            </Link>
          ) : null} */}
          {buttonLink ? (
            <Link href={buttonLink}>
              <button className="font-bold transition delay-75 text-white tracking-wide uppercase bg-red px-2 py-1  rounded-md shadow-md ease-in-out">
                {buttonLabel}
              </button>
            </Link>
          ) : null}
          {handleButtonOnClick ? (
            <CustomButton
              label={buttonLabel}
              handleOnClick={handleButtonOnClick}
              styleType={2}
              small
            />
          ) : null}
        </div>
        {subHeading ? (
          <div>
            <p className="text-white py-3 uppercase opacity-60 text-sm">
              {subHeading}
            </p>
          </div>
        ) : null}
        <hr
          className={`border-red border rounded ${subHeading ? null : "my-3"}`}
        />
      </div>
    </>
  );
};

export default SectionHeader;
