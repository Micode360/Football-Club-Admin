"use client";
import React, { useContext } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import VerifyUser from "@/components/verifyUser";
import Navbar from "@/components/navbar";
import SideBar from "@/components/sidebar";
import LeagueBio from "@/components/leagues/leagueBio";
import LeagueStats from "@/components/leagues/leagueStats";
import MyOnPageLoader from "@/components/loader";
import { MyContext } from "@/components/layout/userContext";


interface leagueParamsProps {
  params: { league: string };
}

export default function LeagueDetails({ params }: leagueParamsProps) {
  const {
    myData: { leagues },
  } = useContext(MyContext);

  const league = leagues.filter((league: any) => {
    return league.name.split(" ").join("").toLowerCase() === params?.league;
  })[0];

  return (
    <VerifyUser>
      <main className="flex flex-col md:flex-row min-h-screen">
        <SideBar />
        <div className="w-full">
          <Navbar />
          <DashboardLayout style="py-16 mt-[3rem] ml-0 md:ml-[5rem] px-6">
            {!league ? (
               <div className="flex items-center justify-center mt-8">
                  <MyOnPageLoader text="Please wait" />
               </div>
            ) : (
              <>
                <LeagueBio league={league} />
                <LeagueStats />
              </>
            )}
          </DashboardLayout>
        </div>
      </main>
    </VerifyUser>
  );
}
