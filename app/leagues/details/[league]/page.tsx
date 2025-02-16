"use client";
import React, { useContext, useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import VerifyUser from "@/components/verifyUser";
import Navbar from "@/components/navbar";
import SideBar from "@/components/sidebar";
import LeagueBio from "@/components/leagues/leagueBio";
import LeagueStats from "@/components/leagues/leagueStats";
import MyOnPageLoader from "@/components/loader";
import { MyContext } from "@/components/layout/userContext";
import { useParams } from "next/navigation"; // Import useParams

export default function LeagueDetails() {
  const params = useParams(); // Use useParams to get dynamic route parameters
  const {
    myData: { leagues },
  } = useContext(MyContext);

  const [league, setLeague] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params?.league && leagues.length > 0) {
      const foundLeague = leagues.find((league: any) => {
        return league.name.split(" ").join("").toLowerCase() === params?.league;
      });

      if (foundLeague) {
        setLeague(foundLeague);
        setLoading(false);
      } else {
        // Delay the "not found" check to ensure data has time to load
        const timer = setTimeout(() => {
          setLeague("notfound");
          setLoading(false);
        }, 3000); // Adjust the timeout duration as needed
        return () => clearTimeout(timer);
      }
    }
  }, [params?.league, leagues]);

  return (
    <VerifyUser>
      <main className="flex flex-col md:flex-row min-h-screen">
        <SideBar />
        <div className="w-full">
          <Navbar />
          <DashboardLayout style="py-16 mt-[3rem] ml-0 md:ml-[5rem] px-6">
            {loading ? (
              <div className="flex items-center justify-center mt-8">
                <MyOnPageLoader text="Please wait" />
              </div>
            ) : league === "notfound" ? (
              <div className="flex items-center justify-center mt-8">
                League not found.
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