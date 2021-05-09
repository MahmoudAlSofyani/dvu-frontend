import React, { useState, useEffect } from "react";
import Layout from "../../../components/layout";
import { Link } from "react-router-dom";
import CustomButton from "../../../components/custom-button";
import InputField from "../../../components/input-field";
import { useStoreState, useStoreActions } from "easy-peasy";
import axios from "axios";
import { useHistory } from "react-router-dom";

const MembersLoginPage = () => {
  const [errorMessages, setErrorMessage] = useState("");

  const formData = useStoreState((state) => state.memberLoginForm.formData);
  const setFormData = useStoreActions(
    (actions) => actions.memberLoginForm.setFormData
  );

  const setCurrentUser = useStoreActions(
    (actions) => actions.currentUser.setCurrentUser
  );
  const history = useHistory();

  const handleFormChange = (e) => setFormData(e.target);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const _response = await axios.post("/auth/login", formData);

      if (_response.status === 200) {
        const { _token, _member } = _response.data;

        if (!_member.roles.some((_role) => _role.name === "ACTIVE")) {
          setErrorMessage(
            "Your account has not been activated or you have been purged"
          );
          return;
        } else {
          localStorage.setItem("token", _token);
          setCurrentUser(_member);
          history.push("/members/dashboard");
        }
      }
    } catch (err) {
      setErrorMessage(err.response.data.err);
    }
  };

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        axios.get("/auth/verify-token").then((_response) => {
          if (_response.status === 200) {
            setCurrentUser(_response.data._member);
            history.push("/members/dashboard");
          }
        });
      }
    } catch (err) {
      console.log(err);
    }
  }, [setCurrentUser]);

  return (
    <Layout>
      <div className="container flex flex-col items-center space-y-6 bg-darkGray p-5 w-4/5 rounded-lg mx-auto max-w-md ">
        <h6 className="text-white uppercase font-bold tracking-widest text-xl">
          Members Login
        </h6>
        <form className="space-y-10">
          <InputField
            placeholder="Email"
            type="email"
            name="emailAddress"
            handleInputChange={(e) => handleFormChange(e)}
            style={2}
          />
          <InputField
            placeholder="Password"
            name="password"
            handleInputChange={(e) => handleFormChange(e)}
            type="password"
            style={2}
          />
          <CustomButton
            extraClasses="mt-10"
            label="Login"
            link="/members/dashboard"
            handleOnClick={handleSubmit}
          />
          {errorMessages ? (
            <p className="text-center text-sm text-red font-bold">
              ERROR !{" "}
              <span className="font-normal text-white">{errorMessages}</span>
            </p>
          ) : null}
          <p className="text-white">
            Forgot your password? Click{" "}
            <Link className="hover:underline" to="/reset-password">
              here
            </Link>
          </p>
          <p className="text-white">
            Not a member yet?{" "}
            <Link className="hover:underline" to="/members/sign-up">
              Click here
            </Link>
          </p>
        </form>
      </div>
    </Layout>
  );
};

export default MembersLoginPage;
