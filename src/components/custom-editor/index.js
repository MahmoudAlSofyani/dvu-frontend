import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const CustomEditor = ({ handleOnChange }) => {
  const editorConfig = {
    toolbar: {
      items: [
        "bold",
        "italic",
        "bulletedList",
        "numberedList",
        "indent",
        "outdent",
      ],
    },
  };

  ClassicEditor.defaultConfig = editorConfig;

  return <CKEditor editor={ClassicEditor} onChange={handleOnChange} />;
};

export default CustomEditor;
