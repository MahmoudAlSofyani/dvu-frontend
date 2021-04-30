import React from "react";
import {
  HomeIcon,
  CalendarIcon,
  CogIcon,
  LockClosedIcon,
  ChatIcon,
  SpeakerphoneIcon,
} from "@heroicons/react/outline";
import { Link } from "react-router-dom";
const MemberDashboardMenu = () => {
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
      <LockClosedIcon className="text-red w-10" />
    </div>
  );
};

export default MemberDashboardMenu;
