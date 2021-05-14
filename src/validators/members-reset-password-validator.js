import * as yup from "yup";

const resetPasswordValidator = yup.object().shape({
  emailAddress: yup
    .string()
    .email("Enter a valid email address")
    .required("Email is required"),
});

export default resetPasswordValidator;
