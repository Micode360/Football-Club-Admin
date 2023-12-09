import React, { useState } from "react";
import AdminCard from "./card";
import Modal from "@/components/modal";
import ExIcon from "@/components/icons/exclamationIcon";
import ModalWrapper from "@/components/modal/modalWrapper";
import AdminPreview from "./adminPreview";

export default function Admins() {
  const [isModal, setIsModal] = useState<boolean>(false);
  const [previewModal, setPreviewModal] = useState<boolean>(false);
  return (
    <>
      <div className="grid justify-center md:justify-start md:grid-cols-4 gap-8 rounded-md my-4 p-4">
        <AdminCard
          setState={() => setIsModal(true)}
          setPreviewState={() => setPreviewModal(true)}
        />
      </div>
      <Modal
        isOpen={isModal}
        Icon={<ExIcon style="cursor-pointer" type={"circle"} />}
        setIsOpen={setIsModal}
        text={`Are you sure you want to delete this account?`}
        button1={() => console.log("Deleted")}
        button1Text="Yes, I'm sure"
        button2={() => setIsModal(!isModal)}
        button2Text="No, I take it back"
      />
      <ModalWrapper
        isOpen={previewModal}
        setIsOpen={setPreviewModal}
        style={"!px-0 !pt-12"}
      >
        <AdminPreview />
      </ModalWrapper>
    </>
  );
}
