import FrontendFooter from "@/components/shared/frontend/footer/Footer";
import FrontendNavbar from "@/components/shared/frontend/navbar/Navbar";
import React from "react";

const FrontendLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <FrontendNavbar />
      <div className="min-h-[93vh] pt-[100px] container mx-auto px-2">
        {children}
      </div>
      <div className="mt-6">
        <FrontendFooter />
      </div>
    </div>
  );
};

export default FrontendLayout;
