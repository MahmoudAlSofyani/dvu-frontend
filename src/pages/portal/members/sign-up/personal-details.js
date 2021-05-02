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
        />
        <InputField
          name="lastName"
          placeholder="Last Name"
          required
          type="text"
          handleInputChange={handleChange}
        />
      </div>
      <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:space-y-0  space-y-8">
        <InputField
          name="email"
          placeholder="Email"
          required
          type="email"
          handleInputChange={handleChange}
        />
        <InputField
          name="confirmEmail"
          placeholder="Confirm Email"
          required
          type="email"
          handleInputChange={handleChange}
        />
      </div>
      <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:space-y-0  space-y-8">
        <InputField
          name="mobileNumber"
          placeholder="Mobile Number"
          required
          type="tel"
          handleInputChange={handleChange}
        />
        <InputField
          name="whatsappNumber"
          placeholder="WhatsApp Number"
          required
          type="tel"
          handleInputChange={handleChange}
        />
      </div>
      <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:space-y-0  space-y-8">
        <InputField
          name="instagram"
          placeholder="Instagram"
          type="text"
          handleInputChange={handleChange}
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
