import React, { createContext } from "react";

const UserContextProvider = createContext();

const UserContext = ({ children }) => {
  return (
    <UserContextProvider.Provider>{children}</UserContextProvider.Provider>
  );
};

export default UserContext;
