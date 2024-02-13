import React, { useState, useEffect } from "react";
import NewsHeadlineCard from "./newsCard";
import ModalWrapper from "../modal/modalWrapper";
import SelectModalValue from "./selectModalValue";
import NotiticationResponse from "../Response/notiticationResponse";
import newsHeadlineHooksAndProps from "@/hooks/news/headlineNewsCustomHooks";

interface HeadlineProps {
  data: any;
}



export default function Headlines({ data }: HeadlineProps) {
  const arr = ["1", "2", "3", "4", "5"];
  const { myheadlines, updateNewsHeadline, response, setResponse } = newsHeadlineHooksAndProps();
  const [headlineNews, setHeadlineNews] = useState(!myheadlines? []: myheadlines);
  const [isModal, setIsModal] = useState<boolean>(false);
  const [numValue, setNumValue] = useState<string>("0");



  return (
    <>
     <div className="bg-white shadow-lg flex justify-end my-4 py-3 px-4 rounded">
       <div className="flex items-center">
          <button
              onClick={()=>updateNewsHeadline(headlineNews)}
              className="bg-custom_orange text-white shadow-md py-2 px-8 rounded"
            >
              Save
          </button>
       </div>
       </div>
      <section className="grid md:grid-cols-3 gap-4 my-4 py-6 px-6 rounded">
        {
          arr.map((id) => {
            return (
              <div className="flex items-center justify-center" key={id}>
                <NewsHeadlineCard
                  id={id}
                  setIsModal={setIsModal}
                  setNumValue={setNumValue}
                  headlineNews={headlineNews}
                  setHeadlineNews={setHeadlineNews}
                />
              </div>
            );
          })}
      </section>
      <ModalWrapper
        isOpen={isModal}
        setIsOpen={setIsModal}
        style={"!px-0 !pt-12"}
      >
        <SelectModalValue
          data={data}
          setIsModal={setIsModal}
          setStateValue={setHeadlineNews}
          numValue={numValue}
          headlineNews={headlineNews}
        />
      </ModalWrapper>
      <NotiticationResponse isOpen={response} setIsOpen={setResponse}/>
    </>
  );
}
