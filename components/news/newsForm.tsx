"use client";
import dynamic from "next/dynamic";
import { useState, useMemo, useEffect } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import Form from "@/components/form";
import { newsInputprops } from "@/utils/constantdatas";

interface NewsFormProperties {
  setPreview: React.Dispatch<React.SetStateAction<any>>;
}

type inputProperties = {
  title: string;
  description: string;
  author: string;
  league: string;
  category: string;
  coverimage: File | null;
  content: string;
};

export default function NewsForm({ setPreview }: NewsFormProperties) {
  const Editor = useMemo(
    () => dynamic(() => import("./editor"), { ssr: false }),
    [],
  );
  const [status, setStatus] = useState<string>("");
  const [message, setMessage] = useState<any>({});

  const formValues = {
    title: "",
    description: "",
    author: "",
    league: "",
    category: "",
    coverimage: null,
    content: "",
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required(),
    description: Yup.string().required(),
    author: Yup.string().required(),
    league: Yup.string().required(),
    category: Yup.string().required(),
    coveriamge: Yup.string().required(),
    content: Yup.string().required(),
  });

  const onSubmit = async (values: inputProperties) => {
    setMessage({});
    setStatus("pending");
  };

  const formik = useFormik<inputProperties>({
    initialValues: formValues,
    validationSchema: validationSchema,
    validate: (values) => {
      if (values.coverimage) {
        if (values.coverimage.size > 1024 * 1024 * 5) {
          setMessage({
            response: "File size must be less than 5MB",
          });
          setStatus("error");
          return Promise.reject();
        }
      }
      setTimeout(() => {
        setPreview(values);
      }, 1000);
    },
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
    <div className="bg-white">
      <Form
        style="!px-0 !py-0"
        formik={formik}
        status={status}
        message={message}
        inputs={newsInputprops}
        inputStyle="focus:border-[2px] focus:border-custom_orange"
        bottomCustomInput={<Editor formik={formik} />}
        button={{
          type: "submit",
          text: "Submit",
        }}
      />
    </div>
  );
}
