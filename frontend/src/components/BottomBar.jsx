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
    <div className=" z-10 bg-black w-full p-4 text-white rounded flex justify-around items-center space-x-10 font-bold">
      <Link className="text-2xl" to={"/search"}>
        <RiSearch2Line />
      </Link>
      <Link to={"/"} className="text-2xl">
        <RiHome2Line />
      </Link>
      <Link className="text-2xl">
        <RiUser3Line />
      </Link>
    </div>
  );
};

export default BottomBar;
