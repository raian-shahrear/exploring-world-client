"use client";
import { logoutUser } from "@/actions/AuthActions";
import { protectedRoutes } from "@/constant";
import { useUser } from "@/context/user.provider";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { MdOutlineLogout, MdOutlineSpaceDashboard } from "react-icons/md";
import userAvatar from "@/assets/icons/user-avatar-black.png";
import { useGetAllUser } from "@/hooks/auth.hook";
import { TUser } from "@/types";
import VerifyUserModal from "@/components/ui/modal/VerifyUserModal";
import { IoIosArrowDropdownCircle } from "react-icons/io";

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
        className="cursor-pointer relative"
        onClick={() => setControlDropdown(!controlDropdown)}
      >
        <Image
          src={user?.userProfile ? user?.userProfile : userAvatar}
          alt="user"
          width={36}
          height={36}
          className="w-9 h-9 rounded-full border-2 object-cover object-center border-gray-300"
        />
        <span className="absolute bottom-0 right-[-4px] text-gray-900">
          <IoIosArrowDropdownCircle />
        </span>
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
              <VerifyUserModal />
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
