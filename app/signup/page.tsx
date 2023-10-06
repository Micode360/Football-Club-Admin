"use client";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Logo from "@/components/icons/logo";
import FormOverlay from "@/components/auth/overlay";
import TypedAnimatedText from "@/components/TypeAnimatedText";
import SignUpForm from "@/components/signup/signUpForm";


interface inputProperties  {
    firstname: string,
    lastname: string,
    email: string,
    password: string,
  }

export default function SignUp() {
  const [status, setStatus] = useState<string>("");

  const validationSchema = Yup.object().shape({
    firstname: Yup.string().required(),
    lastname: Yup.string().required(),
    email: Yup.string().required(),
    password: Yup.string().required(),
  });

  const onSubmit = (values: inputProperties) => {
    setStatus("pending");
    console.log(values, "values");
  };

  const formik = useFormik<inputProperties>({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values:inputProperties, { resetForm }) => {
      console.log(values, "in formik values");
      await onSubmit(values);
      resetForm();
    },
  });

  useEffect(() => {
    formik.setValues({
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="grid md:grid-cols-2  min-h-screen">
      <FormOverlay
        backgroundColor="bg-custom_orange"
        opacity="bg-opacity-80"
        style="col-start-2"
      />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 grid md:grid-cols-2 shadow-xl bg-white w-[80%] md:w-[60%]">
       <SignUpForm formik={formik} />
        <FormOverlay
          backgroundColor="bg-[#01041d]"
          opacity="bg-opacity-50"
          style="hidden"
          styleChild="flex flex-col items-center justify-center"
        >
          <Logo width={80} height={80} style="mb-2 w-[80] h-auto" />
          <TypedAnimatedText
            delay={1}
            List={[
              "Get started as an Administrator.",
              "Join The League.",
              "Just a few more words to go",
              "You got this.",
            ]}
          />
        </FormOverlay>
      </div>
    </main>
  );
}
