import React, { useContext, useEffect } from "react";
import { RemoveToken } from "../../utils/LocalStorageHandler";
import { useNavigate } from "react-router-dom";
import { UserContextProvider } from "../../context/UserContext";

const Logout = () => {
  const navto = useNavigate();
  const { setLogged } = useContext(UserContextProvider);
  useEffect(() => {
    RemoveToken("authToken");
    RemoveToken("user");
    setLogged(false);
    alert("User logout");
    navto("/home");
  }, []);
  return <div>Logout</div>;
};

export default Logout;
