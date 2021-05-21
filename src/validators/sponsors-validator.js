import * as yup from "yup";
import "yup-phone";

export let newSponsorAccount = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  emailAddress: yup
    .string()
    .email("Enter a valid email address")
    .required("Email address is required"),
  confirmEmail: yup
    .string()
    .oneOf([yup.ref("emailAddress"), null], "Email does not match")
    .required("Please reenter email address"),
  mobileNumber: yup
    .string()
    .matches(
      /^\+[1-9][0-9]{10}/gm,
      "Please use the international format eg: +971512345678"
    )
    .required("Mobile number is required"),
  company: yup.string().required("Company is required"),
});
