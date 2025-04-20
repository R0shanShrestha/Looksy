import React from "react";
import { IoLockClosed, IoMail } from "react-icons/io5";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="flex flex-col space-y-10">
      <div className="justify-center flex flex-col items-center">
        <h1 className="text-3xl font-semibold">Welcome Back to Looksy!</h1>
        <p className="text-sm font-light text-slate-300">
          Log in to discover amazing images.
        </p>
      </div>
      <form className="w-[80%] mx-auto px-1 flex flex-col space-y-2 py-2 gap-1">
        <div className=" flex space-x-2  items-center border px-2 rounded-xl bg-white text-zinc-900 ">
          <span className="text-3xl">
            <IoMail />
          </span>
          <input
            type="email"
            placeholder="Email"
            className=" w-full py-4 placeholder:text-zinc-500 outline-none"
          />
        </div>
        <div className=" flex space-x-2  items-center border px-2 rounded-xl bg-white text-zinc-900 ">
          <span className="text-3xl">
            <IoLockClosed />
          </span>
          <input
            type="password"
            placeholder="Password"
            className=" w-full py-4 placeholder:text-zinc-500 outline-none"
          />
        </div>
        <div className=" flex justify-end">
          <p className="font-semibold text-sm">Forget Password?</p>
        </div>

        <div className=" flex justify-center">
          <button className="bg-blue-950 shadow-sm shadow-blue-400 focus:bg-blue-500  p-3 w-full rounded-xl text-xl font-bold">
            Log In
          </button>
        </div>
      </form>
      <div className="  text-center flex flex-col gap-5 w-[80%] mx-auto">
        <hr />
        <p>
          "Don't have an account?" ➔{" "}
          <Link to={'/register'} className="font-black text-blue-400">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
