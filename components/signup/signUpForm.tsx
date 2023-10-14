"use client";
import Link from "next/link";
import Input from "@/components/form/input";
import Label from "@/components/form/label";
import Button from "@/components/form/button";
import Logo from "@/components/icons/logo";
import LetterPlane from "@/components/icons/letterPlane";
import ColumnLayout from "@/components/layout/ColumnLayout";
import FormikErrorResponse from "@/components/form/errorResponseformik";
import Response from "../Response";

interface FormProperties {
  formik: any;
  message?: any;
  status: string;
}

export default function SignUpForm({ formik, message, status }: FormProperties) {
  return (
    <ColumnLayout style="py-8 px-6">
      <Logo width={80} height={80} style="md:hidden mb-2 w-[80] h-auto" />
      <div className="text-center md:text-left w-full mb-4">
        <h2 className="font-[700] text-2xl mb-1">
          Welcome! Let&apos;s Get You Started.
        </h2>
        <p className="text-xs text-gray-400">
          Register to become an Administrator.
        </p>
      </div>
      {message.type === "error" && (
        <Response text={message.response} type={"inline"} style={message.type === "error"?"bg-red-500 text-white":"bg-green-500 text-white"} close={true} />
      )}
      <form className="w-full" onSubmit={formik.handleSubmit}>
        <div>
          <Label label="firstName" text="First Name" />
          <Input
            type="text"
            name="firstName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.firstName}
            placeholder="First Name"
          />
          <FormikErrorResponse formik={formik} name={"firstName"} />
        </div>
        <div>
          <Label label="lastName" text="Last Name" />
          <Input
            type="text"
            name="lastName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.lastName}
            placeholder="Last Name"
          />
          <FormikErrorResponse formik={formik} name={"lastName"} />
        </div>
        <div>
          <Label label="email" text="Email" />
          <Input
            type="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            placeholder="Email"
          />
          <FormikErrorResponse formik={formik} name={"email"} />
        </div>
        <div>
          <Label label="password" text="Password" />
          <Input
            type="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            placeholder="password"
          />
          <FormikErrorResponse formik={formik} name={"password"} />
        </div>
        <div>
          <Button type="submit" style="bg-custom_blue">
            {status === "pending" ? (
              <div className="boxes_loader"></div>
            ) : (
              <>
                <span className="mr-2">Submit</span>
                <LetterPlane />
              </>
            )}
          </Button>
        </div>
      </form>
      <div className="mt-1">
        Already have an account,{" "}
        <Link className="text-custom_blue" href="/signin">
          Sign in
        </Link>
      </div>
    </ColumnLayout>
  );
}
