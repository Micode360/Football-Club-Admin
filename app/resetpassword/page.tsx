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
import { FORGOT_PASSWORD } from "@/graphQL/mutations";
import Form from "@/components/form";
import {
  resetPasswordInputs,
  resetPasswordAnimTextArray,
} from "@/utils/constantdatas";

type otpProperty = {
  email: string;
};

export default function ResetPassword() {
  const router = useRouter();
  const [forgotPassword] = useMutation(FORGOT_PASSWORD);
  const [status, setStatus] = useState<string>("");
  const [message, setMessage] = useState<any>({});

  const formValues = {
    email: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().required(),
  });

  const onSubmit = async (values: otpProperty) => {
    setMessage({});
    setStatus("pending");
    const { email } = values;

    try {
      const { data } = await forgotPassword({
        variables: {
          input: {
            email,
          },
        },
      });

      if (data.ForgotPassword.status === 200) {
        setStatus("");
        setMessage({ type: "success", response: data.ForgotPassword.message });
        router.push(
          `/verifyuser/confirm/${encodeURIComponent(
            data.ForgotPassword.value,
          )}`,
        );
      } else {
        setStatus("");
        setMessage({ type: "error", response: data.ForgotPassword.message });
      }
    } catch (error: any) {
      setMessage({ type: "error", message: "Internal Server Error" });
    }
  };
  const formik = useFormik<otpProperty>({
    initialValues: formValues,
    validationSchema: validationSchema,
    onSubmit: async (values: otpProperty, { resetForm }) => {
      await onSubmit(values);
      resetForm();
    },
  });

  useEffect(() => {
    formik.setValues(formValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="grid md:grid-cols-2 min-h-screen">
      <FormOverlay
        backgroundColor="bg-custom_green"
        opacity="bg-opacity-80"
        style="col-start-2"
      />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 grid md:grid-cols-2 shadow-xl bg-white w-[80%] md:w-[60%]">
        <Form
          formik={formik}
          logo={true}
          title="Reset your password."
          subtitle="Check your email to confirm your password."
          status={status}
          message={message}
          inputs={resetPasswordInputs}
          button={{
            type: "submit",
            text: "Send OTP",
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
          <TypedAnimatedText delay={1} List={resetPasswordAnimTextArray} />
        </FormOverlay>
      </div>
    </main>
  );
}
