import React, { useEffect, useState } from "react";
import MemberDashboardMenu from "../../../../components/dashboard-menu/members";
import Layout from "../../../../components/layout";
import { useHistory, useLocation } from "react-router-dom";
import InputField from "../../../../components/input-field";
import CustomButton from "../../../../components/custom-button";
import CustomEditor from "../../../../components/custom-editor";
import axios from "axios";
import SectionHeader from "../../../../components/section-header";
const AdminTab_Announcements_Edit = () => {
  const [formData, setFormData] = useState({});
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const { announcementId } = location.state;

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
        id: announcementId,
        ...formData,
      };
      const _response = await axios.patch("/announcements", body);

      if (_response.status === 200) {
        history.push("/admin/announcements");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    axios.get(`/announcements/${announcementId}`).then((_response) => {
      if (_response.status === 200) {
        const { data } = _response;

        setFormData(data);
        setIsDataLoaded(true);
      }
    });
  }, [setFormData]);

  return (
    <Layout>
      <div className="container flex flex-col space-y-6 bg-darkGray p-5 rounded-lg mx-auto max-w-md h-screen">
        <SectionHeader heading="Admin" backLink="/admin/announcements" />
        <p className="text-white">Edit Announcement</p>
        {isDataLoaded ? (
          <>
            <InputField
              placeholder="Title"
              name="title"
              required
              style={2}
              type="text"
              handleInputChange={handleFormChange}
              defaultValue={formData.title}
            />
            <div className="w-full ckeditor_list">
              <CustomEditor
                handleOnChange={(e, editor) => handleEditorChange(e, editor)}
                value={formData.details}
              />
            </div>
            <CustomButton label="Edit" handleOnClick={handleOnClick} style={2} />
          </>
        ) : null}
      </div>
      <div className="p-10 ">
        <MemberDashboardMenu />
      </div>
    </Layout>
  );
};

export default AdminTab_Announcements_Edit;
