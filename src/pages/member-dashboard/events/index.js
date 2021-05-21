import React, { useState, useEffect } from "react";
import MemberDashboardMenu from "../../../components/dashboard-menu/members";
import Layout from "../../../components/layout";
import EventCard from "../../../components/event-card";
import axios from "axios";
import moment from "moment";
import SectionHeader from "../../../components/section-header";
import Seo from "../../../components/seo";
import { useHistory } from "react-router-dom";
const MemberDashboard_Events = () => {
  const [events, setEvents] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const history = useHistory();
  useEffect(() => {
    try {
      if (!localStorage.getItem("token")) {
        history.push("/members/login");
      }

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
  }, []);

  return (
    <Layout>
      <div className="container flex flex-col space-y-6 bg-darkGray p-5 rounded-lg mx-auto max-w-md ">
        <Seo title="Events" />
        <SectionHeader heading="Events" />
        <div className="w-full flex flex-col space-y-5">
          {isDataLoaded && events.length > 0 ? (
            events.map((_event, index) =>
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
          ) : (
            <p className="text-white opacity-50 text-center">No Events...</p>
          )}
        </div>
      </div>
      <div className="p-10 ">
        <MemberDashboardMenu />
      </div>
    </Layout>
  );
};

export default MemberDashboard_Events;
