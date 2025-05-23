import React, { useContext, useEffect, useState } from "react";
import ImageCard from "../../components/ImageCard";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
// import required modules
import { EffectCoverflow, Pagination } from "swiper/modules";
// import data from "../../../Data.json";
import { PhotoContextProvider } from "../../context/PhotoContext";
import { Link } from "react-router-dom";
import RecentImageCard from "../../components/RecentImageCard";
import { UserContextProvider } from "../../context/UserContext";
//

const Home = () => {
  const { recentSearch, setSearch, search, searchImage } =
    useContext(PhotoContextProvider);
  const { logged } = useContext(UserContextProvider);

  const [recImg, setRecImg] = useState(recentSearch);
  useEffect(() => {
    setRecImg(recentSearch);
  }, [recentSearch]);

  return (
    <div className="flex  w-[80vw]  flex-col  h-[70vh]  mx-auto mt-10 ">
      <div className="heroSec flex h-fit flex-col justify-center items-center space-y-3 py-5 md:w-[50%] md:mx-auto">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-3xl  text-center font-bold md:text-5xl md:font-bold">
            <span className="md:hidden">Search. </span>Find. Inspire - with
            Looksy.
          </h1>
          <p className="text-sm w-[70%] font-light text-center">
            Discover high-quality images instantly, Powered by unsplash, crafted
            for creators.
          </p>
        </div>
        <div className="w-full px-10 md:mx-auto md:flex flex-col items-center">
          <div className="flex space-x-2   sm:w-full">
            <input
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              type="text"
              className=" py-3 min-w-[200px]   px-2 outline-none text-sm rounded-md w-full bg-white text-slate-900 placeholder:text-slate-600"
              placeholder="Search images..."
            />
            <Link
              onClick={() => {
                searchImage(search, 1);
              }}
              to={"/explore"}
              className="p-2  rounded-md text-sm flex items-center bg-blue-500 px-5 hover:bg-blue-600 cursor-pointer duration-200"
            >
              Search
            </Link>
          </div>
          <div className="flex mt-2 space-x-4 w-full  justify-center py-2">
            <span className="bg-slate-800 p-1 text-sm rounded cursor-pointer hover:shadow-sm shadow shadow-slate-400 duration-200 ">
              <Link
                onClick={() => {
                  logged && searchImage("Robot", 1);
                  setSearch("robot");
                }}
                to={"/explore"}
              >
                Robot
              </Link>
            </span>
            <span className="bg-slate-800 p-1 text-sm rounded cursor-pointer hover:shadow-sm shadow shadow-slate-400 duration-200 ">
              <Link
                onClick={() => {
                  logged && searchImage("Anime", 1);
                  setSearch("anime");
                }}
                to={"/explore"}
              >
                Anime
              </Link>
            </span>
            <span className="bg-slate-800 p-1 text-sm rounded cursor-pointer hover:shadow-sm shadow shadow-slate-400 duration-200 ">
              <Link
                onClick={() => {
                  logged;
                }}
                to={"/explore"}
              >
                Nature
              </Link>
            </span>
          </div>
        </div>
      </div>

      {recentSearch != "" && (
        <div className="  flex flex-col py-5  space-y-4 items-center  md:w-[70%] md:mx-auto ">
          <div>
            <h1 className="font-semibold text-[16px] md:text-3xl ">
              Recent Searches
            </h1>
          </div>

          <Swiper
            loop={true}
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={3}
            // slidesPerView={1}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            pagination={true}
            modules={[EffectCoverflow, Pagination]}
            className="mySwiper  flex w-full duration-200"
          >
            {recImg.map((data) => (
              <SwiperSlide className="flex justify-center items-center w-fit  max-h-[200px]   ">
                <RecentImageCard
                  // likeNum={likes}
                  data={data}
                  // title={alt_description}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
};

export default Home;
