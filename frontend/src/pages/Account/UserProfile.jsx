import React, { useContext } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
// import required modules
import { EffectCoverflow, Pagination } from "swiper/modules";
// import data from "../../../Data.json";
import { Link } from "react-router-dom";
import ImageCard from "../../components/ImageCard";
import { IoLogOut } from "react-icons/io5";
import { PhotoContextProvider } from "../../context/PhotoContext";
import { UserContextProvider } from "../../context/UserContext";
import { GetToken } from "../../utils/LocalStorageHandler";
//

const UserProfile = () => {
  const { favImg, setFavImg } = useContext(PhotoContextProvider);
  const user = JSON.parse(GetToken("user"));

  return (
    <div className="w-full md:w-[80vw] px-10 md:flex-col  no-scroller flex   ">
      <div className="userInfo  flex flex-col gap-1 p-3">
        <div className="userimg relative  w-fit">
          <Link
            to={"/logout"}
            className=" absolute bg-slate-950 rounded-md -right-4 text-3xl"
          >
            <IoLogOut />
          </Link>
          <img
            src="/test.avif"
            alt="not found"
            className="w-[200px] h-[200px] object-cover object-top rounded-xl"
          />
        </div>
        <div className="desc">
          <h3 className="text-xl font-bold">{user?.username}</h3>
          <p className="text-slate-300 font-medium">Email: {user?.email}</p>
          <div className="flex gap-2 mt-2">
            <button className="bg-blue-500 flex justify-center items-center gap-3 text-sm  px-10 duration-300 rounded-2xl font-bold hover:bg-blue-400 cursor-pointer py-3">
              Edit <FaEdit />
            </button>
            <button className="bg-red-500 flex items-center justify-center gap-3 px-5 text-sm duration-300 rounded-2xl font-bold hover:bg-red-400 cursor-pointer py-3">
              <FaTrash /> Delete Account
            </button>
          </div>
        </div>
      </div>
      {/* Save your visuals */}
      <div className=" w-full p-5">
        <div>
          <h1 className="text-xl font-semibold">Favourite Images</h1>
        </div>
        {favImg ? (
          <div className="Favimages flex gap-2 px-3 mt-5">
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
              {favImg.map(({ img }, idx) => (
                <SwiperSlide
                  className="flex justify-center items-center w-fit  max-h-[200px]   "
                  key={idx}
                >
                  <ImageCard
                    // likeNum={likes}
                    image={img}
                    // title={alt_description}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        ) : (
          <div>No</div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
