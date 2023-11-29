"use client";
import { createContext, useEffect, useState } from "react";
import { setCookie, parseCookies } from "nookies";
import { useRouter } from "next/navigation";
import { api, authLogin, checkToken } from "@/services/api";

type SignInData = {
  email: string;
  password: string;
};

type AuthContextType = {
  isAuthenticated: boolean;
  signIn: (data: SignInData) => Promise<void>;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: any) {
  const nav = useRouter();
  const [token, setToken] = useState(null);

  const isAuthenticated = !!token;

  useEffect(() => {
    const { "nextauth.token": token } = parseCookies();

    if (token) {
      checkToken().then((response) => {
        setToken(response.data);
      });
    }
  }, []);

  async function signIn({ email, password }: SignInData) {
    authLogin(email, password)
      .then((ress) => {
        const token = ress.data.access_token;
        if (token) {
          setCookie(undefined, "nextauth.token", token, {
            maxAge: 10, // 10 min
          });
        }
        api.defaults.headers["Authorization"] = `Bearer ${token}`;
        setToken(token);
        nav.push("/");
      })
      .catch((err) => {});
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}
