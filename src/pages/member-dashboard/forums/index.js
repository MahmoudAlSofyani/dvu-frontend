import React, { useState, useEffect } from "react";
import MemberDashboardMenu from "../../../components/dashboard-menu/members";
import Layout from "../../../components/layout";
import EventCard from "../../../components/event-card";
import axios from "axios";
import moment from "moment";
import SearchBar from "../../../components/search-bar";
const MemberDashboard_Forums = () => {
  const [categories, setCategories] = useState([]);
  const [posts, setPosts] = useState([]);
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  useEffect(() => {
    try {
      Promise.all([axios.get("/categories"), axios.get("/posts")]).then(
        (_responses) => {
          if (_responses[0].status === 200) {
            setCategories(_responses[0].data);
          }
          if (_responses[1].status === 200) {
            setPosts(_responses[1].data);
          }
        }
      );
    } catch (err) {
      console.log(err);
    }
  }, [setCategories]);

  return (
    <Layout>
      <div className="container flex flex-col items-center space-y-6 bg-darkGray p-5 rounded-lg mx-auto max-w-md ">
        <h6 className="text-white uppercase font-bold tracking-widest text-xl">
          Forums
        </h6>
        <div className="w-full flex flex-col space-y-5">
          <SearchBar />
          <div className="flex flex-row space-x-3 overflow-x-auto">
            {categories.map((_category, index) =>
              index === activeCategoryIndex ? (
                <button
                  className="bg-red rounded-md px-4 py-1 text-white shadow-md outline-none"
                  key={index}
                  onClick={() => setActiveCategoryIndex(index)}
                >
                  {_category.name}
                </button>
              ) : (
                <button
                  className="bg-charcoal rounded-md px-4 py-1 text-white shadow-md outline-none"
                  key={index}
                  onClick={() => setActiveCategoryIndex(index)}
                >
                  {_category.name}
                </button>
              )
            )}
          </div>
          {posts.map((_post, index) => (
            <div
              key={index}
              className="bg-charcoal rounded-md p-4 flex flex-row justify-between shadow-md "
            >
              <div className="w-full">
                <p className="text-white">{_post.title}</p>
                <p className="text-red text-sm">
                  {_post.member.firstName} {_post.member.lastName}
                </p>
              </div>
              <div className="w-1/6 flex flex-col self-center bg-red rounded-md shadow-md">
                <p className="text-white text-center">
                  {_post.comments.length}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="p-10 ">
        <MemberDashboardMenu />
      </div>
    </Layout>
  );
};

export default MemberDashboard_Forums;
