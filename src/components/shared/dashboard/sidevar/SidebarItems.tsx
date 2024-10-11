"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { BsFileEarmarkPostFill } from "react-icons/bs";
import { FaUserCheck, FaUserCog, FaUsers } from "react-icons/fa";
import { MdOutlineLogout, MdOutlineSpaceDashboard } from "react-icons/md";

const SidebarItems = () => {
  const pathname = usePathname();
  return (
    <ul className="flex flex-col gap-2">
      <li>
        <Link
          href="/dashboard"
          className={`flex items-center gap-2 w-full text-sm font-medium tracking-wide px-4 py-2 rounded-[40px] transition-all duration-300 hover:bg-gray-200 hover:text-gray-900 ${
            pathname === "/dashboard"
              ? "text-gray-900  bg-gray-200"
              : "text-gray-500"
          }`}
        >
          <span className="text-lg">
            <MdOutlineSpaceDashboard />
          </span>
          <span>Dashboard</span>
        </Link>
      </li>
      <li>
        <Link
          href="/dashboard/posts"
          className={`flex items-center gap-2 w-full text-sm font-medium tracking-wide px-4 py-2 rounded-[40px] transition-all duration-300 hover:bg-gray-200 hover:text-gray-900 ${
            pathname.match("/dashboard/posts")
              ? "text-gray-900  bg-gray-200"
              : "text-gray-500"
          }`}
        >
          <span className="text-base">
            <BsFileEarmarkPostFill />
          </span>
          <span>Posts</span>
        </Link>
      </li>
      <li>
        <Link
          href="/dashboard/follow-users"
          className={`flex items-center gap-2 w-full text-sm font-medium tracking-wide px-4 py-2 rounded-[40px] transition-all duration-300 hover:bg-gray-200 hover:text-gray-900 ${
            pathname === "/dashboard/follow-users"
              ? "text-gray-900  bg-gray-200"
              : "text-gray-500"
          }`}
        >
          <span className="text-lg">
            <FaUserCheck />
          </span>
          <span>Follow Users</span>
        </Link>
      </li>
      <li>
        <Link
          href="/dashboard/users"
          className={`flex items-center gap-2 w-full text-sm font-medium tracking-wide px-4 py-2 rounded-[40px] transition-all duration-300 hover:bg-gray-200 hover:text-gray-900 ${
            pathname === "/dashboard/users"
              ? "text-gray-900  bg-gray-200"
              : "text-gray-500"
          }`}
        >
          <span className="text-lg">
            <FaUsers />
          </span>
          <span>Users</span>
        </Link>
      </li>
      <li>
        <Link
          href="/dashboard/my-profile"
          className={`flex items-center gap-2 w-full text-sm font-medium tracking-wide px-4 py-2 rounded-[40px] transition-all duration-300 hover:bg-gray-200 hover:text-gray-900 ${
            pathname === "/dashboard/my-profile"
              ? "text-gray-900  bg-gray-200"
              : "text-gray-500"
          }`}
        >
          <span className="text-lg">
            <FaUserCog />
          </span>
          <span>My Profile</span>
        </Link>
      </li>
      <li>
        <button className="flex items-center justify-start gap-2 w-full text-sm font-medium tracking-wide text-gray-500 px-4 py-2 rounded-[40px] transition-all duration-300 hover:bg-gray-200 hover:text-gray-900">
          <span className="text-lg">
            <MdOutlineLogout />
          </span>
          Logout
        </button>
      </li>
    </ul>
  );
};

export default SidebarItems;
