import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MenuIcon } from "@heroicons/react/outline";
import NavMenu from "../nav-menu";
import { useStoreActions, useStoreState } from "easy-peasy";

const Header = ({ open }) => {
  const isMenuOpen = useStoreState((state) => state.mobileSideBar.isMenuOpen);
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
    {
      type: "a",
      text: "Gallery",
      to: "/gallery",
      mobile: false,
    },
    {
      type: "img",
      src: "/assets/logos/dvu-logo.png",
      to: "/",
      mobile: true,
    },
    {
      type: "a",
      text: "Media Team",
      to: "/media-team",
      mobile: false,
    },
    {
      type: "a",
      text: "Contact Us",
      to: "/contact-us",
      mobile: false,
    },
    {
      type: "button",
      text: "Portal",
      to: "/portal",
      mobile: false,
    },
  ];

  return (
    <>
      {isMenuOpen ? (
        <div className="bg-charcoal z-50 absolute w-screen h-screen right-0 rounded">
          <NavMenu />
        </div>
      ) : null}
      <nav className="flex flex-nowrap justify-between items-center">
        {menuItems.map((_item, index) =>
          _item.type === "a" ? (
            <Link
              key={index}
              to={_item.to}
              className="text-white tracking-wide uppercase hidden lg:block"
            >
              {_item.text}
            </Link>
          ) : _item.type === "img" ? (
            <Link key={index} to={_item.to}>
              <div className="w-60 sm:w-80">
                <img src={_item.src} className="w-auto h-auto" />
              </div>
            </Link>
          ) : _item.type === "button" ? (
            <Link key={index} to={_item.to}>
              <button className="transition delay-75 text-white tracking-wide uppercase border-2 border-red rounded p-2 hover:bg-red ease-in-out hidden lg:block">
                {_item.text}
              </button>
            </Link>
          ) : null
        )}
        <div className="w-8 h-8 mx-5 lg:hidden">
          <MenuIcon
            onClick={toggleMenu}
            className="text-white hover:text-red transition ease-in-out "
          />
        </div>
      </nav>
    </>
  );
};

export default Header;
