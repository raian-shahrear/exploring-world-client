"use client";
import PostCardGallery from "@/components/modules/home/postCard/PostCardGallery";
import PostCardLoading from "@/components/modules/home/postCard/PostCardLoading";
import PostCardProfileSection from "@/components/modules/home/postCard/PostCardProfileSection";
import PostDetails from "@/components/modules/postDetails/PostDetails";
import { useUser } from "@/context/user.provider";
import { useGetAllUser } from "@/hooks/auth.hook";
import { useDeletePost, useGetSinglePost } from "@/hooks/post.hook";
import { TUser } from "@/types";
import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";

const PostDetailsPage = ({ params }: { params: { postId: string } }) => {
  const { data: postSingleData, isLoading: getSinglePostLoading } =
    useGetSinglePost(params?.postId);
  const { user: findUser, isLoading: userLoading } = useUser();
  const { data: allUsers } = useGetAllUser();
  const loggedInUser: TUser = allUsers?.data?.find(
    (user: TUser) => user?._id === findUser?.id
  );
  const { mutate: handleDeletePost } = useDeletePost();

  return (
    <div className="py-4 xl:w-8/12 mx-auto">
      <div className="mb-6">
        <Link href="/dashboard/posts" className="w-fit flex items-center gap-2">
          <span className="text-blue-600 text-xl">
            <FaArrowLeftLong />
          </span>
          <span className="text-lg font-semibold">Back</span>
        </Link>
      </div>
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
          <div className="mt-6 pt-6 border-t">
            <div>
              <span className="me-3 font-semibold text-xs">
                Upvote : {postSingleData?.data?.upvote?.length}
              </span>
              <span className="font-semibold text-xs">
                Downvote : {postSingleData?.data?.downvote?.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDetailsPage;
