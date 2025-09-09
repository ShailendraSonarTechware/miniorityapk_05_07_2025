// hooks/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type AuthContextType = {
  token: string | null;
  user: any | null;
  loading: boolean;
  login: (userData: any, newToken: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSession = async () => {
      try {
        const savedToken = await AsyncStorage.getItem("token");
        const savedUser = await AsyncStorage.getItem("user");
        if (savedToken) setToken(savedToken);
        if (savedUser) setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Failed to load session", error);
      } finally {
        setLoading(false);
      }
    };
    loadSession();
  }, []);

  const login = async (userData: any, newToken: string) => {
    try {
      setToken(newToken);
      setUser(userData);
      await AsyncStorage.setItem("token", newToken);
      await AsyncStorage.setItem("user", JSON.stringify(userData));
    } catch (error) {
      console.error("Failed to save session", error);
    }
  };

  const logout = async () => {
    try {
      setToken(null);
      setUser(null);
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("user");
    } catch (error) {
      console.error("Failed to clear session", error);
    }
  };

  return (
    <AuthContext.Provider value={{ token, user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
};
