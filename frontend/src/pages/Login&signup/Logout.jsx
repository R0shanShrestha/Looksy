import React, { useEffect } from "react";
import { RemoveToken } from "../../utils/LocalStorageHandler";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navto = useNavigate();
  useEffect(() => {
    RemoveToken("authToken");
    alert("User logout");
    navto("/home");
  }, []);
  return <div>Logout</div>;
};

export default Logout;
