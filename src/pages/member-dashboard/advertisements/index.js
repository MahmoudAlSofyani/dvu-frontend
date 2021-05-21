import React, { useState, useEffect } from "react";
import MemberDashboardMenu from "../../../components/dashboard-menu/members";
import Layout from "../../../components/layout";
import axios from "axios";
import SectionHeader from "../../../components/section-header";
import AdvertisementCard from "../../../components/advertisement-card";
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
        .get("/advertisements/true")
        .then((_response) => {
          if (_response.status === 200) {
            setAdvertisements(_response.data);
            setIsDataLoaded(true);
            console.log(_response.data);
          }
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  }, [setAdvertisements]);

  const handleDelete = async (id) => {
    try {
      const _response = await axios.delete(`/advertisements/${id}`);
      if (_response) {
        setIsDataLoaded(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Layout>
      <div className="container flex flex-col space-y-6 bg-darkGray p-5 rounded-lg mx-auto max-w-md ">
        <Seo title="Advertisements" />
        <SectionHeader
          heading="Advertisements"
          buttonLabel="Add"
          buttonLink="/members/advertisements/add"
        />
        {isDataLoaded && advertisements.length > 0 ? (
          advertisements.map((_advertisement, index) => (
            <AdvertisementCard
              key={index}
              id={_advertisement.id}
              sold={_advertisement.sold}
              price={_advertisement.price}
              imageId={_advertisement.image.id}
              title={_advertisement.title}
              description={_advertisement.description}
              member={_advertisement.member}
              mobileNumber={_advertisement.member.mobileNumber}
              whatsAppNumber={_advertisement.member.whatsAppNumber}
              currentUserId={currentUser.id}
              verified={_advertisement.verified}
              showDeleteButton={localStorage.getItem("isAdmin")}
              handleDelete={() => handleDelete(_advertisement.id)}
            />
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
