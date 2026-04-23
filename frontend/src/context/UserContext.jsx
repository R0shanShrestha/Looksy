import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { GetToken, SetToken } from "../utils/LocalStorageHandler";
import { toast } from "sonner";
export const UserContextProvider = createContext({
  register: () => {},
  login: () => {},
  user: [],
  isLoading: false,
  logged: false,
  setLogged: () => {},
  setUser: () => {},
});

const UserContext = ({ children }) => {
  const BackendUri = import.meta.env.VITE_BACKEND_URI + "/api/v1/user";
  const [user, setUser] = useState(null);
  const [isError, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [logged, setLogged] = useState(false);

  const register = async (data) => {
    try {
      setError(false);
      setLoading(true);
      const res = await axios.post(`${BackendUri}/signup`, data, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      const user =  await res.data;
      setLoading(false);
      SetToken("authToken", user.authtoken);
      SetToken("user", JSON.stringify(user.user));

      setLogged(true);
      toast.success("Sign up successfully");
    } catch (error) {
      if (error.data != "") {
        // console.log(error);
        if (error?.response?.data?.error ) {
          error.response.data.error.map((err) => {
            toast.error(err.msg);
          });
        } else {
          toast.error(error.response.data.msg);
        }
      } else {
        toast.error(
          error.response.data.msg == undefined
            ? "Fields Required"
            : toast.error(error.response.data.msg),
        );
      }
      setError(true);
      setLoading(false);
    }
  };

  // login
  const login = async (data) => {
    try {
      setError(false);
      setLoading(true);
      const res = await axios.post(`${BackendUri}/login`, data, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      const user = res.data;
      setLoading(false);
      SetToken("authToken", user.authToken);
      SetToken("user", JSON.stringify(user.user));
      setLogged(true);

      toast.success("User Logged In");
    } catch (error) {
      toast.error(
        error.response.data.msg == undefined
          ? "Fields Required"
          : error.response.data.msg,
      );
      setError(true);
      setLoading(false);
    }
  };
  const userProfile = async (data) => {
    try {
      setError(false);
      setLoading(true);
      const res = await axios.post(`${BackendUri}/login`, data, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      const user = res.data;
      setLoading(false);
      SetToken("authToken", user.authToken);
      setUser(user.user);
      setLogged(true);

      toast.error("User Logged In");
    } catch (error) {
      toast.error(
        error.response.data.msg == undefined
          ? "Fields Required"
          : error.response.data.msg,
      );
      setError(true);
      setLoading(false);
    }
  };

  return (
    <UserContextProvider.Provider
      value={{ register, login, user, setUser, isLoading, logged, setLogged }}
    >
      {children}
    </UserContextProvider.Provider>
  );
};

export default UserContext;
