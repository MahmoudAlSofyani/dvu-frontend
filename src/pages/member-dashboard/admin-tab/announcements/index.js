import React, { useEffect, useState } from "react";
import Layout from "../../../../components/layout";
import MemberDashboardMenu from "../../../../components/dashboard-menu/members";
import CustomButton from "../../../../components/custom-button";
import axios from "axios";
import moment from "moment";
import { useHistory } from "react-router-dom";
const AdminTab_Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const history = useHistory();

  useEffect(() => {
    try {
      axios.get("/announcements").then((_response) => {
        if (_response.status === 200) {
          setAnnouncements(_response.data);
        }
      });
    } catch (err) {
      console.log(err);
    }
  }, [setAnnouncements]);

  const handleEditAnnouncement = (announcementId) => {
    history.push({
      pathname: "/admin/announcements/edit",
      state: { announcementId },
    });
  };

  return (
    <Layout>
      <div className="container flex flex-col items-center space-y-6 bg-darkGray p-5 rounded-lg mx-auto max-w-md ">
        <h6 className="text-white uppercase font-bold tracking-widest text-xl">
          Admin
        </h6>
        <p className="text-white">Announcements</p>
        <div className="bg-charcoal w-full rounded-md p-3 shadow-md">
          <div className="flex flex-col space-y-2 text-center">
            {announcements.length > 0 ? (
              announcements.map((_announcement, index) => (
                <>
                  <p
                    onClick={() => handleEditAnnouncement(_announcement.id)}
                    key={index}
                    className="text-white opacity-80 text-sm py-2 cursor-pointer"
                  >
                    <span className="text-red font-bold">
                      {moment(_announcement.createdAt)
                        .format("DD MMM")
                        .toUpperCase()}
                    </span>{" "}
                    {_announcement.title}
                  </p>
                  {index + 1 < announcements.length ? (
                    <hr className="text-white  w-1/2 opacity-20 rounded mx-auto" />
                  ) : null}
                </>
              ))
            ) : (
              <p className="text-white">No announcements..</p>
            )}
          </div>
        </div>
        <div className="space-y-4">
          <CustomButton
            label="Add new announcement"
            link="/admin/announcements/add"
          />
        </div>
      </div>
      <div className="p-10 ">
        <MemberDashboardMenu />
      </div>
    </Layout>
  );
};

export default AdminTab_Announcements;
