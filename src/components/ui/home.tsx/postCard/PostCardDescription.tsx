"use client";
import { TDisplayPost, TLoggedInUser } from "@/types";
import React, { useState } from "react";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

type TProps = {
  post: TDisplayPost;
  findUser: TLoggedInUser | null;
};

const PostCardDescription = ({ post, findUser }: TProps) => {
  const [controlDetails, setControlDetails] = useState(false);
  return (
    <div className="mt-6">
      <p className="text-base font-semibold">{post?.title}</p>
      <p className="text-sm font-medium">{post?.category?.title}</p>
      <div className="mt-3">
        <p className="text-sm flex flex-col gap-[2px]">
          <span className="font-bold">Story : </span>
          <span>{post?.travelStory}</span>
        </p>
        {findUser?.isVerified === "verified" && (
          <button
            onClick={() => setControlDetails(true)}
            className={`text-sm text-blue-500 font-semibold underline transition-all duration-300 hover:no-underline ${
              controlDetails ? "hidden" : "flex"
            } items-center gap-1`}
          >
            <IoMdArrowDropdown /> See More
          </button>
        )}
      </div>
      {findUser?.isVerified === "verified" && (
        <div className={`${controlDetails ? "block" : "hidden"}`}>
          <div className="mt-3">
            <p className="text-sm flex flex-col gap-[2px] jodit-editor-style">
              <span className="font-bold">Travel Guide : </span>
              <span
                dangerouslySetInnerHTML={{ __html: post?.premium?.travelGuide }}
              ></span>
            </p>
          </div>
          <div className="mt-3">
            <p className="text-sm flex flex-col gap-[2px] jodit-editor-style">
              <span className="font-bold">Destination Tips : </span>
              <span
                dangerouslySetInnerHTML={{
                  __html: post?.premium?.destinationTips,
                }}
              ></span>
            </p>
          </div>
          <button
            onClick={() => setControlDetails(false)}
            className="mt-3 text-sm text-blue-500 font-semibold underline transition-all duration-300 hover:no-underline flex items-center gap-1"
          >
            <IoMdArrowDropup /> See Less
          </button>
        </div>
      )}
    </div>
  );
};

export default PostCardDescription;
