"use client";
import Link from "next/link";
import NavbarItems from "./NavbarItems";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "@/context/user.provider";
import { logoutUser } from "@/actions/AuthActions";
import { protectedRoutes } from "@/constant";
import Image from "next/image";
import userAvatar from "@/assets/icons/user-avatar-black.png";
import { FaUserCog } from "react-icons/fa";
import { MdOutlineLogout, MdOutlineSpaceDashboard } from "react-icons/md";

const FrontendNavbar = () => {
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
    <div className=" bg-slate-50 shadow-md fixed w-full z-10">
      <div className="navbar lg:container mx-auto">
        <div className="navbar-start">
          <div className="dropdown me-2">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost ps-0 btn-sm lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <NavbarItems />
            </ul>
          </div>
          <Link href="/" className="tex-lg md:text-xl font-bold flex gap-1">
            <span>Exploring</span>
            <span>World</span>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <NavbarItems />
          </ul>
        </div>
        <div className="navbar-end">
          {userLoading ? (
            <span className="loading loading-dots loading-md"></span>
          ) : (
            <div className="flex gap-2 items-center">
              {user?.userEmail ? (
                <div className="dropdown dropdown-end">
                  <div tabIndex={0} role="button">
                    <Image
                      src={user?.userProfile ? user?.userProfile : userAvatar}
                      alt="user"
                      width={32}
                      height={32}
                      className="w-8 h-8 rounded-full border-2 object-cover object-center"
                    />
                  </div>
                  <div
                    tabIndex={0}
                    className="dropdown-content menu bg-base-100 rounded-lg z-[1] w-52 p-0 shadow"
                  >
                    <div className="flex flex-col gap-1 px-4 w-52 border-b py-2 mb-2">
                      <p className="text-gray-900 font-semibold text-ellipsis whitespace-nowrap overflow-hidden">
                        {user?.userName}
                      </p>
                      <p className="text-xs text-ellipsis whitespace-nowrap overflow-hidden">
                        {user?.userEmail}
                      </p>
                    </div>
                    <ul>
                      <li>
                        <Link
                          href="/dashboard/my-profile"
                        >
                          <span className="text-lg">
                            <FaUserCog />
                          </span>{" "}
                          Manage Profile
                        </Link>
                      </li>
                      <li>
                        <Link href="/dashboard">
                          <span className="text-lg">
                            <MdOutlineSpaceDashboard />
                          </span>
                          Dashboard
                        </Link>
                      </li>
                      <li className="mt-2 border-t rounded-lg">
                        <button
                          className="rounded-lg"
                          onClick={() => handleLogout()}
                        >
                          <span className="text-lg">
                            <MdOutlineLogout />
                          </span>
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="btn btn-xs md:btn-sm btn-neutral py-1 px-2 h-fit w-fit"
                  >
                    Login
                  </Link>
                  <span className="text-gray-300">|</span>
                  <Link
                    href="/register"
                    className="btn btn-xs md:btn-sm btn-outline py-1 px-2 h-fit w-fit"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FrontendNavbar;
