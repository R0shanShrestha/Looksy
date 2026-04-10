import React, { useContext, useEffect, useRef } from "react";
import { IoLockClosed, IoMail } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { UserContextProvider } from "../../context/UserContext";
import { GetToken } from "../../utils/LocalStorageHandler";

const Login = () => {
  const { login, logged } = useContext(UserContextProvider);
  const navTo = useNavigate();

  const email = useRef();
  const password = useRef();

  useEffect(() => {
    const token = GetToken("authToken");
    if (token) navTo("/home");
  }, [logged]);

  const submitHandler = (e) => {
    e.preventDefault();

    login({
      email: email.current.value,
      password: password.current.value,
    });
  };

  return (
    <div className="flex items-center justify-center px-4 py-10">

      {/* CARD */}
      <div className="w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-xl">

        {/* HEADER */}
        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold">
            Welcome Back
          </h1>
          <p className="text-sm text-slate-400 mt-2">
            Log in to continue exploring images
          </p>
        </div>

        {/* FORM */}
        <form className="space-y-4">

          {/* EMAIL */}
          <div className="flex items-center gap-2 bg-zinc-900 px-3 py-3 rounded-lg border border-zinc-800">
            <IoMail className="text-slate-400" />
            <input
              ref={email}
              type="email"
              placeholder="Email"
              className="w-full bg-transparent outline-none text-sm"
            />
          </div>

          {/* PASSWORD */}
          <div className="flex items-center gap-2 bg-zinc-900 px-3 py-3 rounded-lg border border-zinc-800">
            <IoLockClosed className="text-slate-400" />
            <input
              ref={password}
              type="password"
              placeholder="Password"
              className="w-full bg-transparent outline-none text-sm"
            />
          </div>

          {/* FORGOT */}
          <div className="flex justify-end">
            <button
              type="button"
              className="text-xs text-slate-400 hover:text-white transition"
            >
              Forgot password?
            </button>
          </div>

          {/* BUTTON */}
          <button
            onClick={submitHandler}
            className="w-full py-3 rounded-lg font-semibold bg-blue-600 hover:bg-blue-700 transition"
          >
            Log In
          </button>
        </form>

        {/* SIGNUP LINK */}
        <p className="text-center text-sm text-slate-400 mt-6">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-400 font-semibold">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;