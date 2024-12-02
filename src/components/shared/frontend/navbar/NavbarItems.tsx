"use client";
import { useUser } from "@/context/user.provider";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavbarItems = () => {
  const pathname = usePathname();
  const { user } = useUser();
  return (
    <>
      <li>
        <Link
          href="/"
          className={`me-1 font-medium text-sm p-2 rounded-lg transition-all duration-300 hover:text-gray-900 hover:bg-gray-200 ${
            pathname === "/" ? "text-gray-900  bg-gray-200" : "text-gray-500"
          }`}
        >
          Home
        </Link>
      </li>
      <li>
        <Link
          href="/news-feed"
          className={`me-1 font-medium text-sm p-2 rounded-lg transition-all duration-300 hover:text-gray-900 hover:bg-gray-200 ${
            pathname === "/news-feed"
              ? "text-gray-900  bg-gray-200"
              : "text-gray-500"
          }`}
        >
          News Feed
        </Link>
      </li>
      <li>
        <Link
          href="/events"
          className={`me-1 font-medium text-sm p-2 rounded-lg transition-all duration-300 hover:text-gray-900 hover:bg-gray-200 ${
            pathname === "/events"
              ? "text-gray-900  bg-gray-200"
              : "text-gray-500"
          }`}
        >
          Events
        </Link>
      </li>
      {user?.role === "user" && (
        <li>
          <Link
            href="/profile/my-posts"
            className={`me-1 font-medium text-sm p-2 rounded-lg transition-all duration-300 hover:text-gray-900 hover:bg-gray-200 ${
              pathname === "/profile/my-posts"
                ? "text-gray-900  bg-gray-200"
                : "text-gray-500"
            }`}
          >
            My Posts
          </Link>
        </li>
      )}
      <li>
        <Link
          href="/about-us"
          className={`me-1 font-medium text-sm p-2 rounded-lg transition-all duration-300 hover:text-gray-900 hover:bg-gray-200 ${
            pathname === "/about-us"
              ? "text-gray-900  bg-gray-200"
              : "text-gray-500"
          }`}
        >
          About Us
        </Link>
      </li>
      <li>
        <Link
          href="/contact-us"
          className={`me-1 font-medium text-sm p-2 rounded-lg transition-all duration-300 hover:text-gray-900 hover:bg-gray-200 ${
            pathname === "/contact-us"
              ? "text-gray-900  bg-gray-200"
              : "text-gray-500"
          }`}
        >
          Contact Us
        </Link>
      </li>
    </>
  );
};

export default NavbarItems;
