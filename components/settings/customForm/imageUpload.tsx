import React from "react";

interface imgUploadProperties {
  formik?: any;
}

export default function ImageUpload({ formik }: imgUploadProperties) {
  const fileUpload: any = (event: any) => {
    const selectedFile = event.currentTarget.files[0];

    if (selectedFile) {
      const objectUrl = URL.createObjectURL(selectedFile);
      formik.setFieldValue("profilePic", selectedFile);
    }
  };

  return (
    <div className="flex items-center mb-2">
      <img
        src={
          formik.values.profilePic
            ? URL.createObjectURL(formik.values.profilePic)
            : "/234567891.svg"
        }
        className="rounded-md object-cover object-center w-20 h-20"
        alt="profile photo"
      />
      <div className="flex flex-col ml-4">
        <label className="bg-custom_blue text-white text-xs shadow-md py-2 px-4 rounded cursor-pointer">
          Change Avatar
          <input
            type="file"
            accept="image/*"
            name="attachment"
            onChange={fileUpload}
            className="hidden"
          />
        </label>
        <span className="text-xs text-gray-600 mt-2">JPG, GIF, JPG</span>
      </div>
    </div>
  );
}
