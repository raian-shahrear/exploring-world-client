"use client";
import { logoutUser } from "@/actions/AuthActions";
import { protectedRoutes } from "@/constant";
import { useUser } from "@/context/user.provider";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { IoCloseSharp, IoWarningOutline } from "react-icons/io5";
import { MdOutlineLogout, MdOutlineSpaceDashboard } from "react-icons/md";
import userAvatar from "@/assets/icons/user-avatar-black.png";
import { useGetAllUser } from "@/hooks/auth.hook";
import { TUser } from "@/types";

const NavbarUserDropdown = () => {
  const [controlDropdown, setControlDropdown] = useState(false);
  const { user, setIsLoading: setUserLoading } = useUser();
  const { data: allUsers } = useGetAllUser();
  const loggedInUser: TUser = allUsers?.data?.find(
    (info: TUser) => info?._id === user?.id
  );
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
    <div className="relative">
      <div
        className="cursor-pointer"
        onClick={() => setControlDropdown(!controlDropdown)}
      >
        <Image
          src={user?.userProfile ? user?.userProfile : userAvatar}
          alt="user"
          width={32}
          height={32}
          className="w-8 h-8 rounded-full border-2 object-cover object-center"
        />
      </div>
      <div
        className={`absolute top-9 right-0 bg-white rounded-lg shadow-xl w-60 z-10 ${
          controlDropdown ? "block" : "hidden"
        }`}
      >
        <div className="p-3 relative">
          <div className="w-44">
            <p className="text-sm font-semibold">{user?.userName}</p>
            <p
              className="text-xs text-ellipsis whitespace-nowrap overflow-hidden mb-1"
              title={user?.userEmail}
            >
              {user?.userEmail}
            </p>
            {loggedInUser?.isVerified === "verified" ? (
              <span className="text-green-600 text-[11px] font-medium flex items-center gap-1">
                <FaCheckCircle /> Verified
              </span>
            ) : loggedInUser?.isVerified === "pending" ? (
              <Link
                href="/"
                className="w-fit text-orange-600 text-[11px] font-medium flex items-center gap-1 border border-orange-600 rounded-md px-1 transition-all duration-300 hover:bg-gray-900 hover:border-gray-900 hover:text-white"
              >
                <IoWarningOutline /> Verify account
              </Link>
            ) : (
              ""
            )}
          </div>
          <span
            className="absolute top-2 right-4 cursor-pointer"
            onClick={() => setControlDropdown(false)}
          >
            <IoCloseSharp />
          </span>
        </div>
        <hr className="py-[2px]" />
        <ul className="p-1 pt-0">
          <li onClick={() => setControlDropdown(false)}>
            <Link
              href="/dashboard"
              className="w-full flex items-center gap-1 p-2 cursor-pointer rounded-md text-sm transition-all duration-300 hover:bg-gray-100"
            >
              <span className="text-base">
                <MdOutlineSpaceDashboard />
              </span>
              Dashboard
            </Link>
          </li>
          <li onClick={() => setControlDropdown(false)}>
            <div
              className="w-full flex items-center gap-1 p-2 cursor-pointer rounded-md text-sm transition-all duration-300 hover:bg-gray-100"
              onClick={() => handleLogout()}
            >
              <span className="text-base">
                <MdOutlineLogout />
              </span>
              Logout
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavbarUserDropdown;
