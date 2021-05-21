import { useStoreActions, useStoreState } from "easy-peasy";
import React, { useEffect, useState } from "react";
import AdvertisementCard from "../../../../components/advertisement-card";
import Layout from "../../../../components/layout";
import SectionHeader from "../../../../components/section-header";
import axios from "axios";
import MemberDashboardMenu from "../../../../components/dashboard-menu/members";
import CustomButton from "../../../../components/custom-button";
import { useHistory } from "react-router-dom";

const AdminTab_Sponsors = () => {
  const [sponsorsCount, setSponsorsCount] = useState(0);
  const history = useHistory();
  useEffect(() => {
    try {
      if (!localStorage.getItem("token")) {
        history.push("/members/login");
      }

      axios
        .get("/utility/sponsors-count")
        .then((_response) => {
          if (_response.status === 200) {
            const { count } = _response.data;

            setSponsorsCount(count);
          }
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  }, [setSponsorsCount]);

  return (
    <Layout>
      <div className="container flex flex-col space-y-6 bg-darkGray p-5 rounded-lg mx-auto max-w-md ">
        <SectionHeader heading="Sponsors" />

        <div className="flex flex-col space-y-4">
          <div className="text-center text-white bg-charcoal rounded-md leading-9 shadow-md ">
            <p className="font-bold">Sponsors</p>
            <p>{sponsorsCount}</p>
          </div>
          <div className="flex flex-col space-y-4 w-full">
            <CustomButton
              link="/admin/sponsors/new"
              label="New Sponsor Account"
              extraClasses="w-full"
              styleType={2}
            />
          </div>
        </div>
      </div>
      <div className="p-10 ">
        <MemberDashboardMenu />
      </div>
    </Layout>
  );
};

export default AdminTab_Sponsors;
