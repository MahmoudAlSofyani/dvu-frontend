import { useStoreState } from "easy-peasy";
import React from "react";
import Layout from "../../../components/layout";
import SectionHeader from "../../../components/section-header";
import MembersSignUpPageAccountDetails from "./sign-up/account-details";
import MembersSignUpPageCarDetails from "./sign-up/car-details";
import MembersSignUpPagePersonalDetails from "./sign-up/personal-details";

const MembersSignUpPage = () => {
  const stepNumber = useStoreState(
    (state) => state.memberSignupForm.stepNumber
  );

  return (
    <Layout>
      <div className="container flex flex-col space-y-9 bg-darkGray p-5 w-4/5 rounded-lg mx-auto max-w-md ">
        <SectionHeader heading="Register" />
        {stepNumber === 1 ? (
          <MembersSignUpPagePersonalDetails />
        ) : stepNumber === 2 ? (
          <MembersSignUpPageCarDetails />
        ) : stepNumber === 3 ? (
          <MembersSignUpPageAccountDetails />
        ) : null}
      </div>
    </Layout>
  );
};

export default MembersSignUpPage;
