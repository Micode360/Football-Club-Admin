import React, { useState } from "react";
import CircleIcon from "../icons/circle";
import CloseIcon from "../icons/closeIcon";

interface NewsHeadlineCardProps {
  id: String;
  setIsModal: any;
  setNumValue: any;
  headlineNews: any;
  setHeadlineNews:any;
}

export default function NewsHeadlineCard({
  id,
  setIsModal,
  setNumValue,
  headlineNews,
  setHeadlineNews
}: NewsHeadlineCardProps) {
  const filteredNews = headlineNews.filter((news: any) => news.sn === id)[0];
  const handleClick = () => {
    setIsModal(true);
    setNumValue(id);
  };

  const handleDelete = () => {
      const removeNews = headlineNews.filter((news:any)=> news.sn !== id)
      setHeadlineNews(removeNews);
  }
  return (
    <div
      className="relative bg-white shadow-lg flex items-center justify-center rounded-md px-2 w-[12rem] h-[12rem] border border-custom_orange active:scale-[1.02]"
    >
      {filteredNews && (
        <span onClick={handleDelete} className="bg-black rounded-full absolute -top-2 -right-2">
          <CloseIcon type={"circle"} style={"w-6 h-6 text-white"} />
        </span>
      )}
      {!filteredNews ? (
        <CircleIcon
        setOnClick={handleClick}
          property="circle-plus"
          style="!w-[4rem] !h-[4rem] text-gray-500 hover:text-gray-800 cursor-pointer"
        />
      ) : (
        <div className="flex flex-col justify-start item-start w-full h-fit">
          <img
            className="w-full h-[100px] object-cover object-center"
            src={filteredNews.coverImage.imgUrl}
            alt="headline_image"
          />
          <div>
            <h1 className="font-[700] mb-1">
              {filteredNews?.title?.slice(0, 20) + "..."}
            </h1>
            <span className="bg-black text-xs w-fit text-white font-[600] rounded py-1 px-[0.5rem] mb-2">
              {filteredNews?.league}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
