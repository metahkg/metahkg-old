import React from 'react';
import { Editor } from "@tinymce/tinymce-react";
export default function TextEditor(props: any) {
  return (
    <Editor
      onEditorChange={props.changehandler}
      initialValue={props.text}
      init={{
        height: 300,
        menubar: true,
        skin: "oxide-dark",
        content_css: "dark",
        mobile: {
          menubar: true,
        },
        plugins: [
          "advlist autolink lists link image charmap print preview anchor textcolor",
          "searchreplace visualblocks code fullscreen",
          "insertdatetime media table paste code help wordcount",
        ],
        toolbar: `undo redo | formatselect | bold italic forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help`,
      }}
      tinymceScriptSrc="https://cdnjs.cloudflare.com/ajax/libs/tinymce/5.10.2/tinymce.min.js"
    />
  );
}
