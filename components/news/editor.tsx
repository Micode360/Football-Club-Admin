import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Label from "../form/label";

export default function Editor({ formik }: any) {
  const handleEditorReady = (editor: any) => {
    editor.name = "content";
  };

  const handleEditorChange = (event: any, editor: any) => {
    const data = editor.getData();
    formik.setFieldValue("content", data);
  };

  const customConfig: any = {
    mediaEmbed: {
      previewsInData: true,
    },
    ckfinder: {
      uploadUrl: `/api/upload`,
      onAfterFileUpload: (file:any, response:any) => {
        console.log('Uploaded file:', file);
        console.log('Cloudinary response:', response);
    },
    },
  };

  return (
    <>
      <Label label={"content"} text={"Content"}/>
      <CKEditor
        editor={ClassicEditor}
        config={customConfig}
        onReady={handleEditorReady}
        onChange={handleEditorChange}
      />
    </>
  );
}
