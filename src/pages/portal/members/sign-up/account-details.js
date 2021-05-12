import { useStoreActions, useStoreState } from "easy-peasy";
import React, {useState} from "react";
import CustomButton from "../../../../components/custom-button";
import InputField from "../../../../components/input-field";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { accountDetails } from "../../../../validators/signup-validator";

const MembersSignUpPageAccountDetails = () => {
  const [validationErrors, setValidationErrors] = useState({});
  const setStepNumber = useStoreActions(
    (actions) => actions.memberSignupForm.setStepNumber
  );
  const setFormData = useStoreActions(
    (actions) => actions.memberSignupForm.setFormData
  );
  const formData = useStoreState((state) => state.memberSignupForm.formData);

  const history = useHistory();

  const handleFormChange = (e) => setFormData(e.target);
  const handleSubmit = async () => {
    const _response = await axios.post("/members", formData);

    if (_response.status === 200) {
      history.push("/members/login");
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

            // console.log(_validationErrors);
            setValidationErrors(_validationErrors);
          }
        });
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <>
      <h6 className="text-white text-sm uppercase">Account Details</h6>
      <InputField
        name="password"
        placeholder="Password"
        styleType={2}
        required
        type="password"
        handleInputChange={handleFormChange}
        errorMessage={validationErrors.password}
      />
      <InputField
        name="confirmPassword"
        styleType={2}
        placeholder="Confirm Password"
        required
        type="password"
        handleInputChange={handleFormChange}
        errorMessage={validationErrors.confirmPassword}
      />
      <p className="text-white">
        <span className="text-red">*</span> Required
      </p>
      <div className="flex space-x-6">
        <CustomButton handleOnClick={() => setStepNumber(2)} label="Back" />
        <CustomButton handleOnClick={validateForm} label="Submit" />
      </div>
    </>
  );
};

export default MembersSignUpPageAccountDetails;
