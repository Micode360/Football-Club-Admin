"use client";
import { useState, useEffect } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import Form from "@/components/form";
import { leagueInputprops } from "@/utils/constantdatas";
import ColorPickerGrid from "./ColorPickerGrid";

interface NewsFormProperties {
  setPreview: React.Dispatch<React.SetStateAction<any>>;
}

type inputProperties = {
  name: string;
  description: string;
  country: { imgPath: string; value: string };
  logo: null;
  website: string;
  facebook: string;
  xlink: string;
  instagram: string;
  youtube: string;
  fromColor: string;
  toColor: string;
};

export default function LeagueForm({ setPreview }: NewsFormProperties) {
  const [status, setStatus] = useState<string>("");
  const [message, setMessage] = useState<any>({});
  const [country, setCountry] = useState([]);

  const formValues = {
    name: "",
    description: "",
    country: { imgPath: "", value: "" },
    logo: null,
    website: "",
    facebook: "",
    xlink: "",
    instagram: "",
    youtube: "",
    fromColor: "",
    toColor: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(),
    description: Yup.string().required(),
    logo: Yup.string().required(),
  });

  const onSubmit = async (values: inputProperties) => {
    setMessage({});
    setStatus("pending");
  };

  const formik = useFormik<inputProperties>({
    initialValues: formValues,
    validationSchema: validationSchema,
    validate: (values: any) => {
      if (values.logo) {
        if (values.logo.size > 1024 * 1024 * 5) {
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

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all?fields=name,flags")
      .then((response) => response.json())
      .then((data) => {
        let mappingCountry = data.map((item: any) => ({
          imagePath: item.flags.png,
          value: item.name.common,
        }));
        setCountry(mappingCountry);
      });
  }, []);

  return (
    <div className="bg-white">
      <Form
        style="!px-0 !py-0"
        formik={formik}
        arr={country}
        status={status}
        message={message}
        inputs={leagueInputprops}
        inputStyle="focus:border-[2px] focus:border-custom_orange"
        bottomCustomInput={<ColorPickerGrid formik={formik} />}
        button={{
          type: "submit",
          text: "Submit",
        }}
      />
    </div>
  );
}
