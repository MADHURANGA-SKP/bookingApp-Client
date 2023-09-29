import axios from "axios";
import React, { useEffect } from "react";
import { createContext, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    if (!user) {
      axios.get("/profile").then(({ data }) => {
        setUser(data);
      });
      // setUser(data);  This line is problematic if its run whole prject crashes
    }
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
