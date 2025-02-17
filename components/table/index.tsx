import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import ArrowIcon from "../icons/arrow";
import Modal from "@/components/modal";
import ExIcon from "@/components/icons/exclamationIcon";
import DropDownMenu from "@/components/dropDownMenu";
import { toDate } from "@/utils/utilsFunctions";
import SearchBar from "../searchBar";

type DeleteProps = {
  id:string,
  imgId:string
};


interface tableProperties {
   headers: Array<string>;
   columns: any;
   data: any;
   optionsData:any;
   searchPlaceHolder?: string;
   isModal?:any; 
   setIsModal?:any;
   deleteFunction: () => void;
   handleDeleteMultipleFunction: (selectedItems:Array<DeleteProps>) => void;
}


export default function Table({headers, columns, data, optionsData, searchPlaceHolder, isModal, setIsModal, deleteFunction, handleDeleteMultipleFunction }:tableProperties) {
  const [selectedItems, setSelectedItems] = useState<Array<DeleteProps>>([]);
  const [selectStatus, setSelectStatus] = useState<boolean>(false);
  const itemsPerPage: number = 10;
  const pageCount: number = Math.ceil(data.length / itemsPerPage);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const [onClickData, setOnClickData] = useState("");
  const [selectOption, setSelectedOption] = useState("");
  const [searchValue, setSearchValue ] = useState("");

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  const currentData:any = data.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage,
  );

  const handleCheckboxChange = ({id, imgId}:any) => {
    const selectedItem = selectedItems.some((selectedItem:any) => selectedItem.id === id);
    if (selectedItem) setSelectedItems(selectedItems.filter((item:any) => item.id !== id));
     else setSelectedItems([...selectedItems, {id, imgId}]);
   
  };

  const handleAllSelect = () => {
    setSelectStatus((prevSelectStatus) => {
      const updatedSelectStatus = !prevSelectStatus;

      if (updatedSelectStatus) setSelectedItems(data.map((item:any) => ({id: item.id , imgId: item.coverImage.publicId})));
      else setSelectedItems([]);

      return updatedSelectStatus;
    });
  };

  const sortedAndFilterNews = [...currentData]
  .reverse()
  .filter((data: any) =>
    searchValue === ""
      ? data
      : `${data.title.toLowerCase()}`.includes(
          searchValue.toLowerCase()
        )
  );

  const handleDeleteMultiple = () => {
    setIsModal(!isModal)
    handleDeleteMultipleFunction(selectedItems);
  }

  return (
    <section>
      <div className="bg-white shadow-lg flex flex-col md:flex-row justify-between my-4 py-3 px-4 rounded">
       <div className="flex justify-between md:justify-start items-center mb-3 md:mb-0">
       <button
          onClick={handleAllSelect}
          className={`${
            !selectStatus
              ? "bg-custom_orange hover:bg-orange-500"
              : "bg-custom_blue"
          } text-white shadow-md py-2 px-4 mr-2 rounded`}
        >
          {!selectStatus ? "Select All" : "Selected"}
        </button>
        <div>
          {selectedItems.length < 1 ? (
            ""
          ) : (
            <button
              onClick={handleDeleteMultiple}
              className="bg-custom_orange text-white shadow-md py-2 px-4 rounded"
            >
              Delete Selected
            </button>
          )}
          </div>
       </div>

        <div className="w-full md:w-[40%]">
          <SearchBar placeholder={searchPlaceHolder} setState={setSearchValue} style={"!py-0 !px-0 w-full"} />
        </div>
      </div>

      <div className="bg-white rounded shadow-lg my-4 md:my-8 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3"></th>
              <th className="px-6 py-3 text-xs md:text-base text-left">S/N</th>
              {headers.map((header, id) => (
                <th
                  key={id}
                  className="px-6 py-3 text-xs md:text-base text-left"
                >
                  {header}
                </th>
              ))}
              <th className="px-6 py-3 text-xs md:text-base text-left">
                <div className="flex items-center justify-center text-center cursor-pointer">
                  Options
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedAndFilterNews.map((item: any, index: number) => (
              <tr key={index}>
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    className="w-[1rem] h-[1rem] cursor-pointer"
                    onChange={() => handleCheckboxChange({id: item.id , imgId: item.coverImage.publicId})}
                    checked={selectedItems.some((selectedItem:any) => selectedItem.id === item.id)}
                  />
                </td>
                <td className="px-6 py-47 text-xs md:text-base whitespace-nowrap">
                 { index + 1 }
                </td>
                {columns.map(({ name, type, color }: any) => {
                  const currentDate:any = new Date();
                  if (type === "string") {
                    return (
                      <td
                        className="px-6 py-47 text-xs md:text-base whitespace-nowrap"
                        key={name}
                      >
                         {item[name]?.length > 20 ? item[name].slice(0, 19) + "..." :item[name]?.length < 1? "none":item[name]}
                      </td>
                    );
                  }
                  if (type === "string-color") {
                    const color = {
                      draft: "#00678d",
                      published: "#4CAF50",
                      rejected: "#D9534F",
                    }
                    return (
                      <td
                        className="px-6 py-47 text-xs md:text-base whitespace-nowrap"
                        key={name}
                      >
                         <p className="text-white text-center w-fit px-3 rounded-full" style={{backgroundColor: color[item[name] as keyof typeof color]}}>
                          {item[name]?.length > 20 ? item[name].slice(0, 19) + "..." :item[name]?.length < 1? "none":item[name]}
                         </p>
                      </td>
                    );
                  }
                  if (type === "array") {
                    return (
                      <td
                        className="px-6 py-47 text-xs md:text-base whitespace-nowrap"
                        key={name}
                      >
                         {Array.isArray(item[name]) ? item[name].join(", ") : item[name]}
                      </td>
                    );
                  }
                  if (type === "date") {
                    return (
                      <td
                        className="px-6 py-47 text-xs md:text-base whitespace-nowrap"
                        key={name}
                      >
                         {!item[name]? toDate(currentDate):toDate(parseInt(item[name], 10))}
                      </td>
                    );
                  }
                })}
                <td className="px-6 py-4 text-xs md:text-base whitespace-nowrap">
                  <div
                    onClick={(e: any) => {
                      setShowDropdown(!showDropdown);
                      setOnClickData(e.target.className);
                      setSelectedOption(item.id);
                    }}
                    className="relative flex items-center justify-center text-center cursor-pointer"
                  >
                    {"..."}
                    {selectOption === item.id && (
                      <DropDownMenu
                        data={optionsData({id: item.id , imgId: item.coverImage.publicId, item})}
                        showDropdown={showDropdown}
                        setShowDropdown={setShowDropdown}
                        onClickData={onClickData}
                        style="!w-fit right-0 md:right-none bg-white z-[2]"
                      />
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ReactPaginate
        previousLabel={
          <ArrowIcon direction="left" style="text-xs md:text-base" />
        }
        nextLabel={<ArrowIcon direction="right" style="text-xs md:text-base" />}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageChange}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />
      <Modal
        isOpen={isModal}
        Icon={<ExIcon style="cursor-pointer" type={"circle"} />}
        setIsOpen={setIsModal}
        text={`Are you sure you want to delete the selected news article${
          selectedItems.length > 1 ? "s" : ""
        }?`}
        button1={() => {
          deleteFunction()
          setSelectedItems([]);
        }}
        button1Text="Yes, I'm sure"
        button2={() => setIsModal(!isModal)}
        button2Text="No, I take it back"
      />
    </section>
  );
}
