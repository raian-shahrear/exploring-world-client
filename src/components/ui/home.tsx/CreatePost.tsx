"use client";
import { useUser } from "@/context/user.provider";
import Image from "next/image";
import React from "react";
import userAvatar from "@/assets/icons/user-avatar-black.png";
import Link from "next/link";

const CreatePost = () => {
  const { user } = useUser();
  return (
    <div className="border rounded-lg p-6">
      <Link href="/posts/create" className="grid grid-cols-[40px_auto] items-center gap-4">
        <div>
          <Image
            src={user?.userProfile ? user?.userProfile : userAvatar}
            alt="user"
            width={40}
            height={40}
            className="rounded-full border w-10 h-10"
          />
        </div>
        <div className="h-10 px-4 w-full border bg-gray-200 rounded-3xl flex items-center cursor-pointer text-sm transition-all duration-300 hover:bg-gray-300">
          Click to create a post...
        </div>
      </Link>
    </div>
  );
};

export default CreatePost;
