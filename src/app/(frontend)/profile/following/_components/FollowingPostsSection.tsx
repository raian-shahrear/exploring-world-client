"use client";
import { useState } from "react";
import FollowingProfileSection from "./FollowingProfileSection";
import { useUser } from "@/context/user.provider";
import { useGetAllUser } from "@/hooks/auth.hook";
import { TUser } from "@/types";
import { TFollowingPostProps } from "../[...slug]/page";
import { useDeletePost, useGetAllPosts } from "@/hooks/post.hook";
import FollowingPostsDisplaySection from "./FollowingPostsDisplaySection";

const FollowingPostsSection = ({ params }: TFollowingPostProps) => {
  const [dataLimit, setDataLimit] = useState(4);
  const [pageCount, setPageCount] = useState(1);
  const { user: findUser, isLoading: userLoading } = useUser();
  // get user info
  const { data: allUsers } = useGetAllUser();
  const loggedInUser: TUser = allUsers?.data?.find(
    (user: TUser) => user?._id === params?.slug[0]
  );
  // get post info
  const { data: posts, isLoading: postLoading } = useGetAllPosts({
    limit: dataLimit,
    page: pageCount,
    authors: params?.slug[0] ? [params?.slug[0]] : [],
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
    <>
      <FollowingProfileSection
        userLoading={userLoading}
        loggedInUser={loggedInUser}
      />

      <FollowingPostsDisplaySection
        postLoading={postLoading}
        posts={posts}
        dataLimit={dataLimit}
        setDataLimit={setDataLimit}
        pageCount={pageCount}
        setPageCount={setPageCount}
        findUser={findUser}
        handlePostDelete={handlePostDelete}
      />
    </>
  );
};

export default FollowingPostsSection;
