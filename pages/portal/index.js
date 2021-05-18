import React from "react";
import CustomButton from "../../src/components/custom-button";
import Layout from "../../src/components/layout";

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
          <CustomButton
            link="/portal/members"
            label="Members"
            extraClasses="w-full"
          />
          <CustomButton
            link="/portal/sponsors"
            label="Sponsors"
            extraClasses="w-full"
          />
        </div>
      </div>
    </Layout>
  );
};

export default PortalPage;
