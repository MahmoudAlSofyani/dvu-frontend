import { useStoreState } from "easy-peasy";
import React, { useEffect, useState } from "react";
import CustomButton from "../custom-button";
import axios from "axios";
import moment from "moment";
const EventCard = ({ id, date, title, meetingPoint, meetingTime, details }) => {
  const [status, setStatus] = useState({
    message: "",
    isRegistered: false,
  });
  const currentUser = useStoreState((state) => state.currentUser.currentUser);

  useEffect(() => {
    try {
      axios
        .post("/events/check", { eventId: id, memberId: currentUser.id })
        .then((_response) => {
          if (_response.status === 200) {
            const { _isRegistered } = _response.data;

            setStatus({
              ...status,
              isRegistered: _isRegistered,
            });
          }
        });
    } catch (err) {
      console.log(err);
    }
  }, []);

  const handleEventSignup = async (eventId) => {
    try {
      let _body = {
        memberId: currentUser.id,
        eventId,
      };

      const _response = await axios.post("/events/register", _body);

      if (_response.status === 200) {
        setStatus({
          ...status,
          message: "You have successfully registered for this event!",
        });
      }
    } catch (err) {
      console.log(err);
    }
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
        <p className="text-white">
          {moment(meetingTime).format("hh:mm a").toUpperCase()}
        </p>
      </div>
      <div className="text-left w-full">
        <p className="text-red uppercase font-bold">Event Details</p>
        <p
          className="text-white"
          dangerouslySetInnerHTML={{ __html: `${details}` }}
        />
      </div>
      <div className="w-full">
        {!status.isRegistered ? (
          <CustomButton
            handleOnClick={() => handleEventSignup(id)}
            label="I'm In!"
            styleType={2}
            extraClasses="w-full"
          />
        ) : (
          <CustomButton
            disabled
            label="You have already registered for this event"
            styleType={2}
            extraClasses="w-full"
          />
        )}
      </div>
      {status.message ? (
        <div className="w-full">
          <p className="text-green text-sm">{status.message}</p>
        </div>
      ) : null}
    </div>
  );
};

export default EventCard;
