"use client";
import React, { useContext } from "react";
import EyeIcon from "@/components/icons/eye";
import NewsPaperIcon from "@/components/icons/newspaperIcon";
import DashboardLayout from "@/components/layout/DashboardLayout";
import VerifyUser from "@/components/verifyUser";
import Navbar from "@/components/navbar";
import SideBar from "@/components/sidebar";
import ShieldIcon from "@/components/icons/shield";
import StatsCard from "@/components/statsCard";
import NewsCarousel from "@/components/newsCarousel";
import NewsCard from "@/components/news/news-card";
import { MyContext } from "@/components/layout/userContext";

export default function Home() {
  const {
    myData: { leagues, news, headlines },
  } = useContext(MyContext);
  return (
    <VerifyUser>
      <main className="flex flex-col md:flex-row min-h-screen">
        <SideBar />
        <div className="w-full">
          <Navbar />
          <DashboardLayout style="py-16 mt-[4.5%] ml-0 md:ml-[5rem] px-6">
            <section className="grid md:grid-cols-3 gap-4">
              <StatsCard
                style="bg-custom_orange"
                Icon={EyeIcon}
                text={"People"}
                count={0}
              />
              <StatsCard
                style="bg-custom_blue"
                Icon={NewsPaperIcon}
                text={"New(s)"}
                count={news ? Number(news.length) : 0}
              />
              <StatsCard
                style="bg-custom_red"
                Icon={ShieldIcon}
                text={"League(s)"}
                count={leagues ? Number(leagues.length) : 0}
              />
            </section>
            <section className="md:grid md:grid-cols-3 py-8 gap-4 overflow-hidden pad_layout">
              {headlines && (
                <div className="bg-white shadow-lg rounded md:col-span-2">
                  <NewsCarousel news={headlines.headlines} />
                </div>
              )}
              {news && (
                <div className="mt-8 md:mt-0">
                  <NewsCard
                    header={"Recent News"}
                    news={news.slice(0, 4)}
                    newsLink="/news"
                  />
                </div>
              )}
              {news && (
                <div className="mt-8 md:mt-0">
                  <NewsCard header={"Most visited"} news={news.slice(0, 4)} />
                </div>
              )}
            </section>
          </DashboardLayout>
        </div>
      </main>
    </VerifyUser>
  );
}
