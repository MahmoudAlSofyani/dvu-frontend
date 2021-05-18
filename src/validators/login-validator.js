import * as yup from "yup";

const loginValidator = yup.object().shape({
  password: yup.string().required("Password is required"),
  emailAddress: yup
    .string()
    .email("Enter a valid email address")
    .required("Email is required"),
});

export default loginValidator;
