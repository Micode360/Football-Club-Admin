import { useState, useEffect } from "react";
import Form from "@/components/form";
import { useFormik } from "formik";
import { updatePasswordInputprops } from "../utils/formProps";
import SettingsButton from "../customForm/button";

type inputProperties = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export default function UpdatePassword() {
  const [status, setStatus] = useState<string>("");
  const [message, setMessage] = useState<any>({});

  const formValues = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const onSubmit = async (values: inputProperties) => {
    setMessage({});
    setStatus("pending");
    console.log(values, "submit");
  };

  const formik = useFormik<inputProperties>({
    initialValues: formValues,
    onSubmit: async (values: inputProperties, { resetForm }) => {
      await onSubmit(values);
      resetForm();
    },
  });

  useEffect(() => {
    formik.setValues(formValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="col-span-2">
      <Form
        style="!px-0 !py-0"
        formik={formik}
        status={status}
        message={message}
        inputs={updatePasswordInputprops}
        bottomCustomInput={<SettingsButton formik={formik} />}
      />
    </div>
  );
}
