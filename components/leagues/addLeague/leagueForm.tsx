"use client";
import { useState, useEffect, useContext } from "react";
import { useRouter ,useSearchParams } from "next/navigation";
import * as Yup from "yup";
import axios from "axios";
import { useFormik } from "formik";
import Form from "@/components/form";
import { useMutation } from "@apollo/client";
import { ADD_LEAGUE, EDIT_LEAGUE } from "@/graphQL/mutations/leagues/index";
import { leagueInputprops } from "@/utils/constantdatas";
import ColorPickerGrid from "./ColorPickerGrid";
import { fetchCountry } from "@/utils/utilsFunctions";
import { MyContext } from "@/components/layout/userContext";
import NotiticationResponse from "@/components/Response/notiticationResponse";


interface NewsFormProperties {
  setPreview: React.Dispatch<React.SetStateAction<any>>;
}

type inputProperties = {
  name: string;
  description: string;
  country: { imgPath: string; value: string };
  logo: string | Blob;
  website: string;
  facebook: string;
  xlink: string;
  instagram: string;
  youtube: string;
  fromColor: string;
  toColor: string;
};

interface responseProps {
  status: boolean | string;
  message: string;
  color: string;
}

export default function LeagueForm({ setPreview }: NewsFormProperties) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");
  const { myData: { profile, leagues, role } , setMyData } = useContext(MyContext) ?? {};
  const [addLeague] = useMutation(ADD_LEAGUE);
  const [editLeague] = useMutation(EDIT_LEAGUE);
  const [status, setStatus] = useState<string>("");
  const [message, setMessage] = useState<any>({});
  const [country, setCountry] = useState([]);
  const [editLogoId, setEditLogoId] = useState("");
  const [response, setResponse] = useState<responseProps>({
    status: false,
    message: "",
    color: "",
  });

  const formValues = {
    name: "",
    description: "",
    country: { imgPath: "", value: "" },
    logo: "",
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
    const {
      name,
      logo,
      country,
      description,
      website,
      facebook,
      xlink,
      instagram,
      youtube,
      fromColor,
      toColor,
    } = values;

    try {
      setMessage({});
      setStatus("pending");

      const formData = new FormData();
      formData.append("upload", logo);

      let imageResponse: any;

      if (typeof logo === "object") {
        imageResponse = await axios.post(
          `${process.env.NEXT_PUBLIC_IMG_PORT}/api/upload`,
          formData
        );
      } else {
        imageResponse = "";
      }

      const img: any = imageResponse?.data || {};
      let leagueValues = {
        input: {
          id: editId !== "" ? editId : "",
          userId: profile?.id,
          name,
          logo: {
            publicId: !img.public_id ? editLogoId : img.public_id,
            imgUrl: !img.url ? logo : img.url,
          },
          country,
          description,
          website,
          socials: {
            facebook,
            xlink,
            instagram,
            youtube,
          },
          backgroundGradient: {
            fromColor,
            toColor,
          },
        },
      };

      const { data } =
        editId && editId !== ""
          ? await editLeague({
              variables: leagueValues,
            })
          : await addLeague({
              variables: leagueValues,
            });

      if (data?.AddLeague?.status === 200 || data?.EditLeague?.status === 200) {
        let { userId, ...filteredInput } = leagueValues.input;
        if(editId === null)filteredInput.id = data?.AddLeague?.value;

        setStatus("");
        setResponse({
          status: true,
          message: !editId || editId === "" ?  "League Added": "League Updated",
          color: "green",
        });

        let newOrUpdatedLeague:any;

     
          newOrUpdatedLeague = leagues.filter((league: any) => league.id !== editId);
          newOrUpdatedLeague.push(filteredInput);
        
        setMyData((prevData: any) => ({
          ...prevData,
          leagues: newOrUpdatedLeague,
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
    validate: (values: any) => {
      if (values.logo) {
        if (values.logo.size > 1024 * 1024 * 5) {
          setResponse({
            status: false,
            message: "File size must be less than 5MB",
            color: "red",
          });
          setStatus("");
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
    if(role !== "Super Admin") router.push('/leagues');
    if (editId && editId !== "") {
      const league = leagues.filter((league: any) => league.id === editId)[0];
      setEditLogoId(league?.logo?.publicId);
      formik.setValues({
        name: league?.name || "",
        description: league?.description || "",
        country: {
          imgPath: league?.country?.imgPath || "",
          value: league?.country?.value || "",
        },
        logo: league?.logo?.imgUrl || "",
        website: league?.website || "",
        facebook: league?.socials?.facebook || "",
        xlink: league?.socials?.xlink || "",
        instagram: league?.socials?.instagram || "",
        youtube: league?.socials?.youtube || "",
        fromColor: league?.backgroundGradient?.fromColor || "",
        toColor: league?.backgroundGradient?.toColor || "",
      });
    } else formik.setValues(formValues);
  }, [router, editId, leagues]);

  useEffect(() => {
    fetchCountry(setCountry);
  }, []);

  return (
    <>
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
      <NotiticationResponse isOpen={response} setIsOpen={setResponse} />
    </>
  );
}
