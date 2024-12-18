"use client";
import { ThemeProvider } from "@mui/material";
import theme from "@/theme";
import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import { SessionProvider } from "next-auth/react";
import { ProtectedRoute } from "./ProtectedRoute";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <ThemeProvider theme={theme}>
        <ToastContainer
          position="bottom-left"
          autoClose={3000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnHover
          theme="light"
        />
        <ProtectedRoute>{children}</ProtectedRoute>
      </ThemeProvider>
    </SessionProvider>
  );
}
