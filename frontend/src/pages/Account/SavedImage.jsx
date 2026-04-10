import React, { useContext } from "react";
import { PhotoContextProvider } from "../../context/PhotoContext";
import RecentImageCard from "../../components/RecentImageCard";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import { Pagination } from "swiper/modules";

const SavedImage = () => {
  const { favImg } = useContext(PhotoContextProvider);

  return (
    <div className="w-full mt-2 overflow-hidden">

      {/* EMPTY STATE */}
      {favImg.length === 0 ? (
        <div className="text-center text-slate-400 py-10">
          No saved Images
        </div>
      ) : (

        /* WRAPPER LOCK (prevents overflow) */
        <div className="w-full overflow-hidden">

          <Swiper
            slidesPerView={"auto"}
            spaceBetween={12}
            grabCursor={true}
            pagination={{ clickable: true }}
            modules={[Pagination]}
            className="w-full !overflow-hidden px-1"
          >

            {favImg.map((data, idx) => (
              <SwiperSlide
                key={idx}
                className="!w-[300px] !h-[200px]"
              >

                {/* CARD WRAPPER */}
                <div className="w-full h-full rounded-xl overflow-hidden shadow-md  hover:scale-[1.02] transition-transform duration-200">

                  <RecentImageCard data={data} />

                </div>

              </SwiperSlide>
            ))}

          </Swiper>

        </div>
      )}
    </div>
  );
};

export default SavedImage;