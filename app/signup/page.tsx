"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import Link from "next/link";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import Logo from "@/components/icons/logo";
import FormOverlay from "@/components/auth/overlay";
import TypedAnimatedText from "@/components/TypeAnimatedText";
import { REGISTER_MUTATION } from "@/graphQL/mutations";
import { signUpInputprops, signUpAnimTextArray } from "@/utils/constantdatas";
import Form from "@/components/form";

type inputProperties = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export default function SignUp() {
  const router = useRouter();
  const [register] = useMutation(REGISTER_MUTATION);
  const [status, setStatus] = useState<string>("");
  const [message, setMessage] = useState<any>({});
  const formVakues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .matches(/^[a-zA-Z0-9]+$/, "Only alphanumeric characters are allowed.")
      .required(),
    lastName: Yup.string()
      .matches(/^[a-zA-Z0-9]+$/, "Only alphanumeric characters are allowed.")
      .required(),
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
    const { firstName, lastName, email, password } = values;
    try {
      const { data } = await register({
        variables: {
          input: {
            firstName,
            lastName,
            email,
            password,
          },
        },
      });

      if (data.Register.status === 200) {
        setMessage({ type: "success", response: data.Register.message });
        router.push("/signin");
      } else {
        setStatus("");
        setMessage({ type: "error", response: data.Register.message });
      }
    } catch (error: any) {
      setMessage({ type: "error", message: "Internal Server Error" });
    }
  };

  const formik = useFormik<inputProperties>({
    initialValues: formVakues,
    validationSchema: validationSchema,
    onSubmit: async (values: inputProperties, { resetForm }) => {
      await onSubmit(values);
      resetForm();
    },
  });

  useEffect(() => {
    formik.setValues(formVakues);
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
        <Form
          formik={formik}
          logo={true}
          title="Welcome! Let's Get You Started."
          subtitle="Register to become an Administrator."
          status={status}
          message={message}
          inputs={signUpInputprops}
          button={{
            type: "submit",
            text: "Submit",
          }}
        >
          <div className="mt-1">
            Already have an account,{" "}
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
          <TypedAnimatedText delay={1} List={signUpAnimTextArray} />
        </FormOverlay>
      </div>
    </main>
  );
}
