"use client";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from '@apollo/client';
import Logo from "@/components/icons/logo";
import FormOverlay from "@/components/auth/overlay";
import TypedAnimatedText from "@/components/TypeAnimatedText";
import SignInForm from "@/components/signin";
import { LOGIN_MUTATION } from "@/graphQL/mutations";
import { storeToken } from "@/utils/utilsFunctions";

type inputProperties =  {
    email: string,
    password: string,
}

export default function SignIn() {
  const [login] = useMutation(LOGIN_MUTATION);
  const [status, setStatus] = useState<string>("");
  const [message, setMessage] = useState<any>({});

  const validationSchema = Yup.object().shape({
    email: Yup.string().required(),
    password: Yup.string()
    .matches(/^[a-zA-Z0-9!#$%^&*()]+$/, 'Only letters, numbers and some specific punctuations allowed.')
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
          password
        }
      },
    });
    if(data.Login.status === 200) {
      console.log(data, "data")
      const { accessToken } = data.Login;
      storeToken("asstkn", accessToken, 604800);
      window.location.href = "/";
    }else {
      setStatus("");
      setMessage({type:"error", response:"Incorrect email or password."})
    }
  };

  const formik = useFormik<inputProperties>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values:inputProperties, { resetForm }) => {
      await onSubmit(values);
      resetForm();
    },
  });

  useEffect(() => {
    formik.setValues({
      email: "",
      password: "",
    });
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
       <SignInForm formik={formik} status={status} message={message} />
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
              "Hi good to see you.",
              "Log into your account.",
              "Come on, let's get this show on the road",
              "You got this.",
            ]}
          />
        </FormOverlay>
      </div>
    </main>
  );
}
