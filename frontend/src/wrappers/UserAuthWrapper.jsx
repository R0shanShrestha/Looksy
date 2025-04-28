import React, { useEffect } from "react";
import { GetToken } from "../utils/LocalStorageHandler";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserAuthWrapper = ({ children }) => {
  const token = GetToken("authToken");
  const navigator = useNavigate();
  useEffect(() => {
    if (!token) {
      navigator("/login");
    }
    
  }, []);

  return <div>{children}</div>;
};

export default UserAuthWrapper;
