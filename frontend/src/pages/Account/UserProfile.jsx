import { FaEdit } from "react-icons/fa";
import UserCard from "../../components/UserCard";
import { FcAbout } from "react-icons/fc";
import About from "./About";
import { useContext, useEffect, useState } from "react";
import SavedImage from "./SavedImage";
import { UserContextProvider } from "../../context/UserContext";
import { Link } from "react-router-dom";

const UserProfile = () => {
  const [tab, setTab] = useState("savedImage");
  const { user } = useContext(UserContextProvider);

  return (
    <div className="w-[80%] mx-auto   p-3 h-[80vh] mt-10 flex  flex-col gap-3">
      <div className="p-4  rounded-2xl bg-zinc-950">
        {/* UserInfo */}
        <div className="flex items-center  overflow-hidden rounded-xl gap-5">
          <img
            src="https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://img5.thuthuatphanmem.vn/uploads/2021/11/12/hinh-anh-anime-don-gian-hinh-nen-anime-don-gian-ma-dep_092443354.png"
            alt="no found"
            className="h-[150px] w-[150px] object-cover  rounded-full"
          />
          <div className="flex flex-col">
            <h1 className="text-2xl font-semibold">{user?.username}</h1>
            {/* <h3 className="text-sm text-slate-100">beast009</h3> */}
            <div className="flex gap-3 mt-3">
              <button className="bg-blue-600 hover:bg-blue-500 text-white py-2 flex px-4 rounded items-center gap-3 font-semibold">
                Edit <FaEdit />
              </button>

              <Link
                to={"/logout"}
                className=" text-white py-2 flex px-4 rounded items-center gap-3 hover:bg-white hover:text-slate-900 font-semibold"
              >
                Log Out
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className=" rounded-xl overflow-hidden  h-fit  gap-3 grid  ">
        {/* saveimage  */}
        <div className="w-full  bg-zinc-950 h-full rounded-xl  px-3 py-2">
          {/* tabs */}
          <div className="p-3 flex gap-5 cursor-pointer">
            {/* <span
              className="hover:font-semibold duration-300"
              onClick={() => {
                setTab("about");
              }}
            >
              About
            </span>
            <span>|</span> */}
            <span
              className="font-semibold duration-300"
              onClick={() => {
                setTab("savedImage");
              }}
            >
              Saved Images
            </span>
          </div>
          <hr />
          {/* display selected tabs */}
          <div className="flex max-h-[250px]   mt-3">
            {/* {tab == "about" && <About />}{" "} */}
            {tab == "savedImage" && <SavedImage />}
          </div>
        </div>
        {/* Followed Profiles */}
        <div className=" bg-zinc-950 h-fit rounded-xl p-3 flex flex-col gap-3">
          <div className=" space-y-4 ">
            <h1 className="">Followed Profiles</h1>
            <hr />
          </div>
          <div className="h-full  p-2 w-full flex gap-5 cursor-pointer">
            <h1>No Followers</h1>
            {/* <UserCard
              data={{
                fullname: "Roshan Shrestha",
                active: "3 min ago",
                img: "https://i.pinimg.com/736x/93/f6/dd/93f6dd8cf10495b6c4ddd30f89c1830c.jpg",
              }}
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
