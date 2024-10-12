"use client";
import UserProvider from "@/context/user.provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { Toaster } from "sonner";

const queryClient = new QueryClient();

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <Toaster position="top-center" richColors />
        <div>{children}</div>
      </UserProvider>
    </QueryClientProvider>
  );
};

export default Providers;
