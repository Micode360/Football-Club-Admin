"use client";
import dynamic from "next/dynamic";
import React, { useState, useMemo, useContext, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import * as Yup from "yup";
import axios from "axios";
import { useFormik } from "formik";
import Form from "@/components/form";
import { useMutation } from "@apollo/client";
import { MyContext } from "@/components/layout/userContext";
import newsHooksAndProps from "@/hooks/news/newsCustomHooks";
import { ADD_NEWS, EDIT_NEWS } from "@/graphQL/mutations/news/index";
import NotiticationResponse from "@/components/Response/notiticationResponse";

interface NewsFormProperties {
  setPreview: React.Dispatch<React.SetStateAction<any>>;
}

type inputProperties = {
  title: string;
  description: string;
  author: string;
  league: string;
  categories: Array<string>;
  coverimage: any;
  content: string;
};

interface responseProps {
  status: boolean | string;
  message: string;
  color: string;
}

export default function NewsForm({ setPreview }: NewsFormProperties) {
  const Editor = useMemo(
    () => dynamic(() => import("./editor"), { ssr: false }),
    []
  );

  const [status, setStatus] = useState<string>("");
  const [message, setMessage] = useState<any>({});
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");
  const [editLogoId, setEditLogoId] = useState("");
  const [authorIdsArr, setAuthorIdsArr] = useState<any>([]);
  const {
    myData: { profile, news },
    setMyData,
  } = useContext(MyContext) ?? {};
  const [addNews] = useMutation(ADD_NEWS);
  const [editNews] = useMutation(EDIT_NEWS);
  const { newsInputprops } = newsHooksAndProps();
  const [response, setResponse] = useState<responseProps>({
    status: false,
    message: "",
    color: "",
  });



  const formValues = {
    title: "",
    description: "",
    author: "",
    league: "",
    categories: [],
    coverimage: "",
    content: "",
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required(),
    author: Yup.string().required(),
    league: Yup.string().required(),
    categories: Yup.array().required(),
    coverimage: Yup.string().required(),
    content: Yup.string().required(),
  });

  const onSubmit = async (values: inputProperties) => {
    setMessage({});
    setStatus("pending");
    const {
      title,
      description,
      author,
      league,
      categories,
      coverimage,
      content,
    } = values;

    const formData = new FormData();

    formData.append("upload", coverimage);

    let imageResponse: any;

    if (typeof coverimage === "object") {
      imageResponse = await axios.post(
        `${process.env.NEXT_PUBLIC_IMG_PORT}/api/upload`,
        formData
      );
    } else {
      imageResponse = "";
    }

    const img: any = imageResponse?.data || {};
    const coverImage = {
      publicId: !img.public_id ? editLogoId : img.public_id,
      imgUrl: !img.url ? coverimage : img.url,
    };
    let newsValues = {
      input: {
        id: editId !== "" ? editId : "",
        userId: profile?.id,
        authorIds: authorIdsArr,
        title,
        description,
        author,
        league,
        categories,
        coverImage: coverImage,
        content,
      },
    };

    try {
      const { data } =
        editId && editId !== ""
          ? await editNews({
              variables: newsValues,
            })
          : await addNews({
              variables: newsValues,
            });

      if (data?.AddNews?.status === 200 || data?.EditNews?.status === 200) {
        let { userId, ...filteredInput } = newsValues.input;
        if (editId === null) filteredInput.id = data?.AddNews?.value;

        setStatus("");
        setResponse({
          status: true,
          message: !editId || editId === "" ? "News Added" : "News Updated",
          color: "green",
        });

        let newOrUpdatedNews: any;

        newOrUpdatedNews = news.filter((news: any) => news?.id !== editId);
        newOrUpdatedNews.push(filteredInput);

        setMyData((prevData: any) => ({
          ...prevData,
          news: newOrUpdatedNews,
        }));
      }
    } catch (error: any) {
      setResponse({
        status: true,
        message: "Something went wrong",
        color: "red",
      });
      setStatus("error");
    }
  };

  const formik = useFormik<inputProperties>({
    initialValues: formValues,
    validationSchema: validationSchema,
    validate: (values) => {
      if (values.coverimage) {
        if (values?.coverimage?.size > 1024 * 1024 * 5) {
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
    const filteredNews = news.filter((news: any) => news.id === editId)[0];
    setAuthorIdsArr(
      !editId || editId === "" ? [profile.id] : filteredNews.authorIds
    );
    if (editId && editId !== "") {
      setEditLogoId(news?.coverImage?.publicId);
      formik.setValues({
        title: filteredNews?.title || "",
        description: filteredNews?.description || "",
        author: filteredNews?.author || "",
        league: filteredNews?.league || "",
        categories: filteredNews?.categories || "",
        coverimage: {
          publicId: filteredNews?.coverImage?.publicId || "",
          imgUrl: filteredNews?.coverImage?.imgUrl || ""
        },
        content: filteredNews?.content || "",
      });
    } else formik.setValues(formValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editId, news, profile]);

  return (
    <>
      <div className="bg-white">
        <Form
          style="!px-0 !py-0"
          formik={formik}
          status={status}
          message={message}
          inputs={newsInputprops()}
          inputStyle="focus:border-[2px] focus:border-custom_orange"
          bottomCustomInput={<Editor formik={formik} />}
          button={{
            type: "submit",
            text: "Submit",
          }}
        />
      </div>
      <NotiticationResponse isOpen={response} setIsOpen={setResponse} />
    </>
  );
}
