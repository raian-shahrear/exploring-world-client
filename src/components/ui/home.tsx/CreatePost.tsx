"use client";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { TLoggedInUser} from "@/types";

type TProps = {
  userLoading: boolean;
  findUser: TLoggedInUser;
};

const CreatePost = ({ userLoading, findUser }: TProps) => {
  return (
    <>
      {userLoading ? (
        <div className="border rounded-lg p-6">
          <div className="grid grid-cols-[40px_auto] items-center gap-4">
            <div className="skeleton rounded-full border w-10 h-10"></div>
            <div className="skeleton h-10 px-4 w-full border"></div>
          </div>
        </div>
      ) : (
        <div className="border rounded-lg p-6">
          <Link
            href="/posts/create"
            className="grid grid-cols-[40px_auto] items-center gap-4"
          >
            <div>
              <Image
                src={findUser?.userProfile}
                alt="user"
                width={40}
                height={40}
                className="rounded-full border w-10 h-10 object-cover object-center"
              />
            </div>
            <div className="h-10 px-4 w-full border bg-gray-200 rounded-3xl flex items-center cursor-pointer text-sm transition-all duration-300 hover:bg-gray-300">
              Click to create a post...
            </div>
          </Link>
        </div>
      )}
    </>
  );
};

export default CreatePost;
