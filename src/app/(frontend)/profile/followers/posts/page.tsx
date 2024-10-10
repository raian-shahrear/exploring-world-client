import Link from "next/link";
import React from "react";

const FollowerPosts = () => {
  return (
    <div>
      <span className="text-xl font-bold">Follower Post page </span>
      <Link href="/posts/100" className="text-blue-600 underline">
        Details
      </Link>
    </div>
  );
};

export default FollowerPosts;
