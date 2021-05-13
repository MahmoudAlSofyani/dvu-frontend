import * as yup from "yup";

export let addEvent = yup.object().shape({
  name: yup.string().required("Name is required"),
  date: yup.string().required("Date is required"),
  meetingPoint: yup.string().required("Meeting point is required"),
  meetingTime: yup.string().required("Meeting time is required"),
  details: yup.string().required("Details is required")
});
