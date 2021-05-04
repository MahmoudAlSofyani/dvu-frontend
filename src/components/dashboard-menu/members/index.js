import React, { useEffect, useState } from "react";
import {
  HomeIcon,
  CalendarIcon,
  CogIcon,
  LockClosedIcon,
  ChatIcon,
  SpeakerphoneIcon,
} from "@heroicons/react/outline";
import { Link } from "react-router-dom";
import { useStoreState } from "easy-peasy";
import axios from "axios";
const MemberDashboardMenu = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const currentUserId = useStoreState(
    (state) => state.currentUser.currentUserId
  );

  useEffect(() => {
    try {
      axios
        .post("/members/role", {id: currentUserId, role: "Admin"})
        .then((_response) => {
          if (_response.status === 200) {
            const { _isRoleExist } = _response.data;

            if (_isRoleExist) setIsAdmin(true);
            else setIsAdmin(false);
          }
        })
        .catch((err) => console.log(err));
    } catch (err) {}
  });

  return (
    <div className="fixed right-0 left-0 bottom-0 flex items-center justify-center space-x-6 p-3 bg-darkGray">
      <ChatIcon className="text-red w-10" />
      <Link to="/members/events">
        <CalendarIcon className="text-red w-10" />
      </Link>
      <Link to="/members/dashboard">
        <HomeIcon className="text-red w-10" />
      </Link>
      <Link to="/members/announcements">
        <SpeakerphoneIcon className="text-red w-10" />
      </Link>
      <Link to="/members/settings">
        <CogIcon className="text-red w-10" />
      </Link>
      {isAdmin ? (
        <Link to="/members/admin">
          <LockClosedIcon className="text-red w-10" />
        </Link>
      ) : null}
    </div>
  );
};

export default MemberDashboardMenu;
