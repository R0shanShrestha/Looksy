import React, { useContext, useEffect, useRef, useState } from "react";
import { IoLockClosed, IoMail } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { UserContextProvider } from "../../context/UserContext";
import { GetToken } from "../../utils/LocalStorageHandler";

const Login = () => {
  const { login, logged } = useContext(UserContextProvider);
  const navTo = useNavigate();

  const email = useRef();
  const password = useRef();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = GetToken("authToken");
    if (token) navTo("/home");
  }, [logged]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    await login({
      email: email.current.value,
      password: password.current.value,
    });
    setLoading(false);
  };

  return (
    <div className="h-[calc(100vh-128px)] w-full flex flex-col lg:flex-row overflow-hidden">
      {/* LEFT SIDE */}
      <div className="relative w-full lg:w-1/2 flex items-end p-6 lg:p-12 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1492724441997-5dc865305da7"
          alt="bg"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-tr from-black via-black/60 to-transparent animate-gradientMove" />

        <div className="relative z-10 max-w-md text-white animate-fadeUp">
          <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold leading-tight">
            Explore ideas that spark creativity
          </h1>

          <p className="text-sm text-slate-300 mt-4">
            Search, save and download high-quality visuals instantly.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-2xl p-6 shadow-xl">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-semibold">Welcome Back</h1>
            <p className="text-sm text-slate-400 mt-2">Log in to continue</p>
          </div>

          <form className="space-y-4">
            {/* EMAIL */}
            <div className="flex items-center gap-2 bg-zinc-900 px-3 py-3 rounded-lg border border-zinc-800 focus-within:border-blue-500 transition">
              <IoMail className="text-slate-400" />
              <input
                ref={email}
                type="email"
                placeholder="Email"
                className="w-full bg-transparent outline-none text-sm"
              />
            </div>

            {/* PASSWORD */}
            <div className="flex items-center gap-2 bg-zinc-900 px-3 py-3 rounded-lg border border-zinc-800 focus-within:border-blue-500 transition">
              <IoLockClosed className="text-slate-400" />
              <input
                ref={password}
                type="password"
                placeholder="Password"
                className="w-full bg-transparent outline-none text-sm"
              />
            </div>

            <button
              onClick={submitHandler}
              disabled={loading}
              className={`w-full py-3 rounded-lg font-semibold transition
                ${
                  loading
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
            >
              {loading ? "Logging in..." : "Log In"}
            </button>
          </form>

          <p className="text-center text-sm text-slate-400 mt-6">
            Don’t have an account?{" "}
            <Link to="/register" className="text-blue-400 font-semibold">
              Sign Up
            </Link>
          </p>
        </div>
      </div>

      {/* ANIMATION */}
      <style>
        {`
          @keyframes gradientMove {
            0% { transform: translateX(-10%); }
            50% { transform: translateX(10%); }
            100% { transform: translateX(-10%); }
          }

          .animate-gradientMove {
            animation: gradientMove 8s ease-in-out infinite;
          }

          @keyframes fadeUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .animate-fadeUp {
            animation: fadeUp 0.8s ease-out;
          }
        `}
      </style>
    </div>
  );
};

export default Login;
