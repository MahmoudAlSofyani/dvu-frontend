import React, { useEffect, useState } from "react";
import Layout from "../../../components/layout";
import SectionHeader from "../../../components/section-header";
import { useLocation, useHistory } from "react-router-dom";
import axios from "axios";
import MemberDashboardMenu from "../../../components/dashboard-menu/members";
import InputField from "../../../components/input-field";
import TextArea from "../../../components/text-area";
import { FiSend } from "react-icons/fi";
import moment from "moment";
import { useStoreActions, useStoreState } from "easy-peasy";
import { addComment } from "../../../validators/comments-validator";
import Seo from "../../../components/seo";

const MemberDashboard_Forums_View = () => {
  const location = useLocation();
  const history = useHistory();
  const [currentPost, setCurrentPost] = useState({});
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [formData, setFormData] = useState({});
  const currentUser = useStoreState((state) => state.currentUser.currentUser);
  const setCurrentUser = useStoreActions(
    (actions) => actions.currentUser.setCurrentUser
  );

  useEffect(() => {
    try {
      if (!localStorage.getItem("token")) {
        history.push("/members/login");
      }


      if (Object.keys(currentUser).length === 0) {
        setCurrentUser(JSON.parse(localStorage.getItem("currentUser")));
      }

      fetchPost();
    } catch (err) {
      console.log(err);
    }
  }, []);

  const fetchPost = async () => {
    try {
      let postId;
      if (location.state === undefined) {
        postId = localStorage.getItem("postId");
      } else {
        postId = location.state.postId;
      }

      const _response = await axios.get(`/posts/${postId}`);
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

  const handleAddNewComment = () => {
    try {
      addComment
        .validate(formData, { abortEarly: false })
        .then(async () => {
          let body = {
            memberId: currentUser.id,
            postId: currentPost.id,
            comment: formData.comment,
          };

          const _response = await axios.post("/comments", body);

          if (_response.status === 200) {
            setFormData({
              ...formData,
              comment: "",
            });
            fetchPost();
          }
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Layout>
      <div className="container flex flex-col space-y-6 bg-darkGray p-5 rounded-lg mx-auto max-w-md">
        <SectionHeader heading="Forums" backLink="/members/forums" />
        <div className="w-full flex flex-col space-y-5">
          {isDataLoaded ? (
            <>
              <Seo title={currentPost.title} />
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
                  <div className="w-full h-full flex items-center ">
                    {currentPost.member.profilePicture &&
                    _comment.member.id === currentPost.member.id ? (
                      <img
                        className="rounded-full w-1/6 h-full"
                        src={`${process.env.REACT_APP_API_URL}/utility/file/${currentPost.member.profilePicture.id}`}
                        alt="User"
                      />
                    ) : null}
                    <p className="text-red text-sm">
                      {_comment.member.firstName} {_comment.member.lastName}
                    </p>
                  </div>
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
                <TextArea
                  placeholder="Post reply..."
                  handleInputChange={handleFormChange}
                  name="comment"
                  rows={4}
                  value={formData.comment}
                />
                <span className="absolute right-2 bottom-2 text-white text-2xl m-1 z-50">
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
