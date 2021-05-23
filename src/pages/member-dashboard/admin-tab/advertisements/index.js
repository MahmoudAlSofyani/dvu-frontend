import { useStoreActions, useStoreState } from "easy-peasy";
import React, { useEffect, useState } from "react";
import AdvertisementCard from "../../../../components/advertisement-card";
import Layout from "../../../../components/layout";
import SectionHeader from "../../../../components/section-header";
import axios from "axios";
import MemberDashboardMenu from "../../../../components/dashboard-menu/members";

const AdminTab_Advertisements = () => {
  const [advertisements, setAdvertisements] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const currentUser = useStoreState((state) => state.currentUser.currentUser);
  const setCurrentUser = useStoreActions(
    (actions) => actions.currentUser.setCurrentUser
  );

  useEffect(() => {
    try {
      if (Object.keys(currentUser).length === 0) {
        setCurrentUser(JSON.parse(localStorage.getItem("currentUser")));
      }

      axios
        .get("/advertisements/status/false")
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
  }, [setAdvertisements, setIsDataLoaded]);

  const handleApprove = async (id) => {
    try {
      let body = {
        id,
        verified: true,
      };

      let _updatedAdvertisements = advertisements.filter(
        (_advertisement) => _advertisement.id !== id
      );

      const _response = await axios.put("/advertisements", body);

      if (_response.status === 200) {
        setAdvertisements(_updatedAdvertisements);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleReject = async (id) => {
    try {
      let body = {
        id,
        verified: false,
      };

      let _updatedAdvertisements = advertisements.filter(
        (_advertisement) => _advertisement.id !== id
      );

      const _response = await axios.put("/advertisements", body);
      if (_response.status === 200) {
        setAdvertisements(_updatedAdvertisements);
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
          subHeading="Verify Advertisements"
        />
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
              adminView
              handleApprove={() => handleApprove(_advertisement.id)}
              handleReject={() => handleReject(_advertisement.id)}
            />
          ))
        ) : (
          <p className="text-white opacity-50">
            No advertisements left to verify...
          </p>
        )}
      </div>
      <div className="p-10 ">
        <MemberDashboardMenu />
      </div>
    </Layout>
  );
};

export default AdminTab_Advertisements;
