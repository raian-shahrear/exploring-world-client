"use client";
import PostSmallCard from "@/components/ui/postSmallCard/PostSmallCard";
import { useUser } from "@/context/user.provider";
import { useGetAllUser } from "@/hooks/auth.hook";
import { useDeletePost, useGetAllPosts } from "@/hooks/post.hook";
import { TDisplayPost, TUser } from "@/types";
import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { IoWarningOutline } from "react-icons/io5";
import { Skeleton } from "@/components/ui/skeleton";
import Pagination from "@/components/ui/pagination/Pagination";
import CreatePost from "@/components/modules/home/CreatePost";

const MyPosts = () => {
  const [dataLimit, setDataLimit] = useState(4);
  const [pageCount, setPageCount] = useState(1);
  const { user: findUser, isLoading: userLoading } = useUser();
  // get user info
  const { data: allUsers } = useGetAllUser();
  const loggedInUser: TUser = allUsers?.data?.find(
    (user: TUser) => user?._id === findUser?.id
  );
  // get post info
  const { data: posts, isLoading: postLoading } = useGetAllPosts({
    limit: dataLimit,
    page: pageCount,
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
            <Skeleton className="w-[150px] h-[150px] mx-auto rounded-md" />
            <Skeleton className="w-[250px] mx-auto h-10 mt-2" />
            <Skeleton className="w-[250px] mx-auto h-10 mt-1" />
          </div>
          <div className="mt-10 w-8/12 mx-auto">
            <div className="border rounded-lg p-6">
              <div className="grid grid-cols-[40px_auto] items-center gap-4">
                <Skeleton className="rounded-full border w-9 h-9" />
                <Skeleton className="h-10 px-4 w-full border" />
              </div>
            </div>
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
                <span className="text-green-600 text-[11px] font-medium flex items-center gap-1 mb-3">
                  <FaCheckCircle /> Verified
                </span>
              ) : loggedInUser?.isVerified === "pending" ? (
                <button className="text-orange-600 text-[11px] font-medium flex items-center gap-1 border border-orange-600 rounded-md px-1 mx-auto mb-3">
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
          <CreatePost findUser={findUser} />
        </div>
      )}
      {postLoading ? (
        <div className="mt-10">
          <Skeleton className="w-full h-[350px] rounded-lg border" />
        </div>
      ) : (
        <>
          {posts?.data?.length > 0 ? (
            <>
              <div className="mt-10">
                <Pagination
                  data={posts}
                  dataLimit={dataLimit}
                  setDataLimit={setDataLimit}
                  pageCount={pageCount}
                  setPageCount={setPageCount}
                />
              </div>
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
            </>
          ) : (
            <div className="mt-10">
              <p className="text-center text-gray-300 text-2xl font-semibold">
                No Post Found
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MyPosts;
