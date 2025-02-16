"use client";
import React, { useContext, useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useSearchParams, useParams } from "next/navigation";
import VerifyUser from "@/components/verifyUser";
import Navbar from "@/components/navbar";
import SideBar from "@/components/sidebar";
import MyOnPageLoader from "@/components/loader";
import { MyContext } from "@/components/layout/userContext";
import NewsPreview from "@/components/news/newsPreview";

export default function NewsDetails() {
  const searchParams = useSearchParams();
  const params = useParams(); // Use useParams to get dynamic route parameters
  const requestAccess = searchParams.get("request");
  const [newsToView, setNewsToView] = useState<boolean | string>(false);  
  const {
    myData: { news },
  } = useContext(MyContext);

  const News: any = news.filter(
    (article: any) => article.id === params?.article
  )[0];

  useEffect(() => {
    if (params?.article) {
      setNewsToView(News);
      const timer = setTimeout(() => {
        if (!News) {
          setNewsToView("notfound");
        }
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [params?.article, News]);

  return (
    <VerifyUser>
      <main className="flex flex-col md:flex-row min-h-screen">
        <SideBar />
        <div className="w-full">
          <Navbar />
          <DashboardLayout style="py-16 mt-[3rem] ml-0 md:ml-[5rem] px-6">
            {!newsToView ? (
              <div className="flex items-center justify-center mt-8">
                <MyOnPageLoader text="Please wait" />
              </div>
            ) : newsToView === "notfound" ? (
              <div className="flex items-center justify-center mt-8">
                News not found.
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