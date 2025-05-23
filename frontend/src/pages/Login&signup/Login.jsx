import React, { useContext, useEffect, useRef } from "react";
import { IoLockClosed, IoMail } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { UserContextProvider } from "../../context/UserContext";
import { GetToken } from "../../utils/LocalStorageHandler";

const Login = () => {
  const { login, logged } = useContext(UserContextProvider);
  const navTo = useNavigate();

  useEffect(() => {
    const token = GetToken("authToken");
    if (token) {
      navTo("/home");
    }
  }, [logged]);
  const email = useRef();
  const password = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    const data = {
      email: email.current.value,
      password: password.current.value,
    };

    login(data);
  };
  return (
    <div className="flex flex-col space-y-10  w-[80vw] mx-auto mt-10">
      <div className="justify-center flex flex-col items-center">
        <h1 className="text-3xl font-semibold">Welcome Back to Looksy!</h1>
        <p className="text-sm font-light text-slate-300">
          Log in to discover amazing images.
        </p>
      </div>
      <form className="w-[400px] mx-auto px-1  flex flex-col space-y-2 py-2 gap-1">
        <div className=" flex space-x-2  items-center border px-2 rounded-xl bg-white text-zinc-900 ">
          <span className="text-3xl">
            <IoMail />
          </span>
          <input
            ref={email}
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
            ref={password}
            type="password"
            placeholder="Password"
            className=" w-full py-4 placeholder:text-zinc-500 outline-none"
          />
        </div>
        <div className=" flex justify-end">
          <p className="font-semibold text-sm">Forget Password?</p>
        </div>

        <div className=" flex justify-center">
          <button
            onClick={(e) => {
              submitHandler(e);
            }}
            className="hover:bg-blue-950 shadow-sm shadow-blue-400 bg-blue-500  p-3 w-full rounded-xl text-xl font-bold"
          >
            Log In
          </button>
        </div>
        <div className="  text-center flex flex-col gap-5 w-[400px] mt-5 mx-auto">
          <hr />
          <p>
            "Don't have an account?" ➔{" "}
            <Link to={"/register"} className="font-black text-blue-400">
              Sign Up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
