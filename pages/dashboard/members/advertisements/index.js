import React, { useState, useEffect } from "react";
import MemberDashboardMenu from "../../../../src/components/dashboard-menu/members";
import Layout from "../../../../src/components/layout";
import axios from "axios";
import SectionHeader from "../../../../src/components/section-header";
import AdvertisementCard from "../../../../src/components/advertisement-card";
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
        <SectionHeader
          heading="Advertisements"
          buttonLabel="Add"
          buttonLink="/dashboard/members/advertisements/new"
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
