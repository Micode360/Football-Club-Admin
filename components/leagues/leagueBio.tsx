import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import FacebookIcon from "../icons/socials/facebook";
import XIcon from "../icons/socials/xIcon";
import InstagramIcon from "../icons/socials/instagram";
import YoutubeIcon from "../icons/socials/youtube";
import ArrowUpRightIcon from "../icons/redirect";
import EllipsisIcon from "../icons/ellipsisIcon";
import DropDownMenu from "../dropDownMenu";
import leagueHooksAndProps from "@/hooks/leagues/leagueCustomHooks";
import Modal from "../modal";
import ExIcon from "../icons/exclamationIcon";
import NotiticationResponse from "../Response/notiticationResponse";

interface leagueBioProps {
  league: any;
}

export default function LeagueBio({ league }: leagueBioProps) {
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
      <section>
        <div className="shadow-lg rounded-md">
          <div
            style={{
              background:
                "linear-gradient(to right," +
                league?.backgroundGradient?.fromColor +
                "," +
                league?.backgroundGradient?.toColor +
                ")",
            }}
            className={`bg-gradient-to-r from-red-500 to-red-700 to-col flex items-center p-4 rounded-t-md text-white relative overflow-hidden`}
          >
            <Image
              src={!league?.logo ? "" : league?.logo?.imgUrl}
              alt="logo"
              width={80}
              height={80}
              className={`border-2 border-custom_orange rounded-md bg-white p-4 w-20 md:w-32 h-auto`}
              priority
            />
            <h2 className="text-[1.5rem] md:text-[3rem] md:leading-[2.8rem] font-bold md:ml-3 mt-auto md:mb-2">
              {league?.name}
            </h2>
            <Image
              src="/curvy_lines.svg"
              alt="logo"
              width={80}
              height={80}
              className={`absolute top-0 bottom-[-12px] right-0 w-[40%]`}
              priority
            />
            <span
              className="league-edit absolute top-2 right-2 w-fit"
              onClick={(e: any) => {
                setShowDropdown(!showDropdown);
                setOnClickData(e.target.className);
              }}
            >
              <EllipsisIcon
                property={"circle"}
                style="bg-white text-black rounded-full cursor-pointer opacity-85 z-[50]"
              />
              <DropDownMenu
                data={leagueDropDownData(league?.id, league?.logo?.publicId)}
                showDropdown={showDropdown}
                setShowDropdown={setShowDropdown}
                onClickData={onClickData}
                style="!w-[8rem] text-black rounded right-0 md:right-none bg-white z-[2]"
              />
            </span>
          </div>
          <div className="bg-white p-4 rounded-b-md">
            <h2 className="font-[700] text-[1.2rem] text-gray-800 mb-4">
              About
            </h2>
            <p className="text-sm text-gray-700">
              {!league?.description ? "" : league?.description}
            </p>
          </div>
        </div>
        {/* Second section */}
        <div className="bg-white shadow-lg rounded-md flex flex-wrap justify-between items-center my-8 p-4">
          <div>
            <h2 className="font-[700] text-[1rem] mb-4">Country</h2>
            <div className="flex items-center">
              {league?.country?.imgPath && (
                <img
                  className="mr-1"
                  src={league?.country?.imgPath}
                  width={20}
                  height={20}
                  alt="country"
                />
              )}
              <p>{league?.country?.value}</p>
            </div>
          </div>

          <div>
            <h2 className="font-[700] text-[1rem] mb-4">Website</h2>
            {!league?.website ? (
              "none"
            ) : (
              <Link
                href={!league?.website ? "/" : league?.website}
                target="_blank"
                className="flex items-center text-blue-600"
              >
                {league?.website.replace(/^https?:\/\//, "")}
                <ArrowUpRightIcon type={"outline"} style="w-4 h-4" />
              </Link>
            )}
          </div>

          <div>
            <h2 className="font-[700] text-[1rem] mb-4">Social Links</h2>
            <div className="flex items-center">
              {!league?.socials && league?.socials?.facebook ? (
                ""
              ) : (
                <Link className="mr-2" href={league?.socials?.facebook}>
                  <FacebookIcon style="w-6 h-6" fill="#1877f2" type={"solid"} />
                </Link>
              )}

              {!league?.socials && league?.socials?.xlink ? (
                ""
              ) : (
                <Link className="mx-2" href={league?.socials?.xlink}>
                  <XIcon style="w-6 h-6" fill="#14171a" type={"solid"} />
                </Link>
              )}

              {!league?.socials && league?.socials?.instagram ? (
                ""
              ) : (
                <Link className="mx-2" href={league?.socials?.instagram}>
                  <InstagramIcon
                    style="w-6 h-6"
                    fill="#c87532"
                    type={"solid"}
                  />
                </Link>
              )}

              {!league?.socials && league?.socials?.youtube ? (
                ""
              ) : (
                <Link className="mx-2" href={league?.socials?.youtube}>
                  <YoutubeIcon style="w-6 h-6" fill="#ff0000" type={"solid"} />
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
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
