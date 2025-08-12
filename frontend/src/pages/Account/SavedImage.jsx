import React, { useContext } from "react";
import { PhotoContextProvider } from "../../context/PhotoContext";
import RecentImageCard from "../../components/RecentImageCard";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import { Pagination } from "swiper/modules";

const SavedImage = () => {
  const { favImg } = useContext(PhotoContextProvider);
  // console.log(favImg);
  return (
    <div className="w-screen pb-2">
      {favImg != "" ? (
        <Swiper
          slidesPerView={4}
          spaceBetween={30}
          grabCursor={true}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper   flex w-full "
        >
          {favImg.map((data, idx) => {
            return (
              <SwiperSlide
                className="max-w-[300px] h-[200px] max-h-[200px] "
                key={idx}
              >
                <div className="h-[200px]">
                  <RecentImageCard data={data} />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      ) : (
        <div className="text-center">No saved Images</div>
      )}
    </div>
  );
};

export default SavedImage;
