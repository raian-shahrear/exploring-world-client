import FrontendFooter from "@/components/shared/frontend/footer/Footer";
import FrontendNavbar from "@/components/shared/frontend/navbar/Navbar";
import React from "react";

const FrontendLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <FrontendNavbar />
      <div className="min-h-[93.5vh] pt-[68px]">{children}</div>
      <FrontendFooter />
    </div>
  );
};

export default FrontendLayout;
