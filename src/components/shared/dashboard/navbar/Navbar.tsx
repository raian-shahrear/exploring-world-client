import React from "react";
import { SidebarControllerProps } from "../sidevar/Sidebar";
import { RiMenuFoldFill, RiMenuUnfoldFill } from "react-icons/ri";
import Link from "next/link";
import userAvatar from "@/assets/icons/user-avatar-black.png";
import Image from "next/image";

const DashboardNavbar = ({
  setControlSidebar,
  controlSidebar,
}: SidebarControllerProps) => {
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

      <div className="flex items-center gap-10">
        <Link
          href="/dashboard/my-profile"
          className="cursor-pointer flex items-center gap-2"
        >
          <Image
            src={userAvatar}
            alt="user"
            width={32}
            height={32}
            className="w-8 h-8 rounded-full border-2 object-cover object-center"
          />
          <div className="flex flex-col gap-[2px] max-w-28">
            <p className="text-xs font-semibold text-ellipsis whitespace-nowrap overflow-hidden">
              User Name
            </p>
            <p className="text-xs font-medium">Admin</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default DashboardNavbar;
