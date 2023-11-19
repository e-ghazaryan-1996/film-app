"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import data from "@/db/data.json";

import "swiper/css";
import Image from "next/image";
import { useEffect, useState } from "react";

interface TopTredingProps {
  selectFilm: (film: (typeof data.TendingNow)[number]) => void;
}

const TopTreding: React.FC<TopTredingProps> = ({ selectFilm }) => {
  const [lastSeen, setLastSeen] = useState<string[]>([]);

  useEffect(() => {
    const lastSeen = JSON.parse(sessionStorage.getItem("last") as string) as
      | []
      | null;
    setLastSeen(lastSeen ?? []);
  }, [selectFilm]);

  const sortedData = [...data.TendingNow].sort((a, b) => {
    const aIndex = lastSeen.indexOf(a.Id);
    const bIndex = lastSeen.indexOf(b.Id);

    if (aIndex !== -1 && bIndex !== -1) {
      return aIndex - bIndex;
    }

    if (aIndex !== -1) {
      return -1;
    }
    if (bIndex !== -1) {
      return 1;
    }

    return new Date(b.Date).getTime() - new Date(a.Date).getTime();
  });

  return (
    <div className="w-full">
      <p className="font-medium text-[32px] text-light-gray"> Trending now</p>
      <Swiper slidesPerView={8} spaceBetween={30} className="w-full">
        {sortedData.map((film) => {
          return (
            <SwiperSlide key={film.Id}>
              <Image
                alt="film-pic"
                src={film.CoverImage}
                width={200}
                height={278}
                priority
                className="cursor-pointer"
                onClick={() => selectFilm(film)}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default TopTreding;
