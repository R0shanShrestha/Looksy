import React, { useContext, useEffect } from "react";
import { GetToken } from "../utils/LocalStorageHandler";
import { useNavigate } from "react-router-dom";
import { UserContextProvider } from "../context/UserContext";
import { PhotoContextProvider } from "../context/PhotoContext";

const UserAuthWrapper = ({ children }) => {
  const { setUser, userProfile } = useContext(UserContextProvider);
  const { setStorage } = useContext(PhotoContextProvider);

  const token = GetToken("authToken");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
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

    userProfile();
  }, []);

  return <>{children}</>;
};

export default UserAuthWrapper;
