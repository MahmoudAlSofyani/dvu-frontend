import React, { useEffect, useState } from "react";
import Layout from "../../../components/layout";
import SectionHeader from "../../../components/section-header";
import { useLocation } from "react-router-dom";
import axios from "axios";
import MemberDashboardMenu from "../../../components/dashboard-menu/members";
import InputField from "../../../components/input-field";
import { FiSend } from "react-icons/fi";
import moment from "moment";
import { useStoreState } from "easy-peasy";

const MemberDashboard_Forums_View = () => {
  const location = useLocation();
  const [currentPost, setCurrentPost] = useState({});
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [formData, setFormData] = useState({});
  const currentUser = useStoreState((state) => state.currentUser.currentUser);

  useEffect(() => {
    try {
      fetchPost();
    } catch (err) {
      console.log(err);
    }
  });

  const fetchPost = async () => {
    try {
      const { id } = location.state;

      const _response = await axios.get(`/posts/${id}`);
      if (_response.status === 200) {
        setCurrentPost(_response.data);
        setIsDataLoaded(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddNewComment = async () => {
    try {
      let body = {
        memberId: currentUser.id,
        postId: currentPost.id,
        comment: formData.comment,
      };

      const _response = await axios.post("/comments", body);

      if (_response.status === 200) {
        fetchPost();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Layout>
      <div className="container flex flex-col space-y-6 bg-darkGray p-5 rounded-lg mx-auto max-w-md">
        <SectionHeader
          heading="Forums"
          buttonLink="/members/forums/add"
          buttonLabel="New"
          backLink="/members/forums"
        />
        <div className="w-full flex flex-col space-y-5">
          {isDataLoaded ? (
            <>
              <div className="bg-red text-white p-4 rounded-md shadow-md">
                <p className="font-bold">{currentPost.title}</p>
                <p className="text-sm">{currentPost.description}</p>
                <p className="text-xs">
                  {currentPost.member.firstName} {currentPost.member.lastName}
                </p>
              </div>
              {currentPost.comments.map((_comment, index) => (
                <div
                  key={index}
                  className="bg-charcoal p-4 rounded-md shadow-md"
                >
                  <p className="text-red text-sm">
                    {_comment.member.firstName} {_comment.member.lastName}
                  </p>
                  <p className="text-white mt-2">{_comment.comment}</p>
                  <div className="mt-5">
                    <p className="text-white opacity-50 text-xs">
                      {moment(_comment.createdAt)
                        .format("hh:mm a - DD MMM YYYY")
                        .toUpperCase()}
                    </p>
                  </div>
                </div>
              ))}
              <div className="relative shadow-md">
                <InputField
                  styleType={2}
                  placeholder="Post reply..."
                  handleInputChange={handleFormChange}
                  name="comment"
                />
                <span className="absolute right-2 top-1 text-white text-2xl m-1">
                  <FiSend onClick={handleAddNewComment} />
                </span>
              </div>
            </>
          ) : null}
        </div>
      </div>
      <div className="p-10">
        <MemberDashboardMenu />
      </div>
    </Layout>
  );
};

export default MemberDashboard_Forums_View;
