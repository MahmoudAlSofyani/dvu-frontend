import { useStoreActions, useStoreState } from "easy-peasy";
import React, { useEffect, useState } from "react";
import CustomButton from "../../../../components/custom-button";
import DropdownField from "../../../../components/dropdown-field";
import InputField from "../../../../components/input-field";
import {
  getCarColors,
  getCarModels,
  getPlateCodes,
  getPlateEmirates,
} from "../../../../helpers/api-callers";

const MembersSignUpPageCarDetails = () => {
  const [_yearsArray, _setYearsArray] = useState([]);
  const [carModels, setCarModels] = useState([]);
  const [carColors, setCarColors] = useState([]);
  const [plateEmirates, setPlateEmirates] = useState([]);
  const [plateCodes, setPlateCodes] = useState([]);

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

    Promise.all([
      getCarModels(),
      getCarColors(),
      getPlateEmirates(),
      getPlateCodes(),
    ])
      .then((_responses) => {
        if (_responses[0]) setCarModels(_responses[0]);
        if (_responses[1]) setCarColors(_responses[1]);
        if (_responses[2]) setPlateEmirates(_responses[2]);
        if (_responses[3]) setPlateCodes(_responses[3]);
      })
      .catch((err) => console.log(err));
  }, [setCarColors, setCarModels, setPlateCodes, setPlateEmirates]);

  const handleFormChange = (e) => setFormData(e.target);

  return (
    <>
      <h6 className="text-white text-sm uppercase">Car Details</h6>
      <div>
        <div className="  flex flex-col">
          <DropdownField
            name="carModel"
            options={carModels}
            placeholder="Car Model"
            required
            handleInputChange={handleFormChange}
            styleType={2}
          />
          <DropdownField
            name="carColor"
            options={carColors}
            placeholder="Car Color"
            required
            handleInputChange={handleFormChange}
            styleType={2}
          />
          <DropdownField
            name="carYear"
            options={_yearsArray}
            placeholder="Car Year"
            required
            handleInputChange={handleFormChange}
            styleType={2}
          />
          <DropdownField
            name="plateEmirate"
            options={plateEmirates}
            placeholder="Plate Emirate"
            required
            handleInputChange={handleFormChange}
            styleType={2}
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
          <div className="space-y-7">
            <InputField
              placeholder="Plate Number"
              name="plateNumber"
              required
              styleType={2}
              handleInputChange={handleFormChange}
            />
            <InputField
              placeholder="Vin Number"
              name="vinNumber"
              required
              styleType={2}
              handleInputChange={handleFormChange}
            />
          </div>
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
