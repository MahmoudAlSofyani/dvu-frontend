import React, { useEffect, useState } from "react";
import MemberDashboardMenu from "../../../../../src/components/dashboard-menu/members";
import Layout from "../../../../../src/components/layout";
import { useRouter } from "next/router";
import InputField from "../../../../../src/components/input-field";
import CustomButton from "../../../../../src/components/custom-button";
import CustomEditor from "../../../../../src/components/custom-editor";
import axios from "axios";
import SectionHeader from "../../../../../src/components/section-header";
import { editAnnouncement } from "../../../../../src/validators/announcements-validator";
const AdminTab_Announcements_Edit = () => {
  const [formData, setFormData] = useState({});
  const [validationErrors, setValidationErrors] = useState({});
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const router = useRouter();
  const { announcementId } = router.query;

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

  const handleSubmit = async () => {
    try {
      editAnnouncement
        .validate(formData, { abortEarly: false })
        .then(async () => {
          let body = {
            id: announcementId,
            ...formData,
          };
          const _response = await axios.patch("/announcements", body);

          if (_response.status === 200) {
            router.push("/dashboard/members/admin/announcements");
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

  useEffect(() => {
    axios.get(`/announcements/${announcementId}`).then((_response) => {
      if (_response.status === 200) {
        const { data } = _response;

        setFormData(data);
        setIsDataLoaded(true);
      }
    });
  }, [setFormData, announcementId]);

  return (
    <Layout>
      <div className="container flex flex-col space-y-6 bg-darkGray p-5 rounded-lg mx-auto max-w-md h-screen">
        <SectionHeader
          heading="Admin"
          backLink="/dashboard/members/admin/announcements"
          subHeading="Edit Announcement"
        />
        {isDataLoaded ? (
          <>
            <InputField
              placeholder="Title"
              name="title"
              required
              styleType={2}
              type="text"
              handleInputChange={handleFormChange}
              defaultValue={formData.title}
              errorMessage={validationErrors.title}
            />
            <div className="w-full ckeditor_list">
              <CustomEditor
                handleOnChange={(e, editor) => handleEditorChange(e, editor)}
                value={formData.details}
                placeholder="Announcement Details"
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

export default AdminTab_Announcements_Edit;
