import React from "react";
import { createContext, useState } from "react";

export const UserContext = createContext({});

export function userContextProvider({ children }) {
  const [user, setUser] = useState(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}