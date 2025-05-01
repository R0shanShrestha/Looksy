import React, { createContext, useState } from "react";
import axios from "axios";
import { SetToken } from "../utils/LocalStorageHandler";
export const UserContextProvider = createContext({
  register: () => {},
  login: () => {},
  user: [],
  isLoading: false,
  setUser: () => {},
});

const UserContext = ({ children }) => {
  const BackendUri = import.meta.env.VITE_BACKEND_URI;
  const [user, setUser] = useState(null);
  const [isError, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);

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
      setUser(user.user);
      alert("Sign up successfully");
    } catch (error) {
      console.log(error);
      if (error.data != "") {
        error.response.data.error.map((err) => {
          alert(err.msg);
        });
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
      alert("User Logged In");
    } catch (error) {
    console.log(2)
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
      value={{ register, login, user, setUser, isLoading }}
    >
      {children}
    </UserContextProvider.Provider>
  );
};

export default UserContext;
