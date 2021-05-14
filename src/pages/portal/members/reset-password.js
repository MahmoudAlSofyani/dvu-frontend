import axios from "axios";
import React, { useState } from "react";
import CustomButton from "../../../components/custom-button";
import InputField from "../../../components/input-field";
import Layout from "../../../components/layout";
import resetPasswordValidator from "../../../validators/members-reset-password-validator";

const MembersResetPassword = () => {
  const [validationErrors, setValidationErrors] = useState({});
  const [confirmationMessage, setConfirmationMessage] = useState("");

  const [formData, setFormData] = useState({});

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setConfirmationMessage("");
    setValidationErrors({
      ...validationErrors,
      [e.target.name]: null,
    });
  };

  const handleSubmit = (e) => {
    try {
      e.preventDefault();
      resetPasswordValidator
        .validate(formData, { abortEarly: false })
        .then(() => {
          axios
            .post("/auth/members/reset-password", formData)
            .then((_response) => {
              setConfirmationMessage(
                `If the email ${formData.emailAddress} exists, you will receieve an email with your new password.`
              );
            })
            .catch((err) => console.log(err));
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
    <Layout>
      <div className="container flex flex-col items-center space-y-6 bg-darkGray p-5 rounded-lg mx-auto max-w-md ">
        <h6 className="text-white uppercase font-bold tracking-widest text-xl">
          Reset Password
        </h6>
        <p className="text-white">
          Please enter your email and we will email you a new password
        </p>
        <form className="space-y-10 w-full">
          <div>
            <InputField
              placeholder="Email Address"
              type="email"
              name="emailAddress"
              styleType={2}
              required
              handleInputChange={handleFormChange}
              errorMessage={validationErrors.emailAddress}
            />
          </div>
          <CustomButton
            label="Submit"
            styleType={2}
            extraClasses="w-full"
            handleOnClick={handleSubmit}
          />
        </form>
        {confirmationMessage ? (
          <p className="text-green text-sm">
            If the email{" "}
            <span className="text-white text-sm">{formData.emailAddress}</span>{" "}
            exists, you will receieve an email with your new password
          </p>
        ) : null}
      </div>
    </Layout>
  );
};

export default MembersResetPassword;
