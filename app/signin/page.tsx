"use client";
import Link from "next/link";
import * as Yup from "yup";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { useMutation } from "@apollo/client";
import Logo from "@/components/icons/logo";
import FormOverlay from "@/components/auth/overlay";
import TypedAnimatedText from "@/components/TypeAnimatedText";
import { LOGIN_MUTATION } from "@/graphQL/mutations";
import { storeToken } from "@/utils/utilsFunctions";
import Form from "@/components/form";
import {
  signInInputprops,
  signInLink,
  signInAnimTextArray,
} from "@/utils/constantdatas";

type inputProperties = {
  email: string;
  password: string;
};

export default function SignIn() {
  const [login] = useMutation(LOGIN_MUTATION);
  const [status, setStatus] = useState<string>("");
  const [message, setMessage] = useState<any>({});
  const formValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().required(),
    password: Yup.string()
      .matches(
        /^[a-zA-Z0-9!#$%^&*()]+$/,
        "Only letters, numbers and some specific punctuations allowed.",
      )
      .required(),
  });

  const onSubmit = async (values: inputProperties) => {
    setMessage({});
    setStatus("pending");
    const { email, password } = values;
    const { data } = await login({
      variables: {
        input: {
          email,
          password,
        },
      },
    });
    if (data.Login.status === 200) {
      const { accessToken } = data.Login;
      storeToken("asstkn", accessToken, 604800);
      window.location.href = "/";
    } else {
      setStatus("");
      setMessage({ type: "error", response: "Incorrect email or password." });
    }
  };

  const formik = useFormik<inputProperties>({
    initialValues: formValues,
    validationSchema: validationSchema,
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
    <main className="grid md:grid-cols-2  min-h-screen">
      <FormOverlay
        backgroundColor="bg-custom_blue"
        opacity="bg-opacity-80"
        style="col-start-2"
      />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 grid md:grid-cols-2 shadow-xl bg-white w-[80%] md:w-[60%]">
        <Form
          formik={formik}
          logo={true}
          title="Welcome! Let's Get You Signed In."
          subtitle="Log in to your Administrator account."
          status={status}
          message={message}
          inputs={signInInputprops}
          link={signInLink}
          button={{
            type: "submit",
            text: "Submit",
          }}
        >
          <div className="mt-1">
            Don&apos;t have an account,{" "}
            <Link className="text-custom_blue" href="/signup">
              Sign Up
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
          <TypedAnimatedText delay={1} List={signInAnimTextArray} />
        </FormOverlay>
      </div>
    </main>
  );
}
