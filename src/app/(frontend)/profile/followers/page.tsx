import Link from "next/link";
import React from "react";

const Followers = () => {
  return (
    <div>
      <span className="text-xl font-bold">Followers page </span>
      <Link href="/profile/followers/posts" className="text-blue-500 underline">
        Details
      </Link>
    </div>
  );
};

export default Followers;
