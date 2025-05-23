import React, { useContext, useEffect, useRef, useState } from "react";
import { FaDownload, FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MdBookmarkAdd } from "react-icons/md";
import { MdBookmarkAdded } from "react-icons/md";
import { PhotoContextProvider } from "../context/PhotoContext";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const ImageCard = ({ data }) => {
  const { setFavImg, favImg, setFullScreen } = useContext(PhotoContextProvider);
  const [isTitle, setTitle] = useState(false);

  // ref
  const descBoxRef = useRef();
  useGSAP(() => {
    if (isTitle) {
      gsap.to(descBoxRef.current, {
        duration: 0.1,
        translateY: "0%",
      });
    } else {
      gsap.to(descBoxRef.current, {
        duration: 0.1,
        translateY: "100%",
      });
    }
  }, [isTitle]);

  // [
  //     ...pre,
  //     {
  //       id: data?.user?.id,
  //       userimage: data?.user?.profile_image.small,
  //       username: data.user.name,
  //       postedImage: data?.urls.raw,
  //       likes: data?.likes,
  //       desc: data?.alt_description,
  //     },
  //   ]
  // func
  const addtoSave = (data) => {
    let checkExists = favImg.filter((pre) => {
      return pre.id.includes(data.id);
    });

    if (checkExists == "") {
      setFavImg((pre) => [...pre, data]);
    }else{
      alert("Already BookedMarked")
    }
  };
  return (
    <div className="card  cursor-pointer  border  text-slate-900 overflow-hidden w-full   duration-300   rounded-2xl sm:rounded-none h-fit flex flex-col justify-between relative">
      <div className="flex items-center gap-2 p-2 absolute text-slate-500 hover:text-slate-100 font-semibold shadow-xl hover:bg-slate-600 w-full duration-300 justify-between">
        <div className="flex gap-2">
          <img
            src={data?.user?.profile_image.small}
            alt="Not found"
            className="rounded-full w-[30px] h-[30px]"
          />
          <span>{data.user.name}</span>
        </div>
        <div
          className="text-yellow-100 text-xl hover:scale-125 transition-all duration-300"
          onClick={() => {
            addtoSave(data);
          }}
        >
          <MdBookmarkAdd />
        </div>
      </div>

      <div>
        <img
          src={data?.urls.raw}
          alt="not found"
          onMouseEnter={() => {
            setTitle(true);
          }}
          onMouseLeave={() => {
            setTitle(false);
          }}
          className=" w-full h-full object-cover md:object-contain object-top "
        />
      </div>
      <div className="flex absolute bottom-0 p-2 items-center gap-2 text-white">
        <span className="text-red-500 ">
          <FaHeart />
        </span>
        <span className="bg-slate-800 text-sm px-2 rounded-xl">
          {data?.likes}
        </span>
      </div>

      {/* Description box */}

      <div
        ref={descBoxRef}
        className="absolute descBox translate-y-[100%] w-full bg-white bottom-0 flex flex-wrap h-fit px-2 capitalize p-2 duration-300
      "
      >
        <p>{data?.alt_description}</p>
      </div>
    </div>
  );
};

export default ImageCard;
