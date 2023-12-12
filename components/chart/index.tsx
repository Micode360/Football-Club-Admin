import React, { useCallback, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface pieChartProperties {
  data: Array<{}>;
  colors: Array<string>;
  averageRatingsValue: string;
}

export default function MyPieChart({
  data,
  colors,
  averageRatingsValue,
}: pieChartProperties) {
  return (
    <div style={{ width: 200, height: 200, position: "relative" }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
        <span className="text-[1.5rem] font-bold mt-auto mb-4">
          {" "}
          {averageRatingsValue}{" "}
        </span>
      </div>
    </div>
  );
}
