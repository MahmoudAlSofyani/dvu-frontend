import React, { useState, useEffect } from "react";
import MemberDashboardMenu from "../../../components/dashboard-menu/members";
import Layout from "../../../components/layout";
import axios from "axios";
import moment from "moment";
import AnnouncementCard from "../../../components/announcement-card";
import SectionHeader from "../../../components/section-header";
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
      <div className="container flex flex-col space-y-6 bg-darkGray p-5 rounded-lg mx-auto max-w-md ">
        <SectionHeader heading="Announcements" />
        {isDataLoaded && announcements.length > 0 ? (
          announcements.map((_announcement, index) =>
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
        ) : (
          <p className="text-white opacity-50">No Announcements...</p>
        )}
      </div>
      <div className="p-10 ">
        <MemberDashboardMenu />
      </div>
    </Layout>
  );
};

export default MemberDashboard_Announcements;
