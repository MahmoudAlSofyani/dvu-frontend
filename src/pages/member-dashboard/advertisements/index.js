import React, { useState, useEffect } from "react";
import MemberDashboardMenu from "../../../components/dashboard-menu/members";
import Layout from "../../../components/layout";
import axios from "axios";
import moment from "moment";
import AnnouncementCard from "../../../components/announcement-card";
import SectionHeader from "../../../components/section-header";
import { FiPhone } from "react-icons/fi";
import AdvertisementCard from "../../../components/advertisement-card";
import { useStoreState } from "easy-peasy";
const MemberDashboard_Advertisements = () => {
  const [advertisements, setAdvertisements] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const currentUser = useStoreState((state) => state.currentUser.currentUser);

  useEffect(() => {
    try {
      axios
        .get("/advertisements/true")
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

  return (
    <Layout>
      <div className="container flex flex-col space-y-6 bg-darkGray p-5 rounded-lg mx-auto max-w-md ">
        <SectionHeader heading="Advertisements" buttonLabel="Add" buttonLink="/members/advertisements/add" />
        {isDataLoaded && advertisements.length > 0 ? (
          advertisements.map((_advertisement, index) => (
            <AdvertisementCard
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
