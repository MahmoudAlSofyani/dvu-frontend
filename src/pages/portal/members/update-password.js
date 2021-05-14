import axios from "axios";
import React, { useState } from "react";
import CustomButton from "../../../components/custom-button";
import InputField from "../../../components/input-field";
import Layout from "../../../components/layout";
import { useLocation, useHistory } from "react-router-dom";
import updatePasswordValidator from "../../../validators/members-update-password-validator";
import { useStoreActions } from "easy-peasy";
const MembersUpdatePassword = () => {
  const [validationErrors, setValidationErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const location = useLocation();
  const history = useHistory();
  const setCurrentUser = useStoreActions(
    (actions) => actions.currentUser.setCurrentUser
  );

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

      updatePasswordValidator
        .validate(formData, { abortEarly: false })
        .then(async () => {
          const { id } = location.state;

          const _formData = { id, ...formData };

          const _response = await axios.post(
            "/auth/members/update-password",
            _formData
          );

          if (_response.status === 200) {
            const { _token, _member } = _response.data;

            localStorage.setItem("token", _token);

            if (_member.roles.some((_role) => _role.name === "ADMIN")) {
              localStorage.setItem("isAdmin", true);
            }

            setCurrentUser(_member);
            history.push("/members/dashboard");
          }
        })
        .catch((err) => {
          if (err && err.inner) {
            let _validationErrors = {};
            err.inner.forEach((e) => {
              _validationErrors[e.path] = e.message;
            });

            setValidationErrors(_validationErrors);
          } else if (err.response) {
            setErrorMessage(err.response.data.err);
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
          Update your password
        </h6>
        <p className="text-white">
          Please enter the password you received in your email and a new
          password
        </p>
        <form className="space-y-10 w-full">
          <div>
            <InputField
              placeholder="Current password"
              type="password"
              name="currentPassword"
              styleType={2}
              required
              handleInputChange={handleFormChange}
              errorMessage={validationErrors.currentPassword}
            />
          </div>
          <div>
            <InputField
              placeholder="New password"
              type="password"
              name="password"
              styleType={2}
              required
              handleInputChange={handleFormChange}
              errorMessage={validationErrors.password}
            />
          </div>
          <div>
            <InputField
              placeholder="Confirm new password"
              type="password"
              name="confirmPassword"
              styleType={2}
              required
              handleInputChange={handleFormChange}
              errorMessage={validationErrors.confirmPassword}
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
          <p className="text-green text-sm">{confirmationMessage}</p>
        ) : null}
        {errorMessage ? (
          <p className="text-red text-sm">{errorMessage}</p>
        ) : null}
      </div>
    </Layout>
  );
};

export default MembersUpdatePassword;
