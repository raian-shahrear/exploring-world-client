"use client";
import React from "react";
import { SidebarControllerProps } from "../sidevar/Sidebar";
import { RiMenuFoldFill, RiMenuUnfoldFill } from "react-icons/ri";
import { useUser } from "@/context/user.provider";
import DotsLoader from "@/components/ui/loading/DotsLoader";
import NavbarDropdown from "./NavbarDropdown";

const DashboardNavbar = ({
  setControlSidebar,
  controlSidebar,
}: SidebarControllerProps) => {
  const { isLoading: userLoading } = useUser();
  return (
    <div className="h-12 border-b px-5 flex justify-between items-center bg-slate-50">
      <div
        className="text-2xl cursor-pointer"
        onClick={() => setControlSidebar(!controlSidebar)}
      >
        <span
          className={`${
            controlSidebar ? "hidden lg:inline-block" : "inline-block lg:hidden"
          }`}
        >
          <RiMenuUnfoldFill />
        </span>
        <span
          className={`${
            controlSidebar ? "inline-block lg:hidden" : "hidden lg:inline-block"
          }`}
        >
          <RiMenuFoldFill />
        </span>
      </div>
      {userLoading ? <DotsLoader /> : <NavbarDropdown />}
    </div>
  );
};

export default DashboardNavbar;
