import Link from "next/link";
import React from "react";

const FollowingPosts = () => {
  return (
    <div>
      <span className="text-xl font-bold">Following Post page </span>
      <Link href="/posts/200" className="text-blue-600 underline">
        Details
      </Link>
    </div>
  );
};

export default FollowingPosts;
