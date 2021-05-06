import React, { useState, useEffect } from "react";
import MemberDashboardMenu from "../../../components/dashboard-menu/members";
import Layout from "../../../components/layout";
import axios from "axios";
import moment from "moment";
import AnnouncementCard from "../../../components/announcement-card";
const MemberDashboard_Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    try {
      axios
        .get("/announcements")
        .then((_response) => {
          if (_response.status === 200) {
            setAnnouncements(_response.data);
            setIsDataLoaded(true);
          }
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  }, [setAnnouncements]);

  return (
    <Layout>
      <div className="container flex flex-col items-center space-y-6 bg-darkGray p-5 rounded-lg mx-auto max-w-md ">
        <h6 className="text-white uppercase font-bold tracking-widest text-xl">
          Announcements
        </h6>
        {isDataLoaded
          ? announcements.map((_announcement, index) =>
              !_announcement.isEnded ? (
                <AnnouncementCard
                  key={index}
                  id={_announcement.id}
                  date={moment(_announcement.createdAt).format("DD MMM")}
                  title={_announcement.title}
                  details={_announcement.details}
                />
              ) : null
            )
          : null}
      </div>
      <div className="p-10 ">
        <MemberDashboardMenu />
      </div>
    </Layout>
  );
};

export default MemberDashboard_Announcements;
