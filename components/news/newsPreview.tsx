import React from "react";
import parse from "html-react-parser";
import { toDate } from "@/utils/utilsFunctions";
import newsHooksAndProps from "@/hooks/news/newsCustomHooks";
import { identity } from "lodash";
import NotiticationResponse from "../Response/notiticationResponse";


export default function NewsPreview({ News, requestAccess }: any) {
 const { isAuthor, response, setResponse, grantNewsAuthorization } = newsHooksAndProps();
  console.log({News, requestAccess}, 'News');
  return (
   <>
     <section className="rounded-md">
      <div className="bg-white shadow-lg p-4">
        <div className={`w-full`}>
          <img
            className="object-cover rounded-t-md h-[20rem] object-center w-full"
            src={News?.coverImage && News?.coverImage?.imgUrl}
            alt="news-cover"
          />
        </div>
        <h1 className="font-[700] mt-2 md:text-[2rem]">{News?.title}</h1>
      </div>

      <div className="flex items-center justify-between bg-white shadow-lg p-4 pt-0">
        <span className="bg-black w-fit mr-2 text-white font-[600] rounded py-1 px-[0.5rem]">
          {News?.league}
        </span>
        {
          (isAuthor(News.id) && requestAccess && requestAccess !== "") && (
            <div className="flex items-center">
              <button onClick={()=>grantNewsAuthorization({id: News.id, userId: requestAccess})} className="bg-custom_blue hover:bg-blue-500 text-white text-xs shadow-md border mr-2 border-custom_blue py-2 px-4 rounded cursor-pointer">
              Grant Access
            </button>

            <button className="bg-custom_orange hover:bg-orange-500 text-white text-xs shadow-md border border-custom_orange py-2 px-4 rounded cursor-pointer">
              Reject Access
            </button>
            </div>
          )
        }
      </div>

      <div className="flex items-center md:justify-between bg-white shadow-lg p-4 mt-2">
        <div className="flex flex-col">
          <span className="mb-2 font-[700]">{News?.author}</span>
          <span className="text-xs">{toDate(parseInt(News?.createdAt, 10))}</span>
        </div>

        <div className="flex items-center">
          <span className="font-[600] mr-2">Editor(s):</span>
          {
            News.authorIds.map(({ profilePic }:any, id:number)=>(
              <img
                key={id}
                src={profilePic?.imgUrl ?? "/234567891.svg"}
                width={50}
                height={50}
                className="w-10 h-10 rounded-full object-cover object-center mr-1"
                alt="profile pic"
              />
            ))
          }
        </div>
      </div>

      <div className="bg-white shadow-lg p-4 mt-2 pb-4">
        {parse(News.content)}
      </div>
    </section>
     <NotiticationResponse isOpen={response} setIsOpen={setResponse} />
   </>
  );
}
