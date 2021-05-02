import { useStoreActions, useStoreState } from "easy-peasy";
import React, { useEffect, useState } from "react";
import CustomButton from "../../../../components/custom-button";
import DropdownField from "../../../../components/dropdown-field";
import InputField from "../../../../components/input-field";

const MembersSignUpPageCarDetails = () => {
  const [_yearsArray, _setYearsArray] = useState([]);
  const setStepNumber = useStoreActions(
    (actions) => actions.memberSignupForm.setStepNumber
  );
  const setFormData = useStoreActions(
    (actions) => actions.memberSignupForm.setFormData
  );

  const formData = useStoreState((state) => state.memberSignupForm.formData);

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

  const handleFormChange = (e) => setFormData(e.target);

  return (
    <>
      <h6 className="text-white text-sm uppercase">Car Details</h6>
      <div>
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:space-y-0  flex flex-col ">
          <DropdownField
            name="carModel"
            options={_carModels}
            placeholder="Car Model"
            required
            handleInputChange={handleFormChange}
          />
          <DropdownField
            name="carColor"
            options={_carColors}
            placeholder="Car Color"
            required
            handleInputChange={handleFormChange}
          />
        </div>
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:space-y-0  flex flex-col ">
          <DropdownField
            name="carYear"
            options={_yearsArray}
            placeholder="Car Year"
            required
            handleInputChange={handleFormChange}
          />
          <DropdownField
            name="plateEmirate"
            options={_plateEmirates}
            placeholder="Plate Emirate"
            required
            handleInputChange={handleFormChange}
          />
        </div>
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:space-y-0  flex flex-col space-y-4 ">
          <DropdownField
            name="plateCode"
            options={_plateCodes.filter(
              (_plateCode) => _plateCode.emirate === formData.plateEmirate
            )}
            placeholder="Plate Code"
            required
            handleInputChange={handleFormChange}
            disabled={!formData.plateEmirate ? true : false}
          />
          <InputField
            placeholder="Plate Number"
            name="plateNumber"
            required
            handleInputChange={handleFormChange}
          />
        </div>
      </div>
      <p className="text-white">
        <span className="text-red">*</span> Required
      </p>
      <div className="flex space-x-6">
        <CustomButton handleOnClick={() => setStepNumber(1)} label="Back" />
        <CustomButton handleOnClick={() => setStepNumber(3)} label="Next" />
      </div>
    </>
  );
};

export default MembersSignUpPageCarDetails;
