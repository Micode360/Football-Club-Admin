"use client";
import Link from "next/link";
import Input from "@/components/form/input";
import Label from "@/components/form/label";
import Button from "@/components/form/button";
import Logo from "@/components/icons/logo";
import LetterPlane from "@/components/icons/letterPlane";
import ColumnLayout from "@/components/layout/ColumnLayout";
import FormikErrorResponse from "@/components/form/errorResponseformik";
import Response from "../Response/errorResponse";
import SelectInput from "./selectInput";
import SelectCheckboxtInput from "./selectCheckBoxInput";

interface FormProperties {
  formik?: any;
  arr?: any;
  logo?: boolean;
  title?: string;
  subtitle?: string;
  link?: {
    path: string;
    text: string;
  };
  message?: any;
  status: string;
  inputs: Array<{}>;
  button?: {
    type?: "button" | "submit" | "reset";
    text?: string;
  };
  style?: string;
  inputStyle?: string;
  topCustomInput?: React.ReactNode;
  bottomCustomInput?: React.ReactNode;
  children?: React.ReactNode;
}

export default function Form({
  formik,
  arr,
  logo,
  title,
  subtitle,
  link,
  message,
  status,
  inputs,
  button,
  style,
  inputStyle,
  topCustomInput,
  bottomCustomInput,
  children,
}: FormProperties) {
  return (
    <ColumnLayout style={`py-8 px-6 ${style}`}>
      {logo && (
        <Logo width={80} height={80} style="md:hidden mb-2 w-[80] h-auto" />
      )}
      <div className="text-center md:text-left w-full mb-4">
        {title && <h2 className="font-[700] text-2xl mb-1"> {title} </h2>}
        {subtitle && <p className="text-xs text-gray-400">{subtitle}</p>}
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
        {topCustomInput}
        {inputs.map(
          (
            { name, type, label, inputs, placeholder, notImportant }: any,
            id
          ) => {
            return (
              <div key={id}>
                {type === "grid" ? (
                  <div className={`grid md:grid-cols-${inputs.length} gap-4`}>
                    {inputs.map(
                      ({
                        name,
                        type,
                        label,
                        options,
                        placeholder,
                        customizedInput,
                        notImportant,
                      }: any) => (
                        <div key={name}>
                          {type === "select" ? (
                            <>
                              <Label
                                label={name}
                                text={label}
                                notImportant={notImportant}
                              />
                              <select
                                name={name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values[`${name}`]}
                                placeholder={placeholder}
                                className={`w-full px-4 py-4 rounded-md bg-gray-100 border border-gray-200 placeholder-gray-500 text-xs focus:outline-none focus:border-gray-400 focus:bg-white mb-2`}
                              >
                                {options.map((option: any, index: number) => (
                                  <option key={index} value={option.value}>
                                    {option.label}
                                  </option>
                                ))}
                              </select>
                              <FormikErrorResponse
                                formik={formik}
                                name={name}
                              />
                            </>
                          ) : type === "selectCheckbox" ? (
                            <>
                              <Label
                                label={name}
                                text={label}
                                notImportant={notImportant}
                              />
                              <SelectCheckboxtInput
                                name={name}
                                placeholder={placeholder}
                                options={options}
                                formik={formik}
                                onBlur={formik.handleBlur}
                              />
                              <FormikErrorResponse
                                formik={formik}
                                name={name}
                              />
                            </>
                          ) : type === "selectInput" ? (
                            <>
                              <Label
                                label={name}
                                text={label}
                                notImportant={notImportant}
                              />
                              <SelectInput
                                name={name}
                                placeholder={placeholder}
                                options={arr}
                                formik={formik}
                                onBlur={formik.handleBlur}
                              />
                              <FormikErrorResponse
                                formik={formik}
                                name={name}
                              />
                            </>
                          ) : type === "file" ? (
                            <>
                              <Label
                                label={name}
                                text={label}
                                notImportant={notImportant}
                              />
                              <input
                                type={type}
                                accept="image/*"
                                name={name}
                                onChange={(event: any) => {
                                  formik.setFieldValue(
                                    name,
                                    event.currentTarget.files[0]
                                  );
                                }}
                                onBlur={formik.handleBlur}
                                className={`w-full px-4 py-4 rounded-md bg-gray-100 border border-gray-200 placeholder-gray-500 text-xs focus:outline-none focus:border-gray-400 focus:bg-white mb-2`}
                              />
                              <FormikErrorResponse
                                formik={formik}
                                name={name}
                              />
                            </>
                          ) : (
                            <>
                              <Label
                                label={name}
                                text={label}
                                notImportant={notImportant}
                              />
                              <Input
                                type={type}
                                name={name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values[`${name}`]}
                                placeholder={placeholder}
                                style={inputStyle}
                              />
                              <FormikErrorResponse
                                formik={formik}
                                name={name}
                              />
                            </>
                          )}
                        </div>
                      )
                    )}
                  </div>
                ) : (
                  <>
                    <Label
                      label={name}
                      text={label}
                      notImportant={notImportant}
                    />
                    <Input
                      type={type}
                      name={name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values[`${name}`]}
                      placeholder={placeholder}
                      style={inputStyle}
                    />
                    <FormikErrorResponse formik={formik} name={name} />
                  </>
                )}
              </div>
            );
          }
        )}
        {link && (
          <div className="flex justify-end">
            <Link className="text-xs text-custom_blue" href={link.path}>
              {link.text}
            </Link>
          </div>
        )}
        <div>
          {bottomCustomInput}
          {button && (
            <Button
              type={button ? button.type : "submit"}
              style="bg-custom_blue"
            >
              {status === "pending" ? (
                <div className="boxes_loader"></div>
              ) : (
                <>
                  <span className="mr-2"> {button.text} </span>
                  <LetterPlane />
                </>
              )}
            </Button>
          )}
        </div>
      </form>
      {children}
    </ColumnLayout>
  );
}
