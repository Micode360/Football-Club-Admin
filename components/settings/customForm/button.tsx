interface settingsButtonProperties {
  formik?: any;
}

export default function SettingsButton({ formik }: settingsButtonProperties) {
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
        Save
      </button>
    </div>
  );
}
