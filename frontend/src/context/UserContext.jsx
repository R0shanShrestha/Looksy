import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { GetToken, SetToken } from "../utils/LocalStorageHandler";
import { toast } from "sonner";

export const UserContextProvider = createContext({
  register: () => {},
  login: () => {},
  logout: () => {},
  user: null,
  isLoading: false,
  logged: false,
  setLogged: () => {},
  setUser: () => {},
});

const UserContext = ({ children }) => {
  const BackendUri = import.meta.env.VITE_BACKEND_URI + "/api/v1/user";

  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [logged, setLogged] = useState(false);

  //  Restore session on refresh
  useEffect(() => {
    const token = GetToken("authToken");
    const storedUser = GetToken("user");

    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
      setLogged(true);
    }
  }, []);

  //  REGISTER
  const register = async (data) => {
    try {
      setLoading(true);

      const res = await axios.post(`${BackendUri}/signup`, data, {
        withCredentials: true,
      });

      console.log(res)
      const userData = res.data;


      // store token + user
      SetToken("authToken", userData.authToken);
      SetToken("user", JSON.stringify(userData.user));

      setUser(userData.user);
      setLogged(true);

      toast.success("Signup successful");
    } catch (error) {
      console.log(error)
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
      SetToken("user", JSON.stringify(userData.user));

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
    localStorage.removeItem("user");

    setUser(null);
    setLogged(false);
    toast.success("Logged out");
  };

  return (
    <UserContextProvider.Provider
      value={{
        register,
        login,
        logout,
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
