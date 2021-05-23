import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { AiOutlineHome, AiOutlineLock } from "react-icons/ai";
import { MdForum, MdAnnouncement } from "react-icons/md";
import { BsCalendar, BsGear } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { RiAdvertisementLine } from "react-icons/ri";
const MemberDashboardMenu = () => {
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem("isAdmin"));

  const location = useLocation();

  // useEffect(() => {
  //   try {
  //     axios
  //       .post("/role", { id: currentUser.id, role: "Admin" })
  //       .then((_response) => {
  //         if (_response.status === 200) {
  //           const { _isRoleExist } = _response.data;

  //           if (_isRoleExist) setIsAdmin(true);
  //           else setIsAdmin(false);
  //         }
  //       })
  //       .catch((err) => console.log(err));
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }, [setIsAdmin, currentUser.id]);

  return (
    <div className="fixed right-0 left-0 bottom-0 flex items-center justify-between p-3 bg-darkGray">
      <NavLink to="/forums">
        <MdForum
          className={` ${
            location.pathname === "/forums"
              ? "text-white text-4xl"
              : "text-red text-3xl"
          }`}
        />
      </NavLink>
      <NavLink to="/events">
        <BsCalendar
          className={` ${
            location.pathname === "/events"
              ? "text-white text-4xl"
              : "text-red text-3xl"
          }`}
        />
      </NavLink>
      <NavLink to="/announcements">
        <MdAnnouncement
          className={` ${
            location.pathname === "/announcements"
              ? "text-white text-4xl"
              : "text-red text-3xl"
          }`}
        />
      </NavLink>
      <NavLink to="/dashboard">
        <AiOutlineHome
          className={` ${
            location.pathname === "/dashboard"
              ? "text-white text-4xl"
              : "text-red text-3xl"
          }`}
        />
      </NavLink>
      <NavLink to="/settings">
        <BsGear
          className={` ${
            location.pathname === "/settings"
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
      <NavLink to="/advertisements">
        <RiAdvertisementLine
          className={` ${
            location.pathname === "/advertisements"
              ? "text-white text-4xl"
              : "text-red text-3xl"
          }`}
        />
      </NavLink>
      {isAdmin ? (
        <NavLink to="/admin">
          <AiOutlineLock
            className={` ${
              location.pathname === "/admin"
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
