import React, { useEffect, useState } from "react";
import CustomButton from "../../../components/custom-button";
import DropdownField from "../../../components/dropdown-field";
import InputField from "../../../components/input-field";
import Layout from "../../../components/layout";
import SectionHeader from "../../../components/section-header";
import TextArea from "../../../components/text-area";
import axios from "axios";
import { useStoreState } from "easy-peasy";
import { useHistory } from "react-router-dom";
const MemberDashboard_Forums_Add = () => {
  const [isDataLoaded, setIsDataLoaded] = useState(true);
  const [formData, setFormData] = useState({});
  const history = useHistory();

  const currentUser = useStoreState((state) => state.currentUser.currentUser);
  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddNewPost = async () => {
    try {
      const { title, description } = formData;

      let body = {
        memberId: currentUser.id,
        title,
        description,
      };

      const _response = await axios.post("/posts", body);

      if (_response.status === 200) {
        history.push("/members/forums");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Layout>
      <div className="container flex flex-col space-y-6 bg-darkGray p-5 rounded-lg mx-auto max-w-md">
        <SectionHeader heading="Forums" backLink="/members/forums" />
        {isDataLoaded ? (
          <div className="w-full flex flex-col space-y-5">
            <h6 className="text-white uppercase">Post Your Question</h6>
            <InputField
              placeholder="Title or Subject"
              style={2}
              type="text"
              required
              name="title"
              handleInputChange={handleFormChange}
            />
            <TextArea
              rows={5}
              placeholder="Your question"
              name="description"
              required
              handleInputChange={handleFormChange}
            />
            {/* <DropdownField
              handleInputChange={handleFormChange}
              options={categories}
              placeholder="Category"
              name="categoryName"
              required
              style={2}
            /> */}
            <CustomButton
              style={2}
              label="Post"
              handleOnClick={handleAddNewPost}
            />
          </div>
        ) : null}
      </div>
    </Layout>
  );
};

export default MemberDashboard_Forums_Add;
