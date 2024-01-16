import React, { useContext } from "react";
import LeagueCard from "./leagueCard";
import { MyContext } from "@/components/layout/userContext";


export default function LeagueList() {
  const {
    myData: { leagues }
  } = useContext(MyContext);
  return (
    <div className="flex justify-between my-4 py-3">
      <div className="grid grid-cols-3 league_list gap-4 w-full">

        {
          leagues.map((league:any)=> {
            return (
              <div key={league.id}>
                   <LeagueCard
                    id={league?.id}
                    imgId={league?.logo?.publicId}
                    title={league.name}
                    fromColor={league?.backgroundGradient?.fromColor}
                    toColor={league?.backgroundGradient?.toColor}
                    description={!league?.description?"": `${league?.description.slice(0, 11)}...`}
                    path={`${league.name.split(" ").join("").toLowerCase()}`}
                    imgPath={!league?.logo? "": league?.logo?.imgUrl}
                  />
              </div>
            )
          })
        }
       
      </div>
    </div>
  );
}
