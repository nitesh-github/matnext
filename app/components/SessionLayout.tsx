"use client";

import DashboardLayout from "./DashBoardLayout";
import AuthLayout from "./AuthLayout";
import { useSession, signOut } from "next-auth/react";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
interface TokenPayload {
  exp: number;
}

const SessionLayout = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();
  useEffect(() => {
    const checkSession = async () => {
      if (status === "authenticated" && session?.expires) {
        if (!session?.accessToken) return;
        const decoded: TokenPayload = jwtDecode(session?.accessToken);
        const isTokenExpired = decoded.exp * 1000 < Date.now();
        if (isTokenExpired) {
          console.warn("Session expired. Logging out...");
          await signOut({ callbackUrl: "/login" });
        }
      }
    };

    checkSession();
  }, [session, status]);
  return (
    <>
      {session ? (
        <DashboardLayout>{children}</DashboardLayout>
      ) : (
        <AuthLayout>{children}</AuthLayout>
      )}
    </>
  );
};

export default SessionLayout;
