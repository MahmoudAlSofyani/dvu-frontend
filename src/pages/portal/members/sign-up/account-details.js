import { useStoreActions, useStoreState } from "easy-peasy";
import React from "react";
import CustomButton from "../../../../components/custom-button";
import InputField from "../../../../components/input-field";

const MembersSignUpPageAccountDetails = () => {
  const setStepNumber = useStoreActions(
    (actions) => actions.memberSignupForm.setStepNumber
  );
  const setFormData = useStoreActions(
    (actions) => actions.memberSignupForm.setFormData
  );
  const formData = useStoreState((state) => state.memberSignupForm.formData);

  const handleFormChange = (e) => setFormData(e.target);
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);
  };
  return (
    <>
      <h6 className="text-white text-sm uppercase">Account Details</h6>
      <InputField
        name="password"
        placeholder="Password"
        required
        type="password"
        handleInputChange={handleFormChange}
      />
      <InputField
        name="confirmPassword"
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
