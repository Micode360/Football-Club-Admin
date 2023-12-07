import { string } from "prop-types";
import React from "react";

interface MessageProperties {
    key: string | number;
    message: string;
    time: string;
    read: boolean;
    setOnClick?: () => void;
}

export default function MessageContainer({key, message, time, read, setOnClick}:MessageProperties) {
  return (
    <section onClick={setOnClick} className="flex items-center cursor-pointer mb-2 bg-white shadow-lg my-4 py-3 px-4 rounded" key={key}>
      {true ? (
        <img
          src={"/mp.webp"}
          className="rounded-full object-cover object-center w-10 h-10 mr-4"
          alt="profile photo"
        />
      ) : (
        <div className="w-10 h-10 bg-red-500 flex items-center justify-center mr-4 text-white rounded-full">
          K
        </div>
      )}
      <div>
        <h4>
          {/* <span className="font-bold">James Card</span> created a new Article
          for the <span className="font-bold">Premier League</span> */}
          {message}
        </h4>
        <p>{time}</p>
      </div>
    </section>
  );
}
