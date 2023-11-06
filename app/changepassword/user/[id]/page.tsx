"use client";
import Link from "next/link";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { useMutation } from "@apollo/client";
import Logo from "@/components/icons/logo";
import FormOverlay from "@/components/auth/overlay";
import TypedAnimatedText from "@/components/TypeAnimatedText";
import { CHANGE_PASSWORD } from "@/graphQL/mutations";
import Form from "@/components/form";
import {
  changePassordInputs,
  changePassordAnimTextArray,
} from "@/utils/constantdatas";

interface changePassordProps {
  params: { id: string };
}

type changePasswordProperty = {
  password: string;
  confirmPassword: string;
};

export default function ChangePassword({ params }: changePassordProps) {
  const router = useRouter();
  const [changePassword] = useMutation(CHANGE_PASSWORD);
  const [status, setStatus] = useState<string>("");
  const [message, setMessage] = useState<any>({});

  const formValues = {
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .matches(
        /^[a-zA-Z0-9!#$%^&*()]+$/,
        "Only letters, numbers and some specific punctuations allowed."
      )
      .required(),
    confirmPassword: Yup.string()
      .matches(
        /^[a-zA-Z0-9!#$%^&*()]+$/,
        "Only letters, numbers and some specific punctuations allowed."
      )
      .required(),
  });

  const onSubmit = async (values: changePasswordProperty) => {
    setMessage({});
    setStatus("pending");
    const { password, confirmPassword } = values;
    if (password !== confirmPassword) {
      setStatus("");
      setMessage({ type: "error", response: "Passwords do not match" });
      return;
    }

    try {
      const { data } = await changePassword({
        variables: {
          input: {
            id: params.id,
            password,
          },
        },
      });

      if (data.ChangePassword.status === 200) {
        setStatus("");
        setMessage({ type: "success", response: data.ChangePassword.message });
        router.push("/signin");
      } else {
        setStatus("");
        setMessage({ type: "error", response: data.ChangePassword.message });
      }
    } catch (error: any) {
      setMessage({ type: "error", message: "Internal Server Error" });
    }
  };

  const formik = useFormik<changePasswordProperty>({
    initialValues: formValues,
    validationSchema: validationSchema,
    onSubmit: async (values: changePasswordProperty, { resetForm }) => {
      await onSubmit(values);
      resetForm();
    },
  });

  useEffect(() => {
    formik.setValues(formValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="grid md:grid-cols-2  min-h-screen">
      <FormOverlay
        backgroundColor="bg-custom_green"
        opacity="bg-opacity-80"
        style="col-start-2"
      />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 grid md:grid-cols-2 shadow-xl bg-white w-[80%] md:w-[60%]">
        <Form
          formik={formik}
          title="New Password."
          subtitle="Fill in your new password."
          status={status}
          message={message}
          inputs={changePassordInputs}
          button={{
            type: "submit",
            text: "Submit",
          }}
        >
          <div className="mt-1">
            Remember your password?{" "}
            <Link className="text-custom_blue" href="/signin">
              Sign in
            </Link>
          </div>
        </Form>
        <FormOverlay
          backgroundColor="bg-[#01041d]"
          opacity="bg-opacity-50"
          style="hidden"
          styleChild="flex flex-col items-center justify-center"
        >
          <Logo width={80} height={80} style="mb-2 w-[80] h-auto" />
          <TypedAnimatedText delay={1} List={changePassordAnimTextArray} />
        </FormOverlay>
      </div>
    </main>
  );
}
