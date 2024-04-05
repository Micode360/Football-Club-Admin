"use client";
import React, { useContext } from "react";
import { useSearchParams } from "next/navigation";
import DashboardLayout from "@/components/layout/DashboardLayout";
import VerifyUser from "@/components/verifyUser";
import Navbar from "@/components/navbar";
import SideBar from "@/components/sidebar";
import Tabs from "@/components/navbar/tabs";
import Table from "@/components/table";
import AddNews from "@/components/news/addNews";
import { MyContext } from "@/components/layout/userContext";
import newsHooksAndProps from "@/hooks/news/newsCustomHooks";
import NotiticationResponse from "@/components/Response/notiticationResponse";
import Headlines from "@/components/news/headlines";

const tableHeaders = [
  "Title",
  "Description",
  "Author",
  "League",
  "Categories",
  "Created At",
];

const columns = [
  { name: "title", type: "string" },
  { name: "description", type: "string" },
  { name: "author", type: "string" },
  { name: "league", type: "string" },
  { name: "categories", type: "array" },
  { name: "createdAt", type: "date" },
];

export default function News() {
  const {
    myData: { role, news },
  } = useContext(MyContext) ?? {};
  const {
    tableOptionsNavData,
    isModal,
    setIsModal,
    handleNewsDelete,
    handleDeleteMultipleNews,
    response,
    setResponse,
  } = newsHooksAndProps();
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "";
  const headers = ["News", "Add News",role === "Super Admin"? "Headlines":""];

  const components = [
    <Table
      headers={tableHeaders}
      columns={columns}
      data={news}
      optionsData={tableOptionsNavData}
      searchPlaceHolder="Search title"
      isModal={isModal}
      setIsModal={setIsModal}
      deleteFunction={handleNewsDelete}
      handleDeleteMultipleFunction={handleDeleteMultipleNews}
    />,
    <AddNews />,
    role === "Super Admin"? <Headlines data={news} />:""
  ];

  return (
    <VerifyUser>
      <main className="flex flex-col md:flex-row min-h-screen">
        <SideBar />
        <div className="w-full">
          <Navbar />
          <DashboardLayout style="py-16 mt-[3rem] ml-0 md:ml-[5rem] px-6">
            <Tabs headers={headers} components={components} tab={tab} />
          </DashboardLayout>
        </div>
      </main>
      <NotiticationResponse isOpen={response} setIsOpen={setResponse} />
    </VerifyUser>
  );
}
