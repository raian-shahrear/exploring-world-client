import { TDisplayPost, TLoggedInUser } from "@/types";
import React from "react";
import { BiDownload } from "react-icons/bi";
import { FaRegFilePdf } from "react-icons/fa";

type TProps = {
  post: TDisplayPost;
  findUser: TLoggedInUser | null;
  onDownload: (data: TDisplayPost) => void;
};

const PostDetails = ({ post, findUser, onDownload }: TProps) => {
  return (
    <div className="mt-6">
      <div id={post?._id}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-base font-semibold">{post?.title}</p>
            <p className="text-sm font-medium">{post?.category?.title}</p>
          </div>
          <button
            onClick={() => onDownload(post)}
            className="border border-gray-300 rounded-md p-1 flex items-center gap-1 justify-center h-fit transition-all duration-300 hover:bg-gray-200"
          >
            <span className="text-sm">
              <BiDownload />
            </span>
            <span className="text-sm">Download</span>
            <span className="text-sm text-red-600">
              <FaRegFilePdf />
            </span>
          </button>
        </div>
        <div className="mt-3">
          <p className="text-sm flex flex-col gap-[2px]">
            <span className="font-bold">Story : </span>
            <span>{post?.travelStory}</span>
          </p>
        </div>
        {(findUser?.id === post?.author?._id ||
          findUser?.isVerified === "verified") && (
          <div>
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
            <div className="mt-3 pb-1">
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
      </div>
    </div>
  );
};

export default PostDetails;
