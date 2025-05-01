import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef, useState } from "react";
import { RiMenu3Fill } from "react-icons/ri";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="flex justify-center items-center  w-full sm:justify-between px-10 sm:w-[50vw]  md:w-[80vw]  py-1 flex-col sm:flex-row  mt-10  ">
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
        <Link to={"/profile"} className="hover:font-bold duration-200">
          Account
        </Link>
      </div>
      <div className="menuIco hidden">
        <span className="text-xl hover:text-blue-500">
          <RiMenu3Fill />
        </span>
      </div>
    </div>
  );
};

export default Header;
