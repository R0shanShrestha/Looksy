import React, { useContext, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import { EffectCoverflow, Pagination } from "swiper/modules";
import { PhotoContextProvider } from "../../context/PhotoContext";
import { Link } from "react-router-dom";
import RecentImageCard from "../../components/RecentImageCard";
import { UserContextProvider } from "../../context/UserContext";

const Home = () => {
  const { recentSearch, setSearch, search, searchImage } =
    useContext(PhotoContextProvider);

  const { logged } = useContext(UserContextProvider);

  const [recImg, setRecImg] = useState([]);

  useEffect(() => {
    if (Array.isArray(recentSearch)) {
      setRecImg(recentSearch);
    }
  }, [recentSearch]);

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-5 md:px-6 lg:px-8 mt-8">
      {/* HERO */}
      <div className="flex flex-col items-center text-center gap-6 py-6 sm:py-8">
        {/* TITLE */}
        <h1 className="text-2xl font-bold leading-tight sm:text-3xl md:text-5xl max-w-[700px]">
          <span className="md:hidden">Search. </span>
          Find. Inspire — with Looksy.
        </h1>

        {/* SUBTEXT */}
        <p className="text-xs sm:text-sm md:text-base text-slate-400 max-w-[500px]">
          Discover high-quality images instantly, powered by Unsplash.
        </p>

        {/* SEARCH BOX */}
        <div className=" w-full  lg:max-w-[600px] flex flex-col gap-3">
          <div className="flex flex-col sm:flex-row gap-2 w-full justify-center">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              className="py-3 px-3 outline-none text-sm rounded-md w-[250px] bg-white text-slate-900"
              placeholder="Search images..."
            />

            <Link
              to={"/explore"}
              onClick={() => searchImage(search, 1)}
              className="py-3 px-4 text-center rounded-md text-sm bg-blue-500 hover:bg-blue-600 duration-200 w-full sm:w-auto"
            >
              Search
            </Link>
          </div>

          {/* TAGS */}
          <div className="flex flex-wrap gap-2 justify-center">
            {["Robot", "Anime", "Nature"].map((tag) => (
              <Link
                key={tag}
                to={"/explore"}
                onClick={() => {
                  if (logged) searchImage(tag, 1);
                  setSearch(tag.toLowerCase());
                }}
                className="bg-slate-800 px-3 py-1 text-xs sm:text-sm rounded hover:shadow-md transition"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* RECENT SEARCH */}
      {recImg.length > 0 && (
        <div className="flex flex-col gap-4 py-6 items-center">
          <h1 className="font-semibold text-lg sm:text-xl md:text-3xl text-center">
            Recent Searches
          </h1>

          <div className="w-full">
            <Swiper
              loop={true}
              effect={"coverflow"}
              grabCursor={true}
              centeredSlides={true}
              breakpoints={{
                0: { slidesPerView: 1.1, spaceBetween: 10 },
                480: { slidesPerView: 1.5, spaceBetween: 12 },
                640: { slidesPerView: 2, spaceBetween: 15 },
                1024: { slidesPerView: 3, spaceBetween: 20 },
              }}
              coverflowEffect={{
                rotate: 20,
                stretch: 0,
                depth: 70,
                modifier: 1,
                slideShadows: false,
              }}
              pagination={{ clickable: true }}
              modules={[EffectCoverflow, Pagination]}
            >
              {recImg.map((data, idx) => (
                <SwiperSlide
                  key={idx}
                  className="flex justify-center items-center py-4"
                >
                  <div className="w-full max-w-[260px] sm:max-w-[280px] md:max-w-[300px]">
                    <RecentImageCard data={data} />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
