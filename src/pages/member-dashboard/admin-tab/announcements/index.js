import React from "react";
import Layout from "../../../../components/layout";
import MemberDashboardMenu from "../../../../components/dashboard-menu/members";
import CustomButton from "../../../../components/custom-button";
import { useHistory } from "react-router-dom";
const AdminTab_Announcements = () => {
  const history = useHistory();
  const ANNOUNCEMENTS = [
    {
      id: "1",
      date: "15 Jan",
      title: "Announcement 1",
      details:
        "Join us for an evening of karting. We will be competing with Wolfsvagen AUH. Ticket prices are 150AED per 15 minute session",
    },
    {
      id: "2",
      date: "15 Jan",
      title: "Announcement 2",
      details:
        "Join us for an evening of karting. We will be competing with Wolfsvagen AUH. Ticket prices are 150AED per 15 minute session",
    },
    {
      id: "3",
      date: "15 Jan",
      title: "Announcement 3",
      details:
        "Join us for an evening of karting. We will be competing with Wolfsvagen AUH. Ticket prices are 150AED per 15 minute session",
    },
  ];

  const handleEditAnnouncement = (eventId) => {
    history.push("/admin/announcements/edit");
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
            {ANNOUNCEMENTS.map((_event, index) =>
              !_event.isEnded ? (
                <>
                  <p
                    onClick={() => handleEditAnnouncement(_event.id)}
                    key={index}
                    className="text-white opacity-80 text-sm py-2 cursor-pointer"
                  >
                    <span className="text-red font-bold">
                      {_event.date.toUpperCase()}
                    </span>{" "}
                    {_event.title}
                  </p>
                  {index + 1 < ANNOUNCEMENTS.length ? (
                    <hr className="text-white  w-1/2 opacity-20 rounded mx-auto" />
                  ) : null}
                </>
              ) : null
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
