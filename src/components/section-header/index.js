import React from "react";
import { BiChevronLeft } from "react-icons/bi";
import { Link } from "react-router-dom";
import CustomButton from "../custom-button";

const SectionHeader = ({
  heading,
  backLink,
  buttonLink,
  buttonLabel,
  handleButtonOnClick,
}) => {
  return (
    <>
      <div className="flex flex-row justify-between">
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
      </div>
      <hr className="border-red border rounded" />
    </>
  );
};

export default SectionHeader;
