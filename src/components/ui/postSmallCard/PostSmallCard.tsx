/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";
import { TDisplayPost, TLoggedInUser } from "@/types";
import { formatPostDate } from "@/utils/postDate";
import Image from "next/image";
import Link from "next/link";
import { BiCategory } from "react-icons/bi";
import { BsHandThumbsDown, BsHandThumbsUp } from "react-icons/bs";
import { FaLongArrowAltRight, FaRegEdit } from "react-icons/fa";
import { IoTimeOutline } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";

type TProps = {
  posts: TDisplayPost[];
  post: TDisplayPost;
  findUser: TLoggedInUser | null;
  handlePostDelete: (postId: string) => void;
};

const PostSmallCard = ({
  posts,
  post,
  findUser,
  handlePostDelete,
}: TProps) => {
  return (
    <>
      <div
        className={`card card-compact bg-base-100 shadow-xl ${
          posts.length === 1 ? "w-8/12 mx-auto" : "w-full"
        }`}
      >
        <figure className="relative">
          <img
            src={post.image[0]}
            alt="post image"
            className={`w-full object-cover ${
              posts.length === 1 ? "h-96" : "h-72"
            }`}
          />
          <div className="absolute top-0 flex justify-between w-full bg-gradient-to-r from-gray-900 via-transparent to-gray-900 p-3">
            <div className="shadow-md grid grid-cols-[36px_100px] items-center gap-2">
              <Image
                width={36}
                height={36}
                src={post?.author?.profile}
                alt="author"
                className="w-9 h-9 rounded-full object-cover object-center"
              />
              <p className="text-sm text-white font-semibold text-ellipsis whitespace-nowrap overflow-hidden">
                {post?.author?.name}
              </p>
            </div>
            {findUser?.id === post?.author?._id && (
              <div className="text-white text-xl flex items-center gap-2">
                <Link href={`/posts/edit/${post?._id}`}>
                  <FaRegEdit />
                </Link>
                <button onClick={() => handlePostDelete(post?._id)}>
                  <RiDeleteBin6Line />
                </button>
              </div>
            )}
          </div>
        </figure>
        <div className="card-body">
          <p className="card-title text-base">{post?.title}</p>
          <p className="text-xs font-semibold text-gray-500 mt-[-10px]">
            <span className="text-xs font-medium flex items-center gap-1">
              <BiCategory /> {post?.category?.title}
            </span>
            <span className="text-xs font-medium flex items-center gap-1">
              <IoTimeOutline /> {formatPostDate(post.createdAt)}
            </span>
          </p>
          <p className="mb-4">
            {post?.travelStory?.length > 200
              ? post?.travelStory?.slice(0, 199) + "..."
              : post?.travelStory}
          </p>
          <div className="flex items-center justify-between">
            <Link
              href={`/posts/${post?._id}`}
              className="w-fit text-blue-500 font-semibold flex items-center gap-1 duration-300 transition-all hover:gap-2"
            >
              <span>See Details</span>
              <span>
                <FaLongArrowAltRight />
              </span>
            </Link>
            <div className="text-sm flex items-center gap-2">
              <span className="flex items-center gap-1">
                <span>
                  <BsHandThumbsUp />
                </span>
                <span>{post?.upvote?.length}</span>
              </span>
              <span className="text-gray-300">|</span>
              <span className="flex items-center gap-1">
                <span>
                  <BsHandThumbsDown />
                </span>
                <span>{post?.downvote?.length}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostSmallCard;
