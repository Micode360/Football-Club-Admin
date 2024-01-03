import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useFormik } from "formik";
import Form from "@/components/form";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "@/graphQL/mutations";
import { MyProfileInputprops } from "../utils/formProps";
import ImageUpload from "../customForm/imageUpload";
import SettingsButton from "../customForm/button";
import { MyContext } from "@/components/layout/userContext";
import { fetchCountry } from "@/utils/utilsFunctions";
import NotiticationResponse from "@/components/Response/notiticationResponse";

type inputProperties = {
  profilePic: string | Blob;
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  country: {
    imgPath: string;
    value: string;
  };
  state: string;
  zipCode: string;
};

interface responseProps {
  status: boolean | string;
  message: string;
  color: string;
}

export default function MyProfile() {
  const { myData, setMyData } = useContext(MyContext) ?? {};
  const { profile, admins, role } = myData;
  const [updateUser] = useMutation(UPDATE_USER);
  const [status, setStatus] = useState<string>("");
  const [message, setMessage] = useState<any>({});
  const [country, setCountry] = useState([]);
  const [response, setResponse] = useState<responseProps>({
    status: false,
    message: "",
    color: "",
  });

  const formValues = {
    profilePic: "",
    firstName: "",
    lastName: "",
    email: "",
    city: "",
    country: {
      imgPath: "",
      value: "",
    },
    state: "",
    zipCode: "",
  };

  const onSubmit = async (values: inputProperties) => {
    const {
      profilePic,
      firstName,
      lastName,
      email,
      city,
      country,
      state,
      zipCode,
    } = values;

    try {
      setMessage({});
      setStatus("pending");

      const formData = new FormData();
      formData.append("upload", profilePic);

      const imgUrlFromProfile = profile.profilePic?.imgUrl;
      const isImgUrlEqual = imgUrlFromProfile === profilePic;

      const imageResponse: any = isImgUrlEqual
        ? ""
        : await axios.post(
            `${process.env.NEXT_PUBLIC_IMG_PORT}/api/upload`,
            formData
          );

      const img: any = imageResponse?.data || {};
      const updatedProfile = {
        input: {
          id: profile?.id,
          firstName,
          lastName,
          email,
          country,
          state,
          city,
          zipCode,
          profilePic: {
            publicId: !img.public_id
              ? profile.profilePic.publicId
              : img.public_id,
            imgUrl: !img.url ? profile.profilePic.imgUrl : img.url,
          },
        },
      };

      const { data } = await updateUser({
        variables: updatedProfile,
      });

      if (data.UpdateUser.status === 200) {
        setStatus("success");
        setResponse({ status: true, message: "User Updated", color: "green" });
        const updateUserInAdmin = admins.filter(
          (data: any) => data.id !== profile.id
        );
        updateUserInAdmin.push({
          ...updatedProfile.input,
          role: role,
          createdAt: profile.createdAt,
        });
        setMyData((prevData: any) => ({
          ...prevData,
          profile: updatedProfile.input,
          admins: updateUserInAdmin,
        }));
      }
    } catch (error) {
      setResponse({
        status: true,
        message: "Error updating user",
        color: "red",
      });
      setStatus("error");
    }
  };

  const formik = useFormik<inputProperties>({
    initialValues: formValues,
    onSubmit: async (values: inputProperties, { resetForm }) => {
      await onSubmit(values);
    },
  });

  useEffect(() => {
    if (profile) {
      const {
        profilePic,
        firstName,
        lastName,
        email,
        city,
        country,
        state,
        zipCode,
      } = profile;

      formik.setValues({
        profilePic: profilePic?.imgUrl,
        firstName: firstName || "",
        lastName: lastName || "",
        email: email || "",
        city: city || "",
        country: {
          imgPath: country?.imgPath || "",
          value: country?.value || "",
        },
        state: state || "",
        zipCode: zipCode || "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile]);

  useEffect(() => {
    fetchCountry(setCountry);
  }, []);

  return (
    <>
      <div className="col-span-2">
        <Form
          style="!px-0 !py-0"
          formik={formik}
          topCustomInput={<ImageUpload formik={formik} />}
          arr={country}
          status={status}
          message={message}
          inputs={MyProfileInputprops}
          bottomCustomInput={<SettingsButton formik={formik} status={status} />}
        />
      </div>
      <NotiticationResponse isOpen={response} setIsOpen={setResponse} />
    </>
  );
}
