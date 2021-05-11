import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useStoreActions, useStoreState } from "easy-peasy";
import axios from "axios";
import { AiOutlineHome, AiOutlineLock, AiOutlineQrcode } from "react-icons/ai";
import { MdForum, MdAnnouncement } from "react-icons/md";
import { BsCalendar, BsGear } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
const MemberDashboardMenu = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const currentUser = useStoreState((state) => state.currentUser.currentUser);

  const location = useLocation();

  useEffect(() => {
    try {
      axios
        .post("/members/role", { id: currentUser.id, role: "Admin" })
        .then((_response) => {
          if (_response.status === 200) {
            const { _isRoleExist } = _response.data;

            if (_isRoleExist) setIsAdmin(true);
            else setIsAdmin(false);
          }
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  }, [setIsAdmin]);

  return (
    <div className="fixed right-0 left-0 bottom-0 flex items-center justify-between p-3 bg-darkGray">
      <NavLink to="/members/forums">
        <MdForum
          className={` ${
            location.pathname === "/members/forums"
              ? "text-white text-4xl"
              : "text-red text-3xl"
          }`}
        />
      </NavLink>
      <NavLink to="/members/events">
        <BsCalendar
          className={` ${
            location.pathname === "/members/events"
              ? "text-white text-4xl"
              : "text-red text-3xl"
          }`}
        />
      </NavLink>
      <NavLink to="/members/announcements">
        <MdAnnouncement
          className={` ${
            location.pathname === "/members/announcements"
              ? "text-white text-4xl"
              : "text-red text-3xl"
          }`}
        />
      </NavLink>
      <NavLink to="/members/dashboard">
        <AiOutlineHome
          className={` ${
            location.pathname === "/members/dashboard"
              ? "text-white text-4xl"
              : "text-red text-3xl"
          }`}
        />
      </NavLink>
      <NavLink to="/members/settings">
        <BsGear
          className={` ${
            location.pathname === "/members/settings"
              ? "text-white text-4xl"
              : "text-red text-3xl"
          }`}
        />
      </NavLink>
      <NavLink to="/members/profile">
        <CgProfile
          className={` ${
            location.pathname === "/members/profile"
              ? "text-white text-4xl"
              : "text-red text-3xl"
          }`}
        />
      </NavLink>
      {isAdmin ? (
        <NavLink to="/members/admin">
          <AiOutlineLock
            className={` ${
              location.pathname === "/members/admin"
                ? "text-white text-4xl"
                : "text-red text-3xl"
            }`}
          />
        </NavLink>
      ) : null}
    </div>
  );
};

export default MemberDashboardMenu;
