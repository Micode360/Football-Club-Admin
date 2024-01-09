import React, { useState, useContext } from "react";
import AdminCard from "./card";
import Modal from "@/components/modal";
import ExIcon from "@/components/icons/exclamationIcon";
import ModalWrapper from "@/components/modal/modalWrapper";
import AdminPreview from "./adminPreview";
import { MyContext } from "@/components/layout/userContext";
import SearchBar from "@/components/searchBar";
import NotiticationResponse from "@/components/Response/notiticationResponse";
import TransferRole from "./transferRole";
import { useAdminFunctions } from "@/hooks/admin/adminCustomHook";

export default function Admins() {
  const {
    myData: { admins, profile, role }
  } = useContext(MyContext);
  const {
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
    setSearchValue,
    response,
    setResponse,
    modalDescription,
    modalAction,
    confirmDelete,
    sortedAndFilterAdmins,
  } = useAdminFunctions();

  return (
    <>
      <div className="bg-white shadow-lg flex justify-between my-4 py-3 px-4 rounded">
        <SearchBar setState={setSearchValue} style={"!py-0 !px-0 w-full"} />
      </div>

      <div className="grid justify-center md:justify-between md:grid-cols-4 gap-8 rounded-md my-4 py-4">
        {sortedAndFilterAdmins.map((data: any, index: any) => {
          let isCurrentUser = profile.id === data.id;
          return (
            <div key={index}>
              <AdminCard
                currentUser={isCurrentUser}
                userRole={role}
                userId={profile.id}
                data={data}
                confirmDelete={() => confirmDelete(isCurrentUser, data)}
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
        text={modalDescription(modalValue.type)}
        button1={() => modalAction(modalValue.type)}
        button1Text="Yes, I'm sure"
        button2={() => setIsModal(!isModal)}
        button2Text="No, I take it back"
      />
      <ModalWrapper
        isOpen={previewModal}
        setIsOpen={setPreviewModal}
        style={"!px-0 !pt-12"}
      >
        <AdminPreview
          data={previewData}
          userId={profile.id}
          setPreviewModal={setPreviewModal}
          setTransferRoleModal={setTransferRoleModal}
        />
      </ModalWrapper>
      <ModalWrapper
        isOpen={transferRoleModal}
        setIsOpen={setTransferRoleModal}
        style={"!px-0 !pt-12"}
      >
        <TransferRole
          profile={profile}
          data={admins}
          setTransferRoleModal={setTransferRoleModal}
          setIsModal={setIsModal}
          setModalValue={setModalValue}
        />
      </ModalWrapper>
      <NotiticationResponse isOpen={response} setIsOpen={setResponse} />
    </>
  );
}
