interface settingsButtonProperties {
  formik?: any;
  status: string;
}

export default function SettingsButton({ formik, status }: settingsButtonProperties) {
  const handleDiscard = () => formik.resetForm();
  const handleSave = () => formik.handleSubmit();

  return (
    <div className="flex items-center my-2">
      <button
        type="button"
        onClick={handleDiscard}
        className="text-black text-xs shadow-md py-2 px-4 rounded border mr-2 border-custom_blue cursor-pointer"
      >
        Discard
      </button>
      <button
        type="button"
        onClick={handleSave}
        className="bg-custom_blue text-white text-xs shadow-md border border-custom_blue py-2 px-4 rounded cursor-pointer"
      >
        
        { status === "pending"?
          <div className="boxes_loader mx-2 !h-[16px] scale-[0.7] !left-[-28px]"></div>
          :status === "success"?
          "Save"
          :"Save"
        }
      </button>
    </div>
  );
}
