import React, { useState, useEffect } from "react";
import MemberDashboardMenu from "../../../../components/dashboard-menu/members";
import Layout from "../../../../components/layout";
import axios from "axios";
import moment from "moment";
import AnnouncementCard from "../../../../components/announcement-card";
import CustomButton from "../../../../components/custom-button";
const AdminTab_Members = () => {
  return (
    <Layout>
      <div className="container flex flex-col items-center space-y-6 bg-darkGray p-5 rounded-lg mx-auto max-w-md ">
        <h6 className="text-white uppercase font-bold tracking-widest text-xl">
          Members
        </h6>
        <CustomButton label="Verify Members" link="/admin/members/verify" />
        <CustomButton label="Brownie Points" />
      </div>
      <div className="p-10 ">
        <MemberDashboardMenu />
      </div>
    </Layout>
  );
};

export default AdminTab_Members;
