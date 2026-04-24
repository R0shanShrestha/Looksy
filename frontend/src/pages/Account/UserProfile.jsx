import { useContext, useEffect } from "react";
import SavedImage from "./SavedImage";
import { UserContextProvider } from "../../context/UserContext";

const UserProfile = () => {
  const { user, setLogged, userProfile } = useContext(UserContextProvider);

  useEffect(() => {
    userProfile();
  }, []);

  const profile = {
    username: user?.username || "guest_user",
    email: user?.email || "no email",
    location: user?.location || "Unknown",
    joined: user?.createdAt
      ? new Date(user.createdAt).toLocaleDateString()
      : "2025",
  };

  const handleLogout = () => {
    localStorage.clear();
    setLogged(false);
  };

  return (
    <div className="w-full min-h-[calc(100vh-128px)] text-white py-10 px-4">

      {/* MAIN WRAPPER */}
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">

        {/* LEFT PROFILE CARD */}
        <div className="w-full lg:w-[320px] flex-shrink-0">
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 text-center shadow-xl">

            {/* AVATAR */}
            <div className="relative w-24 h-24 mx-auto">
              <img
                src={
                  user?.avatar ||
                  "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://img5.thuthuatphanmem.vn/uploads/2021/11/12/hinh-anh-anime-don-gian-hinh-nen-anime-don-gian-ma-dep_092443354.png"
                }
                className="w-24 h-24 rounded-full object-cover border-2 border-zinc-700"
              />
              <div className="absolute inset-0 rounded-full bg-white/5 opacity-0 hover:opacity-100 transition" />
            </div>

            {/* NAME */}
            <h1 className="mt-4 text-xl font-semibold">
              {profile.username}
            </h1>
            <p className="text-xs text-zinc-400">{profile.email}</p>

            {/* INFO */}
            <div className="mt-5 text-sm text-zinc-400 space-y-2 text-left">
              <p>📍 {profile.location}</p>
              <p>📅 Joined {profile.joined}</p>
            </div>

            {/* LOGOUT */}
            <button
              onClick={handleLogout}
              className="mt-6 w-full py-2 rounded-lg text-sm font-medium bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500 hover:text-white transition"
            >
              Logout
            </button>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex-1 min-w-0">
          <SavedImage />
        </div>

      </div>
    </div>
  );
};

export default UserProfile;