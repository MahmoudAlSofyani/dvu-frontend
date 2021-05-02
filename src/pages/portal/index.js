import React from "react";
import CustomButton from "../../components/custom-button";
import Layout from "../../components/layout";

const PortalPage = () => {
  return (
    <Layout>
      <div
        className="
       flex flex-col items-center space-y-6 bg-darkGray p-5 w-4/5 rounded-lg mx-auto max-w-md "
      >
        <h6 className="text-white uppercase font-bold tracking-widest text-xl">
          Portal
        </h6>
        <div className="flex flex-col space-y-6 w-full">
          <CustomButton link="/members/login" label="Members" />
          <CustomButton link="/sponsors/login" label="Sponsors" />
        </div>
      </div>
    </Layout>
  );
};

export default PortalPage;
