"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavbarItems = () => {
  const pathname = usePathname();
  return (
    <>
      <li>
        <Link
          href="/"
          className={`${
            pathname === "/" ? "text-gray-900  bg-gray-200" : "text-gray-500"
          }`}
        >
          Home
        </Link>
      </li>
      <li>
        <Link
          href="/news-feed"
          className={`${
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
          href="/profile"
          className={`${
            pathname.match("/profile")
              ? "text-gray-900  bg-gray-200"
              : "text-gray-500"
          }`}
        >
          Profile
        </Link>
      </li>
      <li>
        <Link
          href="/about-us"
          className={`${
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
          className={`${
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
