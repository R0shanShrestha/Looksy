import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef, useState } from "react";
import { RiMenu3Fill } from "react-icons/ri";

const Header = () => {
  return (
    <div className="flex justify-center items-center  w-full   px-4 py-10">
      <div className="logo flex items-center gap-3">
        <img src="/logo.png" alt="Not found" className="w-8" />
        <h1 className="font-bold text-xl ">Looksy</h1>
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
