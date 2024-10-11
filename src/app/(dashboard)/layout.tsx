"use client";
import DashboardFooter from "@/components/shared/dashboard/footer/Footer";
import DashboardNavbar from "@/components/shared/dashboard/navbar/Navbar";
import DashboardSidebar from "@/components/shared/dashboard/sidevar/Sidebar";
import React, { useState } from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [controlSidebar, setControlSidebar] = useState(false);
  return (
    <div className="flex">
      <DashboardSidebar setControlSidebar={setControlSidebar} controlSidebar={controlSidebar} />
      <div className={`overflow-auto flex-1 transition-all duration-300 ${controlSidebar ? 'ml-0' : 'ml-0 lg:ml-[300px]'}`}>
        <DashboardNavbar setControlSidebar={setControlSidebar} controlSidebar={controlSidebar} />
        <div className="p-5 min-h-[90.8vh]">{children}</div>
      <DashboardFooter />
      </div>
    </div>
  );
};

export default DashboardLayout;
