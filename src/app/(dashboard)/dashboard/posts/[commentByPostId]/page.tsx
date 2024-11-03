"use client";
import CommonLoader from "@/components/ui/loading/CommonLoader";
import { useDeleteComment, useGetAllComments } from "@/hooks/comment.hook";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TDisplayComment } from "@/types";
import { Button } from "@/components/ui/button";
import { formatPostDate } from "@/utils/postDate";
import { RiDeleteBin6Line } from "react-icons/ri";
import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";
import ViewCommentModal from "../_components/ViewCommentModal";
import { useState } from "react";
import Pagination from "@/components/ui/pagination/Pagination";

const CommentByPst = ({ params }: { params: any }) => {
  const [dataLimit, setDataLimit] = useState(8);
  const [pageCount, setPageCount] = useState(1);
  const { data: allComments, isLoading: commentLoading } = useGetAllComments(
    params?.commentByPostId,
    {
      limit: dataLimit,
      page: pageCount,
    }
  );

  const { mutate: handleDeleteComment } = useDeleteComment();

  // delete comment
  const handleCommentDelete = (commentId: string) => {
    const isConfirm = confirm("Are you sure to delete?");
    if (isConfirm) {
      handleDeleteComment(commentId);
    }
  };
  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Link href="/dashboard/posts" className="text-xl w-fit text-blue-600">
          <FaArrowLeftLong />
        </Link>
        <h1 className="text-xl font-bold">Comments by Post</h1>
      </div>

      {commentLoading ? (
        <div className="flex justify-center items-center h-[50vh]">
          <CommonLoader />
        </div>
      ) : (
        <>
          {allComments?.data?.length ? (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">SL</TableHead>
                    <TableHead>Post Title</TableHead>
                    <TableHead className="max-w-52">Comment</TableHead>
                    <TableHead>Comment by</TableHead>
                    <TableHead>Commented at</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allComments?.data?.map(
                    (comment: TDisplayComment, idx: number) => (
                      <TableRow key={comment?._id}>
                        <TableCell className="font-medium">
                          {(pageCount - 1) * dataLimit + idx + 1}
                        </TableCell>
                        <TableCell className="font-medium">
                          {comment?.post?.title}
                        </TableCell>
                        <TableCell className="font-medium">
                          {comment?.comment?.length > 50
                            ? comment?.comment?.slice(0, 49) + "..."
                            : comment?.comment}
                        </TableCell>
                        <TableCell className="font-medium">
                          {comment?.user?.name}
                        </TableCell>
                        <TableCell className="font-medium">
                          {formatPostDate(comment?.createdAt)}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <ViewCommentModal comment={comment} />
                            <Button
                              onClick={() => handleCommentDelete(comment?._id)}
                              className="h-fit px-2 py-1 text-xs bg-red-700 text-white"
                            >
                              <RiDeleteBin6Line /> Delete
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  )}
                </TableBody>
              </Table>
              <div className="mt-10">
                <Pagination
                  data={allComments}
                  dataLimit={dataLimit}
                  setDataLimit={setDataLimit}
                  pageCount={pageCount}
                  setPageCount={setPageCount}
                />
              </div>
            </>
          ) : (
            <div className="flex justify-center items-center h-[30vh]">
              <p className="text-xl sm:text-2xl text-gray-300 font-medium">
                No comment data found
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CommentByPst;
