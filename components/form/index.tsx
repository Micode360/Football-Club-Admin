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
  formik?: any;
  title?: string;
  subtitle?:string;
  link?:{
    path: string;
    text: string;
  };
  message?: any;
  status: string;
  inputs: Array<{}>;
  button: {
    type?: "button" | "submit" | "reset";
    text?: string;
  }
  children?: React.ReactNode;
}



export default function Form({
  formik,
  title,
  subtitle,
  link,
  message,
  status,
  inputs,
  button,
  children
}: FormProperties) {

  

  return (
    <ColumnLayout style="py-8 px-6">
      <Logo width={80} height={80} style="md:hidden mb-2 w-[80] h-auto" />
      <div className="text-center md:text-left w-full mb-4">
        {title && <h2 className="font-[700] text-2xl mb-1"> { title } </h2>}
        {
          subtitle &&
          <p className="text-xs text-gray-400">
            { subtitle }
        </p>
        }
      </div>
      {message.type === "error" && (
        <Response
          text={message.response}
          type={"inline"}
          style={
            message.type === "error"
              ? "bg-red-500 text-white"
              : "bg-green-500 text-white"
          }
          close={true}
        />
      )}
      <form className="w-full" onSubmit={formik.handleSubmit}>
        {inputs.map(({ name, type, label, placeholder }:any, id) => {
          return (
            <div key={id}>
              <Label label={name} text={label} />
              <Input
                type={type}
                name={name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values[`${name}`]}
                placeholder={placeholder}
              />
              <FormikErrorResponse formik={formik} name={name} />
            </div>
          );
        })}
        {
          link && 
          <div className="flex justify-end">
          <Link className="text-xs text-custom_blue" href={link.path}>
            { link.text }
          </Link>
        </div>
        }
        <div>
          <Button type={ button ? button.type: "submit"} style="bg-custom_blue">
            {status === "pending" ? (
              <div className="boxes_loader"></div>
            ) : (
              <>
                <span className="mr-2"> { button.text } </span>
                <LetterPlane />
              </>
            )}
          </Button>
        </div>
      </form>
     { children }
    </ColumnLayout>
  );
}
