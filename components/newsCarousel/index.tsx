import React from "react";
import Image from "next/legacy/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function NewsCarousel() {
  const news = [
    {
      title: "Newcastle vs Chelsea",
      image_path: "/newcastle.jpg",
      description: "Who will come out on top",
      league: "Premier League",
    },
    {
      title: "It's going to be a great reunion.",
      image_path: "/mp.webp",
      description:
        "Poch to step ground at the new tottenham stadium only this time, he's the oppositon.",
      league: "Premier League",
    },
  ];
  return (
    <Swiper
      pagination={{
        type: "fraction",
      }}
         autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
      modules={[Navigation, Autoplay]}
      direction={"horizontal"}
      navigation={true}
      className="mySwiper"
    >
      {news.map(({ title, image_path, league, description }, id) => (
           <SwiperSlide key={id}>
        <div
          className="flex flex-col rounded-lg overflow-hidden"
        >
          <div className="relative w-full h-[20rem] rounded">
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent rounded z-[2]">
              <div className="absolute bottom-1 left-4 flex flex-col">
                <h2 className="text-white font-[700] text-lg md:text-2xl mb-2">
                  Preview:
                </h2>
                <p className="text-white font-[700] text-lg md:text-2xl mb-2">{title}</p>
              </div>
            </div>
            <Image
              className="object-cover object-center rounded"
              src={image_path}
              alt="img"
              layout="fill"
            />
          </div>

          <div className="p-4">
            <span className="bg-black text-white font-[600] rounded py-1 px-[0.5rem]">
              {league}
            </span>
            <p className="mt-2 text-xs md:text-[1.2rem] font-[500]">{description.slice(0, 47)}...</p>
          </div>
        </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
