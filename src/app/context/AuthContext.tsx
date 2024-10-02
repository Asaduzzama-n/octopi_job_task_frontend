/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client";
import { instance } from "@/lib/axios";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

interface AuthContextProps {
  user: any;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (userData: any) => Promise<void>;
  error: string | null;
  loading: boolean;
  setLoading: any;
  setError: any;
  setUser: any;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const login = async (email: string, password: string) => {
    try {
      const response = await instance.post("/auth/login", { email, password });

      const { userData, accessToken } = response.data.result;
      setUser(userData);
      setLoading(false);
      localStorage.setItem("accessToken", accessToken);
      toast.success(`Welcome ${userData.firstName + " " + userData.lastName}`);
      router.push("/");
    } catch (error) {
      setError("Login failed. Please check your credentials.");
    }
  };

  // Check if user is authenticated on reload
  useEffect(() => {
    const fetchUser = async () => {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        try {
          const response = await instance.get("/auth/user", {
            headers: {
              Authorization: `${accessToken}`,
            },
          });
          setUser(response.data.result.userData);
        } catch (error) {
          throw new Error("Failed to get user information.");
        }
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  const register = async (userData: any) => {
    try {
      await instance.post("/auth/register", userData);

      toast.success("Registration Complete please login to continue");
      router.push("/login");
    } catch (error) {
      toast.error("Registration failed. Please try again.");
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        register,
        error,
        loading,
        setLoading,
        setError,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
