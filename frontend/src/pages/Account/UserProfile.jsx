import { FaHeart, FaBookmark, FaUser } from "react-icons/fa";
import { useContext, useState } from "react";
import SavedImage from "./SavedImage";
import { UserContextProvider } from "../../context/UserContext";
import { Link } from "react-router-dom";

const UserProfile = () => {
  const { user } = useContext(UserContextProvider);
  const [tab, setTab] = useState("saved");

  const demo = {
    username: user?.username || "guest_user",
    email: "guest@mail.com",
    bio: "Just exploring and saving beautiful images.",
    location: "Nepal",
    joined: "2025",
  };

  return (
    <div className="w-full min-h-screen px-[50px] pt-10 text-white bg-black">

      <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-120px)]">

        {/* LEFT PROFILE CARD */}
        <div className="w-full lg:w-[320px] shrink-0 bg-zinc-950 rounded-2xl p-6 flex flex-col gap-6">

          {/* USER */}
          <div className="flex flex-col items-center text-center gap-4">

            <img
              src="https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://img5.thuthuatphanmem.vn/uploads/2021/11/12/hinh-anh-anime-don-gian-hinh-nen-anime-don-gian-ma-dep_092443354.png"
              className="w-[110px] h-[110px] rounded-full object-cover border border-zinc-700"
            />

            <div>
              <h1 className="text-xl font-bold">{demo.username}</h1>
              <p className="text-xs text-slate-400">{demo.email}</p>
            </div>

          </div>

          {/* INFO */}
          <div className="bg-zinc-900 p-4 rounded-xl text-sm text-slate-300">
            <p>{demo.bio}</p>

            <div className="mt-3 text-xs text-slate-400 space-y-1">
              <p>📍 {demo.location}</p>
              <p>📅 Joined {demo.joined}</p>
            </div>
          </div>

          {/* SIMPLE STATS */}
          <div className="grid grid-cols-2 gap-3">

            <div className="bg-zinc-900 p-3 rounded-lg text-center">
              <FaBookmark className="mx-auto text-yellow-400" />
              <p className="mt-1 text-sm">Saved</p>
            </div>

            <div className="bg-zinc-900 p-3 rounded-lg text-center">
              <FaHeart className="mx-auto text-red-400" />
              <p className="mt-1 text-sm">Liked</p>
            </div>

          </div>

          {/* LOGOUT */}
          <Link
            to="/logout"
            className="text-center border py-2 rounded-lg hover:bg-white hover:text-black transition"
          >
            Logout
          </Link>

        </div>

        {/* RIGHT SIDE */}
        <div className="flex-1 bg-zinc-950 rounded-2xl p-5 flex flex-col min-w-0">

          {/* TABS */}
          <div className="flex gap-3 mb-4">

            <button
              onClick={() => setTab("saved")}
              className={`px-4 py-2 rounded-lg text-sm ${
                tab === "saved"
                  ? "bg-blue-600"
                  : "bg-zinc-900"
              }`}
            >
              Saved Images
            </button>

            <button
              onClick={() => setTab("liked")}
              className={`px-4 py-2 rounded-lg text-sm ${
                tab === "liked"
                  ? "bg-red-600"
                  : "bg-zinc-900"
              }`}
            >
              Liked Images
            </button>

          </div>

          <hr className="border-zinc-700 mb-4" />

          {/* CONTENT AREA */}
          <div className="flex-1 overflow-y-auto no-scroller pr-2">

            {tab === "saved" ? (
              <SavedImage />
            ) : (
              <div className="text-center text-slate-400 mt-10">
                No liked images yet
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};

export default UserProfile;