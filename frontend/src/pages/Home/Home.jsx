import React from "react";
import ImageCard from "../../components/ImageCard";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
// import required modules
import { EffectCoverflow, Pagination } from "swiper/modules";
import data from "../../../Data.json";

const Home = () => {
  return (
    <div className="flex  flex-col h-fit w-full">
      <div className="heroSec flex h-fit flex-col justify-center items-center space-y-3 py-5">
        <div className="flex flex-col items-center">
          <h1 className="text-3xl text-center font-semibold">
            Search. Find. Inspire - with Looksy
          </h1>
          <p className="text-sm w-[70%] font-light text-center">
            Discover high-quality images instantly, Powered by Ai, crafted for
            creators.
          </p>
        </div>
        <div className="w-full px-10">
          <div className="flex space-x-2  w-full">
            <input
              type="text"
              className="border py-3  px-2 outline-none text-sm rounded-md w-full"
              placeholder="Search images..."
            />
            <div className="p-2  rounded-md text-sm flex items-center bg-blue-800">
              <h1>Search</h1>
            </div>
          </div>
          <div className="flex mt-2 space-x-4 w-full  justify-center py-2">
            <span className="bg-slate-800 p-1 text-sm rounded">Robot</span>
            <span className="bg-slate-800 p-1 text-sm rounded">Lovers</span>
            <span className="bg-slate-800 p-1 text-sm rounded">Nature</span>
          </div>
        </div>
      </div>

      <div className="  flex flex-col py-5  space-y-4 items-center mt-10h-fit">
        <div>
          <h1 className="font-semibold text-[16px]">Popular Images</h1>
        </div>

        <div className=" w-full flex items-center justify-center">
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
            {data.map(({ url, title }) => (
              <SwiperSlide className="flex justify-center items-center w-full   ">
                <ImageCard image={url} title={title} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Home;
