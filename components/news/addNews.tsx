import React, { useState, useEffect } from "react";
import NewsForm from "./newsForm";
import parse from "html-react-parser";

export default function AddNews() {
  const [preview, setPreview] = useState({
    title: "",
    description: "",
    author: "",
    league: "",
    category: "",
    coverimage: null,
    content: "",
  });

  const handleCoverImage = () => {
    if (!preview.coverimage) return "";
    return (
      <img src={URL.createObjectURL(preview.coverimage)} alt="cover image" />
    );
  };

  return (
    <section className="bg-white shadow-lg grid md:grid-cols-2 gap-4 my-4 py-6 px-6 rounded">
      <NewsForm setPreview={setPreview} />
      <div className="n_preview border-l py-2 px-4">
        <h4 className="text-[1.2rem] font-[700]"> Preview </h4>
        <div>
          <div className="my-4 flex items-center w-full px-4 py-4 rounded-md bg-gray-100 border border-gray-200 text-xs mb-2 p-4">
            <h1 className="text-[1.2rem] font-[700]">
              <span className="text-xs text-[1.2rem] md:text-base font-[400] mr-2">
                Title:
              </span>
              {preview.title}
            </h1>
          </div>

          <div className="my-4 flex items-center w-full px-4 py-4 rounded-md bg-gray-100 border border-gray-200 text-xs mb-2 p-4">
            <p className="text-[0.9rem]">
              <span className="text-xs text-[1.2rem] md:text-base mr-2">
                Description:
              </span>
              {preview.description}
            </p>
          </div>

          <div className="my-4 flex items-center w-full px-4 py-4 rounded-md bg-gray-100 border border-gray-200 text-xs mb-2 p-4">
            <p className="text-[0.9rem]">
              <span className="text-xs text-[1.2rem] md:text-base mr-2">
                Author:
              </span>
              {preview.author}
            </p>
          </div>

          <div className="my-4 grid grid-cols-2 w-full px-4 py-4 rounded-md bg-gray-100 border border-gray-200 text-xs mb-2 p-4">
            <div className="flex items-center">
              <div className="text-xs md:text-base">League:</div>
              <div className="ml-4 bg-custom_orange text-xs rounded-md w-fit px-4 py-2 text-white">
                {preview.league}
              </div>
            </div>

            <div className="flex items-center">
              <div className="text-xs md:text-base">Category:</div>
              <div className="ml-4 bg-custom_blue text-xs rounded-md w-fit px-4 py-2 text-white">
                {preview.category}
              </div>
            </div>
          </div>
          <div className="my-4">{handleCoverImage()}</div>
          <div>
            <h1 className="text-xs md:text-base">Content:</h1>
            <div className="n_content px-4 py-4 rounded-md bg-gray-100 border border-gray-100">
              {parse(preview.content)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
