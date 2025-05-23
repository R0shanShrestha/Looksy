import React, { useContext, useEffect } from "react";
import { GetToken } from "../utils/LocalStorageHandler";
import { useNavigate } from "react-router-dom";
import { UserContextProvider } from "../context/UserContext";
import { PhotoContextProvider } from "../context/PhotoContext";

const UserAuthWrapper = ({ children }) => {
  const { setUser } = useContext(UserContextProvider);
  const {setStorage} = useContext(PhotoContextProvider)
  const token = GetToken("authToken");
  const user = GetToken("user");
  // console.log(user)
  const navigator = useNavigate();
  useEffect(() => {
    if (!token || !user) {
      setStorage([])
      navigator("/login");
    }
    setUser(JSON.parse(user));
  }, []);

  return <div>{children}</div>;
};

export default UserAuthWrapper;
