import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface CardProperties {
  title: string;
  backgroundColor: string;
  description: string;
  path: string;
  imgPath: string;
}

export default function LeagueCard({
  title,
  backgroundColor,
  description,
  path,
  imgPath,
}: CardProperties) {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push("/leagues/details/premierleague")}
      className="relative overflow-hidden cursor-pointer h-fit w-[21.5rem] league_card grid grid-cols-2 px-4 py-4 bg-white shadow-lg rounded-md hover:scale-[1.1] transition"
    >
      <div className="relative">
        <div
          className={`${backgroundColor} flex flex-col justify-center league-slate p-4 rounded-md text-white relative overflow-hidden z-[10]`}
        >
          <h2 className="text-[1.1rem] font-bold mb-2">{title}</h2>
          <p className="text-sm"> {description} </p>
          {/* <Link className="underline cursor-pointer z-[20] w-fit" href={path}>
            more
          </Link> */}
          <Image
            src="/curvy_lines.svg"
            alt="logo"
            width={80}
            height={80}
            className={`absolute top-0 md:top-[70px] bottom-[-12px] left-0 scale-[2] w-full`}
            priority
          />
        </div>
      </div>
      <div className="flex items-center justify-center">
        <div className="w-[6rem] h-[6rem]">
          <Image
            src={imgPath}
            alt="logo"
            width={70}
            height={70}
            className={`w-full z-[10]`}
            priority
          />
        </div>
      </div>
      <Image
        src="/curvy_lines(1).svg"
        alt="logo"
        width={80}
        height={80}
        className={`absolute top-0 bottom-[-12px] right-0 opacity-[-0.85] w-full`}
        priority
      />
    </div>
  );
}
