/* eslint-disable @next/next/no-img-element */
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

type TProps = {
  controlCategoryTab: string | string[];
  userLoading: boolean;
  findUser: TLoggedInUser | null;
};

const PostCard = ({ controlCategoryTab, userLoading, findUser }: TProps) => {
  // const [searchTerm, setSearchTerm] = useState<string>("");
  // const [sort, setSort] = useState<string>("");
  // const [limit, setLimit] = useState<number>(5);
  // const [page, setPage] = useState<number>(1);
  // const [authors, setAuthors] = useState<string[]>([]);

  const { data: posts, isLoading: postLoading } = useGetAllPosts({
    // searchTerm,
    // sort,
    limit: 5,
    // page,
    categories: controlCategoryTab !== "0" ? controlCategoryTab : "",
    // authors,
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
      )}
    </>
  );
};

export default PostCard;
