import { useStoreActions } from "easy-peasy";
import React from "react";
import CustomButton from "../../../../components/custom-button";
import InputField from "../../../../components/input-field";

const MembersSignUpPagePersonalDetails = () => {
  const setStepNumber = useStoreActions(
    (actions) => actions.memberSignupForm.setStepNumber
  );
  const setFormData = useStoreActions(
    (actions) => actions.memberSignupForm.setFormData
  );

  const handleChange = (e) => setFormData(e.target);

  return (
    <>
      <h6 className="text-white text-sm uppercase ">Personal Details</h6>
      <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:space-y-0 space-y-8">
        <InputField
          name="firstName"
          placeholder="First Name"
          required
          type="text"
          handleInputChange={handleChange}
          styleType={2}
        />
        <InputField
          name="lastName"
          placeholder="Last Name"
          required
          type="text"
          handleInputChange={handleChange}
          styleType={2}
        />
      </div>
      <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:space-y-0  space-y-8">
        <InputField
          name="emailAddress"
          placeholder="Email"
          required
          type="email"
          handleInputChange={handleChange}
          styleType={2}
        />
        <InputField
          name="confirmEmail"
          placeholder="Confirm Email"
          required
          type="email"
          handleInputChange={handleChange}
          styleType={2}
        />
      </div>
      <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:space-y-0  space-y-8">
        <InputField
          name="mobileNumber"
          placeholder="Mobile Number"
          required
          type="tel"
          styleType={2}
          handleInputChange={handleChange}
        />
        <InputField
          name="whatsappNumber"
          placeholder="WhatsApp Number"
          type="tel"
          handleInputChange={handleChange}
          styleType={2}
        />
      </div>
      <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:space-y-0  space-y-8">
        <InputField
          name="instagramName"
          placeholder="Instagram"
          type="text"
          handleInputChange={handleChange}
          styleType={2}
        />
      </div>
      <p className="text-white">
        <span className="text-red">*</span> Required
      </p>
      <CustomButton handleOnClick={() => setStepNumber(2)} label="Next" />
    </>
  );
};

export default MembersSignUpPagePersonalDetails;
