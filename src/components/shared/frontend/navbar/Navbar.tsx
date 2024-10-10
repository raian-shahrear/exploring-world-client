import Link from "next/link";

const FrontendNavbar = () => {
  return (
    <div className=" bg-slate-50 shadow-md fixed w-full">
      <div className="navbar lg:container mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
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
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/news-feed">News Feed</Link>
              </li>
              <li>
                <Link href="/profile">Profile</Link>
              </li>
              <li>
                <Link href="/about-us">About Us</Link>
              </li>
              <li>
                <Link href="/contact-us">Contact Us</Link>
              </li>
            </ul>
          </div>
          <Link href="/" className="tex-lg md:text-xl font-bold flex gap-1">
            <span>Exploring</span>
            <span>World</span>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/news-feed">News Feed</Link>
            </li>
            <li>
              <Link href="/profile">Profile</Link>
            </li>
            <li>
              <Link href="/about-us">About Us</Link>
            </li>
            <li>
              <Link href="/contact-us">Contact Us</Link>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <div className="flex gap-2 items-center">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrontendNavbar;
