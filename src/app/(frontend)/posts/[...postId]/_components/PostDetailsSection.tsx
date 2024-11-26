"use client";
import PostCardCommentSection from "@/components/modules/home/postCard/PostCardCommentSection";
import PostCardGallery from "@/components/modules/home/postCard/PostCardGallery";
import PostCardLoading from "@/components/modules/home/postCard/PostCardLoading";
import PostCardProfileSection from "@/components/modules/home/postCard/PostCardProfileSection";
import PostDetails from "@/components/modules/postDetails/PostDetails";
import { useUser } from "@/context/user.provider";
import { useGetAllUser } from "@/hooks/auth.hook";
import {
  useDeletePost,
  useDownvotePost,
  useGetSinglePost,
  useUpvotePost,
} from "@/hooks/post.hook";
import { TUser } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { TPostDetailsProps } from "../page";

const PostDetailsSection = ({ params }: TPostDetailsProps) => {
  const router = useRouter();
  const { data: postSingleData, isLoading: getSinglePostLoading } =
    useGetSinglePost(params?.postId);
  const { user: findUser, isLoading: userLoading } = useUser();
  const { data: allUsers } = useGetAllUser();
  const loggedInUser: TUser = allUsers?.data?.find(
    (user: TUser) => user?._id === findUser?.id
  );
  const { mutate: handleUpvote, data: upvoteData } = useUpvotePost();
  const { mutate: handleDownvote, data: downvoteData } = useDownvotePost();
  const { mutate: handleDeletePost, data: deletePostData } = useDeletePost();

  useEffect(() => {
    if (upvoteData?.success || downvoteData?.success) {
      document.location.reload();
    }
  }, [upvoteData, downvoteData]);

  useEffect(() => {
    if (deletePostData?.success) {
      router.push("/profile/my-posts");
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
          <div id={postSingleData?.data?._id}>
            <PostDetails
              post={postSingleData?.data}
              loggedInUser={loggedInUser}
            />
          </div>
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

export default PostDetailsSection;
