import Link from "next/link";
import React from "react";
import { MdOutlineClose } from "react-icons/md";
import SidebarItems from "./SidebarItems";
import Image from "next/image";
import logo from "@/assets/icons/logo.jpg";

export interface SidebarControllerProps {
  controlSidebar: boolean;
  setControlSidebar: (value: boolean) => void;
}
const DashboardSidebar = ({
  setControlSidebar,
  controlSidebar,
}: SidebarControllerProps) => {
  return (
    <aside
      className={`z-10 w-[280px] md:w-[300px] h-screen border-r bg-slate-50 absolute lg:fixed top-0 transition-all duration-300 ${
        controlSidebar ? "left-0 lg:-left-[400%]" : "-left-[400%] lg:left-0"
      }`}
    >
      <div className="h-12 px-5 pt-1 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src={logo}
            alt="logo"
            width={26}
            height={26}
            className="w-[22px] h-[22px] md:w-[26px] md:h-[26px]"
          />
          <span className="text-lg lg:text-xl font-bold tracking-wide flex flex-col font-logo">
            Exploring World
          </span>
        </Link>
        <div
          className="cursor-pointer lg:hidden"
          onClick={() => setControlSidebar(false)}
        >
          <span className="text-xl">
            <MdOutlineClose />
          </span>
        </div>
      </div>
      <div className="px-5 pb-3 pt-8">
        <SidebarItems />
      </div>
    </aside>
  );
};

export default DashboardSidebar;
