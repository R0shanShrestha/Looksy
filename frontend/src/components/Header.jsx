import React, { useContext, useEffect, useState } from "react";
import { RiMenu3Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { GetToken } from "../utils/LocalStorageHandler";
import { UserContextProvider } from "../context/UserContext";

const Header = () => {
  const { logged, setLogged } = useContext(UserContextProvider);

  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const u = GetToken("user");

    if (u) {
      try {
        const parsed = typeof u === "string" ? JSON.parse(u) : u;
        setUser(parsed);
        setLogged(true);
      } catch {
        setUser(null);
        setLogged(false);
      }
    } else {
      setUser(null);
      setLogged(false);
    }
  }, []);

  return (
    <header className="w-full  bg-zinc-950/70 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 py-4">

        {/* LOGO */}
        <h1 className="font-bold text-xl sm:text-2xl">
          <Link to="/">Looksy</Link>
        </h1>

        {/* DESKTOP NAV */}
        <nav className="hidden sm:flex items-center gap-6 text-sm text-slate-200">
          <Link to="/" className="hover:text-white transition">
            Home
          </Link>
          <Link to="/explore" className="hover:text-white transition">
            Explore
          </Link>
        </nav>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-3">

          {/* LOGIN / SIGNUP (ONLY WHEN NOT LOGGED IN) */}
          {!logged && (
            <div className="hidden sm:flex items-center gap-2">
              <Link
                to="/login"
                className="px-3 py-1.5 text-sm rounded-md border border-zinc-700 hover:bg-zinc-800 transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="px-3 py-1.5 text-sm rounded-md bg-blue-600 hover:bg-blue-700 transition"
              >
                Sign Up
              </Link>
            </div>
          )}

          {/* PROFILE (ONLY WHEN LOGGED IN) */}
          {logged && user && (
            <Link to="/profile">
              <img
                src={
                  user?.avatar ||
                  "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://img5.thuthuatphanmem.vn/uploads/2021/11/12/hinh-anh-anime-don-gian-hinh-nen-anime-don-gian-ma-dep_092443354.png"
                }
                alt="profile"
                className="w-10 h-10 rounded-full object-cover border border-zinc-700"
              />
            </Link>
          )}

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="sm:hidden text-2xl"
          >
            <RiMenu3Fill />
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="sm:hidden px-6 pb-4 flex flex-col gap-3 text-sm text-slate-200">
          <Link to="/" className="py-1">Home</Link>
          <Link to="/explore" className="py-1">Explore</Link>

          {!logged ? (
            <>
              <Link to="/login" className="py-1">Login</Link>
              <Link to="/signup" className="py-1">Sign Up</Link>
            </>
          ) : (
            <Link to="/profile" className="py-1">Profile</Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;