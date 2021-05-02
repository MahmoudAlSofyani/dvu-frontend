import React from "react";
import CustomButton from "../../../components/custom-button";
import MemberDashboardMenu from "../../../components/dashboard-menu/members";
import Layout from "../../../components/layout";

const MemberDashboard_Admin = () => {
  return (
    <Layout>
      <div className="container flex flex-col items-center space-y-6 bg-darkGray p-5 rounded-lg mx-auto max-w-md ">
        <h6 className="text-white uppercase font-bold tracking-widest text-xl">
          Admin
        </h6>
        <div className="flex flex-col w-full space-y-2">
          <div className="text-center text-white bg-charcoal rounded-md leading-9 shadow-md ">
            <p className="font-bold">Members</p>
            <p>100</p>
          </div>
          <div className="text-center text-white bg-charcoal rounded-md leading-9 shadow-md">
            <p className="font-bold">Pending</p>
            <p>100</p>
          </div>
        </div>
        <div className="space-y-4">
          <CustomButton link="/admin/announcements" label="Announcements" />
          <CustomButton label="Events" link="/admin/events" />
          <CustomButton label="Members" />
        </div>
      </div>
      <div className="p-10 ">
        <MemberDashboardMenu />
      </div>
    </Layout>
  );
};

export default MemberDashboard_Admin;
