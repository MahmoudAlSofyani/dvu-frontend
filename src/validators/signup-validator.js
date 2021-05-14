import * as yup from "yup";
import "yup-phone";

export let personalDetails = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  emailAddress: yup
    .string()
    .email("Enter a valid email address")
    .required("Email address is required"),
  confirmEmail: yup
    .string()
    .oneOf([yup.ref("emailAddress"), null], "Email does not match")
    .required("Please reenter your email address"),
  mobileNumber: yup
    .string()
    .matches(
      /^\+[1-9][0-9]{10}/gm,
      "Please use the international format eg: +971512345678"
    )
    .required("Mobile number is required"),
  whatsAppNumber: yup
    .string()
    .matches(
      /^\+[1-9][0-9]{10}/gm,
      "Please use the international format eg: +971512345678"
    )
    .optional(),
  instagramName: yup.string().optional(),
});

export let carDetails = yup.object().shape({
  carModel: yup.string().required("Car model is required"),
  carColor: yup.string().required("Car color is required"),
  carYear: yup.string().required("Car year is required"),
  plateEmirate: yup.string().required("Plate emirate is required"),
  plateCode: yup.string().required("Plate code is required"),
  plateNumber: yup
    .string()
    .matches(/^[1-9][0-9]{0,5}$/, "Plate number is invalid")
    .required("Plate number is required"),
  vinNumber: yup
    .string()
    .matches(/^WVW[a-zA-z0-9]{13,14}/gm, "Please enter a valid vin number")
    .required("VIN number is required"),
});

export let accountDetails = yup.object().shape({
  password: yup
    .string()
    .min(8, "Password is too short")
    .max(20, "Password is too long")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords do not match")
    .required("Please re enter your password"),
});
