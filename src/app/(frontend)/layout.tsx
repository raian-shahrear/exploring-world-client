import FrontendFooter from "@/components/shared/frontend/footer/Footer";
import FrontendNavbar from "@/components/shared/frontend/navbar/Navbar";
import React from "react";

const FrontendLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <FrontendNavbar />
      <div>{children}</div>
      <FrontendFooter />
    </div>
  );
};

export default FrontendLayout;
