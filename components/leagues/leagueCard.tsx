import React, { useState, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import EllipsisIcon from "../icons/ellipsisIcon";
import leagueHooksAndProps from "@/hooks/leagues/leagueCustomHooks";
import DropDownMenu from "../dropDownMenu";
import Modal from "../modal";
import ExIcon from "../icons/exclamationIcon";
import { MyContext } from "@/components/layout/userContext";
import NotiticationResponse from "../Response/notiticationResponse";

interface CardProperties {
  id: string;
  imgId: string;
  title: string;
  description: string;
  path: string;
  fromColor?: string;
  toColor: string;
  imgPath: string;
}

export default function LeagueCard({
  id,
  imgId,
  title,
  description,
  path,
  fromColor,
  toColor,
  imgPath,
}: CardProperties) {
  const {
    myData: { role },
  } = useContext(MyContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const [onClickData, setOnClickData] = useState("");
  const {
    leagueDropDownData,
    isModal,
    setIsModal,
    modalValue,
    response,
    setResponse,
    modalDescription,
    handleLeagueDelete,
  } = leagueHooksAndProps();

  return (
    <>
      <div className="relative overflow-hidden cursor-pointer h-fit w-[21.5rem] league_card grid grid-cols-2 px-4 py-4 bg-white shadow-lg rounded-md hover:scale-[1.1] transition">
        <div className="relative">
          <div
            style={{
              background:
                "linear-gradient(to right," + fromColor + "," + toColor + ")",
            }}
            className={`bg-gradient-to-r from-red-500 to-red-700 flex flex-col justify-center league-slate p-4 rounded-md text-white relative overflow-hidden z-[10]`}
          >
            <h2 className="text-[1.1rem] font-bold mb-2">{title}</h2>
            <p className="text-sm"> {description} </p>
            <Link
              className="underline cursor-pointer z-[20] w-fit"
              href={`/leagues/details/${path}`}
            >
              Details
            </Link>
            <Image
              src="/curvy_lines.svg"
              alt="logo"
              width={80}
              height={80}
              className={`absolute top-0 md:top-[70px] bottom-[-12px] left-0 scale-[2] w-full`}
              priority
            />
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="w-[6rem] h-[6rem]">
            <Image
              src={imgPath}
              alt="logo"
              width={70}
              height={70}
              className={`w-full z-[10]`}
              priority
            />
          </div>
        </div>
        <Image
          src="/curvy_lines(1).svg"
          alt="logo"
          width={80}
          height={80}
          className={`absolute top-0 bottom-[-12px] right-0 opacity-[-0.85] w-full`}
          priority
        />

        {role === "Super Admin" && (
          <span
            className="league-card absolute top-2 right-1 w-fit cursor-pointer"
            onClick={(e: any) => {
              setShowDropdown(!showDropdown);
              setOnClickData(e.target.className);
            }}
          >
            <EllipsisIcon property={"horizontal"} />
            <DropDownMenu
              data={leagueDropDownData(id, imgId)}
              showDropdown={showDropdown}
              setShowDropdown={setShowDropdown}
              onClickData={onClickData}
              style="!w-[8rem] text-black rounded right-0 md:right-none bg-white z-[2]"
            />
          </span>
        )}
      </div>
      <Modal
        isOpen={isModal}
        Icon={<ExIcon style="cursor-pointer" type={"circle"} />}
        setIsOpen={setIsModal}
        text={modalDescription(modalValue.type) || ""}
        button1={() => handleLeagueDelete(modalValue)}
        button1Text="Yes, I'm sure"
        button2={() => setIsModal(!isModal)}
        button2Text="No, I take it back"
      />
      <NotiticationResponse isOpen={response} setIsOpen={setResponse} />
    </>
  );
}
