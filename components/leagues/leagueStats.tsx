import React from "react";
import MyPieChart from "../chart";
import QuestionIcon from "../icons/questionIcon";

export default function LeagueStats() {
  const data = [
    { name: "Viewed Articles", value: 92 },
    { name: "Total Likes", value: 40 },
    { name: "Total Comments", value: 6 },
    { name: "Total Articles", value: 56 },
  ];

  const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const averageRating =
  ((data[0].value + 2 * data[1].value + 3 * data[2].value) / 6).toFixed(1);

  return (
    <section className="grid md:grid-cols-2 gap-4 my-4">
      <div className="bg-white shadow-lg rounded-md grid grid-cols-2 py-4 gap-8">
        {data.map(({ name, value }: any, index) => (
          <div className="flex flex-col justify-between items-between p-4 py-4" key={index}>
            <h2 className="flex items-center font-[700] text-[1rem] mb-6">
              {name}
              <QuestionIcon
                setOnClick={() => ""}
                type={"circle"}
                style="w-4 h-4 ml-1"
              />
            </h2>
            <span className="text-[1.3rem] md:text-[2.5rem] text-[#131a33] font-[700]">
              {value}
            </span>
          </div>
        ))}
      </div>
      {/* Second Section */}
      <div className="bg-white shadow-lg rounded-md px-4 py-8">
        <h2 className="font-[700] text-[1.5rem] text-center lg:text-left">Average Ratings</h2>
        <div className="grid justify-center items-center lg:grid-cols-2 gap-4">
          <MyPieChart data={data} colors={colors} averageRatingsValue={averageRating} />
          <div className="p-4">
            {data.map(({ name }: any, index) => {
              const setColor = colors[index];
              return (
                <div className="flex items-center mb-2" key={index}>
                  <span style={{ backgroundColor: setColor}} className={`w-8 h-5 mr-2`}></span>
                  {name}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
