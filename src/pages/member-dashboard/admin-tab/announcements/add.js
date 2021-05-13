import React, { useState } from "react";
import MemberDashboardMenu from "../../../../components/dashboard-menu/members";
import Layout from "../../../../components/layout";
import { useHistory } from "react-router-dom";
import InputField from "../../../../components/input-field";
import CustomButton from "../../../../components/custom-button";
import CustomEditor from "../../../../components/custom-editor";
import axios from "axios";
import SectionHeader from "../../../../components/section-header";
import { addAnnouncement } from "../../../../validators/announcements-validator";

const AdminTab_Announcements_Add = () => {
  const [formData, setFormData] = useState({});
  const [validationErrors, setValidationErrors] = useState({});
  const history = useHistory();

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();

    setFormData({
      ...formData,
      details: data,
    });

    setValidationErrors({
      details: null,
    });
  };

  const handleFormChange = (e) => {
    const { id, name, value } = e.target;
    setFormData({
      ...formData,
      [name || id]: value,
    });

    setValidationErrors({
      ...validationErrors,
      [name]: null,
    });
  };

  const handleSubmit = () => {
    try {
      addAnnouncement
        .validate(formData, { abortEarly: false })
        .then(async () => {
          const _response = await axios.post("/announcements", formData);

          if (_response.status === 200) {
            history.push("/admin/announcements");
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
      <div className="container flex flex-col  space-y-6 bg-darkGray p-5 rounded-lg mx-auto max-w-md h-screen">
        <SectionHeader
          heading="Admin"
          backLink="/admin/announcements"
          subHeading="Add Announcement"
        />
        <InputField
          placeholder="Title"
          name="title"
          required
          styleType={2}
          type="text"
          handleInputChange={handleFormChange}
          errorMessage={validationErrors.title}
        />
        <div className="w-full ckeditor_list">
          <CustomEditor
            handleOnChange={(e, editor) => handleEditorChange(e, editor)}
          />
          {validationErrors.details ? (
            <p className="text-red text-sm">{validationErrors.details}</p>
          ) : null}
        </div>
        <CustomButton label="Add" handleOnClick={handleSubmit} styleType={2} />
      </div>
      <div className="p-10 ">
        <MemberDashboardMenu />
      </div>
    </Layout>
  );
};

export default AdminTab_Announcements_Add;
