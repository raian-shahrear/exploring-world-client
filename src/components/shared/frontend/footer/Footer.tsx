import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import logo from "@/assets/icons/logo.jpg";

const FrontendFooter = () => {
  return (
    <div className="bg-slate-50 shadow-md border-t">
      <footer className="gap-y-4 lg:container mx-auto items-center py-4 px-2 flex justify-between flex-col md:flex-row">
        <aside className="grid-flow-col justify-self-center md:justify-self-start">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src={logo}
              alt="logo"
              width={26}
              height={26}
              className="w-[22px] h-[22px] md:w-[26px] md:h-[26px]"
            />
            <span className="tex-lg md:text-xl font-bold flex gap-1 font-logo">
              <span>Exploring</span>
              <span>World</span>
            </span>
          </Link>
        </aside>
        <p className="justify-self-center text-sm">
          Copyright © {new Date().getFullYear()} - All right reserved.
        </p>
        <nav className="grid grid-flow-col gap-4 place-self-center md:justify-self-end">
          <Link
            href="https://www.facebook.com"
            className="text-lg"
            target="_blank"
          >
            <FaFacebookF />
          </Link>
          <Link
            href="https://www.youtube.com"
            className="text-lg"
            target="_blank"
          >
            <FaYoutube />
          </Link>
          <Link href="https://x.com" className="text-lg" target="_blank">
            <FaXTwitter />
          </Link>
        </nav>
      </footer>
    </div>
  );
};

export default FrontendFooter;
