// src/hooks/useAuth.ts

import { useState, useEffect } from "react";

interface UseAuthReturn {
  token: string | null;
  isAuthenticated: boolean;
  loginUser: (token: string) => void;
  logoutUser: () => void;
}

export const useAuth = (): UseAuthReturn => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const loginUser = (token: string) => {
    localStorage.setItem("accessToken", token);
    setToken(token);
  };

  const logoutUser = () => {
    localStorage.removeItem("accessToken");
    setToken(null);
  };

  const isAuthenticated = !!token;

  return { token, isAuthenticated, loginUser, logoutUser };
};
