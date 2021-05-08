import React, { useState, useEffect } from "react";
import MemberDashboardMenu from "../../../components/dashboard-menu/members";
import Layout from "../../../components/layout";
import axios from "axios";
import moment from "moment";
import AnnouncementCard from "../../../components/announcement-card";
import QrCode from "qrcode.react";
import QrReader from "react-qr-reader";
import { useStoreState } from "easy-peasy";
import {
  UserIcon,
  AtSymbolIcon,
  DeviceMobileIcon,
} from "@heroicons/react/outline";
import { MdPersonOutline } from "react-icons/md";
import {
  AiOutlineMail,
  AiOutlineMobile,
  AiOutlineWhatsApp,
  AiOutlineCar,
} from "react-icons/ai";
const MemberDashboard_BarCode = () => {
  const currentUser = useStoreState((state) => state.currentUser.currentUser);
  return (
    <Layout>
      <div className="container flex flex-col items-center space-y-6 bg-darkGray p-5 rounded-lg mx-auto max-w-md ">
        <h6 className="text-white uppercase font-bold tracking-widest text-xl">
          Barcode
        </h6>
        <QrCode size={150} bgColor="transparent" fgColor="white" value={currentUser.id} onClick={() => console.log("barcode clicked")} />
        <div className="border-red border-2 rounded p-5 flex flex-col space-y-3 w-full">
          <div className="mb-2">
            {currentUser.roles.some(
              (_role) => _role.name === "WOLFSBURG" || _role.name === "ADMIN"
            ) ? (
              currentUser.roles.map((_role) =>
                _role.name !== "ACTIVE" ? (
                  <p className="text-red font-bold text-center text-2xl">
                    {_role.name}
                  </p>
                ) : null
              )
            ) : (
              <p>Active</p>
            )}
          </div>
          <div className="flex flex-row">
            <MdPersonOutline className="text-red text-2xl" />
            <p className="text-white ml-6">
              {currentUser.firstName} {currentUser.lastName}
            </p>
          </div>
          <div className="flex flex-row">
            <AiOutlineMail className="text-red text-2xl" />
            <p className="text-white ml-6">{currentUser.emailAddress}</p>
          </div>
          <div className="flex flex-row">
            <AiOutlineMobile className="text-red text-2xl" />
            <p className="text-white ml-6">{currentUser.mobileNumber}</p>
          </div>
          <div className="flex flex-row">
            <AiOutlineWhatsApp className="text-red text-2xl" />
            <p className="text-white ml-6">{currentUser.whatsAppNumber}</p>
          </div>
          <div className="flex flex-row ">
            <AiOutlineCar className="text-2xl text-red" />
            {currentUser.cars.map((_car, index) => (
              <div className="flex flex-col" key={index}>
                <div className="text-white ml-6">
                  <p>
                    {_car.carYear} {_car.carModel} {_car.carColor}
                  </p>
                </div>
                <div className="text-white ml-6">
                  <p>
                    {_car.plateEmirate} {_car.plateCode} {_car.plateNumber}
                  </p>
                </div>
                <div className="text-white ml-6">
                  <p>{_car.vinNumber}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="p-10 ">
        <MemberDashboardMenu />
      </div>
    </Layout>
  );
};

export default MemberDashboard_BarCode;
