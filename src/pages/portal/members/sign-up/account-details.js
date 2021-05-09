import { useStoreActions, useStoreState } from "easy-peasy";
import React from "react";
import CustomButton from "../../../../components/custom-button";
import InputField from "../../../../components/input-field";
import axios from "axios";
import { useHistory } from "react-router-dom";

const MembersSignUpPageAccountDetails = () => {
  const setStepNumber = useStoreActions(
    (actions) => actions.memberSignupForm.setStepNumber
  );
  const setFormData = useStoreActions(
    (actions) => actions.memberSignupForm.setFormData
  );
  const formData = useStoreState((state) => state.memberSignupForm.formData);

  const history = useHistory();

  const handleFormChange = (e) => setFormData(e.target);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const _response = await axios.post("/members", formData);

    if (_response.status === 200) {
      history.push("/members/login");
    }
  };
  return (
    <>
      <h6 className="text-white text-sm uppercase">Account Details</h6>
      <InputField
        name="password"
        placeholder="Password"
        style={2}
        required
        type="password"
        handleInputChange={handleFormChange}
      />
      <InputField
        name="confirmPassword"
        style={2}
        placeholder="Confirm Password"
        required
        type="password"
        handleInputChange={handleFormChange}
      />
      <p className="text-white">
        <span className="text-red">*</span> Required
      </p>
      <div className="flex space-x-6">
        <CustomButton handleOnClick={() => setStepNumber(2)} label="Back" />
        <CustomButton handleOnClick={handleSubmit} label="Submit" />
      </div>
    </>
  );
};

export default MembersSignUpPageAccountDetails;
