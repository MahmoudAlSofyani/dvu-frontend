import axios from "axios";
import React, { useEffect, useState } from "react";
import CustomButton from "../../../../components/custom-button";
import MemberDashboardMenu from "../../../../components/dashboard-menu/members";
import InputField from "../../../../components/input-field";
import Layout from "../../../../components/layout";
import SectionHeader from "../../../../components/section-header";
import { newSponsorAccount } from "../../../../validators/sponsors-validator";
import { useHistory } from "react-router-dom";
const AdminTab_Sponsors_New = () => {
  const [formData, setFormData] = useState({});
  const [validationErrors, setValidationErrors] = useState({});
  const [statusMessage, setStatusMessage] = useState("");
  const history = useHistory();
  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      history.push("/members/login");
    }
  });

  const handleSubmit = (e) => {
    try {
      e.preventDefault();
      newSponsorAccount
        .validate(formData, { abortEarly: false })
        .then(async () => {
          const _response = await axios.post("/sponsors", formData);

          if (_response.status === 200) {
            setStatusMessage(
              "Sponsor account created successfully. An email has been sent to them with their password. Redirecting you..."
            );

            setInterval(() => {
              history.push("/admin/sponsors");
            }, 3000);
          }
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
      <div className="container flex flex-col space-y-6 bg-darkGray p-5 rounded-lg mx-auto max-w-md ">
        <SectionHeader
          heading="Sponsors"
          subHeading="Add new sponsor account"
        />
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col space-y-4 w-full">
            <InputField
              type="text"
              placeholder="First name"
              styleType={2}
              name="firstName"
              handleInputChange={handleFormChange}
              errorMessage={validationErrors.firstName}
            />
            <InputField
              type="text"
              placeholder="Last name"
              styleType={2}
              name="lastName"
              handleInputChange={handleFormChange}
              errorMessage={validationErrors.lastName}
            />
            <InputField
              type="text"
              placeholder="Email address"
              styleType={2}
              name="emailAddress"
              handleInputChange={handleFormChange}
              errorMessage={validationErrors.emailAddress}
            />
            <InputField
              type="text"
              placeholder="Confirm Email Address"
              styleType={2}
              name="confirmEmail"
              handleInputChange={handleFormChange}
              errorMessage={validationErrors.confirmEmail}
            />
            <InputField
              type="text"
              placeholder="Mobile Number"
              styleType={2}
              name="mobileNumber"
              handleInputChange={handleFormChange}
              errorMessage={validationErrors.mobileNumber}
            />
            <InputField
              type="text"
              placeholder="Company"
              styleType={2}
              name="company"
              handleInputChange={handleFormChange}
              errorMessage={validationErrors.company}
            />
            <CustomButton
              styleType={2}
              label="Submit"
              handleOnClick={handleSubmit}
            />
          </div>
          {statusMessage ? (
            <div>
              <p className="text-green">{statusMessage}</p>
            </div>
          ) : null}
        </div>
      </div>
      <div className="p-10 ">
        <MemberDashboardMenu />
      </div>
    </Layout>
  );
};

export default AdminTab_Sponsors_New;
