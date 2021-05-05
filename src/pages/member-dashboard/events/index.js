import React, { useState, useEffect } from "react";
import MemberDashboardMenu from "../../../components/dashboard-menu/members";
import Layout from "../../../components/layout";
import EventCard from "../../../components/event-card";
import axios from "axios";
import moment from "moment";
const MemberDashboard_Events = () => {
  const [events, setEvents] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    try {
      axios
        .get("/events")
        .then((_response) => {
          if (_response.status === 200) {
            setEvents(_response.data);
            setIsDataLoaded(true);
          }
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  }, [setEvents]);

  return (
    <Layout>
      <div className="container flex flex-col items-center space-y-6 bg-darkGray p-5 rounded-lg mx-auto max-w-md ">
        <h6 className="text-white uppercase font-bold tracking-widest text-xl">
          Events
        </h6>
        <div className="w-full flex flex-col space-y-5">
          {isDataLoaded
            ? events.map((_event, index) =>
                !_event.isEnded ? (
                  <EventCard
                    key={index}
                    id={_event.id}
                    date={moment(_event.date).format("DD MMM")}
                    title={_event.name}
                    meetingPoint={_event.meetingPoint}
                    meetingTime={_event.meetingTime}
                    details={_event.details}
                  />
                ) : null
              )
            : null}
        </div>
      </div>
      <div className="p-10 ">
        <MemberDashboardMenu />
      </div>
    </Layout>
  );
};

export default MemberDashboard_Events;
