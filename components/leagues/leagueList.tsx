import React from "react";
import LeagueCard from "./leagueCard";

export default function LeagueList() {
  return (
    <div className="flex justify-between my-4 py-3">
      <div className="grid grid-cols-3 league_list gap-4 w-full">
        <LeagueCard title="Premier League" backgroundColor="bg-red-500" description="The English..." path="/details" imgPath="/prem_logo.svg"/>
        <LeagueCard title="Spanish La Liga" backgroundColor="bg-blue-500" description="Spanish La Liga" path="/details" imgPath="/7896fd456345.svg"/>
        <LeagueCard title="Premier League" backgroundColor="bg-red-500" description="The English..." path="/details" imgPath="/prem_logo.svg"/>
      </div>
    </div>
  );
}
