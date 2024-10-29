/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { TDisplayPost } from "@/types";
import Link from "next/link";
import React from "react";
import { FaLongArrowAltRight } from "react-icons/fa";

type TProps = {
  post: TDisplayPost;
};

const PostCardDescription = ({ post }: TProps) => {

  return (
    <div className="mt-6">
      <div>
        <p className="text-base font-semibold">{post?.title}</p>
        <p className="text-sm font-medium">{post?.category?.title}</p>
        <div className="mt-3">
          <p className="text-sm flex flex-col gap-[2px]">
            <span className="font-bold">Story : </span>
            <span>
              {post?.travelStory?.length > 400
                ? post?.travelStory?.slice(0, 399) + "..."
                : post?.travelStory}
            </span>
          </p>
          <Link
              href={`/posts/${post?._id}`}
              className="mt-2 w-fit text-blue-500 text-sm font-semibold flex items-center gap-1 duration-300 transition-all hover:gap-2"
            >
              <span>See Details</span>
              <span>
                <FaLongArrowAltRight />
              </span>
            </Link>
        </div>
      </div>
    </div>
  );
};

export default PostCardDescription;
