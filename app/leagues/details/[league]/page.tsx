"use client";
import DashboardLayout from "@/components/layout/DashboardLayout";
import VerifyUser from "@/components/verifyUser";
import Navbar from "@/components/navbar";
import SideBar from "@/components/sidebar";
import LeagueBio from "@/components/leagues/leagueBio";
import LeagueStats from "@/components/leagues/leagueStats";

interface leagueParamsProps {
  params: { league: string };
}

export default function LeagueDetails({ params }: leagueParamsProps) {
  return (
    <VerifyUser>
      <main className="flex flex-col md:flex-row min-h-screen">
        <SideBar />
        <div className="w-full">
          <Navbar />
          <DashboardLayout style="py-16 mt-[3rem] ml-0 md:ml-[5rem] px-6">
            <LeagueBio />
            <LeagueStats />
          </DashboardLayout>
        </div>
      </main>
    </VerifyUser>
  );
}
