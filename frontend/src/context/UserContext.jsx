import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { GetToken, SetToken } from "../utils/LocalStorageHandler";
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
  const BackendUri = import.meta.env.VITE_BACKEND_URI;
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
      const user = res.data;
      setLoading(false);
      SetToken("authToken", user.authtoken);
      SetToken("user", JSON.stringify(user.user));

      setLogged(true);
      alert("Sign up successfully");
    } catch (error) {
      if (error.data != "") {
        // console.log(error);
        if (error.response.data.error) {
          error.response.data.error.map((err) => {
            alert(err.msg);
          });
        }
        else{
          alert(error.response.data.msg)
        }
      } else {
        alert(
          error.response.data.msg == undefined
            ? "Fields Required"
            : alert(error.response.data.msg)
        );
      }
      setError(true);
      setLoading(false);
    }
  };

  // login
  const login = async (data) => {
    alert("We entered")
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

      alert("User Logged In");
    } catch (error) {
      alert(
        error.response.data.msg == undefined
          ? "Fields Required"
          : error.response.data.msg
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

      alert("User Logged In");
    } catch (error) {
      alert(
        error.response.data.msg == undefined
          ? "Fields Required"
          : error.response.data.msg
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
