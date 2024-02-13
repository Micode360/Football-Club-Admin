import React, { useState } from "react";
import SearchBar from "@/components/searchBar";

interface responseProps {
  status: boolean | string;
  message: string;
  color: string;
}

interface SelectProperties {
  data: any;
  setIsModal:any;
  setStateValue: any;
  numValue:string;
  headlineNews:any;
}

export default function SelectModalValue({
  data,
  setIsModal,
  setStateValue,
  numValue,
  headlineNews
}: SelectProperties) {
  const [searchValue, setSearchValue] = useState("");
  const filteredAdmins = searchValue !== ""
    ? data.filter((item: any) =>
        `${item.title.toLowerCase()}}`.includes(
          searchValue.toLowerCase()
        )
      )
    : data;


    const handleAssign = (news:any) => {
      const { id, title, league, categories, coverImage, description, createdAt } = news;
      if(headlineNews.length === 5) return;
      setStateValue((prevState:any)=> [...prevState, { id, title, league, categories, coverImage:{ imgUrl:coverImage?.imgUrl, publicId: coverImage?.publicId } , description, createdAt, sn:numValue }])
      setIsModal(false);
    }


  return (
    <div className="relative flex-col justify-center text-left">
      <div className="bg-white flex justify-between my-4 py-3 px-4 border-t border-b mb-1">
        <SearchBar
          placeholder="Search news..."
          setState={setSearchValue}
          style={"!py-0 !px-0 w-full"}
        />
      </div>

      <div className="max-h-[10rem] overflow-y-auto">
      {filteredAdmins.map((data: any) => {
        return (
          <div
            className="flex items-center justify-between cursor-pointer border-b py-3 px-4"
            key={data.id}
          >
            <div className="flex items-center cursor-pointer">
              <img
                src={
                  data.coverImage.imgUrl
                    ? data.coverImage?.imgUrl
                    : "/234567891.svg"
                }
                className="rounded-full object-cover object-center w-12 h-12"
                alt="profile photo"
              />

              <div className="ml-2">
                <h4 className="lg-[text-[1rem]] font-[600] mb-1">
                  {data.title}
                </h4>
              </div>
            </div>

            <div className="flex flex-col items-end h-full">
              {
              true && (
                <button
                  type="button"
                  onClick={()=>handleAssign(data)}
                  className="bg-custom_blue text-white text-xs shadow-md border border-custom_blue py-2 px-4 rounded cursor-pointer"
                >
                  Select
                </button>
              )}
            </div>
          </div>
        );
      })}
      </div>

      <div className="md:h-4"></div>
    </div>
  );
}
