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

const AdminTab_Events_Edit = () => {
  const [formData, setFormData] = useState({});
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const history = useHistory();
  const location = useLocation();

  const { eventId } = location.state;

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setFormData({
      ...formData,
      details: data,
    });
  };

  const handleFormChange = (e) => {
    const { id, name, value } = e.target;
    setFormData({
      ...formData,
      [name || id]: value,
    });
  };

  const handleOnClick = async () => {
    try {
      let body = {
        id: eventId,
        ...formData,
      };

      const _response = await axios.patch("/events", body);

      if (_response.status === 200) {
        history.push("/admin/events");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDatePicker = (date) => {
    setFormData({
      ...formData,
      date: date,
    });
  };

  const handleTimePicker = (time) => {
    setFormData({
      ...formData,
      meetingTime: time,
    });
  };

  useEffect(() => {
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
  }, [setFormData]);

  return (
    <Layout>
      <div className="container flex flex-col items-center space-y-6 bg-darkGray p-5 rounded-lg mx-auto max-w-md h-screen">
        <h6 className="text-white uppercase font-bold tracking-widest text-xl">
          Admin
        </h6>
        <p className="text-white">Add Event</p>
        {isDataLoaded ? (
          <>
            <InputField
              placeholder="Name"
              defaultValue={formData.name}
              name="name"
              required
              type="text"
              handleInputChange={handleFormChange}
            />
            <CustomDatePicker
              //   selected={formData.date}
              selected={moment(formData.date).toDate()}
              handleDateChange={handleDatePicker}
              placeHolder="Date"
              id="date"
            />
            <InputField
              placeholder="Meeting Point"
              name="meetingPoint"
              defaultValue={formData.meetingPoint}
              required
              type="text"
              handleInputChange={handleFormChange}
            />
            <CustomTimePicker
              placeHolder="Meeting Time"
              selected={moment(formData.meetingTime).toDate()}
              handleTimeChange={handleTimePicker}
            />
            <div className="w-full ckeditor_list">
              <CustomEditor
                handleOnChange={(e, editor) => handleEditorChange(e, editor)}
                value={formData.details}
              />
            </div>
            <CustomButton label="Edit" handleOnClick={handleOnClick} />
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
