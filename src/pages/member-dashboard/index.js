import React, { useEffect, useState } from "react";
import MemberDashboardMenu from "../../components/dashboard-menu/members";
import Layout from "../../components/layout";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useStoreState } from "easy-peasy";
import moment from "moment";
import SectionHeader from "../../components/section-header";
const MembersDashboardIndexPage = () => {
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [announcements, setAnnouncements] = useState([]);
  const [memberStatus, setMemberStatus] = useState(false);
  const [memberBrowniePoints, setMemberBrowniePoints] = useState(0);
  const [events, setEvents] = useState([]);
  const history = useHistory();

  const currentUser = useStoreState((state) => state.currentUser.currentUser);

  useEffect(() => {
    Promise.all([
      axios.get("/announcements"),
      axios.get("/events"),
      axios.get(`/members/status/${currentUser.id}`),
      axios.get(`/members/brownie-points/${currentUser.id}`),
    ])
      .then((_responses) => {
        if (_responses[0].status === 200) {
          setAnnouncements(_responses[0].data);
        }
        if (_responses[1].status === 200) {
          setEvents(_responses[1].data);
        }

        if (_responses[2].status === 200) {
          const { _isActive } = _responses[2].data;

          if (_isActive) {
            setMemberStatus(true);
          } else {
            setMemberStatus(false);
          }
        }

        if (_responses[3].status === 200) {
          const { _browniePoints } = _responses[3].data;

          setMemberBrowniePoints(_browniePoints);
        }

        setIsDataLoaded(true);
      })
      .catch((err) => console.log(err));
  }, [setAnnouncements, setEvents, currentUser.id]);

  return (
    <Layout>
      <div className="container flex flex-col  space-y-6 bg-darkGray p-5  rounded-lg mx-auto max-w-md text-center">
        <SectionHeader heading="Dashboard" />
        {isDataLoaded ? (
          <>
            <div className="bg-charcoal w-full rounded-md p-3 shadow-md">
              <h6 className="text-white font-bold">Status</h6>
              {memberStatus ? (
                <p className="text-green text-sm">Active</p>
              ) : (
                <p className="text-red text-sm">Not Active</p>
              )}
            </div>
            <div className="bg-charcoal w-full rounded-md p-3 shadow-md">
              <h6 className="text-white font-bold">Brownie Points</h6>
              <p className="text-white opacity-80 text-sm">
                {memberBrowniePoints}
              </p>
            </div>
            {/* <div className="bg-charcoal w-full rounded-md p-3 shadow-md">
              <h6 className="text-white font-bold">Warnings</h6>
              <p className="text-green opacity-80 text-sm">0</p>
            </div> */}
            <div className="bg-charcoal w-full rounded-md p-3 shadow-md">
              <h6 className="text-white font-bold mb-2">Announcements</h6>

              <div className="flex flex-col space-y-2 text-center">
                {announcements.length > 0 ? (
                  announcements.map((_announcement, index) => (
                    <>
                      <p
                        onClick={() => history.push("/members/announcements")}
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
            <div className="bg-charcoal w-full rounded-md p-3 shadow-md">
              <h6 className="text-white font-bold mb-2">Events</h6>
              <div className="flex flex-col space-y-2">
                {events.length > 0 ? (
                  events.map((_event, index) => (
                    <>
                      <p
                        onClick={() => history.push("/members/events")}
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
                  <p>No Events...</p>
                )}
              </div>
            </div>
          </>
        ) : (
          <p className="text-white ">Loading...</p>
        )}
      </div>
      <div className="p-10 ">
        <MemberDashboardMenu />
      </div>
    </Layout>
  );
};

export default MembersDashboardIndexPage;
