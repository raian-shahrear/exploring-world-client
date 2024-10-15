import Link from "next/link";
import React from "react";

const Profile = () => {
  return (
    <div>
      <p className="text-xl font-bold">Profile page</p>

      <Link href="/profile/following/1/posts">Following</Link>
      <Link href="/profile/follower/1/posts">Follower</Link>
    </div>
  );
};

export default Profile;
