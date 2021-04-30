import React from "react";
import CustomButton from "../custom-button";

const EventCard = ({ id, date, title, meetingPoint, meetingTime, details }) => {
  const handleEventSignup = (id) => {
    console.log(id);
  };

  return (
    <div className="bg-charcoal p-5 rounded-md flex flex-col space-y-5 shadow-md">
      <div className="text-left w-full">
        <p className="text-white font-bold">
          <span className="text-red uppercase font-bold">{date}</span> {title}
        </p>
      </div>
      <div className="text-left w-full">
        <p className="text-red uppercase font-bold">Meeting Point</p>
        <p className="text-white">{meetingPoint}</p>
      </div>
      <div className="text-left w-full">
        <p className="text-red uppercase font-bold">Meeting Time</p>
        <p className="text-white">{meetingTime}</p>
      </div>
      <div className="text-left w-full">
        <p className="text-red uppercase font-bold">Event Details</p>
        <p className="text-white">{details}</p>
      </div>
      <div className="w-full">
        <CustomButton handleOnClick={() => handleEventSignup(id)} label="I'm In!" />
      </div>
    </div>
  );
};

export default EventCard;
