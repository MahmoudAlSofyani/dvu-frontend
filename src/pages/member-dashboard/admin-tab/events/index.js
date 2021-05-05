import React, { useEffect, useState } from "react";
import Layout from "../../../../components/layout";
import MemberDashboardMenu from "../../../../components/dashboard-menu/members";
import CustomButton from "../../../../components/custom-button";
import { useHistory } from "react-router-dom";
import axios from "axios";
import moment from "moment";
const AdminTab_Events = () => {
  const history = useHistory();
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
    } catch (err) {}
  }, [setEvents]);

  const handleEditEvent = (eventId) => {
    history.push({
      pathname: "/admin/events/edit",
      state: {eventId}
    })
  };

  return (
    <Layout>
      <div className="container flex flex-col items-center space-y-6 bg-darkGray p-5 rounded-lg mx-auto max-w-md ">
        <h6 className="text-white uppercase font-bold tracking-widest text-xl">
          Admin
        </h6>
        <p className="text-white">Events</p>
        <div className="bg-charcoal w-full rounded-md p-3 shadow-md">
          <div className="flex flex-col space-y-2 text-center">
            {isDataLoaded && events.length > 0 ? (
              events.map((_event, index) => (
                <>
                  <p
                    onClick={() => handleEditEvent(_event.id)}
                    key={index}
                    className="text-white opacity-80 text-sm py-2 cursor-pointer"
                  >
                    <span className="text-red font-bold">
                      {moment(_event.date).format("DD MMM").toUpperCase()}
                    </span>{" "}
                    {_event.name}
                  </p>
                  {index + 1 < events.length ? (
                    <hr className="text-white  w-1/2 opacity-20 rounded mx-auto" />
                  ) : null}
                </>
              ))
            ) : (
              <p className="text-white">No Events</p>
            )}
          </div>
        </div>
        <div className="space-y-4">
          <CustomButton label="Add new event" link="/admin/events/add" />
        </div>
      </div>
      <div className="p-10 ">
        <MemberDashboardMenu />
      </div>
    </Layout>
  );
};

export default AdminTab_Events;
