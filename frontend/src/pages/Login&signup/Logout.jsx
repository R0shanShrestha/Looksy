import React, { useContext, useEffect } from "react";
import { RemoveToken } from "../../utils/LocalStorageHandler";
import { useNavigate } from "react-router-dom";
import { UserContextProvider } from "../../context/UserContext";
import { toast } from "sonner";

const Logout = () => {
  const navto = useNavigate();
  const { setLogged } = useContext(UserContextProvider);
  useEffect(() => {
    RemoveToken("authToken");
    setLogged(false);
    toast.success("Successfully logged out");
    navto("/home");
  }, []);
  return <></>;
};

export default Logout;
