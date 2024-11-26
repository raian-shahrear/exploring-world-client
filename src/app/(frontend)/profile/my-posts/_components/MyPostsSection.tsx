"use client";
import { useUser } from "@/context/user.provider";
import { useGetAllUser } from "@/hooks/auth.hook";
import { useDeletePost, useGetAllPosts } from "@/hooks/post.hook";
import { TUser } from "@/types";
import { useState } from "react";
import MyPostsProfileSection from "./MyPostsProfileSection";
import CreatePostModal from "@/app/(frontend)/posts/_components/CreatePostModal";
import MyPostsDisplaySection from "./MyPostsDisplaySection";

const MyPostsSection = () => {
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
    <>
      <MyPostsProfileSection
        userLoading={userLoading}
        loggedInUser={loggedInUser}
      />
      {findUser && findUser?.role === "user" && (
        <div className="border rounded-lg p-6 mt-10 w-8/12 mx-auto">
          <CreatePostModal />
        </div>
      )}
      <MyPostsDisplaySection
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

export default MyPostsSection;
