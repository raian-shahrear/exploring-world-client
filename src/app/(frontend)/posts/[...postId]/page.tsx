"use client";
import PostCardCommentSection from "@/components/ui/home/postCard/PostCardCommentSection";
import PostCardDescription from "@/components/ui/home/postCard/PostCardDescription";
import PostCardGallery from "@/components/ui/home/postCard/PostCardGallery";
import PostCardLoading from "@/components/ui/home/postCard/PostCardLoading";
import PostCardProfileSection from "@/components/ui/home/postCard/PostCardProfileSection";
import { useUser } from "@/context/user.provider";
import {
  useDeletePost,
  useDownvotePost,
  useGetSinglePost,
  useUpvotePost,
} from "@/hooks/post.hook";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const PostSinglePage = ({ params }: { params: { postId: string } }) => {
  const router = useRouter();
  const { data: postSingleData, isLoading: getSinglePostLoading } =
    useGetSinglePost(params?.postId);
  const { user: findUser, isLoading: userLoading } = useUser();
  const { mutate: handleUpvote, data: upvoteData } = useUpvotePost();
  const { mutate: handleDownvote, data: downvoteData } = useDownvotePost();
  const { mutate: handleDeletePost, data: deletePostData } = useDeletePost();

  console.log(deletePostData);

  useEffect(() => {
    if (upvoteData?.success || downvoteData?.success) {
      document.location.reload();
    }
  }, [upvoteData, downvoteData]);
  
  useEffect(() => {
    if (deletePostData?.success) {
      router.push("/profile/my-posts")
    }
  }, [upvoteData, downvoteData, router, deletePostData]);

  // upvote post
  const handlePostUpvote = (postId: string) => {
    handleUpvote(postId);
  };

  // downvote post
  const handlePostDownvote = (postId: string) => {
    handleDownvote(postId);
  };

  return (
    <>
      {getSinglePostLoading || userLoading ? (
        <PostCardLoading />
      ) : (
        <div className="border rounded-lg p-6">
          <PostCardProfileSection
            post={postSingleData?.data}
            findUser={findUser}
            handleDeletePost={handleDeletePost}
          />
          <PostCardGallery post={postSingleData?.data} />
          <PostCardDescription
            post={postSingleData?.data}
            findUser={findUser}
          />
          <PostCardCommentSection
            findUser={findUser}
            post={postSingleData?.data}
            handlePostUpvote={handlePostUpvote}
            handlePostDownvote={handlePostDownvote}
          />
        </div>
      )}
    </>
  );
};

export default PostSinglePage;
