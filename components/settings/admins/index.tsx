import React, { useState, useContext } from "react";
import AdminCard from "./card";
import Modal from "@/components/modal";
import ExIcon from "@/components/icons/exclamationIcon";
import ModalWrapper from "@/components/modal/modalWrapper";
import AdminPreview from "./adminPreview";
import { DELETE_USER } from "@/graphQL/mutations";
import { useMutation } from "@apollo/client";
import { MyContext } from "@/components/layout/userContext";
import SearchBar from "@/components/searchBar";
import NotiticationResponse from "@/components/Response/notiticationResponse";

interface responseProps {
  status: boolean | string;
  message: string;
  color: string;
}
export default function Admins() {
  const [deleteUser] = useMutation(DELETE_USER);
  const { myData, setMyData } = useContext(MyContext);
  const { admins, profile, role } = myData;
  const [isModal, setIsModal] = useState<boolean>(false);
  const [modalValue, setModalValue] = useState<any>({});
  const [previewModal, setPreviewModal] = useState<boolean>(false);
  const [previewData, setPreviewData] = useState({});
  const [searchValue, setSearchValue] = useState("");
  const [response, setResponse] = useState<responseProps>({
    status: false,
    message: "",
    color: "",
  });

  const sortedAndFilterAdmins = [...admins]
    .sort((a, b) => {
      return profile.id === b.id ? 1 : profile.id === a.id ? -1 : 0;
    })
    .filter((data: any) =>
      searchValue === ""
        ? data
        : `${data.firstName.toLowerCase()} ${data.lastName.toLowerCase()}`.includes(
            searchValue.toLowerCase()
          )
    );

  const handleDelete = async (id: string, imgId: string) => {
    setResponse({ ...response, status: "pending" });
    try {
      const { data } = await deleteUser({
        variables: {
          input: {
            type: "user",
            authorId: profile.id,
            thisId: id,
            imgId: imgId ? imgId : "",
          },
        },
      });

      if (data.DeleteUser.status === 200) {
        setResponse({
          status: true,
          message: `User ${data.DeleteUser.message.toLowerCase()}`,
          color: "green",
        });
        const filteredUsers = [...admins].filter((data) => data.id !== id);
        setMyData((prevData: any) => ({ ...prevData, admins: filteredUsers }));
      } else
        setResponse({
          status: true,
          message: data.DeleteUser.message,
          color: "red",
        });
    } catch (error: any) {
      setResponse({ status: true, message: error.message, color: "red" });
    }
  };

  return (
    <>
      <div className="bg-white shadow-lg flex justify-between my-4 py-3 px-4 rounded">
        <SearchBar setState={setSearchValue} style={"!py-0 !px-0 w-full"} />
      </div>

      <div className="grid justify-center md:justify-start md:grid-cols-4 gap-8 rounded-md my-4 py-4">
        {sortedAndFilterAdmins.map((data: any, index: any) => {
          let isCurrentUser = profile.id === data.id;
          return (
            <div key={index}>
              <AdminCard
                currentUser={isCurrentUser}
                userRole={role}
                data={data}
                setState={() => {
                  setIsModal(true);
                  setModalValue({
                    isCurrentUser,
                    id: data.id,
                    imgId: data?.profilePic?.publicId,
                  });
                }}
                setPreviewState={() => {
                  setPreviewModal(true);
                  setPreviewData(data);
                }}
              />
            </div>
          );
        })}
      </div>
      <Modal
        isOpen={isModal}
        Icon={<ExIcon style="cursor-pointer" type={"circle"} />}
        setIsOpen={setIsModal}
        text={`Are you sure you want to delete ${
          modalValue.isCurrentUser ? "your" : "this"
        } account?`}
        button1={() => {
          setIsModal(false);
          handleDelete(modalValue.id, modalValue.imgId);
        }}
        button1Text="Yes, I'm sure"
        button2={() => setIsModal(!isModal)}
        button2Text="No, I take it back"
      />
      <ModalWrapper
        isOpen={previewModal}
        setIsOpen={setPreviewModal}
        style={"!px-0 !pt-12"}
      >
        <AdminPreview data={previewData} />
      </ModalWrapper>
      <NotiticationResponse isOpen={response} setIsOpen={setResponse} />
    </>
  );
}
