import React, { useEffect, useState } from "react";
import MemberDashboardMenu from "../../../components/dashboard-menu/members";
import Layout from "../../../components/layout";
import { PlusCircleIcon } from "@heroicons/react/outline";
import InputField from "../../../components/input-field";
import DropdownField from "../../../components/dropdown-field";
import CustomButton from "../../../components/custom-button";

const _carModels = [
  {
    label: "Golf GTI",
    value: "Golf GTI",
  },
];

const _carColors = [
  {
    label: "Blue",
    value: "Blue",
  },
];

const _plateEmirates = [
  {
    label: "Dubai",
    value: "Dubai",
  },
  {
    label: "Abu Dhabi",
    value: "Abu Dhabi",
  },
];

const _plateCodes = [
  {
    label: "A",
    value: "A",
    emirate: "Dubai",
  },
  {
    label: "B",
    value: "B",
    emirate: "Abu Dhabi",
  },
];

const MemberDashboard_Settings = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [_yearsArray, _setYearsArray] = useState([]);

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    let _tempYearsArray = [];

    for (let i = currentYear; i > 1936; i--) {
      _tempYearsArray.push({
        label: i,
        value: i,
      });
    }
    _setYearsArray(_tempYearsArray);
  }, []);

  return (
    <Layout>
      <div className="container flex flex-col items-center space-y-6 bg-darkGray p-5 rounded-lg mx-auto max-w-md ">
        <h6 className="text-white uppercase font-bold tracking-widest text-xl">
          Settings
        </h6>
        <p className="text-white">Personal Information</p>
        <div className="flex flex-row">
          <img
            className="rounded-full w-3/4 mx-auto"
            src="https://picsum.photos/200"
            alt="Profile"
          />
        </div>
        <div className="flex flex-col space-y-3 w-full">
          <label className="text-md text-white">First Name</label>
          <InputField
            name="firstName"
            type="text"
            placeholder="First Name"
            disabled
          />
        </div>
        <div className="flex flex-col space-y-3 w-full">
          <label className="text-md text-white">Last Name</label>
          <InputField
            name="lastName"
            type="text"
            placeholder="Last Name"
            disabled
          />
        </div>
        <div className="flex flex-col space-y-3 w-full">
          <label className="text-md text-white">Mobile Number</label>
          <InputField
            name="mobileNumber"
            type="tel"
            placeholder="+971123456789"
          />
        </div>
        <div className="flex flex-col space-y-3 w-full">
          <label className="text-md text-white">WhatsApp Number</label>
          <InputField
            name="whatsappNumber"
            type="tel"
            placeholder="+971123456789"
          />
        </div>
        <div className="flex flex-col space-y-3 w-full">
          <label className="text-md text-white">Email</label>
          <InputField
            name="firstName"
            type="email"
            placeholder="hello@email.com"
          />
        </div>
        <div className="flex flex-col space-y-3 w-full">
          <label className="text-md text-white">Instagram</label>
          <InputField name="instagramName" type="text" placeholder="instagramName" />
        </div>
        <div className="w-1/2 py-5">
          <hr className="text-white border-dotted w-full opacity-20 rounded" />
        </div>
        <p className="text-white">Your rides</p>
        <div className="text-center text-white bg-charcoal p-5 rounded-md leading-9 shadow-md w-full">
          <p>2016 Golf GTI</p>
          <p>Blue</p>
          <p>DXB A 12345</p>
          <p>WVWFK</p>
        </div>
        <div>
          <PlusCircleIcon
            onClick={() => setIsDialogOpen(true)}
            className="text-red w-10"
          />
        </div>
        {isDialogOpen ? (
          <div className=" text-white bg-charcoal p-5 rounded-md leading-9 shadow-md space-y-9">
            <DropdownField options={_carModels} placeholder="Car Model" />
            <DropdownField options={_carColors} placeholder="Car Color" />
            <DropdownField options={_yearsArray} placeholder="Car Year" />
            <DropdownField
              options={_plateEmirates}
              placeholder="Plate Emirate"
            />
            <DropdownField
              // options={_plateCodes.filter(
              //   (_plateCode) => _plateCode.emirate === formData.plateEmirate
              // )}
              options={_plateCodes}
              placeholder="Plate Code"
            />
            <InputField placeholder="Plate Number" />
            <CustomButton label="Save" />
          </div>
        ) : null}
      </div>
      <div className="p-10 ">
        <MemberDashboardMenu />
      </div>
    </Layout>
  );
};

export default MemberDashboard_Settings;
