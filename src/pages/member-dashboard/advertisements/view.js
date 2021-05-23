import React, { useState, useEffect } from "react";
import MemberDashboardMenu from "../../../components/dashboard-menu/members";
import Layout from "../../../components/layout";
import axios from "axios";
import SectionHeader from "../../../components/section-header";
import AdvertisementCard from "../../../components/advertisement-card";
import { useStoreActions, useStoreState } from "easy-peasy";
import Seo from "../../../components/seo";
import { useHistory } from "react-router-dom";
const MemberDashboard_Advertisements_View = ({ match }) => {
  const [currentAdvertisement, setCurrentAdvertisement] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const currentUser = useStoreState((state) => state.currentUser.currentUser);
  const setCurrentUser = useStoreActions(
    (actions) => actions.currentUser.setCurrentUser
  );
  const history = useHistory();

  const {
    params: { advertisementId },
  } = match;

  useEffect(() => {
    try {
      if (!localStorage.getItem("token")) {
        history.push("/members/login");
      }

      if (Object.keys(currentUser).length === 0) {
        setCurrentUser(JSON.parse(localStorage.getItem("currentUser")));
      }

      fetchPost();
    } catch (err) {
      console.log(err);
    }
  }, []);

  const fetchPost = async () => {
    try {
      let _advertisementId = advertisementId.substring(0, 36);

      const _response = await axios.get(`/advertisements/${_advertisementId}`);

      if (_response.status === 200) {
        setCurrentAdvertisement(_response.data);
        setIsDataLoaded(true);
        // console.log(_response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const _response = await axios.delete(`/advertisements/${id}`);
      if (_response) {
        setIsDataLoaded(false);
        history.push("/advertisements");
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
          //   buttonLabel="Add"
          //   buttonLink="/advertisements/"
          backLink="/advertisements"
        />
        {isDataLoaded && currentAdvertisement ? (
          <AdvertisementCard
            id={currentAdvertisement.id}
            sold={currentAdvertisement.sold}
            price={currentAdvertisement.price}
            imageId={currentAdvertisement.image.id}
            title={currentAdvertisement.title}
            description={currentAdvertisement.description}
            member={currentAdvertisement.member}
            mobileNumber={currentAdvertisement.member.mobileNumber}
            whatsAppNumber={currentAdvertisement.member.whatsAppNumber}
            currentUserId={currentUser.id}
            verified={currentAdvertisement.verified}
            showDeleteButton={localStorage.getItem("isAdmin")}
            handleDelete={() => handleDelete(currentAdvertisement.id)}
          />
        ) : (
          <p className="text-white opacity-50">Sorry there was an error</p>
        )}
      </div>
      <div className="p-10 ">
        <MemberDashboardMenu />
      </div>
    </Layout>
  );
};

export default MemberDashboard_Advertisements_View;
