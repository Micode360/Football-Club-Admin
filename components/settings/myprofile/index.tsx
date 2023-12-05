import { useState, useEffect } from "react";
import Form from "@/components/form";
import { useFormik } from "formik";
import { MyProfileInputprops } from "../utils/formProps";
import ImageUpload from "../customForm/imageUpload";
import SettingsButton from "../customForm/button";

type inputProperties = {
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  country: string;
  state: string;
  zipCode: string; 
};

export default function MyProfile() {
  const [status, setStatus] = useState<string>("");
  const [message, setMessage] = useState<any>({});
  const [country, setCountry ] = useState([]);
  
  const formValues = {
    profilePic: null,
    firstName: "",
    lastName: "",
    email: "",
    city: "",
    country: "",
    state: "",
    zipCode: ""
  };


  const onSubmit = async (values: inputProperties) => {
    setMessage({});
    setStatus("pending");
  };

  const formik = useFormik<inputProperties>({
    initialValues: formValues,
    onSubmit: async (values: inputProperties, { resetForm }) => {
      await onSubmit(values);
      resetForm();
    },
  });

  useEffect(() => {
    formik.setValues(formValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  useEffect(()=>{
    fetch(
      "https://restcountries.com/v3.1/all?fields=name,flags"
    )
      .then((response) => response.json())
      .then((data) =>
        {
          let mappingCountry = data.map((item:any) => ({ imagePath: item.flags.png, value: item.name.common }));
          setCountry(mappingCountry)
        }
      );
    
  },[])

  return (
    <div className="col-span-2">
      <Form
        style="!px-0 !py-0"
        formik={formik}
        topCustomInput={<ImageUpload formik={formik}/>}
        arr={country}
        status={status}
        message={message}
        inputs={MyProfileInputprops}
        bottomCustomInput={<SettingsButton formik={formik}/>}
      />
    </div>
  );
}
