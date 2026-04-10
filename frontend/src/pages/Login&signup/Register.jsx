import React, { useContext, useEffect, useRef } from "react";
import { IoLockClosed, IoMail } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { UserContextProvider } from "../../context/UserContext";
import { GetToken } from "../../utils/LocalStorageHandler";

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

    register({
      email: email.current.value,
      password: password.current.value,
      username: username.current.value,
    });
  };

  return (
    <div className="flex items-center justify-center px-4 py-10">
      
      {/* CARD */}
      <div className="w-full max-w-md bg-zinc-950 rounded-2xl p-6 sm:p-8 shadow-xl border border-zinc-800">
        
        {/* HEADER */}
        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold">
            Create Account
          </h1>
          <p className="text-sm text-slate-400 mt-2">
            Start discovering images instantly
          </p>
        </div>

        {/* FORM */}
        <form className="space-y-4">

          {/* USERNAME */}
          <div className="flex items-center gap-2 bg-zinc-900 px-3 py-3 rounded-lg border border-zinc-800">
            <FaUser className="text-slate-400" />
            <input
              ref={username}
              type="text"
              placeholder="Username"
              className="w-full bg-transparent outline-none text-sm"
            />
          </div>

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

          {/* BUTTON */}
          <button
            onClick={submitHandler}
            disabled={isLoading}
            className="w-full py-3 rounded-lg font-semibold transition bg-blue-600 hover:bg-blue-700 disabled:opacity-60"
          >
            {isLoading ? "Creating..." : "Create Account"}
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
  );
};

export default Register;