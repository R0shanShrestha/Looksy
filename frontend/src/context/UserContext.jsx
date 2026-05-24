import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { GetToken, SetToken } from "../utils/LocalStorageHandler";
import { toast } from "sonner";
import { PhotoContextProvider } from "./PhotoContext";

export const UserContextProvider = createContext({
  register: () => {},
  login: () => {},
  logout: () => {},
  user: null,
  isLoading: false,
  logged: false,
  setLogged: () => {},
  setUser: () => {},
  userProfile: () => {},
});

const UserContext = ({ children }) => {
  const BackendUri = import.meta.env.VITE_BACKEND_URI + "/api/v1/user";
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [logged, setLogged] = useState(false);

  //  REGISTER
  const register = async (data) => {
    try {
      setLoading(true);
      const res = await axios.post(`${BackendUri}/signup`, data, {
        withCredentials: true,
      });

      const userData = res.data;

      // store token + user
      SetToken("authToken", userData.authToken);
      setUser(userData.user);
      setLogged(true);

      toast.success("Signup successful");
    } catch (error) {
      if (error.response?.data?.error) {
        error.response.data.error.forEach((err) => {
          toast.error(err.msg);
        });
      } else {
        toast.error(error.response?.data?.msg || "Signup failed");
      }
    } finally {
      setLoading(false);
    }
  };

  // ✅ LOGIN
  const login = async (data) => {
    try {
      setLoading(true);

      const res = await axios.post(`${BackendUri}/login`, data);

      const userData = res.data;

      SetToken("authToken", userData.authToken);
      setUser(userData.user);
      setLogged(true);
      toast.success("Login successful");
    } catch (error) {
      toast.error(error.response?.data?.msg || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // ✅ LOGOUT
  const logout = () => {
    localStorage.removeItem("authToken");
    setUser(null);
    setLogged(false);
    toast.success("Logged out");
  };

  // userprofile
  const userProfile = async () => {
    const token = GetToken("authToken");
    if (!token) {
      return;
    }
    try {
      const updatedUser = await axios.get(BackendUri + "/profile/", {
        withCredentials: true,
        headers: {
          authtoken: token,
        },
      });
      setUser(updatedUser.data);
    } catch (error) {
      toast.error(error?.response?.data?.msg || error.message);
    }
  };
  return (
    <UserContextProvider.Provider
      value={{
        register,
        login,
        logout,
        userProfile,
        user,
        isLoading,
        logged,
        setUser,
        setLogged,
      }}
    >
      {children}
    </UserContextProvider.Provider>
  );
};

export default UserContext;
