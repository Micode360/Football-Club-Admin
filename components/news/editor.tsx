import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Label from "../form/label";

export default function Editor({ formik }: any) {
  const [response, setResponse ] = useState<any>({});
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
      onAfterFileUpload: (file: any, response: any) => {
        const uploadedPublicId = response.public_id;
        setResponse(uploadedPublicId);
      },
    },
  };

  const editorStyle = {
    height: '300px',  // Set the desired height
  };


  return (
    <>
      <Label label={"content"} text={"Content"} />
      <CKEditor
        editor={ClassicEditor}
        config={customConfig}
        onReady={handleEditorReady}
        onChange={handleEditorChange}
        data={(formik?.values?.content) || ""}
      />
    </>
  );
}
