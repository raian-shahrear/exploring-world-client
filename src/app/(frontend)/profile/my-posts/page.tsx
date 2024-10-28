/* eslint-disable @next/next/no-img-element */
"use client";
import CreatePost from "@/components/ui/home/CreatePost";
import PostSmallCard from "@/components/ui/postSmallCard/PostSmallCard";
import { useUser } from "@/context/user.provider";
import { useGetAllUser } from "@/hooks/auth.hook";
import { useDeletePost, useGetAllPosts } from "@/hooks/post.hook";
import { TDisplayPost, TUser } from "@/types";
import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { IoWarningOutline } from "react-icons/io5";

const MyPosts = () => {
  const { user: findUser, isLoading: userLoading } = useUser();
  // get user info
  const { data: allUsers } = useGetAllUser();
  const loggedInUser: TUser = allUsers?.data?.find(
    (user: TUser) => user?._id === findUser?.id
  );
  // get post info
  const { data: posts, isLoading: postLoading } = useGetAllPosts({
    authors: loggedInUser?._id ? [loggedInUser?._id] : [],
  });
  const { mutate: handleDeletePost } = useDeletePost();

  // delete post
  const handlePostDelete = (postId: string) => {
    const isConfirm = confirm("Are you sure to delete?");
    if (isConfirm) {
      handleDeletePost(postId);
    }
  };

  return (
    <div>
      {userLoading ? (
        <div>
          <div className="w-[250px] mx-auto">
            <div className="skeleton w-[150px] h-[150px] mx-auto rounded-md"></div>
            <div className="skeleton w-[250px] mx-auto h-10 mt-2"></div>
            <div className="skeleton w-[250px] mx-auto h-10 mt-1"></div>
          </div>
        </div>
      ) : (
        <div className="w-[250px] mx-auto">
          <img
            src={loggedInUser?.profile}
            alt="user"
            width={150}
            height={150}
            className="w-[150px] h-[150px] mx-auto object-cover object-top border rounded-md"
          />
          <div className="text-center mt-2">
            <p>
              {loggedInUser?.isVerified === "verified" ? (
                <span className="text-success text-[11px] font-medium flex items-center gap-1 mb-3">
                  <FaCheckCircle /> Verified
                </span>
              ) : loggedInUser?.isVerified === "pending" ? (
                <button className="text-orange-600 text-[11px] font-medium flex items-center gap-1 btn btn-xs btn-outline mx-auto mb-3">
                  <IoWarningOutline /> Verify account
                </button>
              ) : (
                <span className="text-gray-500 text-[11px] font-medium flex justify-center items-center gap-1 mb-3">
                  <IoWarningOutline /> Not Verified
                </span>
              )}
            </p>
            <p className="text-sm font-semibold mb-[2px]">
              {loggedInUser?.name}
            </p>
            <p className="text-xs">{loggedInUser?.email}</p>
          </div>
        </div>
      )}
      {findUser && findUser?.role === "user" && (
        <div className="mt-10 w-8/12 mx-auto">
          <CreatePost userLoading={userLoading} findUser={findUser} />
        </div>
      )}
      {posts?.data?.length > 0 ? (
        <div
          className={`mt-10 grid grid-cols-1 gap-6 ${
            posts?.data?.length === 1
              ? "md:grid-cols-1 lg:grid-cols-1"
              : posts?.data?.length === 2
              ? "md:grid-cols-2 lg:grid-cols-2"
              : posts?.data?.length === 3
              ? "md:grid-cols-2 lg:grid-cols-3"
              : "md:grid-cols-2 lg:grid-cols-4"
          }`}
        >
          {posts?.data?.map((post: TDisplayPost) => (
            <PostSmallCard
              key={post?._id}
              posts={posts?.data}
              post={post}
              findUser={findUser}
              handlePostDelete={handlePostDelete}
            />
          ))}
        </div>
      ) : (
        <div className="mt-10">
          <p className="text-center text-gray-300 text-2xl font-semibold">
            No Post Found
          </p>
        </div>
      )}
    </div>
  );
};

export default MyPosts;
