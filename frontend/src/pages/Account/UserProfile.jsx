import { useContext, useState } from "react";
import SavedImage from "./SavedImage";
import { UserContextProvider } from "../../context/UserContext";

const UserProfile = () => {
  const { user, setLogged } = useContext(UserContextProvider);
  const [tab, setTab] = useState("saved");

  const profile = {
    username: user?.username || "guest_user",
    email: user?.email || "no email",
    location: user?.location || "Unknown",
    joined: user?.joined || "2025",
  };

  const handleLogout = () => {
    localStorage.clear();
    setLogged(false);
  };

  return (
    <div className="w-full min-h-[calc(100vh-80px)] px-4 sm:px-6 lg:px-10 py-8 text-white">

      <div className="flex flex-col lg:flex-row gap-6">

        {/* LEFT */}
        <div className="w-full lg:w-[300px] bg-zinc-950 border border-zinc-800 rounded-xl p-5 flex flex-col gap-5">

          {/* USER */}
          <div className="text-center">
            <img
              src={
                user?.avatar ||
                "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://img5.thuthuatphanmem.vn/uploads/2021/11/12/hinh-anh-anime-don-gian-hinh-nen-anime-don-gian-ma-dep_092443354.png"
              }
              className="w-20 h-20 mx-auto rounded-full object-cover border border-zinc-700"
            />

            <h1 className="mt-3 text-lg font-semibold">
              {profile.username}
            </h1>
            <p className="text-xs text-zinc-400">{profile.email}</p>
          </div>

          {/* INFO */}
          <div className="text-xs text-zinc-400 space-y-1">
            <p>📍 {profile.location}</p>
            <p>📅 Joined {profile.joined}</p>
          </div>

          {/* LOGOUT */}
          <button
            onClick={handleLogout}
            className="border border-zinc-700 py-2 rounded-lg text-sm hover:bg-white hover:text-black transition"
          >
            Logout
          </button>

        </div>

        {/* RIGHT */}
        <div className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl p-5">

          {/* TABS */}
          <div className="flex gap-3 mb-4">

            <button
              onClick={() => setTab("saved")}
              className={`px-4 py-2 rounded-md text-sm ${
                tab === "saved"
                  ? "bg-white text-black"
                  : "bg-zinc-900 text-zinc-400"
              }`}
            >
              Saved Images
            </button>

            <button
              onClick={() => setTab("liked")}
              className={`px-4 py-2 rounded-md text-sm ${
                tab === "liked"
                  ? "bg-white text-black"
                  : "bg-zinc-900 text-zinc-400"
              }`}
            >
              Liked Images
            </button>

          </div>

          {/* CONTENT */}
          <div className="mt-4">
            {tab === "saved" ? (
              <SavedImage />
            ) : (
              <div className="text-center text-zinc-500 mt-10">
                No liked images
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};

export default UserProfile;