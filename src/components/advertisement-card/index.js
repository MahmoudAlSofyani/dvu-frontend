import React, { useState } from "react";
import { FiPhone } from "react-icons/fi";
import { AiOutlineWhatsApp } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import CustomButton from "../custom-button";
import axios from "axios";

const AdvertisementCard = ({
  sold,
  price,
  imageId,
  title,
  description,
  member,
  mobileNumber,
  whatsAppNumber,
  currentUserId,
  id,
  adminView,
  handleApprove,
  handleReject,
}) => {
  const [isSold, setIsSold] = useState(sold);

  const handleMarkAsSold = async () => {
    try {
      let body = {
        id,
        sold: true,
      };

      const _response = await axios.put("/advertisements/status", body);

      if (_response.status === 200) {
        setIsSold(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-charcoal p-3 rounded-md text-white space-y-4">
      <div className="flex flex-row justify-between">
        {currentUserId === member.id && !isSold && !adminView ? (
          <CustomButton
            styleType={2}
            label="Mark as Sold"
            small
            handleOnClick={handleMarkAsSold}
          />
        ) : null}
        <p className="text-red font-bold">{isSold ? "SOLD" : "AED " + price}</p>
      </div>
      <div className="py-2 mx-auto">
        <img
          src={`${process.env.REACT_APP_API_URL}/utility/file/${imageId}`}
          className="w-full mx-auto"
        />
      </div>
      <div className="space-y-2">
        <p>
          <span className="text-red font-bold uppercase mr-2">Title </span>
          {title}
        </p>
        <div>
          <p className="text-red font-bold uppercase mr-2">Description</p>
          <p dangerouslySetInnerHTML={{ __html: `${description}` }} />
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-red font-bold uppercase">Contact Details</p>
        <div className="flex">
          <p className="mr-1">{member.firstName}</p>
          <p>{member.lastName}</p>
        </div>
        <div className="flex">
          <FiPhone className="text-xl text-red mr-1" />
          <p>{mobileNumber}</p>
        </div>
        <div className="flex">
          <AiOutlineWhatsApp className="text-xl text-red mr-1" />
          <p>{whatsAppNumber ? whatsAppNumber : mobileNumber}</p>
        </div>
      </div>
      {adminView ? (
        <div className="flex justify-between space-x-6 py-5">
          <CustomButton
            label="Reject"
            styleType={2}
            extraClasses="w-full"
            handleOnClick={handleReject}
          />
          <CustomButton
            label="Approve"
            extraClasses="bg-green border-none w-full hover:bg-green"
            handleOnClick={handleApprove}
          />
        </div>
      ) : null}
    </div>
  );
};

export default AdvertisementCard;
