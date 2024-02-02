import React, { useState, useEffect } from "react";
import NewsForm from "./newsForm";
import parse from "html-react-parser";
import { toDate } from "@/utils/utilsFunctions";

export default function NewsPreview({ News }: any) {
  return (
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

      <div className="flex flex-col bg-white shadow-lg p-4 pt-0">
        <span className="bg-black w-fit text-white font-[600] rounded py-1 px-[0.5rem] mb-2">
          {News?.league}
        </span>
      </div>

      <div className="flex flex-col bg-white shadow-lg p-4 mt-2">
        <span className="mb-2 font-[700]">{News?.author}</span>
        <span className="text-xs">{toDate(parseInt(News?.createdAt, 10))}</span>
      </div>

      <div className="bg-white shadow-lg p-4 mt-2 pb-4">
        {parse(News.content)}
      </div>
    </section>
  );
}
