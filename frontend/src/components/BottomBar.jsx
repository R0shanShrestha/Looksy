import React from "react";
import {
  RiHome2Fill,
  RiHome2Line,
  RiSearch2Line,
  RiUser2Fill,
  RiUser3Line,
  RiUserShared2Fill,
} from "react-icons/ri";
import { Link } from "react-router-dom";

const BottomBar = () => {
  return (
    <div className=" sm:hidden z-10 bg-black w-full p-2 h-[80px] py-3 text-white rounded flex justify-around items-center space-x-10 font-bold">
      <Link className="text-2xl" to={"/explore"}>
        <RiSearch2Line />
      </Link>
      <Link to={"/"} className="text-2xl">
        <RiHome2Line />
      </Link>
      <Link to={"/profile"} className="text-2xl">
        <RiUser3Line />
      </Link>
    </div>
  );
};

export default BottomBar;
