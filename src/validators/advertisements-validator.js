import * as yup from "yup";

export let addAdvertisement = yup.object().shape({
  title: yup.string().required("Title is required"),
  price: yup.number().required("Price is required"),
  description: yup.string().required("Description is required"),
});
