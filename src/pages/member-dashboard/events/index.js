import React from "react";
import MemberDashboardMenu from "../../../components/dashboard-menu/members";
import Layout from "../../../components/layout";
import EventCard from "../../../components/event-card";

const MemberDashboard_Events = () => {
  const EVENTS = [
    {
      id: "1",
      date: "15 Jan",
      title: "Karting in Abu Dhabi",
      meetingPoint: "Last Exit AD Bound",
      meetingTime: "15:00 GMT +4",
      details:
        "Join us for an evening of karting. We will be competing with Wolfsvagen AUH. Ticket prices are 150AED per 15 minute session",
      isEnded: false,
    },
    {
      id: "2",
      date: "15 Jan",
      title: "Karting in Abu Dhabi",
      meetingPoint: "Last Exit AD Bound",
      meetingTime: "15:00 GMT +4",
      details:
        "Join us for an evening of karting. We will be competing with Wolfsvagen AUH. Ticket prices are 150AED per 15 minute session",
      isEnded: false,
    },
    {
      id: "3",
      date: "15 Jan",
      title: "Karting in Abu Dhabi",
      meetingPoint: "Last Exit AD Bound",
      meetingTime: "15:00 GMT +4",
      details:
        "Join us for an evening of karting. We will be competing with Wolfsvagen AUH. Ticket prices are 150AED per 15 minute session",
      isEnded: false,
    },
  ];

  return (
    <Layout>
      <div className="container flex flex-col items-center space-y-6 bg-darkGray p-5 w-4/5 rounded-lg mx-auto max-w-md ">
        <h6 className="text-white uppercase font-bold tracking-widest text-xl">
          Events
        </h6>
        {EVENTS.map((_event, index) =>
          !_event.isEnded ? (
            <EventCard
              key={index}
              id={_event.id}
              date={_event.date}
              title={_event.title}
              meetingPoint={_event.meetingPoint}
              meetingTime={_event.meetingTime}
              details={_event.details}
            />
          ) : null
        )}
      </div>
      <div className="p-10 ">
        <MemberDashboardMenu />
      </div>
    </Layout>
  );
};

export default MemberDashboard_Events;
