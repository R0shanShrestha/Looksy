import React, { useContext, useEffect } from "react";
import { GetToken } from "../utils/LocalStorageHandler";
import { useNavigate } from "react-router-dom";
import { UserContextProvider } from "../context/UserContext";
import { PhotoContextProvider } from "../context/PhotoContext";

const UserAuthWrapper = ({ children }) => {
  const { setUser } = useContext(UserContextProvider);
  const { setStorage } = useContext(PhotoContextProvider);

  const token = GetToken("authToken");
  const user = GetToken("user");

  const navigate = useNavigate();

  useEffect(() => {
    if (!token || !user) {
      // clear state properly
      setUser(null);
      setStorage({
        total: 0,
        total_pages: 0,
        results: [],
      });

      navigate("/login");
      return;
    }

    try {
      setUser(JSON.parse(user));
    } catch (err) {
      console.log("Invalid user data");

      setUser(null);
      setStorage({
        total: 0,
        total_pages: 0,
        results: [],
      });

      navigate("/login");
    }
  }, [token, user, setUser, setStorage, navigate]);

  return <>{children}</>;
};

export default UserAuthWrapper;
