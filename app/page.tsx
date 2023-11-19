"use client";

import Image from "next/image";
import data from "@/db/data.json";
import { convertSeconds } from "@/utils/helpers";
import TopTreding from "@/components/top-trending";
import { useEffect, useState } from "react";
import LoadingSpinner from "@/components/spinner";

export default function Home() {
  const [selectedFilm, setSelectedFil] = useState<
    (typeof data.TendingNow)[number] | null
  >(null);
  const [loading, setLoading] = useState(false);

  const handleSelectedFilm = (film: (typeof data.TendingNow)[number]) => {
    const lastSeen = JSON.parse(sessionStorage.getItem("last") as string) as
      | string[]
      | null;
      if (lastSeen) {
        const updatedLastSeen = [film.Id, ...lastSeen.filter((id) => id !== film.Id)];
        sessionStorage.setItem('last', JSON.stringify(updatedLastSeen));
      } else {
        sessionStorage.setItem('last', JSON.stringify([film.Id]));
      }
    setLoading(true);
    setTimeout(() => {
      setSelectedFil(film);
      setLoading((prev) => !prev);
    }, 2000);
  };



  return (
    <main className="relative w-full h-screen">
      {loading ? (
        <div className="absolute w-full h-full flex justify-center items-center">
          <LoadingSpinner />
        </div>
      ) : selectedFilm ? (
        <video loop autoPlay className="w-full h-full object-cover absolute">
          <source src={selectedFilm.VideoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <Image
          src={data.Featured.CoverImage}
          alt="featured-image"
          fill
          priority
          quality={100}
          className="object-cover w-full h-full"
        />
      )}
      <div className="absolute w-[calc(100%-5rem)] flex flex-col h-full justify-around">
        <div>
          <h1 className="text-2xl text-battleship-grey">
            {data.Featured.Category}
          </h1>
          <Image
            alt="title-image"
            src={
              selectedFilm ? selectedFilm.TitleImage : data.Featured.TitleImage
            }
            width={683}
            height={84}
            className="w-[683px] h-[84px] object-cover"
            priority
            quality={100}
          />
          <p className="text-light-gray text-[30px] font-normal">
            {data.Featured.ReleaseYear} {data.Featured.MpaRating}{" "}
            {convertSeconds(+data.Featured.Duration)}
          </p>
          <p className="text-light-gray text-[32px] font-normal">
            {data.Featured.Description}
          </p>
          <div className="flex items-center mt-[26px] gap-[18px]">
            <button className="bg-light-gray px-[75px] rounded-[40px] py-3 flex justify-center items-center gap-3">
              <Image
                src="/assets/icons/play.png"
                alt="play-icon"
                width={18}
                height={24}
                priority
              />
              <span className="text-[32px] font-bold text-jet-black">Play</span>
            </button>
            <button className="my-gradient px-[52px] rounded-[40px] py-3 flex justify-center items-center gap-3">
              <span className="text-[32px] font-bold text-light-gray">
                More Info
              </span>
            </button>
          </div>
        </div>
        <TopTreding selectFilm={handleSelectedFilm} />
      </div>
    </main>
  );
}
