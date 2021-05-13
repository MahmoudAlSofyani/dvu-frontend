import React, { useState } from "react";
import MemberDashboardMenu from "../../../../components/dashboard-menu/members";
import Layout from "../../../../components/layout";
import { useHistory } from "react-router-dom";
import InputField from "../../../../components/input-field";
import CustomButton from "../../../../components/custom-button";
import CustomEditor from "../../../../components/custom-editor";
import CustomDatePicker from "../../../../components/custom-date-picker";
import CustomTimePicker from "../../../../components/custom-time-picker";
import axios from "axios";
import SectionHeader from "../../../../components/section-header";
import { addEvent } from "../../../../validators/events-validator";

const AdminTab_Events_Add = () => {
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
      ...validationErrors,
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
      addEvent
        .validate(formData, { abortEarly: false })
        .then(async () => {
          const _response = await axios.post("/events", formData);

          if (_response.status === 200) {
            history.push("/admin/events");
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

  const handleDatePicker = (date) => {
    setFormData({
      ...formData,
      date: date,
    });

    setValidationErrors({
      ...validationErrors,
      date: null,
    });
  };

  const handleTimePicker = (time) => {
    setFormData({
      ...formData,
      meetingTime: time,
    });
    setValidationErrors({
      ...validationErrors,
      meetingTime: null,
    });
  };

  return (
    <Layout>
      <div className="container flex flex-col space-y-6 bg-darkGray p-5 rounded-lg mx-auto max-w-md h-screen">
        <SectionHeader
          heading="Admin"
          backLink="/admin/events"
          subHeading="Add Event"
        />
        <InputField
          placeholder="Name"
          name="name"
          styleType={2}
          required
          type="text"
          handleInputChange={handleFormChange}
          errorMessage={validationErrors.name}
        />
        <div>
          <CustomDatePicker
            selected={formData.date}
            handleDateChange={handleDatePicker}
            placeHolder="Date"
            id="date"
          />
          {validationErrors.date ? (
            <p className="text-red text-sm">{validationErrors.date}</p>
          ) : null}
        </div>
        <InputField
          placeholder="Meeting Point"
          name="meetingPoint"
          styleType={2}
          required
          type="text"
          handleInputChange={handleFormChange}
          errorMessage={validationErrors.meetingPoint}
        />
        <div>
          <CustomTimePicker
            placeHolder="Meeting Time"
            selected={formData.meetingTime}
            handleTimeChange={handleTimePicker}
          />
          {validationErrors.meetingTime ? (
            <p className="text-red text-sm">{validationErrors.meetingTime}</p>
          ) : null}
        </div>
        <div className="w-full ckeditor_list">
          <CustomEditor
            placeholder="Event Details"
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

export default AdminTab_Events_Add;
