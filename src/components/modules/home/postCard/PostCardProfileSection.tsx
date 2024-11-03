"use client";
import Image from "next/image";
import userAvatar from "@/assets/icons/user-avatar-black.png";
import { IoTimeOutline } from "react-icons/io5";
import { HiDotsHorizontal } from "react-icons/hi";
import Link from "next/link";
import { TDisplayPost, TLoggedInUser } from "@/types";
import { formatPostDate } from "@/utils/postDate";
import { UseMutateFunction } from "@tanstack/react-query";
import { useFollowUser, useUnfollowUser } from "@/hooks/auth.hook";
import { useState } from "react";

type TProps = {
  post: TDisplayPost;
  findUser: TLoggedInUser | null;
  handleDeletePost: UseMutateFunction<any, Error, string, unknown>;
};

const PostCardProfileSection = ({
  post,
  findUser,
  handleDeletePost,
}: TProps) => {
  const { mutate: handleFollow } = useFollowUser();
  const { mutate: handleUnfollow } = useUnfollowUser();
  const [postDropdown, setPostDropdown] = useState(false);

  // delete post
  const handlePostDelete = (postId: string) => {
    const isConfirm = confirm("Are you sure to delete?");
    if (isConfirm) {
      handleDeletePost(postId);
    }
  };

  // follow user
  const handleFollowUser = (followingId: string) => {
    const user = {
      followingUserId: followingId,
    };
    handleFollow(user);
  };

  // unfollow user
  const handleUnfollowUser = (followingId: string) => {
    const user = {
      followingUserId: followingId,
    };
    handleUnfollow(user);
  };

  return (
    <div className="flex justify-between">
      <div className="grid grid-cols-[36px_auto] items-center gap-2">
        <Image
          src={post?.author?.profile ? post?.author?.profile : userAvatar}
          alt="user"
          width={36}
          height={36}
          className="rounded-full border w-9 h-9 object-cover object-center"
        />
        <div>
          <p className="text-sm font-semibold flex gap-2">
            <span>{post?.author?.name}</span>
            {post?.author?._id !== findUser?.id &&
              findUser?.role === "user" && (
                <>
                  <span>.</span>
                  {findUser?.following?.some(
                    (follower: any) => follower?.user === post?.author?._id
                  ) ? (
                    <button
                      className="text-blue-500"
                      onClick={() => handleUnfollowUser(post?.author?._id)}
                    >
                      Unfollow
                    </button>
                  ) : (
                    <button
                      className="text-blue-500"
                      onClick={() => handleFollowUser(post?.author?._id)}
                    >
                      Follow
                    </button>
                  )}
                </>
              )}
          </p>
          <p className="text-xs font-medium flex items-center gap-1">
            <IoTimeOutline /> {formatPostDate(post?.createdAt)}
          </p>
        </div>
      </div>
      {post?.author?._id === findUser?.id && findUser?.role === "user" && (
        <div>
          <div className="relative">
            <button
              onClick={() => setPostDropdown(!postDropdown)}
              className="text-lg p-0 h-8 w-8 rounded-[50%] flex justify-center items-center transition-all duration-300 hover:bg-gray-100"
            >
              <HiDotsHorizontal />
            </button>
            <ul
              className={`absolute top-8 right-0 bg-gray-50 rounded-md z-[1] w-52 p-2 shadow-lg ${
                postDropdown ? "flex flex-col gap-1" : "hidden"
              }`}
            >
              <li onClick={() => setPostDropdown(false)}>
                <button
                  onClick={() => handlePostDelete(post?._id)}
                  className="block text-sm py-1 px-2 rounded-md w-full text-start transition-all duration-300 hover:bg-gray-200"
                >
                  Delete
                </button>
              </li>
              <li>
                <Link
                  href={`/posts/edit/${post?._id}`}
                  className="block text-sm py-1 px-2 rounded-md w-full text-start transition-all duration-300 hover:bg-gray-200"
                >
                  Edit
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCardProfileSection;
