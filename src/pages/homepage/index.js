import React from "react";
import CustomButton from "../../components/custom-button";
import Layout from "../../components/layout";

const HomePage = () => {
  return (
    <div className="bgImage">
      <Layout>
        <div className=" space-y-5 text-center text-white w-4/5 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <h1 className="font-bold text-2xl uppercase">We are the #Circle</h1>
          <h2 className="leading-8 text-lg">
            The biggest Volkswagen enthusiast club in the UAE
          </h2>
          <div>
            <CustomButton label="About us" link="/about-us" />
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default HomePage;
