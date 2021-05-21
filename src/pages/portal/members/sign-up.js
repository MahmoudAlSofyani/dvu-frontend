import { useStoreState } from "easy-peasy";
import React from "react";
import Layout from "../../../components/layout";
import Seo from "../../../components/seo";
import MembersSignUpPageAccountDetails from "./sign-up/account-details";
import MembersSignUpPageCarDetails from "./sign-up/car-details";
import MembersSignUpPagePersonalDetails from "./sign-up/personal-details";

const MembersSignUpPage = () => {
  const stepNumber = useStoreState(
    (state) => state.memberSignupForm.stepNumber
  );

  return (
    <Layout>
      <div className="container flex flex-col space-y-9 bg-darkGray p-5 rounded-lg mx-auto max-w-lg ">
        <Seo
          title={
            stepNumber === 1
              ? "Personal Details - Sign up"
              : stepNumber === 2
              ? "Car Details - Sign up"
              : stepNumber === 3
              ? "Account Details - Sign up"
              : "Sign up"
          }
        />
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
