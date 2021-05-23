import React, { useState, useEffect } from "react";
import MemberDashboardMenu from "../../../components/dashboard-menu/members";
import Layout from "../../../components/layout";
import axios from "axios";
import SectionHeader from "../../../components/section-header";
import { useStoreActions, useStoreState } from "easy-peasy";
import Seo from "../../../components/seo";
import { useHistory } from "react-router-dom";
const MemberDashboard_Advertisements = () => {
  const [advertisements, setAdvertisements] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const currentUser = useStoreState((state) => state.currentUser.currentUser);
  const setCurrentUser = useStoreActions(
    (actions) => actions.currentUser.setCurrentUser
  );
  const history = useHistory();

  useEffect(() => {
    try {
      if (!localStorage.getItem("token")) {
        history.push("/members/login");
      }

      if (Object.keys(currentUser).length === 0) {
        setCurrentUser(JSON.parse(localStorage.getItem("currentUser")));
      }

      axios
        .get("/advertisements/status/true")
        .then((_response) => {
          if (_response.status === 200) {
            setAdvertisements(_response.data);
            setIsDataLoaded(true);
          }
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  }, [setAdvertisements]);

  const handleGoToAdvertisement = (urlSlug) => {
    localStorage.setItem("advertisementUrlSlug", urlSlug);
    history.push(`/advertisements/${urlSlug}`);
  };

  return (
    <Layout>
      <div className="container flex flex-col space-y-6 bg-darkGray p-5 rounded-lg mx-auto max-w-md ">
        <Seo title="Advertisements" />
        <SectionHeader
          heading="Advertisements"
          buttonLabel="Add"
          buttonLink="/advertisements/add"
        />
        {isDataLoaded && advertisements.length > 0 ? (
          advertisements.map((_advertisement, index) => (
            <div
              key={index}
              className="bg-charcoal rounded-md p-4 flex flex-row justify-between shadow-md cursor-pointer "
              onClick={() => handleGoToAdvertisement(_advertisement.urlSlug)}
            >
              <div className="w-full">
                <p className="text-white">{_advertisement.title}</p>
                {/* <p className="text-red text-sm">
                  {_advertisement.member.firstName}{" "}
                  {_advertisement.member.lastName}
                </p> */}
              </div>
              <div className="w-3/5 flex flex-col self-center bg-red rounded-md shadow-md">
                <p className="text-white text-center">
                  {"AED " + _advertisement.price}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-white opacity-50">No advertisements...</p>
        )}
      </div>
      <div className="p-10 ">
        <MemberDashboardMenu />
      </div>
    </Layout>
  );
};

export default MemberDashboard_Advertisements;
