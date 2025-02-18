import React, { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import LetterPlane from "../icons/letterPlane";
import CameraIcon from "../icons/camera";
import EllipsisIcon from "../icons/ellipsisIcon";
import MessageResponse from "./message";

export default function ChatRoom() {
  const [userChatMessage, setUserChatMessage] = useState("");

  const messageOnChange = (e: any) => {
    setUserChatMessage(e.target.value);
      };

  return (
    <section className="bg-white flex flex-col justify-between shadow-lg rounded h-full lg:col-span-3">
      <div className="flex items-start justify-between cursor-pointer border-b py-3 px-4">
        <div className="flex items-start cursor-pointer">
          <img
            src="/mp.webp"
            className="rounded-full object-cover object-center w-12 h-12"
            alt="profile photo"
          />

          <div className="mx-2">
            <h4 className="font-[600] mb-1">James Carter</h4>
            <p className="text-xs">Online</p>
          </div>
        </div>
        <div className="flex justify-center items-center h-full">
          <EllipsisIcon
            property={"outline"}
            style="rotate-[90deg] cursor-pointer"
          />
        </div>
      </div>
      <div className="h-[62vh] scroll-container overflow-y-scroll">
        <div className="w-full">
          <MessageResponse
            background="bg-orange-400"
            name="James Carter"
            text="Awesome writeup. Keep up the good work."
            time="11:24"
          />
        </div>
        <div className="w-full flex justify-end">
          <MessageResponse
            containerDirection="flex-row-reverse"
            justifyContainer="justify-end"
            justifyTitle="justify-end"
            background="bg-blue-400"
            name="You"
            text="Thank you."
            time="11:25"
          />
        </div>
        <div className="w-full">
          <MessageResponse
            background="bg-orange-400"
            name="James Carter"
            text="Awesome writeup. Keep up the good work."
            time="11:24"
          />
        </div>
        <div className="w-full flex justify-end">
          <MessageResponse
            containerDirection="flex-row-reverse"
            justifyContainer="justify-end"
            justifyTitle="justify-end"
            background="bg-blue-400"
            name="You"
            text="Thank you."
            time="11:25"
          />
        </div>
        <div className="w-full">
          <MessageResponse
            background="bg-orange-400"
            name="James Carter"
            text="Awesome writeup. Keep up the good work."
            time="11:24"
          />
        </div>
        <div className="w-full flex justify-end">
          <MessageResponse
            containerDirection="flex-row-reverse"
            justifyContainer="justify-end"
            justifyTitle="justify-end"
            background="bg-blue-400"
            name="You"
            text="Thank you."
            time="11:25"
          />
        </div>
        <div className="w-full">
          <MessageResponse
            background="bg-orange-400"
            name="James Carter"
            text="Awesome writeup. Keep up the good work."
            time="11:24"
          />
        </div>
        <div className="w-full flex justify-end">
          <MessageResponse
            containerDirection="flex-row-reverse"
            justifyContainer="justify-end"
            justifyTitle="justify-end"
            background="bg-blue-400"
            name="You"
            text="Thank you."
            time="11:25"
          />
        </div>
      </div>

      <div className="flex items-center p-2">
        <div className="flex items-center border w-full p-2">
          <TextareaAutosize
            className="autoResize outline-none max-h-32 mr-2 w-full"
            onChange={messageOnChange}
            placeholder="Type a messsage"
            minRows={1}
          />
          <CameraIcon property="outline" style="text-gray-600" />
        </div>
        <button className="bg-custom_orange px-4 ml-2 text-white p-2 rounded">
          <LetterPlane style="rotate-[-40deg]" />
        </button>
      </div>
    </section>
  );
}
