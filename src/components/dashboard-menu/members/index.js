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
        .get(`/members/${currentUserId}`)
        .then((_response) => {
          if (_response.status === 200) {
            const { roles } = _response.data;

            if (!roles.some((_role) => _role.name === "ADMIN")) {
              setIsAdmin(false);
            } else {
              setIsAdmin(true);
            }
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
      <SpeakerphoneIcon className="text-red w-10" />
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
