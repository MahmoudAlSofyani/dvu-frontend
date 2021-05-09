import React from "react";
import { XIcon } from "@heroicons/react/solid";
import { useStoreActions } from "easy-peasy";
import { Link } from "react-router-dom";
import CustomButton from "../custom-button";
const NavMenu = () => {
  const toggleMenu = useStoreActions(
    (actions) => actions.mobileSideBar.toggleMenu
  );

  const menuItems = [
    {
      type: "a",
      text: "The #Circle",
      to: "/about-us",
      mobile: false,
    },
    {
      type: "a",
      text: "Sponsors",
      to: "/sponsors",
      mobile: false,
    },
    // {
    //   type: "a",
    //   text: "Gallery",
    //   to: "/gallery",
    //   mobile: false,
    // },
    // {
    //   type: "a",
    //   text: "Media Team",
    //   to: "/media-team",
    //   mobile: false,
    // },
    // {
    //   type: "a",
    //   text: "Contact Us",
    //   to: "/contact-us",
    //   mobile: false,
    // },
    {
      type: "button",
      text: "Portal",
      to: "/portal",
      mobile: false,
    },
  ];

  return (
    <>
      <nav className="flex flex-col p-5 space-y-10">
        <div>
          <div className="float-left w-3/4">
            <img
              src="/assets/logos/dvu-logo.png"
              alt="Der Volkskreis UAE Logo"
            />
          </div>
          <div className="w-1/6 absolute p-4 right-0">
            <XIcon onClick={toggleMenu} className="text-white" />
          </div>
        </div>

        {menuItems.map((_item, index) =>
          _item.type === "a" ? (
            <Link
              onClick={toggleMenu}
              key={index}
              to={_item.to}
              className="text-white tracking-wide uppercase"
            >
              {_item.text}
            </Link>
          ) : _item.type === "button" ? (
            <CustomButton
              key={index}
              handleOnClick={toggleMenu}
              label={_item.text}
              link={_item.to}
            />
          ) : null
        )}
      </nav>
    </>
  );
};

export default NavMenu;
