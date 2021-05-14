import * as yup from "yup";

const updatePasswordValidator = yup.object().shape({
  currentPassword: yup.string().required("Current password is required"),
  password: yup.string().required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords do not match")
    .required("Please reenter your password"),
});

export default updatePasswordValidator;
