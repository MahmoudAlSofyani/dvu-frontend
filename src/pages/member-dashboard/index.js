import React from "react";
import MemberDashboardMenu from "../../components/dashboard-menu/members";
import Layout from "../../components/layout";
import { useHistory } from "react-router-dom";

const MembersDashboardIndexPage = () => {
  const history = useHistory();
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
      <div className="container flex flex-col items-center space-y-6 bg-darkGray p-5  rounded-lg mx-auto max-w-md text-center">
        <h6 className="text-white uppercase font-bold tracking-widest text-xl">
          Dashboard
        </h6>
        <div className="bg-charcoal w-full rounded-md p-3 shadow-md">
          <h6 className="text-white font-bold">Status</h6>

          <p className="text-green text-sm">Active</p>
        </div>
        <div className="bg-charcoal w-full rounded-md p-3 shadow-md">
          <h6 className="text-white font-bold">Brownie Points</h6>
          <p className="text-white opacity-80 text-sm">69420</p>
        </div>
        <div className="bg-charcoal w-full rounded-md p-3 shadow-md">
          <h6 className="text-white font-bold">Warnings</h6>
          <p className="text-green opacity-80 text-sm">0</p>
        </div>
        <div className="bg-charcoal w-full rounded-md p-3 shadow-md">
          <h6 className="text-white font-bold">Announcements</h6>
          <p className="text-white opacity-80 text-sm">Announcement 1</p>
        </div>
        <div className="bg-charcoal w-full rounded-md p-3 shadow-md">
          <h6 className="text-white font-bold mb-2">Events</h6>
          <div className="flex flex-col space-y-2">
            {EVENTS.map((_event, index) =>
              !_event.isEnded ? (
                <>
                  <p
                    onClick={() => history.push("/members/events")}
                    key={index}
                    className="text-white opacity-80 text-sm py-2 cursor-pointer"
                  >
                    <span className="text-red font-bold">
                      {_event.date.toUpperCase()}
                    </span>{" "}
                    {_event.title}
                  </p>
                  {index + 1 < EVENTS.length ? (
                    <hr className="text-white  w-1/2 opacity-20 rounded mx-auto" />
                  ) : null}
                </>
              ) : null
            )}
          </div>
        </div>
      </div>
      <div className="p-10 ">
        <MemberDashboardMenu />
      </div>
    </Layout>
  );
};

export default MembersDashboardIndexPage;
