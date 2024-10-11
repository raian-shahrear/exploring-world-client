import React from "react";
import { Toaster } from "sonner";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Toaster position="top-center" richColors />
      <div>{children}</div>
    </div>
  );
};

export default Providers;
