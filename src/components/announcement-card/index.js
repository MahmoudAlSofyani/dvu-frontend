import React from "react";

const AnnouncementCard = ({ id, date, title, details }) => {
  return (
    <div className="bg-charcoal p-5 rounded-md flex flex-col space-y-5 shadow-md">
      <div className="text-left w-full">
        <p className="text-white font-bold">
          <span className="text-red uppercase font-bold">{date}</span> {title}
        </p>
      </div>
      <div className="text-left w-full">
        <p className="text-white">
          <div dangerouslySetInnerHTML={{ __html: `${details}` }} />
        </p>
      </div>
    </div>
  );
};

export default AnnouncementCard;
