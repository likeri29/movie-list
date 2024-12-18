"use client";
import { ThemeProvider } from "@mui/material";
import { Provider as StoreProvider } from "react-redux";
import theme from "@/theme";
import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import { SessionProvider } from "next-auth/react";
import { ProtectedRoute } from "./ProtectedRoute";
import { store } from "@/store/store";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <StoreProvider store={store}>
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
      </StoreProvider>
    </SessionProvider>
  );
}
