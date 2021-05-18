import * as yup from "yup";

export let addAnnouncement = yup.object().shape({
  title: yup.string().required("Title is required"),
  details: yup.string().required("Details are required"),
});

export let editAnnouncement = yup.object().shape({
    title: yup.string().required("Title is required"),
    details: yup.string().required("Details are required"),
  });
  