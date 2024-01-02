import React from "react";
import Image from "next/image";
import { Dialog } from "@headlessui/react";
import { toDate } from "@/utils/utilsFunctions";

interface previewDataProperties {
  data: any;
}

export default function AdminPreview({ data }: previewDataProperties) {


  return (
    <div className="relative flex-col  justify-center text-left">
      <div className="relative">
        <div className="bg-gradient-to-r from-red-500 to-red-700 to-col flex justify-center items-center md:leading-[2.8rem] p-4 h-20 w-full relative overflow-hidden">
          <Image
            src="/curvy_lines.svg"
            alt="logo"
            width={80}
            height={80}
            className={`absolute top-0 bottom-[-12px] right-0 md:w-[40%]`}
            priority
          />
        </div>
        <img
          src={
            data.profilePic.imgUrl ? data.profilePic?.imgUrl : "/234567891.svg"
          }
          className="rounded-full object-cover object-center absolute left-1/2 -translate-x-1/2 -bottom-8 border-[6px] border-white w-20 h-20"
          alt="profile photo"
        />
      </div>
      <div className="mt-8">
        <Dialog.Title
          as="h3"
          className="mb-1 text-[1.5rem] text-center font-[800]"
          id="modal-headline"
        >
          {data.firstName} {data.lastName}
        </Dialog.Title>
      </div>
      <div className="text-gray-600 text-base text-center">
        {data.role.charAt(0).toUpperCase() + data.role.slice(1)}
      </div>

      <div className="flex justify-center mt-2">
        <div className="grid md:grid-cols-2 gap-4 w-[90%]">
          <div className="border rounded-md p-4 shadow-md">
            <Dialog.Title
              as="h3"
              className="mb-2 text-xs md:text-base font-[700]"
              id="modal-headline"
            >
              Country
            </Dialog.Title>
            <div className="flex items-center">
              {data.country.imgPath && (
                <img
                  src={data.country.imgPath}
                  className="w-3 h-3 mr-1"
                  alt="country"
                />
              )}

              <p className="text-xs">
                {data.country.value ? data.country.value : "unknown"}
              </p>
            </div>
          </div>

          <div className="border rounded-md p-4 shadow-md">
            <Dialog.Title
              as="h3"
              className="mb-2 text-xs md:text-base font-[700]"
              id="modal-headline"
            >
              State
            </Dialog.Title>
            <p className="text-xs">{data.state ? data.state : "unknown"}</p>
          </div>
          <div className="border rounded-md p-4 shadow-md min-390">
            <Dialog.Title
              as="h3"
              className="mb-2 text-xs md:text-base font-[700]"
              id="modal-headline"
            >
              City
            </Dialog.Title>
            <p className="text-xs">{data.city ? data.city : "unknown"}</p>
          </div>

          <div className="border rounded-md p-4 shadow-md min-390">
            <Dialog.Title
              as="h3"
              className="mb-2 text-xs md:text-base font-[700]"
              id="modal-headline"
            >
              First Seen
            </Dialog.Title>
            <p className="text-xs">{data.createdAt ? toDate(parseInt(data.createdAt, 10)) : "unknown"}</p>
          </div>
        </div>
      </div>
      <div className="md:h-8 border-t mt-4"></div>
    </div>
  );
}
