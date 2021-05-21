import React, { useEffect, useState } from "react";
import MemberDashboardMenu from "../../../../components/dashboard-menu/members";
import Layout from "../../../../components/layout";
import { useHistory, useLocation } from "react-router-dom";
import InputField from "../../../../components/input-field";
import CustomButton from "../../../../components/custom-button";
import CustomEditor from "../../../../components/custom-editor";
import CustomDatePicker from "../../../../components/custom-date-picker";
import CustomTimePicker from "../../../../components/custom-time-picker";
import axios from "axios";
import moment from "moment";
import SectionHeader from "../../../../components/section-header";
import { editEvent } from "../../../../validators/events-validator";

const AdminTab_Events_Edit = () => {
  const [formData, setFormData] = useState({});
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const history = useHistory();
  const location = useLocation();

  const { eventId } = location.state;

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
      ...formData,
      [name]: null,
    });
  };

  const handleSubmit = () => {
    try {
      editEvent
        .validate(formData, { abortEarly: false })
        .then(async () => {
          let body = {
            id: eventId,
            ...formData,
          };

          const _response = await axios.patch("/events", body);

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

  useEffect(() => {

    let eventId;
    if (location.state === undefined) {
      eventId = localStorage.getItem("eventId");
    } else {
      eventId = location.state.eventId;
    }

    axios
      .get(`/events/${eventId}`)
      .then((_response) => {
        if (_response.status === 200) {
          const { data } = _response;
          setFormData(data);
          setIsDataLoaded(true);
        }
      })
      .catch((err) => console.log(err));
  }, [setFormData, eventId]);

  return (
    <Layout>
      <div className="container flex flex-col space-y-6 bg-darkGray p-5 rounded-lg mx-auto max-w-md h-screen">
        <SectionHeader
          heading="Admin"
          backLink="/admin/events"
          subHeading="Edit Event"
        />
        {isDataLoaded ? (
          <>
            <InputField
              placeholder="Name"
              defaultValue={formData.name}
              name="name"
              styleType={2}
              required
              type="text"
              handleInputChange={handleFormChange}
              errorMessage={validationErrors.name}
            />
            <div>
              <CustomDatePicker
                selected={moment(formData.date).toDate()}
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
              defaultValue={formData.meetingPoint}
              required
              type="text"
              styleType={2}
              handleInputChange={handleFormChange}
              errorMessage={validationErrors.meetingPoint}
            />
            <div>
              <CustomTimePicker
                placeHolder="Meeting Time"
                selected={moment(formData.meetingTime).toDate()}
                handleTimeChange={handleTimePicker}
              />
              {validationErrors.meetingTime ? (
                <p className="text-red text-sm">
                  {validationErrors.meetingTime}
                </p>
              ) : null}
            </div>
            <div className="w-full ckeditor_list">
              <CustomEditor
                handleOnChange={(e, editor) => handleEditorChange(e, editor)}
                value={formData.details}
              />
              {validationErrors.details ? (
                <p className="text-red text-sm">{validationErrors.details}</p>
              ) : null}
            </div>
            <CustomButton
              label="Edit"
              handleOnClick={handleSubmit}
              styleType={2}
            />
          </>
        ) : null}
      </div>
      <div className="p-10 ">
        <MemberDashboardMenu />
      </div>
    </Layout>
  );
};

export default AdminTab_Events_Edit;
