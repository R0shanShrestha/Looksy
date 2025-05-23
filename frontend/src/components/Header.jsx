import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { use, useContext, useEffect, useRef, useState } from "react";
import { RiMenu3Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { GetToken } from "../utils/LocalStorageHandler";
import { UserContextProvider } from "../context/UserContext";

const Header = () => {
  const { logged, setLogged } = useContext(UserContextProvider);
  const user = GetToken("user");
  useEffect(() => {
    if (user) {
      setLogged(true);
    } else {
      setLogged(false);
    }
  }, [logged]);
  return (
    <div className="flex justify-center items-center  mx-auto w-full sm:justify-between px-10 sm:w-[50vw]  md:w-[80vw]  py-1 flex-col sm:flex-row  mt-10  ">
      <div className="logo flex items-center gap-3">
        {/* <img src="/logo.png" alt="Not found" className="w-8" /> */}
        <h1 className="font-bold text-2xl ">
          <Link to={"/"}>Looksy</Link>
        </h1>
      </div>
      <div className="hidden sm:flex items-center justify-center gap-5">
        <Link className="font-bold duration-200  ">Home</Link>
        <Link to={"/explore"} className="hover:font-bold duration-200">
          Explore
        </Link>
      </div>
      {logged && (
        <Link to={"/profile"}>
          <img
            src="https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://img5.thuthuatphanmem.vn/uploads/2021/11/12/hinh-anh-anime-don-gian-hinh-nen-anime-don-gian-ma-dep_092443354.png"
            alt="Not found"
            className="w-[50px] h-[50px]  rounded-full object-cover"
          />
        </Link>
      )}
      <div className="menuIco hidden">
        <span className="text-xl hover:text-blue-500">
          <RiMenu3Fill />
        </span>
      </div>
    </div>
  );
};

export default Header;
