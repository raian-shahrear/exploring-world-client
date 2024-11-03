"use client";
import React from "react";
import {
  useDeletePost,
  useDownvotePost,
  useGetAllPosts,
  useUpvotePost,
} from "@/hooks/post.hook";
import { TDisplayPost, TLoggedInUser } from "@/types";
import PostCardLoading from "./PostCardLoading";
import PostCardProfileSection from "./PostCardProfileSection";
import PostCardGallery from "./PostCardGallery";
import PostCardDescription from "./PostCardDescription";
import PostCardCommentSection from "./PostCardCommentSection";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type TProps = {
  controlCategoryTab: string | string[];
  userLoading: boolean;
  findUser: TLoggedInUser | null;
};

const PostCard = ({ controlCategoryTab, userLoading, findUser }: TProps) => {
  const { data: posts, isLoading: postLoading } = useGetAllPosts({
    limit: 5,
    categories: controlCategoryTab !== "0" ? controlCategoryTab : "",
  });

  const { mutate: handleUpvote } = useUpvotePost();
  const { mutate: handleDownvote } = useDownvotePost();
  const { mutate: handleDeletePost } = useDeletePost();

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
      {postLoading || userLoading ? (
        <PostCardLoading />
      ) : (
        <>
          {posts?.data?.length > 0 ? (
            <>
              {posts?.data?.map((post: TDisplayPost) => (
                <div key={post?._id} className="border rounded-lg p-6">
                  <PostCardProfileSection
                    post={post}
                    findUser={findUser}
                    handleDeletePost={handleDeletePost}
                  />
                  <PostCardGallery post={post} />
                  <PostCardDescription post={post} />
                  <PostCardCommentSection
                    findUser={findUser}
                    post={post}
                    handlePostUpvote={handlePostUpvote}
                    handlePostDownvote={handlePostDownvote}
                  />
                </div>
              ))}
            </>
          ) : (
            <div className="mt-10">
              <p className="text-center text-gray-300 text-2xl font-semibold">
                No Post Found
              </p>
            </div>
          )}
          <div className="mt-4 flex justify-center">
            <Link href="/news-feed">
              <Button variant="default">See More</Button>
            </Link>
          </div>
        </>
      )}
    </>
  );
};

export default PostCard;
