import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import { useEffect } from "react";

export const Private = ({ children }: any) => {
  const nav = useRouter();

  useEffect(() => {
    const { "nextauth.token": token }: any = parseCookies();
    if (token === undefined) {
      nav.push("/login")
    }
  }, []);

  return children;
};
