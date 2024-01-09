import { useMutation } from '@apollo/client';
import { MyContext } from '@/components/layout/userContext';
import { useState, useContext } from 'react';
import { DELETE_USER, TRANSFER_ROLE } from '@/graphQL/mutations';
import { removeToken } from "@/utils/utilsFunctions";

interface ResponseProps {
  status: boolean | string;
  message: string;
  color: string;
}

export const useAdminFunctions = () => {
  const [deleteUser] = useMutation(DELETE_USER);
  const [transferRole] = useMutation(TRANSFER_ROLE);
  const { myData: { admins, profile }, setMyData } = useContext(MyContext);
  const [isModal, setIsModal] = useState<boolean>(false);
  const [modalValue, setModalValue] = useState<any>({});
  const [previewModal, setPreviewModal] = useState<boolean>(false);
  const [transferRoleModal, setTransferRoleModal] = useState<boolean>(false);
  const [previewData, setPreviewData] = useState({});
  const [searchValue, setSearchValue] = useState("");
  const [response, setResponse] = useState<ResponseProps>({
    status: false,
    message: '',
    color: '',
  });


  const handleAssign = async (id:string) => {
    setResponse({ ...response, status: "pending" });

    try {
      const { data } = await transferRole({
        variables: {
          input: {
              id,
              userId: profile.id
          },
        },
      });

      if (data.TransferRole.status === 200) {
        setResponse({
          status: true,
          message: `User ${data.TransferRole.message.toLowerCase()}`,
          color: "green",
        });


        
        setMyData((prevData: any) => ({
          ...prevData,
          profile: { ...prevData.profile, role: "Admin" },
          role: "Admin"
        }));

        const filteredUsers = [...admins].filter((data:any) => {
          if(data.id === id) data.role = "Super Admin";
          else if(data.id === profile.id) data.role = "Admin";
          return data;
        });
        setMyData((prevData: any) => ({ ...prevData, admins: filteredUsers }));
      } else
        setResponse({
          status: true,
          message: data.TransferRole.message,
          color: "red",
        });
    } catch (error: any) {
      setResponse({ status: true, message: error.message, color: "red" });
    }
  };

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


        if(data.DeleteUser.message === 'Account deleted'){
           removeToken('asstkn');
           return window.location.href = '/signin'
        };

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

const modalDescription = (type: string) => {
  switch (type) {
    case "delete":
      return `Are you sure you want to delete ${
        modalValue?.isCurrentUser ? "your" : "this"
      } account?`;
      break;
    case "assign":
      return `Are you sure you want transfer your role to ${modalValue?.username}?`;
      break;

    default:
      return "";
      break;
  }
};

const modalAction = (type: string) => {
  switch (type) {
    case "delete":
      setIsModal(false);
      handleDelete(modalValue.id, modalValue.imgId);
      return;
    case "assign":
      setIsModal(false);
      handleAssign(modalValue.id);
      return;
    default:
      break;
  }
};


const confirmDelete = (isCurrentUser:boolean, data:any) => {
  setIsModal(true);
  setModalValue({
    type: "delete",
    isCurrentUser,
    id: data.id,
    imgId: data?.profilePic?.publicId,
  });
}


  return {
    isModal,
    setIsModal,
    modalValue,
    setModalValue,
    previewModal,
    setPreviewModal,
    transferRoleModal,
    setTransferRoleModal,
    previewData,
    setPreviewData,
    searchValue,
    setSearchValue,
    response,
    setResponse,
    handleDelete,
    handleAssign,
    modalDescription,
    modalAction,
    confirmDelete,
    sortedAndFilterAdmins
  };
};
