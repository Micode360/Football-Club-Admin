"use client";
import React, { useContext } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useSearchParams } from "next/navigation";
import VerifyUser from "@/components/verifyUser";
import Navbar from "@/components/navbar";
import SideBar from "@/components/sidebar";
import MyOnPageLoader from "@/components/loader";
import { MyContext } from "@/components/layout/userContext";
import NewsPreview from "@/components/news/newsPreview";

interface newParamsProps {
  params: { article: string };
}

export default function NewsDetails({ params }: newParamsProps) {
  const searchParams = useSearchParams();
  const requestAccess = searchParams.get("request");
  const {
    myData: { news },
  } = useContext(MyContext);

  const News: any = news.filter(
    (article: any) => article.id === params?.article
  )[0];

  return (
    <VerifyUser>
      <main className="flex flex-col md:flex-row min-h-screen">
        <SideBar />
        <div className="w-full">
          <Navbar />
          <DashboardLayout style="py-16 mt-[3rem] ml-0 md:ml-[5rem] px-6">
            {!News ? (
              <div className="flex items-center justify-center mt-8">
                <MyOnPageLoader text="Please wait" />
              </div>
            ) : (
              <>
                <NewsPreview News={News} requestAccess={requestAccess} />
              </>
            )}
          </DashboardLayout>
        </div>
      </main>
    </VerifyUser>
  );
}
