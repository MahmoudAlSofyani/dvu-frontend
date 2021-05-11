import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import { Editor } from "react-draft-wysiwyg";
// import { EditorState } from "draft-js";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const CustomEditor = ({ handleOnChange, value }) => {
  // const [editorState, setEditorState] = useState(EditorState.createEmpty());
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
    <CKEditor editor={ClassicEditor} onChange={handleOnChange} data={value} />
  );

  // const handleEditorChange = (editorState) => {
  //   setEditorState({
  //     editorState,
  //   });
  // };

  // return (
  //   <Editor
  //     editorState={editorState}
  //     wrapperClassName="bg-charcoal"
  //     editorClassName="bg-charcoal"
  //     toolbarClassName="text-red"
  //     // onEditorStateChange={handleEditorChange}
  //     toolbar={{
  //       options: ["inline", "textAlign", "list", "link"],
  //       inline: { inDropdown: true },
  //       list: { inDropdown: true },
  //       textAlign: { inDropdown: true },
  //       link: { inDropdown: true },
  //     }}
  //   />
  // );
};

export default CustomEditor;
