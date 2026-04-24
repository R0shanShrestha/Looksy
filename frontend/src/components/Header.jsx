import React, { useContext, useEffect, useState } from "react";
import { RiMenu3Fill } from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";
import { GetToken } from "../utils/LocalStorageHandler";
import { UserContextProvider } from "../context/UserContext";

const Header = () => {
  const { user } = useContext(UserContextProvider);

  const location = useLocation();
  const activePath = location.pathname;

  const [menuOpen, setMenuOpen] = useState(false);
  const logged = !!user;

  // tab index for animation
  const tabIndex = activePath === "/" ? 0 : activePath === "/explore" ? 1 : 0;

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="w-full bg-zinc-950/70 backdrop-blur-md border-b border-zinc-800 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 py-4">
        {/* LOGO */}
        <h1 className="font-bold text-xl sm:text-2xl hover:opacity-80 transition">
          <Link to="/">Looksy</Link>
        </h1>

        {/* DESKTOP NAV */}
        <nav className="hidden sm:flex items-center gap-8 text-sm text-slate-300 relative">
          {/* animated underline */}
          <span
            className="absolute -bottom-2 h-[2px] bg-white rounded-full transition-all duration-300"
            style={{
              width: "50px",
              transform: `translateX(${tabIndex * 80}px)`,
            }}
          />

          <Link
            to="/"
            className={`transition ${
              activePath === "/" ? "text-white" : "text-slate-400"
            }`}
          >
            Home
          </Link>

          <Link
            to="/explore"
            className={`transition ${
              activePath === "/explore" ? "text-white" : "text-slate-400"
            }`}
          >
            Explore
          </Link>
        </nav>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-3">
          {/* AUTH BUTTONS */}
          {!logged && (
            <div className="hidden sm:flex items-center gap-2">
              <Link
                to="/login"
                className="px-3 py-1.5 text-sm rounded-md border border-zinc-700 hover:border-white transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="px-3 py-1.5 text-sm rounded-md bg-white text-black hover:opacity-80 transition"
              >
                Sign Up
              </Link>
            </div>
          )}

          {/* PROFILE */}
          {logged && user && (
            <Link to="/profile">
              <img
                src={
                  user?.avatar ||
                  "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://img5.thuthuatphanmem.vn/uploads/2021/11/12/hinh-anh-anime-don-gian-hinh-nen-anime-don-gian-ma-dep_092443354.png"
                }
                className="w-9 h-9 rounded-full object-cover border border-zinc-700 hover:scale-105 transition"
              />
            </Link>
          )}

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setMenuOpen((p) => !p)}
            className="sm:hidden text-2xl hover:scale-110 transition"
          >
            <RiMenu3Fill />
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`sm:hidden border-t border-zinc-800 px-6 py-4 flex flex-col gap-3 text-sm text-slate-300 overflow-hidden transition-all duration-300
        ${menuOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <Link
          to="/"
          onClick={closeMenu}
          className="hover:text-white transition"
        >
          Home
        </Link>

        <Link
          to="/explore"
          onClick={closeMenu}
          className="hover:text-white transition"
        >
          Explore
        </Link>

        {!logged ? (
          <>
            <Link to="/login" onClick={closeMenu} className="hover:text-white">
              Login
            </Link>

            <Link
              to="/register"
              onClick={closeMenu}
              className="hover:text-white"
            >
              Sign Up
            </Link>
          </>
        ) : (
          <Link to="/profile" onClick={closeMenu} className="hover:text-white">
            Profile
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
