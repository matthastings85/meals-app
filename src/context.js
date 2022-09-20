import React, { createContext, useState } from "react";

export const Context = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <Context.Provider value={[user, setUser]}>{children}</Context.Provider>
  );
};

export default UserProvider;
