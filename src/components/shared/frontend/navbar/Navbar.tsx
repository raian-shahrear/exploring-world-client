"use client";
import { useState } from "react";
import Link from "next/link";
import NavbarUserDropdown from "./NavbarUserDropdown";
import { useUser } from "@/context/user.provider";
import NavbarItems from "./NavbarItems";
import DotsLoader from "@/components/ui/loading/DotsLoader";

const FrontendNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isLoading: userLoading } = useUser();
  return (
    <div className="bg-slate-50 shadow-md fixed w-full z-10">
      <div className="lg:container mx-auto px-2 py-3">
        <div className="relative flex items-center">
          <Link
            href="/"
            aria-label="Exploring World"
            title="Exploring World"
            className="inline-flex items-center gap-2"
          >
            <span className="tex-lg md:text-xl font-bold flex gap-1">
              <span>Exploring</span>
              <span>World</span>
            </span>
          </Link>
          <ul className="items-center hidden space-x-4 lg:flex mx-auto">
            <NavbarItems />
          </ul>
          <ul className="hidden lg:block">
            <li className="flex items-center gap-2 relative">
              {userLoading ? (
                <DotsLoader />
              ) : (
                <>
                  {user?.userEmail ? (
                    <div>
                      <NavbarUserDropdown />
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Link
                        href="/login"
                        className="py-1 px-2 h-fit w-fit bg-gray-900 text-white text-sm rounded-md"
                      >
                        Login
                      </Link>
                      <span className="text-gray-300">|</span>
                      <Link
                        href="/register"
                        className="py-1 px-2 h-fit w-fit bg-gray-300 text-gray-900 text-sm rounded-md"
                      >
                        Register
                      </Link>
                    </div>
                  )}
                </>
              )}
            </li>
          </ul>
          <div className="lg:hidden ms-auto">
            <div className="flex gap-4 items-center">
              <ul>
                <li className="flex items-center gap-2 relative">
                  {userLoading ? (
                    <DotsLoader />
                  ) : (
                    <>
                      {user?.userEmail ? (
                        <div>
                          <NavbarUserDropdown />
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Link
                            href="/login"
                            className="py-1 px-2 h-fit w-fit bg-gray-900 text-white text-sm rounded-md"
                          >
                            Login
                          </Link>
                          <span className="text-gray-300">|</span>
                          <Link
                            href="/register"
                            className="py-1 px-2 h-fit w-fit bg-gray-300 text-gray-900 text-sm rounded-md"
                          >
                            Register
                          </Link>
                        </div>
                      )}
                    </>
                  )}
                </li>
              </ul>
              <button
                aria-label="Open Menu"
                title="Open Menu"
                className="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline hover:bg-deep-purple-50 focus:bg-deep-purple-50"
                onClick={() => setIsMenuOpen(true)}
              >
                <svg className="w-5 text-gray-900" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z"
                  />
                  <path
                    fill="currentColor"
                    d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z"
                  />
                  <path
                    fill="currentColor"
                    d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z"
                  />
                </svg>
              </button>
            </div>
            {isMenuOpen && (
              <div className="absolute top-0 left-0 w-full z-10">
                <div className="p-5 bg-white border rounded shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <Link
                        href="/"
                        aria-label="Exploring World"
                        title="Exploring World"
                        className="inline-flex items-center"
                      >
                        <span className="text-lg md:text-xl font-bold tracking-wide text-gray-900 uppercase">
                          Exploring World
                        </span>
                      </Link>
                    </div>
                    <div>
                      <button
                        aria-label="Close Menu"
                        title="Close Menu"
                        className="p-2 -mt-2 -mr-2 transition duration-200 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <svg className="w-5 text-gray-600" viewBox="0 0 24 24">
                          <path
                            fill="currentColor"
                            d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <nav>
                    <ul className="space-y-4">
                      <NavbarItems />
                    </ul>
                  </nav>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrontendNavbar;
