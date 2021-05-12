import { useStoreActions, useStoreState } from "easy-peasy";
import React, { useState } from "react";
import CustomButton from "../../../../components/custom-button";
import InputField from "../../../../components/input-field";
import signupValidator from "../../../../validators/signup-validator";

const MembersSignUpPagePersonalDetails = () => {
  const [validationErrors, setValidationErrors] = useState({});
  const setStepNumber = useStoreActions(
    (actions) => actions.memberSignupForm.setStepNumber
  );
  const setFormData = useStoreActions(
    (actions) => actions.memberSignupForm.setFormData
  );

  const formData = useStoreState((state) => state.memberSignupForm.formData);

  const handleChange = (e) => {
    setFormData(e.target);
    setValidationErrors({
      ...validationErrors,
      [e.target.name]: null,
    });
  };

  const validateForm = () => {
    try {
      signupValidator
        .validate(formData, { abortEarly: false })
        .then(() => {
          setStepNumber(2);
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
      <h6 className="text-white text-sm uppercase ">Personal Details</h6>
      <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:space-y-0 space-y-8">
        <div>
          <InputField
            name="firstName"
            placeholder="First Name"
            required
            type="text"
            handleInputChange={handleChange}
            styleType={2}
          />
          {validationErrors.firstName ? (
            <p className="text-red text-sm">{validationErrors.firstName}</p>
          ) : null}
        </div>
        <div>
          <InputField
            name="lastName"
            placeholder="Last Name"
            required
            type="text"
            handleInputChange={handleChange}
            styleType={2}
          />
          {validationErrors.lastName ? (
            <p className="text-red text-sm">{validationErrors.lastName}</p>
          ) : null}
        </div>
      </div>
      <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:space-y-0  space-y-8">
        <div>
          <InputField
            name="emailAddress"
            placeholder="Email"
            required
            type="email"
            handleInputChange={handleChange}
            styleType={2}
          />
          {validationErrors.emailAddress ? (
            <p className="text-red text-sm">{validationErrors.emailAddress}</p>
          ) : null}
        </div>
        <div>
          <InputField
            name="confirmEmail"
            placeholder="Confirm Email"
            required
            type="email"
            handleInputChange={handleChange}
            styleType={2}
          />
          {validationErrors.confirmEmail ? (
            <p className="text-red text-sm">{validationErrors.confirmEmail}</p>
          ) : null}
        </div>
      </div>
      <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:space-y-0  space-y-8">
        <div>
          <InputField
            name="mobileNumber"
            placeholder="Mobile Number"
            required
            type="tel"
            styleType={2}
            handleInputChange={handleChange}
          />
          {validationErrors.mobileNumber ? (
            <p className="text-red text-sm">{validationErrors.mobileNumber}</p>
          ) : null}
        </div>
        <div>
          <InputField
            name="whatsAppNumber"
            placeholder="WhatsApp Number"
            type="tel"
            handleInputChange={handleChange}
            styleType={2}
          />
          {validationErrors.whatsAppNumber ? (
            <p className="text-red text-sm">
              {validationErrors.whatsAppNumber}
            </p>
          ) : null}
        </div>
      </div>
      <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:space-y-0  space-y-8">
        <div>
          <InputField
            name="instagramName"
            placeholder="Instagram"
            type="text"
            handleInputChange={handleChange}
            styleType={2}
          />
          {validationErrors.instagramName ? (
            <p className="text-red text-sm">{validationErrors.instagramName}</p>
          ) : null}
        </div>
      </div>
      <p className="text-white">
        <span className="text-red">*</span> Required
      </p>
      <CustomButton handleOnClick={validateForm} label="Next" />
    </>
  );
};

export default MembersSignUpPagePersonalDetails;
