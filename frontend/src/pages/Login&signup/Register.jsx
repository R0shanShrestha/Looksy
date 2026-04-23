import React, { useContext, useEffect, useRef } from "react";
import { IoLockClosed, IoMail } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { UserContextProvider } from "../../context/UserContext";
import { GetToken } from "../../utils/LocalStorageHandler";
import { toast } from "sonner";

const Register = () => {
  const { register, isLoading, logged } = useContext(UserContextProvider);
  const navTo = useNavigate();

  const username = useRef();
  const email = useRef();
  const password = useRef();

  useEffect(() => {
    const token = GetToken("authToken");
    if (token) navTo("/home");
  }, [logged]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (
      !email.current.value ||
      !password.current.value ||
      !username.current.value
    ) {
      toast.error("All fields required!");
      return;
    }

    register({
      email: email.current.value,
      password: password.current.value,
      username: username.current.value,
    });
  };

  return (
    <div className="w-full h-[calc(100vh-128px)] flex flex-col lg:flex-row overflow-hidden">
      {/* LEFT SIDE (IMAGE + BRAND) */}
      <div className="relative w-full lg:w-1/2 flex items-end p-6 lg:p-12 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1522199710521-72d69614c702"
          alt="bg"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-tr from-black via-black/60 to-transparent" />

        <div className="relative z-10 text-white max-w-md">
          <h1 className="text-3xl lg:text-5xl font-bold leading-tight">
            Join and explore unlimited inspiration
          </h1>
          <p className="text-sm text-slate-300 mt-4">
            Save, download, and discover high quality images every day.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE (FORM) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-zinc-950 rounded-2xl p-6 sm:p-8 shadow-xl border border-zinc-800">
          {/* HEADER */}
          <div className="text-center mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold">Create Account</h1>
            <p className="text-sm text-slate-400 mt-2">
              Start discovering images instantly
            </p>
          </div>

          {/* FORM */}
          <form className="space-y-4">
            {/* USERNAME */}
            <div className="flex items-center gap-2 bg-zinc-900 px-3 py-3 rounded-lg border border-zinc-800 focus-within:border-blue-500 transition">
              <FaUser className="text-slate-400" />
              <input
                ref={username}
                type="text"
                placeholder="Username"
                className="w-full bg-transparent outline-none text-sm"
              />
            </div>

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

            {/* BUTTON */}
            <button
              onClick={submitHandler}
              disabled={isLoading}
              className="w-full py-3 rounded-lg font-semibold bg-blue-600 hover:bg-blue-700 transition disabled:opacity-60"
            >
              {isLoading ? (
                <div className="flex justify-center">
                  <div className="w-5 h-5 border-t-2 border-r-2 border-white rounded-full animate-spin" />
                </div>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* LOGIN LINK */}
          <p className="text-center text-sm text-slate-400 mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-400 font-semibold">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
