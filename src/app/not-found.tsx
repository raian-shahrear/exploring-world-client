import Image from "next/image";
import notFoundImg from "@/assets/not-found/not-found.gif";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="h-screen flex flex-col gap-10 justify-center items-center">
      <Image
        src={notFoundImg}
        width={1000}
        height={500}
        alt="not found page"
        className=""
      />

      <Link
        href="/"
        className="bg-gray-900 text-white rounded-sm p-2 text-base"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
