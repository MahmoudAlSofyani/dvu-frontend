import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useStoreState } from "easy-peasy";
import axios from "axios";
import { AiOutlineHome, AiOutlineLock, AiOutlineQrcode } from "react-icons/ai";
import { MdForum, MdAnnouncement } from "react-icons/md";
import { BsCalendar, BsGear } from "react-icons/bs";
const MemberDashboardMenu = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const currentUser = useStoreState((state) => state.currentUser.currentUser);

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
    } catch (err) {}
  }, [setIsAdmin]);

  return (
    <div className="fixed right-0 left-0 bottom-0 flex items-center justify-between p-3 bg-darkGray">
      <Link to="/members/forums">
        <MdForum className="text-red text-3xl" />
      </Link>
      <Link to="/members/events">
        <BsCalendar className="text-red text-3xl" />
      </Link>
      <Link to="/members/announcements">
        <MdAnnouncement className="text-red text-3xl" />
      </Link>
      <Link to="/members/dashboard">
        <AiOutlineHome className="text-red text-3xl" />
      </Link>
      <Link to="/members/settings">
        <BsGear className="text-red text-3xl" />
      </Link>
      <Link to="/members/barcode">
        <AiOutlineQrcode className="text-red text-3xl" />
      </Link>
      {isAdmin ? (
        <Link to="/members/admin">
          <AiOutlineLock className="text-red text-3xl" />
        </Link>
      ) : null}
    </div>
  );
};

export default MemberDashboardMenu;
