import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";



const CustomEditor = ({ handleOnChange, value, placeholder }) => {
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

  return (
    <CKEditor
      editor={ClassicEditor}
      onChange={handleOnChange}
      data={value}
      config={{ placeholder }}
    />
  );

};

export default CustomEditor;
