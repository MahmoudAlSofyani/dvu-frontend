import * as yup from "yup";

export let addComment = yup.object().shape({
  comment: yup.string().required("Comment is required"),
});
