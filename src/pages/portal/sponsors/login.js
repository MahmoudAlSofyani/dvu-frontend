import React from "react";
import Layout from "../../../components/layout";
import { Link } from "react-router-dom";
import CustomButton from "../../../components/custom-button";
import InputField from "../../../components/input-field";
const SponsorsLoginPage = () => {
  return (
    <Layout>
      <div className="container flex flex-col items-center space-y-6 bg-darkGray p-5 w-4/5 rounded-lg mx-auto max-w-md ">
        <h6 className="text-white uppercase font-bold tracking-widest text-xl">
          Sponsors Login
        </h6>
        <form className="space-y-10">
          <InputField placeholder="Email" />
          <InputField placeholder="Password" />
          <CustomButton extraClasses="mt-10" label="Login" link="/sponsors/dashboard" />
          <p className="text-white">
            Forgot your password? Click{" "}
            <Link className="hover:underline" to="/reset-password">
              here
            </Link>
          </p>
        </form>
      </div>
    </Layout>
  );
};

export default SponsorsLoginPage;
