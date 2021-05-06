import React, { useState, useEffect } from "react";
import MemberDashboardMenu from "../../../../components/dashboard-menu/members";
import Layout from "../../../../components/layout";
import axios from "axios";
import moment from "moment";
import AnnouncementCard from "../../../../components/announcement-card";
import CustomButton from "../../../../components/custom-button";
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
const AdminTab_Members_Verify = () => {
  const [pendingCount, setPendingCount] = useState(0);
  const [pendingMembers, setPendingMembers] = useState([]);
  useEffect(() => {
    try {
      Promise.all([
        axios.get("/utility/member-count/inactive"),
        axios.get("/utility/members-unverified"),
      ]).then((_responses) => {
        if (_responses[0].status === 200) {
          const { count } = _responses[0].data;
          setPendingCount(count);
        }

        if (_responses[1].status === 200) {
          const { data } = _responses[1];

          setPendingMembers(data);
        }
      });
    } catch (err) {}
  }, [setPendingCount]);

  const handleVerifyMember = async (id, roleType) => {
    let _pendingMembers = pendingMembers;
    try {
      let body = {
        id,
        roleType,
      };

      const _response = await axios.put("/members/update-roles", body);

      if (_response.status === 200) {
        console.log(_response.data);
        _pendingMembers = _pendingMembers.filter((_member) => {
          return _member.id !== id;
        });

        setPendingMembers(_pendingMembers);
        setPendingCount(_pendingMembers.length);
      }
    } catch (err) {
      console.log(err);
    }
    console.log(id);
  };

  return (
    <Layout>
      <div className="container flex flex-col items-center space-y-6 bg-darkGray p-5 rounded-lg mx-auto max-w-md ">
        <h6 className="text-white uppercase font-bold tracking-widest text-xl">
          Members
        </h6>
        <p className="text-white">Verify Members</p>
        <div className="text-center text-white bg-charcoal rounded-md leading-9 shadow-md w-full">
          <p className="font-bold">Pending</p>
          <p>{pendingCount}</p>
        </div>
        {pendingMembers.map((_member, index) => (
          <div
            className="text-center text-white bg-charcoal rounded-md leading-9 shadow-md w-full"
            key={index}
          >
            <div className="text-left flex flex-col p-5 space-y-2">
              <div className="flex flex-row items-center">
                <MdPersonOutline className=" text-red text-2xl" />
                <p className="ml-4">
                  {_member.firstName} {_member.lastName}
                </p>
              </div>
              <div className="flex flex-row items-center">
                <AiOutlineMail className="text-2xl text-red" />
                <p className="ml-4">{_member.emailAddress}</p>
              </div>
              <div className="flex flex-row items-center">
                <AiOutlineMobile className="text-2xl text-red" />
                <p className="ml-4">{_member.mobileNumber}</p>
              </div>
              <div className="flex flex-row items-center">
                <AiOutlineWhatsApp className="text-2xl text-red" />
                <p className="ml-4">{_member.whatsAppNumber}</p>
              </div>
              <div className="flex flex-row items-center ">
                <AiOutlineCar className="text-2xl text-red" />
                {_member.cars.map((_car, index) => (
                  <div className="flex flex-col ml-4" key={index}>
                    <div>
                      <p>
                        {_car.carYear} {_car.carModel} {_car.carColor}
                      </p>
                    </div>
                    <div>
                      <p>
                        {_car.plateEmirate} {_car.plateCode} {_car.plateNumber}
                      </p>
                    </div>
                    <div>
                      <p>{_car.vinNumber}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-row p-5 space-x-9">
              <CustomButton
                label="Reject"
                handleOnClick={() => handleVerifyMember(_member.id, "reject")}
              />
              <CustomButton
                label="Approve"
                handleOnClick={() => handleVerifyMember(_member.id, "verify")}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="p-10 ">
        <MemberDashboardMenu />
      </div>
    </Layout>
  );
};

export default AdminTab_Members_Verify;
