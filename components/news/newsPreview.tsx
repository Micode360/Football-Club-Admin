import React, { useState, useContext } from "react";
import parse from "html-react-parser";
import { toDate } from "@/utils/utilsFunctions";
import newsHooksAndProps from "@/hooks/news/newsCustomHooks";
import { identity } from "lodash";
import NotiticationResponse from "../Response/notiticationResponse";
import { MyContext } from "@/components/layout/userContext";
import CloseIcon from "../icons/closeIcon";
import ExIcon from "../icons/exclamationIcon";
import Modal from "../modal";

export default function NewsPreview({ News, requestAccess }: any) {
  const {
    myData: { profile },
  } = useContext(MyContext);
  const {
    isModal,
    setIsModal,
    isAuthor,
    removeAuthor,
    updateNews,
    response,
    setResponse,
    grantNewsAuthorization,
  } = newsHooksAndProps();
  const [author, setAuthor] = useState({
    id: "",
    firstName: "",
    lastName: "",
  });


  return (
    <>
      <section className="rounded-md">
        <div className="bg-white shadow-lg p-4">
          <div className="w-full h-[20rem] relative overflow-hidden rounded-t-md">
            {/* Blurred Background */}
            <div
              className="absolute inset-0 bg-cover bg-center blur-md"
              style={{
                backgroundImage: `url(${News?.coverImage?.imgUrl})`,
              }}
            ></div>

            {/* Centered Image */}
            <div className="absolute inset-0 flex items-center justify-center">
              <img
                className="object-fit h-[20rem] object-center"
                src={News?.coverImage?.imgUrl}
                alt="news-cover"
              />
            </div>
          </div>
          <h1 className="font-[700] mt-2 text-[1.5rem] md:text-[2rem]">{News?.title}</h1>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between bg-white shadow-lg p-4">
          <div className="flex flex-col md:flex-row md:items-center justify-center">
            <span className="bg-black mb-2 md:mb-0 w-fit mr-2 text-white font-[600] rounded py-1 px-[0.5rem]">
              {News?.league}
            </span>

            {News?.status === "draft" && (
              <span
                onClick={() => {
                  updateNews({
                    id: News.id,
                    userId: profile?.id,
                    status: "to_be_published",
                  });
                }}
                className="bg-custom_green hover:bg-green-700 cursor-pointer w-fit mr-2 text-white font-[600] rounded py-1 px-[1rem]"
              >
                Publish news
              </span>
            )}
          </div>
          {isAuthor(News?.id) && requestAccess && requestAccess !== "none" && (
            <div className="flex items-center">
              <button
                onClick={() =>
                  grantNewsAuthorization({
                    id: News.id,
                    type: "add",
                    userId: requestAccess,
                  })
                }
                className="bg-custom_blue hover:bg-blue-500 text-white text-xs shadow-md border mr-2 border-custom_blue py-2 px-4 rounded cursor-pointer"
              >
                Grant Access
              </button>

              <button
                onClick={() =>
                  grantNewsAuthorization({
                    id: News.id,
                    type: "reject",
                    userId: requestAccess,
                  })
                }
                className="bg-custom_orange hover:bg-orange-500 text-white text-xs shadow-md border border-custom_orange py-2 px-4 rounded cursor-pointer"
              >
                Reject Access
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-wrap md:items-center justify-between bg-white shadow-lg p-4 mt-2">
          <div className="flex flex-col">
            <span className="mb-2 font-[700]">{News?.author}</span>
            <span className="text-xs">
              {toDate(parseInt(News?.createdAt, 10))}
            </span>
          </div>

          <div className="flex items-center">
            <span className="font-[600] mr-2">Editor(s):</span>
            {News.authorIds.map(
              ({ firstName, lastName, profilePic, id }: any, index: number) => (
                <div className="relative" key={index}>
                  <span
                    onClick={() => {
                      if (
                        profile.role === "Super Admin" ||
                        (profile.role !== "Super Admin" &&
                          News.authorIds[0].id === profile.id)
                      ) {
                        setIsModal(true);
                        setAuthor({
                          id,
                          firstName,
                          lastName,
                        });
                      } else {
                        setResponse({
                          status: true,
                          message: `You have to be Super Admin or the first creator to be able to delete this news.`,
                          color: "red",
                        });
                      }
                    }}
                    className="bg-black rounded-full absolute -top-1 -right-0 cursor-pointer"
                  >
                    <CloseIcon type={"circle"} style={"w-4 h-4 text-white"} />
                  </span>
                  <img
                    src={profilePic?.imgUrl ?? "/234567891.svg"}
                    width={50}
                    height={50}
                    className="w-10 h-10 rounded-full object-cover object-center mr-1"
                    alt="profile pic"
                  />
                </div>
              )
            )}
          </div>
        </div>

        <div className="bg-white shadow-lg p-4 mt-2 pb-4">
          {parse(News.content)}
        </div>
      </section>
      <NotiticationResponse isOpen={response} setIsOpen={setResponse} />
      <Modal
        isOpen={isModal}
        Icon={<ExIcon style="cursor-pointer" type={"circle"} />}
        setIsOpen={setIsModal}
        text={`Are you sure you want to remove ${
          profile?.id === author?.id
            ? "yourself"
            : `${author.firstName} ${author.lastName}`
        }  from the role: Author / Editor?`}
        button1={() => removeAuthor(News.id, author?.id)}
        button1Text="Yes, I'm sure"
        button2={() => setIsModal(!isModal)}
        button2Text="No, I take it back"
      />
    </>
  );
}
