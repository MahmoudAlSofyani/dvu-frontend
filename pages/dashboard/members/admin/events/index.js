import React, { useEffect, useState, Fragment } from "react";
import Layout from "../../../../../src/components/layout";
import MemberDashboardMenu from "../../../../../src/components/dashboard-menu/members";
import CustomButton from "../../../../../src/components/custom-button";
// import { useHistory } from "react-router-dom";
import { useRouter } from "next/router";
import axios from "axios";
import moment from "moment";
import SectionHeader from "../../../../../src/components/section-header";
const AdminTab_Events = () => {
  const router = useRouter();
  const [events, setEvents] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    try {
      axios
        .get("/events")
        .then((_response) => {
          if (_response.status === 200) {
            setEvents(_response.data);
            console.log(_response.data);
            setIsDataLoaded(true);
          }
        })
        .catch((err) => console.log(err));
    } catch (err) {}
  }, [setEvents]);

  const handleEditEvent = (eventId) => {
    router.push(
      {
        pathname: "/dashboard/members/admin/events/edit",
        query: { eventId },
      },
      "/admin/events/edit"
    );
  };

  return (
    <Layout>
      <div className="container flex flex-col space-y-6 bg-darkGray p-5 rounded-lg mx-auto max-w-md ">
        <SectionHeader
          heading="Admin"
          buttonLink="/dashboard/members/admin/events/add"
          buttonLabel="Add"
          subHeading="Events"
        />
        <div className="bg-charcoal w-full rounded-md p-3 shadow-md">
          <div className="flex flex-col space-y-2 text-center">
            {isDataLoaded && events.length > 0 ? (
              events.map((_event, index) => (
                <Fragment key={index}>
                  <div
                    onClick={() => handleEditEvent(_event.id)}
                    className="flex flex-row text-white opacity-80 text-sm py-2 cursor-pointer"
                  >
                    <p className="text-red font-bold">
                      {moment(_event.date).format("DD MMM").toUpperCase()}
                    </p>
                    <p className="ml-2">{_event.name}</p>
                    <p className="bg-red rounded-md py-1 px-3 ml-auto">
                      {_event.members.length}
                    </p>
                  </div>
                  {index + 1 < events.length ? (
                    <hr className="text-white  w-1/2 opacity-20 rounded mx-auto" />
                  ) : null}
                </Fragment>
              ))
            ) : (
              <p className="text-white">No Events</p>
            )}
          </div>
        </div>
        <CustomButton
          label="Attendance"
          styleType={2}
          link="/dashboard/members/admin/events/attendance"
          extraClasses="w-full"
        />
      </div>
      <div className="p-10 ">
        <MemberDashboardMenu />
      </div>
    </Layout>
  );
};

export default AdminTab_Events;
