import React, { useState } from "react";
import { FaDownload, FaHeart } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { MdBookmarkAdd, MdBookmarkAdded } from "react-icons/md";
import { Link } from "react-router-dom";

const FullScreen = ({ imgDetails, setFullScreen, isFullScreen }) => {
  const [BookMark, setBookMark] = useState(false);
  return (
    <div className=" rounded-t-xl w-full h-fit sm:h-[800px]  fullscreenAnimate flex-col fixed left-0   bottom-0 translate-y-[200%] flex items-center justify-center p-4 z-30 bg-black">
      <div
        className="text-2xl p-1.5 cursor-pointer w-fit h-fit self-end mt-10 mb-3  rounded-xl bg-slate-900 text-white"
        onClick={() => {
          setFullScreen(false);
        }}
      >
        <IoClose />
      </div>
      <div className="w-fit h-full   items-center   flex relative flex-col gap-3">
        <Link
          onClick={() => {
            setBookMark((pre) => !pre);
          }}
          className={`${
            BookMark
              ? "hover:scale-125 duration-300 bg-yellow-500 text-white hover:bg-white hover:text-slate-900 absolute top-3 right-3 rounded  text-sm p-1"
              : "hover:scale-125 duration-300 hover:bg-yellow-500 hover:text-white absolute top-3 right-3 rounded bg-white text-sm p-1 text-slate-800"
          }  `}
        >
          {BookMark ? <MdBookmarkAdded /> : <MdBookmarkAdd />}
        </Link>
        <img
          src={imgDetails.uri}
          alt="Not Found"
          className="w-fit h-fit sm:h-[70%] object-contain rounded-xl shadow shadow-white"
        />
        <div>
          <div className=" bg-white  text-indigo-600 px-5 py-3 text-sm font-semibold md:text-sm flex justify-between rounded-2xl">
            <p className="w-[80%]">{imgDetails.title}</p>
            <p className="flex items-center gap-1 text-[16px] justify-center w-[10%] ">
              <span>
                <FaHeart />
              </span>
              <span>{imgDetails.likes}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullScreen;
