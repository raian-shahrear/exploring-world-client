import Link from "next/link";
import React from "react";

const Following = () => {
  return (
    <div>
      <span className="text-xl font-bold">Following page </span>
      <Link href="/profile/following/posts" className="text-blue-600 underline">
        Details
      </Link>
    </div>
  );
};

export default Following;
