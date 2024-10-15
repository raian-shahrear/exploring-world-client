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

      <div>
        <Link href="/" className="btn btn-neutral btn-xs md:btn-sm">Back to Home</Link>
      </div>
    </div>
  );
};

export default NotFound;
