import DashboardFooter from "@/components/shared/dashboard/footer/Footer";
import DashboardNavbar from "@/components/shared/dashboard/navbar/Navbar";
import DashboardSidebar from "@/components/shared/dashboard/sidevar/Sidebar";
import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <DashboardNavbar />
      <div>
        <DashboardSidebar />
        <div>{children}</div>
      </div>
      <DashboardFooter />
    </div>
  );
};

export default DashboardLayout;
