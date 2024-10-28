"use client";
import { TDisplayPost, TLoggedInUser } from "@/types";
import React, { useRef, useState } from "react";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { BiDownload } from "react-icons/bi";
import { FaRegFilePdf } from "react-icons/fa";
import generatePDF from "react-to-pdf";

type TProps = {
  post: TDisplayPost;
  findUser: TLoggedInUser | null;
};

const PostCardDescription = ({ post, findUser }: TProps) => {
  const [controlDetails, setControlDetails] = useState(false);
  const targetRef = useRef<HTMLDivElement>(null);

  return (
    <div className="mt-6">
      <div ref={targetRef}>
        <button
          className="btn btn-xs flex items-center gap-1 mt-1"
          onClick={() => generatePDF(targetRef, { filename: "page.pdf" })}
        >
          <span className="text-sm">
            <BiDownload />
          </span>
          <span>Download</span>
          <span className="text-sm text-red-600">
            <FaRegFilePdf />
          </span>
        </button>
        <p>demo text</p>
      </div>

      <div>
        <p className="text-base font-semibold">{post?.title}</p>
        <p className="text-sm font-medium">{post?.category?.title}</p>
        <div className="mt-3">
          <p className="text-sm flex flex-col gap-[2px]">
            <span className="font-bold">Story : </span>
            <span>
              {post?.travelStory?.length > 400 && !controlDetails
                ? post?.travelStory?.slice(0, 399) + "..."
                : post?.travelStory}
            </span>
          </p>
          {(findUser?.id === post?.author?._id ||
            post?.travelStory?.length > 400 ||
            findUser?.isVerified === "verified") && (
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
        {(findUser?.id === post?.author?._id ||
          findUser?.isVerified === "verified") && (
          <div className={`${controlDetails ? "block" : "hidden"}`}>
            <div className="mt-3">
              <p className="text-sm flex flex-col gap-[2px] jodit-editor-style">
                <span className="font-bold">Travel Guide : </span>
                {post?.premium?.travelGuide?.length > 0 ? (
                  <span
                    dangerouslySetInnerHTML={{
                      __html: post?.premium?.travelGuide,
                    }}
                  ></span>
                ) : (
                  <span className="text-xs text-gray-500 font-medium">
                    No travel guide
                  </span>
                )}
              </p>
            </div>
            <div className="mt-3">
              <p className="text-sm flex flex-col gap-[2px] jodit-editor-style">
                <span className="font-bold">Destination Tips : </span>
                {post?.premium?.destinationTips?.length > 0 ? (
                  <span
                    dangerouslySetInnerHTML={{
                      __html: post?.premium?.destinationTips,
                    }}
                  ></span>
                ) : (
                  <span className="text-xs text-gray-500 font-medium">
                    No destination tips
                  </span>
                )}
              </p>
            </div>
          </div>
        )}
        <button
          onClick={() => setControlDetails(false)}
          className={`mt-3 text-sm text-blue-500 font-semibold underline transition-all duration-300 hover:no-underline items-center gap-1 ${
            !controlDetails ? "hidden" : "flex"
          }`}
        >
          <IoMdArrowDropup /> See Less
        </button>
      </div>
    </div>
  );
};

export default PostCardDescription;
