import React, { useEffect, useState } from "react";
import MemberDashboardMenu from "../../../../src/components/dashboard-menu/members";
import Layout from "../../../../src/components/layout";
import { PlusCircleIcon } from "@heroicons/react/outline";
import InputField from "../../../../src/components/input-field";
import DropdownField from "../../../../src/components/dropdown-field";
import CustomButton from "../../../../src/components/custom-button";
import { useStoreActions, useStoreState } from "easy-peasy";
import {
  addNewCar,
  getCarColors,
  getCarModels,
  getPlateCodes,
  getPlateEmirates,
  updateUser,
} from "../../../../src/helpers/api-callers";
import SectionHeader from "../../../../src/components/section-header";
import { generateYearArray } from "../../../../src/helpers/common";
import CustomAvatarEditor from "../../../../src/components/custom-avatar-editor";
import axios from "axios";

const MemberDashboard_Settings = () => {
  const currentUser = useStoreState((state) => state.currentUser.currentUser);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [carYears, setCarYears] = useState([]);
  const [memberData, setMemberData] = useState(currentUser);
  const [carModels, setCarModels] = useState([]);
  const [carColors, setCarColors] = useState([]);
  const [plateEmirates, setPlateEmirates] = useState([]);
  const [plateCodes, setPlateCodes] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [isSavingUserDone, setIsSavingUserDone] = useState(false);
  const [isSavingCarDone, setIsSavingCarDone] = useState(false);
  const [profilePicture, setProfilePicture] = useState({});

  const formData = useStoreState((state) => state.settingsFormData.formData);
  const setFormData = useStoreActions(
    (actions) => actions.settingsFormData.setFormData
  );
  const setCurrentUser = useStoreActions(
    (actions) => actions.currentUser.setCurrentUser
  );

  const handleFormChange = (e) => setFormData(e.target);

  useEffect(() => {
    try {
      Promise.all([
        getCarModels(),
        getCarColors(),
        generateYearArray(),
        getPlateEmirates(),
        getPlateCodes(),
      ])
        .then((_responses) => {
          if (_responses[0]) setCarModels(_responses[0]);
          if (_responses[1]) setCarColors(_responses[1]);
          if (_responses[2]) setCarYears(_responses[2]);
          if (_responses[3]) setPlateEmirates(_responses[3]);
          if (_responses[4]) setPlateCodes(_responses[4]);

          setIsDataLoaded(true);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  }, [
    setCarModels,
    setCarColors,
    setCarYears,
    setPlateEmirates,
    setPlateCodes,
  ]);

  const handleAddNewCar = async () => {
    try {
      let _updatedCars = await addNewCar(formData, memberData.id);

      setMemberData({
        ...memberData,
        cars: _updatedCars,
      });

      setCurrentUser({ ...currentUser, cars: _updatedCars });
      setIsDialogOpen(false);
      setIsSavingCarDone(true);
      setTimeout(() => {
        setIsSavingCarDone(false);
      }, 3000);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdateUser = async () => {
    try {
      let _updatedUser = await updateUser(memberData.id, formData);

      setMemberData({
        ...memberData,
        ..._updatedUser,
      });
      setCurrentUser({ ...currentUser, ..._updatedUser });
      setIsSavingUserDone(true);
      setTimeout(() => {
        setIsSavingUserDone(false);
      }, 3000);
    } catch (err) {
      console.log(err);
    }
  };

  const handleFileUpload = async (e) => {
    try {
      setProfilePicture(e.target.files[0]);
      let _formData = new FormData();

      _formData.append("imageFile", e.target.files[0]);
      _formData.append("id", memberData.id);

      const _response = await axios.put(
        "/members/update-profile-picture",
        _formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (_response.status === 200) {
        let _updatedUser = _response.data;
        setCurrentUser({ ...currentUser, ..._updatedUser });
        setMemberData({
          ...currentUser,
          ..._updatedUser,
        });
        setIsDataLoaded(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Layout>
      <div className="container flex flex-col space-y-6 bg-darkGray p-5 rounded-lg mx-auto max-w-md ">
        <SectionHeader heading="Settings" />
        <p className="text-white">Personal Information</p>
        <div className="flex flex-row">
          <div className="space-y-4 w-full">
            <CustomAvatarEditor
              imageFile={
                memberData.profilePicture
                  ? `${process.env.NEXT_PUBLIC_API_URL}/utility/file/${memberData.profilePicture.id}`
                  : null
              }
            />
            {!profilePicture || !memberData.profilePicture ? (
              <InputField
                type="file"
                styleType={2}
                placeholder="Change Profile Image"
                handleInputChange={handleFileUpload}
              />
            ) : null}
          </div>
        </div>
        <div className="flex flex-col space-y-3 w-full shadow-md">
          <label className="text-md text-white">First Name</label>
          <InputField
            name="firstName"
            type="text"
            placeholder={memberData.firstName}
            disabled
            styleType={2}
          />
        </div>
        <div className="flex flex-col space-y-3 w-full shadow-md">
          <label className="text-md text-white">Last Name</label>
          <InputField
            styleType={2}
            name="lastName"
            type="text"
            placeholder={memberData.lastName}
            disabled
          />
        </div>
        <div className="flex flex-col space-y-3 w-full shadow-md">
          <label className="text-md text-white">Mobile Number</label>
          <InputField
            styleType={2}
            name="mobileNumber"
            type="tel"
            handleInputChange={handleFormChange}
            placeholder={memberData.mobileNumber}
          />
        </div>
        <div className="flex flex-col space-y-3 w-full shadow-md">
          <label className="text-md text-white">WhatsApp Number</label>
          <InputField
            name="whatsAppNumber"
            type="tel"
            styleType={2}
            handleInputChange={handleFormChange}
            placeholder={
              !memberData.whatsAppNumber || memberData.whatsAppNumber === "null"
                ? ""
                : memberData.whatsAppNumber
            }
          />
        </div>
        <div className="flex flex-col space-y-3 w-full shadow-md">
          <label className="text-md text-white">Email</label>
          <InputField
            styleType={2}
            name="emailAddress"
            type="email"
            handleInputChange={handleFormChange}
            placeholder={memberData.emailAddress}
          />
        </div>
        <div className="flex flex-col space-y-3 w-full shadow-md">
          <label className="text-md text-white">Instagram</label>
          <InputField
            styleType={2}
            name="instagramName"
            type="text"
            handleInputChange={handleFormChange}
            placeholder={
              !memberData.instagramName || memberData.instagramName === "null"
                ? ""
                : memberData.instagramName
            }
          />
        </div>
        <div>
          <CustomButton
            styleType={2}
            label="Save"
            handleOnClick={handleUpdateUser}
            extraClasses="w-full"
          />
          {isSavingUserDone ? (
            <p className="text-green text-center my-5">Saved!</p>
          ) : null}
        </div>
        <div className="w-1/2 py-5 mx-auto">
          <hr className="text-white border-dotted w-full opacity-20 rounded " />
        </div>
        <p className="text-white">Your rides</p>
        {memberData.cars.map((_car, index) => (
          <div
            key={index}
            className="text-center text-white bg-charcoal p-5 rounded-md leading-9 shadow-md w-full"
          >
            <p>
              {_car.carYear} {_car.carModel}
            </p>
            <p>{_car.carColor}</p>
            <p>
              {_car.plateEmirate} {_car.plateCode} {_car.plateNumber}{" "}
            </p>
            <p>{_car.vinNumber}</p>
          </div>
        ))}

        <div className="mx-auto">
          <PlusCircleIcon
            onClick={() => setIsDialogOpen(!isDialogOpen)}
            className="text-red w-10"
          />
          {isSavingCarDone ? (
            <p className="text-green text-center my-5">Saved!</p>
          ) : null}
        </div>
        {isDialogOpen && isDataLoaded ? (
          <div className=" text-white p-5 rounded-md leading-9 space-y-9">
            <DropdownField
              options={carModels}
              placeholder="Car Model"
              styleType={2}
              name="carModel"
              required
              handleInputChange={handleFormChange}
            />
            <DropdownField
              options={carColors}
              placeholder="Car Color"
              name="carColor"
              styleType={2}
              required
              handleInputChange={handleFormChange}
            />
            <DropdownField
              options={carYears}
              placeholder="Car Year"
              styleType={2}
              name="carYear"
              required
              handleInputChange={handleFormChange}
            />
            <DropdownField
              options={plateEmirates}
              placeholder="Plate Emirate"
              name="plateEmirate"
              styleType={2}
              required
              handleInputChange={handleFormChange}
            />
            <DropdownField
              options={plateCodes.filter(
                (_plateCode) => _plateCode.emirate === formData.plateEmirate
              )}
              required
              styleType={2}
              placeholder="Plate Code"
              name="plateCode"
              handleInputChange={handleFormChange}
              disabled={!formData.plateEmirate ? true : false}
            />
            <InputField
              placeholder="Plate Number"
              name="plateNumber"
              styleType={2}
              required
              handleInputChange={handleFormChange}
            />
            <InputField
              placeholder="Vin Number"
              name="vinNumber"
              styleType={2}
              required
              handleInputChange={handleFormChange}
            />
            <CustomButton
              styleType={2}
              label="Save"
              handleOnClick={handleAddNewCar}
              extraClasses="w-full"
            />
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
