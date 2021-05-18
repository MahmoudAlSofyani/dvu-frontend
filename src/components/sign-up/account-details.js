import { useStoreActions, useStoreState } from "easy-peasy";
import React, { useState } from "react";
import CustomButton from "../custom-button";
import InputField from "../input-field";
import axios from "axios";
import { useRouter } from "next/router";
import { accountDetails } from "../../validators/signup-validator";
import SectionHeader from "../section-header";

const MembersSignUpPageAccountDetails = () => {
  const [validationErrors, setValidationErrors] = useState({});
  const setStepNumber = useStoreActions(
    (actions) => actions.memberSignupForm.setStepNumber
  );
  const setFormData = useStoreActions(
    (actions) => actions.memberSignupForm.setFormData
  );
  const formData = useStoreState((state) => state.memberSignupForm.formData);

  const router = useRouter();

  const handleFormChange = (e) => setFormData(e.target);
  const handleSubmit = async () => {
    const _response = await axios.post("/members", formData);

    if (_response.status === 200) {
      router.push("/portal/members");
    }
  };

  const validateForm = () => {
    try {
      accountDetails
        .validate(formData, { abortEarly: false })
        .then(() => {
          handleSubmit();
        })
        .catch((err) => {
          if (err && err.inner) {
            let _validationErrors = {};
            err.inner.forEach((e) => {
              _validationErrors[e.path] = e.message;
            });

            setValidationErrors(_validationErrors);
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <SectionHeader heading="Register" subHeading="Account Details" />
      <InputField
        name="password"
        placeholder="Password"
        styleType={2}
        required
        type="password"
        handleInputChange={handleFormChange}
        errorMessage={validationErrors.password}
        defaultValue={formData.password}
      />
      <InputField
        name="confirmPassword"
        styleType={2}
        placeholder="Confirm Password"
        required
        type="password"
        handleInputChange={handleFormChange}
        errorMessage={validationErrors.confirmPassword}
        defaultValue={formData.confirmPassword}
      />
      <p className="text-white">
        <span className="text-red">*</span> Required
      </p>
      <div className="flex space-x-6">
        <CustomButton
          handleOnClick={() => setStepNumber(2)}
          label="Back"
          extraClasses="w-full"
        />
        <CustomButton
          handleOnClick={validateForm}
          label="Submit"
          extraClasses="w-full"
          styleType={2}
        />
      </div>
    </>
  );
};

export default MembersSignUpPageAccountDetails;
