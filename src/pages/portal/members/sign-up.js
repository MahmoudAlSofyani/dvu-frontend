import { useStoreActions, useStoreState } from "easy-peasy";
import React, { useState } from "react";
import CustomButton from "../../../components/custom-button";
import InputField from "../../../components/input-field";
import Layout from "../../../components/layout";
import MembersSignUpPage_AccountDetails from "./sign-up/account-details";
import MembersSignUpPage_CarDetails from "./sign-up/car-details";
import MembersSignUpPage_PersonalDetails from "./sign-up/personal-details";

const MembersSignUpPage = () => {
  const stepNumber = useStoreState(
    (state) => state.memberSignupForm.stepNumber
  );

  return (
    <Layout>
      <div className="container flex flex-col space-y-9 bg-darkGray p-5 w-4/5 rounded-lg mx-auto max-w-md ">
        <h6 className="text-white text-center uppercase tracking-widest">
          Register
        </h6>
        {stepNumber === 1 ? (
          <MembersSignUpPage_PersonalDetails />
        ) : stepNumber === 2 ? (
          <MembersSignUpPage_CarDetails />
        ) : stepNumber === 3 ? (
          <MembersSignUpPage_AccountDetails />
        ) : null}
      </div>
    </Layout>
  );
};

export default MembersSignUpPage;
