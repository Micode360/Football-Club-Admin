import { useState, useEffect, useContext } from "react";
import Form from "@/components/form";
import { useFormik } from "formik";
import { updatePasswordInputprops } from "../utils/formProps";
import SettingsButton from "../customForm/button";
import { useMutation } from "@apollo/client";
import { UPDATE_PASSWORD } from "@/graphQL/mutations";
import { MyContext } from "@/components/layout/userContext";
import NotiticationResponse from "@/components/Response/notiticationResponse";

type inputProperties = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

interface responseProps {
  status: boolean | string;
  message: string;
  color: string;
}

export default function UpdatePassword() {
  const [status, setStatus] = useState<string>("");
  const [message, setMessage] = useState<any>({});
  const [updatePassword] = useMutation(UPDATE_PASSWORD);
  const {
    myData: { profile },
  } = useContext(MyContext);
  const [response, setResponse] = useState<responseProps>({
    status: false,
    message: "",
    color: "",
  });

  const formValues = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const onSubmit = async (values: inputProperties) => {
    setMessage({});
    setStatus("pending");
    const { currentPassword, newPassword, confirmPassword } = values;
    if (newPassword !== confirmPassword) {
      setStatus("");
      return setResponse({
        status: true,
        message: "New passwords don't match",
        color: "red",
      });
    }

    try {
      const { data } = await updatePassword({
        variables: {
          input: {
            id: profile.id,
            password: newPassword,
            currentPassword,
          },
        },
      });

      if (data.UpdatePassword.status === 200) {
        setStatus("");
        setResponse({
          status: true,
          message: "Password updated.",
          color: "green",
        });
      } else {
        setStatus("");
        setResponse({
          status: true,
          message: data.UpdatePassword.message,
          color: "red",
        });
      }
    } catch (error: any) {
      setMessage({ type: "error", message: "Internal Server Error" });
    }
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
        bottomCustomInput={<SettingsButton formik={formik} status={status} />}
      />
      <NotiticationResponse isOpen={response} setIsOpen={setResponse} />
    </div>
  );
}
