import React, { useEffect, useState } from "react";
import MemberDashboardMenu from "../../../components/dashboard-menu/members";
import Layout from "../../../components/layout";
import { PlusCircleIcon } from "@heroicons/react/outline";
import InputField from "../../../components/input-field";
import DropdownField from "../../../components/dropdown-field";
import CustomButton from "../../../components/custom-button";
import axios from "axios";
import { useStoreActions, useStoreState } from "easy-peasy";
import {
  getCarColors,
  getCarModels,
  getPlateCodes,
  getPlateEmirates,
} from "../../../helpers/api-callers";
import SectionHeader from "../../../components/section-header";

const MemberDashboard_Settings = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [_yearsArray, _setYearsArray] = useState([]);
  const [currentMember, setCurrentMember] = useState({});
  const [memberCars, setMemberCars] = useState([]);
  const [carModels, setCarModels] = useState([]);
  const [carColors, setCarColors] = useState([]);
  const [plateEmirates, setPlateEmirates] = useState([]);
  const [plateCodes, setPlateCodes] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const formData = useStoreState((state) => state.settingsFormData.formData);
  const setFormData = useStoreActions(
    (actions) => actions.settingsFormData.setFormData
  );

  const currentUser = useStoreState((state) => state.currentUser.currentUser);

  const handleFormChange = (e) => setFormData(e.target);

  const handleSubmit = async () => {
    try {
      const {
        carModel,
        carColor,
        carYear,
        plateEmirate,
        plateCode,
        plateNumber,
      } = formData;

      const body = {
        id: currentUser.id,
        cars: {
          carModel,
          carColor,
          carYear,
          plateEmirate,
          plateCode,
          plateNumber,
        },
      };

      const _response = await axios.post("/cars/", body);

      if (_response.status === 200) {
        setIsDialogOpen(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    try {
      Promise.all([
        axios.get(`/members/${currentUser.id}`),
        getCarModels(),
        getCarColors(),
        getPlateEmirates(),
        getPlateCodes(),
      ]).then((_responses) => {
        if (_responses[0].status === 200) {
          const { cars } = _responses[0].data;
          setCurrentMember(_responses[0].data);

          let _cars = [];

          cars.forEach((_car) => {
            _cars.push({
              carModel: _car.carModel,
              carColor: _car.carColor,
              carYear: _car.carYear,
              plateCode: _car.plateCode,
              plateNumber: _car.plateNumber,
              plateEmirate: _car.plateEmirate,
              vinNumber: _car.vinNumber,
            });
          });

          setMemberCars(_cars);
        }

        if (_responses[1]) setCarModels(_responses[1]);
        if (_responses[2]) setCarColors(_responses[2]);
        if (_responses[3]) setPlateEmirates(_responses[3]);
        if (_responses[4]) setPlateCodes(_responses[4]);
      });

      const currentYear = new Date().getFullYear();
      let _tempYearsArray = [];

      for (let i = currentYear; i > 1936; i--) {
        _tempYearsArray.push({
          label: i,
          value: i,
        });
      }
      _setYearsArray(_tempYearsArray);

      setIsDataLoaded(true);
    } catch (err) {}
  }, [
    _setYearsArray,
    setCurrentMember,
    setMemberCars,
    setCarModels,
    setPlateEmirates,
    setPlateCodes,
    currentUser.id,
  ]);

  return (
    <Layout>
      <div className="container flex flex-col space-y-6 bg-darkGray p-5 rounded-lg mx-auto max-w-md ">
        <SectionHeader heading="Settings" />
        <p className="text-white">Personal Information</p>
        <div className="flex flex-row">
          <img
            className="rounded-full w-3/5 mx-auto"
            src="https://picsum.photos/200"
            alt="Profile"
          />
        </div>
        <div className="flex flex-col space-y-3 w-full">
          <label className="text-md text-white">First Name</label>
          <InputField
            name="firstName"
            type="text"
            placeholder={currentMember.firstName}
            disabled
            style={2}
          />
        </div>
        <div className="flex flex-col space-y-3 w-full">
          <label className="text-md text-white">Last Name</label>
          <InputField
          style={2}
            name="lastName"
            type="text"
            placeholder={currentMember.lastName}
            disabled
          />
        </div>
        <div className="flex flex-col space-y-3 w-full">
          <label className="text-md text-white">Mobile Number</label>
          <InputField
          style={2}
            name="mobileNumber"
            type="tel"
            placeholder={currentMember.mobileNumber}
          />
        </div>
        <div className="flex flex-col space-y-3 w-full">
          <label className="text-md text-white">WhatsApp Number</label>
          <InputField
            name="whatsappNumber"
            type="tel"
            style={2}
            placeholder={
              !currentMember.whatsAppNumber ||
              currentMember.whatsAppNumber === "null"
                ? ""
                : currentMember.whatsAppNumber
            }
          />
        </div>
        <div className="flex flex-col space-y-3 w-full">
          <label className="text-md text-white">Email</label>
          <InputField
          style={2}
            name="firstName"
            type="email"
            placeholder={currentMember.emailAddress}
          />
        </div>
        <div className="flex flex-col space-y-3 w-full">
          <label className="text-md text-white">Instagram</label>
          <InputField
          style={2}
            name="instagramName"
            type="text"
            placeholder={
              !currentMember.instagramName ||
              currentMember.instagramName === "null"
                ? ""
                : currentMember.instagramName
            }
          />
        </div>
        <div className="w-1/2 py-5 mx-auto">
          <hr className="text-white border-dotted w-full opacity-20 rounded" />
        </div>
        <p className="text-white">Your rides</p>
        {memberCars.map((_car, index) => (
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
            <p>
              {!_car.vinNumber || _car.vinNumber === "null"
                ? ""
                : _car.vinNumber}
            </p>
          </div>
        ))}

        <div className="mx-auto">
          <PlusCircleIcon
            onClick={() => setIsDialogOpen(true)}
            className="text-red w-10"
          />
        </div>
        {isDialogOpen && isDataLoaded ? (
          <div className=" text-white border-2 border-red p-5 rounded-md leading-9 shadow-md space-y-9">
            <DropdownField
              options={carModels}
              placeholder="Car Model"
              style={2}
              name="carModel"
              handleInputChange={handleFormChange}
            />
            <DropdownField
              options={carColors}
              placeholder="Car Color"
              name="carColor"
              style={2}

              handleInputChange={handleFormChange}
            />
            <DropdownField
              options={_yearsArray}
              placeholder="Car Year"
              style={2}

              name="carYear"
              handleInputChange={handleFormChange}
            />
            <DropdownField
              options={plateEmirates}
              placeholder="Plate Emirate"
              name="plateEmirate"
              style={2}

              handleInputChange={handleFormChange}
            />
            <DropdownField
              options={plateCodes.filter(
                (_plateCode) => _plateCode.emirate === formData.plateEmirate
              )}
              style={2}

              placeholder="Plate Code"
              name="plateCode"
              handleInputChange={handleFormChange}
              disabled={!formData.plateEmirate ? true : false}
            />
            <InputField
              placeholder="Plate Number"
              name="plateNumber"
              style={2}

              handleInputChange={handleFormChange}
            />
            <CustomButton label="Save" handleOnClick={handleSubmit} />
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
