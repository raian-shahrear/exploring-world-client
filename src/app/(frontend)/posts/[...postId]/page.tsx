"use client";
import PostDetails from "@/components/modules/postDetails/PostDetails";
import { useUser } from "@/context/user.provider";
import {
  useDeletePost,
  useDownvotePost,
  useGetSinglePost,
  useUpvotePost,
} from "@/hooks/post.hook";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { TDisplayPost } from "@/types";
import PostCardLoading from "@/components/modules/home/postCard/PostCardLoading";
import PostCardProfileSection from "@/components/modules/home/postCard/PostCardProfileSection";
import PostCardGallery from "@/components/modules/home/postCard/PostCardGallery";
import PostCardCommentSection from "@/components/modules/home/postCard/PostCardCommentSection";

const PostSinglePage = ({ params }: { params: { postId: string } }) => {
  const router = useRouter();
  const { data: postSingleData, isLoading: getSinglePostLoading } =
    useGetSinglePost(params?.postId);
  const { user: findUser, isLoading: userLoading } = useUser();
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

  // download pdf
  const onDownload = (data: TDisplayPost) => {
    const input: HTMLElement | null = document.getElementById(data?._id);
    if (!input) return;

    const pdf = new jsPDF("p", "mm", "a4");
    const padding = 10;
    html2canvas(input, { scale: 1 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pageWidth = pdf.internal.pageSize.getWidth();
      // const pageHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pageWidth - padding * 2;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const xPosition = padding;
      const yPosition = padding;

      pdf.addImage(imgData, "PNG", xPosition, yPosition, imgWidth, imgHeight);
      pdf.save(`${data?.title}.pdf`);
    });
  };

  return (
    <div className="xl:w-8/12 mx-auto">
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
              findUser={findUser}
              onDownload={onDownload}
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
    </div>
  );
};

export default PostSinglePage;
