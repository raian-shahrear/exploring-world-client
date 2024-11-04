"use client";
import PostCardGallery from "@/components/modules/home/postCard/PostCardGallery";
import PostCardLoading from "@/components/modules/home/postCard/PostCardLoading";
import PostCardProfileSection from "@/components/modules/home/postCard/PostCardProfileSection";
import PostDetails from "@/components/modules/postDetails/PostDetails";
import { useUser } from "@/context/user.provider";
import { useGetAllUser } from "@/hooks/auth.hook";
import { useDeletePost, useGetSinglePost } from "@/hooks/post.hook";
import { TDisplayPost, TUser } from "@/types";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
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

  // download pdf
  const onDownload = (data: TDisplayPost) => {
    const input: HTMLElement | null = document.getElementById(data?._id);
    if (!input) return;
    const pdf = new jsPDF("p", "mm", "a4");
    const padding = 10;
    const pageWidth = pdf.internal.pageSize.getWidth() - padding * 2;
    const pageHeight = pdf.internal.pageSize.getHeight() - padding * 2;
    const imgWidth = pageWidth;
    html2canvas(input, { scale: 1 }).then((canvas) => {
      const totalCanvasHeight = canvas.height;
      let currentY = 0;
      while (currentY < totalCanvasHeight) {
        const tempCanvas = document.createElement("canvas");
        tempCanvas.width = canvas.width;
        // Calculate height available
        const availableHeight = pageHeight * (canvas.width / imgWidth);
        tempCanvas.height = Math.min(canvas.height - currentY, availableHeight);
        const tempContext = tempCanvas.getContext("2d");
        if (tempContext) {
          tempContext.drawImage(
            canvas,
            0,
            currentY,
            canvas.width,
            tempCanvas.height,
            0,
            0,
            canvas.width,
            tempCanvas.height
          );
          const tempImgData = tempCanvas.toDataURL("image/png");
          // Calculate the height
          const tempImgHeight = (tempCanvas.height * imgWidth) / canvas.width;
          pdf.addImage(
            tempImgData,
            "PNG",
            padding,
            padding,
            imgWidth,
            tempImgHeight
          );
          currentY += tempCanvas.height;
          if (currentY < totalCanvasHeight) {
            pdf.addPage();
          }
        }
      }
      pdf.save(`${data?.title}.pdf`);
    });
  };

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
              onDownload={onDownload}
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
