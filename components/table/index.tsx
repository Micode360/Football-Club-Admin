import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import ArrowIcon from "../icons/arrow";

const data = [
  {
    id: 1,
    sn: 1,
    title: "News Title 1",
    createdAt: "2023-11-03",
    league: "Premier League",
    categories: "Sports",
    tags: "Tag1, Tag2",
    options: "...",
  },
  {
    id: 2,
    sn: 2,
    title: "News Title 2",
    createdAt: "2023-11-04",
    league: "La Liga",
    categories: "Sports",
    tags: "Tag3, Tag4",
    options: "...",
  },
  {
    id: 3,
    sn: 3,
    title: "News Title 3",
    createdAt: "2023-11-05",
    league: "NBA",
    categories: "Sports",
    tags: "Tag5, Tag6",
    options: "...",
  },
  {
    id: 4,
    sn: 4,
    title: "News Title 4",
    createdAt: "2023-11-06",
    league: "Serie A",
    categories: "Sports",
    tags: "Tag7, Tag8",
    options: "...",
  },
  {
    id: 5,
    sn: 5,
    title: "News Title 5",
    createdAt: "2023-11-07",
    league: "NFL",
    categories: "Sports",
    tags: "Tag9, Tag10",
    options: "...",
  },
  {
    id: 6,
    sn: 6,
    title: "News Title 6",
    createdAt: "2023-11-08",
    league: "NHL",
    categories: "Sports",
    tags: "Tag11, Tag12",
    options: "...",
  },
  {
    id: 7,
    sn: 7,
    title: "News Title 7",
    createdAt: "2023-11-09",
    league: "Cricket",
    categories: "Sports",
    tags: "Tag13, Tag14",
    options: "...",
  },
  {
    id: 8,
    sn: 8,
    title: "News Title 8",
    createdAt: "2023-11-10",
    league: "Tennis",
    categories: "Sports",
    tags: "Tag15, Tag16",
    options: "...",
  },
  {
    id: 9,
    sn: 9,
    title: "News Title 9",
    createdAt: "2023-11-11",
    league: "Golf",
    categories: "Sports",
    tags: "Tag17, Tag18",
    options: "...",
  },
  {
    id: 10,
    sn: 10,
    title: "News Title 10",
    createdAt: "2023-11-12",
    league: "MLS",
    categories: "Sports",
    tags: "Tag19, Tag20",
    options: "...",
  },
  {
    id: 11,
    sn: 11,
    title: "News Title 11",
    createdAt: "2023-11-13",
    league: "Rugby",
    categories: "Sports",
    tags: "Tag21, Tag22",
    options: "...",
  },
  {
    id: 12,
    sn: 12,
    title: "News Title 12",
    createdAt: "2023-11-14",
    league: "Athletics",
    categories: "Sports",
    tags: "Tag23, Tag24",
    options: "...",
  },
  {
    id: 13,
    sn: 13,
    title: "News Title 13",
    createdAt: "2023-11-15",
    league: "Boxing",
    categories: "Sports",
    tags: "Tag25, Tag26",
    options: "...",
  },
  {
    id: 14,
    sn: 14,
    title: "News Title 14",
    createdAt: "2023-11-16",
    league: "Swimming",
    categories: "Sports",
    tags: "Tag27, Tag28",
    options: "...",
  },
  {
    id: 15,
    sn: 15,
    title: "News Title 15",
    createdAt: "2023-11-17",
    league: "Cycling",
    categories: "Sports",
    tags: "Tag29, Tag30",
    options: "...",
  },
];

export default function Table() {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const itemsPerPage: number = 10;
  const pageCount: number = Math.ceil(data.length / itemsPerPage);
  const [currentPage, setCurrentPage] = useState<number>(0); 


  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  const currentData: any[] = data.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );


  const handleCheckboxChange = (itemId: number) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter((item) => item !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  return (
    <section>
      <div className="bg-white rounded shadow-lg my-4 md:my-8 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3"></th>
              <th className="px-6 py-3 text-xs md:text-base text-left">S/N</th>
              <th className="px-6 py-3 text-xs md:text-base text-left">Title</th>
              <th className="px-6 py-3 text-xs md:text-base text-left">Created At</th>
              <th className="px-6 py-3 text-xs md:text-base text-left">League</th>
              <th className="px-6 py-3 text-xs md:text-base text-left">Categories</th>
              <th className="px-6 py-3 text-xs md:text-base text-left">Tags</th>
              <th className="px-6 py-3 text-xs md:text-base text-left"><div className="flex items-center justify-center text-center cursor-pointer">Options</div></th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item: any) => (
              <tr key={item.id}>
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    onChange={() => handleCheckboxChange(item.id)}
                    checked={selectedItems.includes(item.id)}
                  />
                </td>
                <td className="px-6 py-47 text-xs md:text-base whitespace-nowrap">{item.sn}</td>
                <td className="px-6 py-4 text-xs md:text-base whitespace-nowrap">{item.title}</td>
                <td className="px-6 py-4 text-xs md:text-base whitespace-nowrap">
                  {item.createdAt}
                </td>
                <td className="px-6 py-4 text-xs md:text-base whitespace-nowrap">{item.league}</td>
                <td className="px-6 py-4 text-xs md:text-base whitespace-nowrap">
                  {item.categories}
                </td>
                <td className="px-6 py-4 text-xs md:text-base whitespace-nowrap">{item.tags}</td>
                <td className="px-6 py-4 text-xs md:text-base whitespace-nowrap"><div className="flex items-center justify-center text-center cursor-pointer">{item.options}</div></td>
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
    </section>
  );
}
