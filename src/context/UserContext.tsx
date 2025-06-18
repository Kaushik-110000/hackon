"use client";

import { createContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";

interface UserData {
  _id: string;
  mobile: number;
  userName: string;
}

interface UserContextValue {
  userData: UserData | null;
  setUserData: (userData: UserData | null) => void;
}

export const UserContext = createContext<UserContextValue>({
  userData: null,
  setUserData: () => {},
});

export function UserProvider({ children }: { children: ReactNode }) {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("/api/auth/getUser");
        if (response.data.status === 200) {
          setUserData(response.data.data);
          console.log(response.data);
        } else {
          setUserData(null);
          console.log("You are not logged in ");
        }
      } catch (error) {
        {
          setUserData(null);
        }
      }
    };
    fetchUserData();
  }, []);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
}
