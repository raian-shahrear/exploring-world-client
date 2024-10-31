"use client";
import { logoutUser } from "@/actions/AuthActions";
import DotsLoader from "@/components/ui/loading/DotsLoader";
import { protectedRoutes } from "@/constant";
import { useUser } from "@/context/user.provider";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { BsFileEarmarkPostFill } from "react-icons/bs";
import { FaUserCheck, FaUserCog, FaUsers } from "react-icons/fa";
import { MdOutlineLogout, MdOutlineSpaceDashboard } from "react-icons/md";
import { VscGroupByRefType } from "react-icons/vsc";

const SidebarItems = () => {
  const {
    user,
    setIsLoading: setUserLoading,
    isLoading: userLoading,
  } = useUser();
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    logoutUser();
    setUserLoading(true);
    if (protectedRoutes.includes(pathname)) {
      router.push("/");
    }
  };
  return (
    <>
      {userLoading ? (
        <div className="flex justify-center items-center h-[65vh]">
          <DotsLoader />
        </div>
      ) : (
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
          {user?.role === "admin" && (
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
                <span>Manage Posts</span>
              </Link>
            </li>
          )}
          {user?.role === "admin" && (
            <li>
              <Link
                href="/dashboard/category"
                className={`flex items-center gap-2 w-full text-sm font-medium tracking-wide px-4 py-2 rounded-[40px] transition-all duration-300 hover:bg-gray-200 hover:text-gray-900 ${
                  pathname.match("/dashboard/category")
                    ? "text-gray-900  bg-gray-200"
                    : "text-gray-500"
                }`}
              >
                <span className="text-lg">
                  <VscGroupByRefType />
                </span>
                <span>Manage Category</span>
              </Link>
            </li>
          )}
          {user?.role === "user" && (
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
                <span>Following Profiles</span>
              </Link>
            </li>
          )}
          {user?.role === "admin" && (
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
                <span>Manage Users</span>
              </Link>
            </li>
          )}
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
            <button
              onClick={() => handleLogout()}
              className="flex items-center justify-start gap-2 w-full text-sm font-medium tracking-wide text-gray-500 px-4 py-2 rounded-[40px] transition-all duration-300 hover:bg-gray-200 hover:text-gray-900"
            >
              <span className="text-lg">
                <MdOutlineLogout />
              </span>
              Logout
            </button>
          </li>
        </ul>
      )}
    </>
  );
};

export default SidebarItems;
