import React, { useState, useEffect } from "react";
import MemberDashboardMenu from "../../../components/dashboard-menu/members";
import Layout from "../../../components/layout";
import axios from "axios";
import moment from "moment";
import AnnouncementCard from "../../../components/announcement-card";
import SectionHeader from "../../../components/section-header";
import Seo from "../../../components/seo";
import { useHistory } from "react-router-dom";
const MemberDashboard_Announcements_View = ({ match }) => {
  const [announcements, setAnnouncements] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const history = useHistory();

  const {
    params: { announcementId },
  } = match;

  useEffect(() => {
    try {
      if (!localStorage.getItem("token")) {
        history.push("/members/login");
      }

      axios
        .get(`/announcements/${announcementId}`)
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
        <Seo title="Announcements" />
        <SectionHeader heading="Announcements" backLink="/dashboard" />
        {isDataLoaded ? (
          <AnnouncementCard
            id={announcements.id}
            date={moment(announcements.createdAt).format("DD MMM")}
            title={announcements.title}
            details={announcements.details}
          />
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

export default MemberDashboard_Announcements_View;
