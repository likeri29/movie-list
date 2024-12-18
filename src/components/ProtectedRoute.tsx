"use client";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { ReactNode, useEffect } from "react";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (status === "loading") return;

    if (!session && pathname !== "/signin" && pathname !== "/signup") {
      router.push("/signin");
    }

    if (session && (pathname === "/signin" || pathname === "/signup")) {
      router.push("/");
    }
  }, [session, status, router, pathname]);

  return <>{children}</>;
};
