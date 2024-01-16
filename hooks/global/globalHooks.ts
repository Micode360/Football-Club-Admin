import { MyContext } from "@/components/layout/userContext";
import { useState, useContext } from "react";


interface ResponseProps {
  status: boolean | string;
  message: string;
  color: string;
}

export const useGlobalFunctions:any = () => {
  const {
    myData: { admins, profile },
    setMyData,
  } = useContext(MyContext);

  const [isModal, setIsModal] = useState<boolean>(false);
  const [modalValue, setModalValue] = useState<any>({});
  const [response, setResponse] = useState<ResponseProps>({
    status: false,
    message: "",
    color: "",
  });


  const modalDescription = (type: string) => {
    switch (type) {
      case "delete":
        return `Are you sure you want to delete ${
          modalValue?.isUser ? "your" : "this"
        } ${modalValue.object}?`;
      default:
        break;
    }
  };


  return {
    isModal,
    setIsModal,
    modalValue,
    setModalValue,
    response,
    setResponse,
    modalDescription,
  };
};
