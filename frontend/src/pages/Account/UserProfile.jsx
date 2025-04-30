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
//

const UserProfile = () => {
  const { favImg, setFavImg } = useContext(PhotoContextProvider);
  const { user } = useContext(UserContextProvider);

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
      <div className="border hidden">
        <div>
          <h1 className="text-xl font-semibold">Favourite Images</h1>
        </div>
        <div className="Favimages flex gap-2 px-3">
          {favImg.map(({ image, title }) => {
            return (
              <div className="max-w-[150px] max-h-[200px] overflow-hidden">
                <ImageCard image={image} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
