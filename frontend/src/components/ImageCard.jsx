import React, { useContext, useEffect, useState } from "react";
import { FaDownload, FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MdBookmarkAdd } from "react-icons/md";
import { MdBookmarkAdded } from "react-icons/md";
import { PhotoContextProvider } from "../context/PhotoContext";

const ImageCard = ({
  image,
  title,
  setFullImageUri,
  setFullScreen,
  likeNum,
  download,
}) => {
  const { setFavImg, favImg } = useContext(PhotoContextProvider);
  const [BookMark, setBookMark] = useState(false);
  useEffect(() => {
    if (BookMark) {
      setFavImg((pre) => [
        {
          image,
          title,
          likeNum,
        },
        ...pre,
      ]);
    } else {
      const replaceDt = favImg.filter((val) => val.image != image);
      setFavImg(replaceDt);
    }
  }, [BookMark]);

  return (
    <div
      onClick={() => {
        setFullImageUri({
          uri: image,
          title: title,
          likes: likeNum,
        });
        setFullScreen(true);
      }}
      className="card cursor-pointer  overflow-hidden w-full   duration-300   rounded-2xl sm:rounded-none h-fit flex flex-col justify-between"
    >
      <div className="cardImg  relative overflow-hidden h-fit">
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
          src={image}
          alt="not found"
          className=" w-full h-full object-cover md:object-contain object-top "
        />
      </div>
      {title && (
        <div className=" bg-white text-indigo-600 px-5 py-3 text-[10px] font-semibold md:text-sm flex justify-between">
          <p>{title}</p>
          <p className="flex items-center gap-1 text-[12px] justify-center ">
            <span>
              <FaHeart />
            </span>
            <span>{likeNum}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default ImageCard;
