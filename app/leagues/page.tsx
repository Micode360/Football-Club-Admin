"use client";
import React, { useContext } from "react";
import { useSearchParams } from "next/navigation";
import DashboardLayout from "@/components/layout/DashboardLayout";
import VerifyUser from "@/components/verifyUser";
import Navbar from "@/components/navbar";
import SideBar from "@/components/sidebar";
import Tabs from "@/components/navbar/tabs";
import LeagueList from "@/components/leagues/leagueList";
import AddLeague from "@/components/leagues/addLeague";
import { MyContext } from "@/components/layout/userContext";

export default function Leagues() {
  const { myData: { role }} = useContext(MyContext);
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "";
  const headers = ["Leagues", role === "Super Admin"? "Add League":""];
  const components = [<LeagueList />, <AddLeague />];

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
    </VerifyUser>
  );
}
