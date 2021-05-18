import { useStoreState } from "easy-peasy";
import React from "react";
import Layout from "../../../src/components/layout";
import MembersSignUpPageAccountDetails from "../../../src/components/sign-up/account-details";
import MembersSignUpPageCarDetails from "../../../src/components/sign-up/car-details";
import MembersSignUpPagePersonalDetails from "../../../src/components/sign-up/personal-details";

const MembersSignUpPage = () => {
  const stepNumber = useStoreState(
    (state) => state.memberSignupForm.stepNumber
  );

  return (
    <Layout>
      <div className="container flex flex-col space-y-9 bg-darkGray p-5 rounded-lg mx-auto max-w-lg ">
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
