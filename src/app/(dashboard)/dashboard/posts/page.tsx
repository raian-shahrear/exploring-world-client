"use client";
import { Button } from "@/components/ui/button";
import CommonLoader from "@/components/ui/loading/CommonLoader";
import Pagination from "@/components/ui/pagination/Pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDeletePost, useGetAllPosts } from "@/hooks/post.hook";
import { TDisplayPost } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FaRegComments } from "react-icons/fa";
import { HiOutlineViewfinderCircle } from "react-icons/hi2";
import { RiDeleteBin6Line } from "react-icons/ri";

const DashboardPost = () => {
  const [dataLimit, setDataLimit] = useState(8);
  const [pageCount, setPageCount] = useState(1);
  const { data: posts, isLoading: postLoading } = useGetAllPosts({
    limit: dataLimit,
    page: pageCount,
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
    <div>
      <h1 className="text-xl font-bold mb-6">Manage Posts</h1>

      {postLoading ? (
        <div className="flex justify-center items-center h-[50vh]">
          <CommonLoader />
        </div>
      ) : (
        <>
          {posts?.data?.length ? (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">SL</TableHead>
                    <TableHead className="w-28">Post Image</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Upvote</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {posts?.data?.map((postItem: TDisplayPost, idx: number) => (
                    <TableRow key={postItem?._id}>
                      <TableCell className="font-medium">
                        {(pageCount - 1) * dataLimit + idx + 1}
                      </TableCell>
                      <TableCell className="font-medium">
                        <Image
                          width={56}
                          height={56}
                          src={postItem?.image[0]}
                          alt="post"
                          className="w-14 h-14 rounded-md object-cover object-center"
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        {postItem?.title?.length > 50
                          ? postItem?.title?.slice(0, 49) + "..."
                          : postItem?.title}
                      </TableCell>
                      <TableCell className="font-medium">
                        {postItem?.category?.title}
                      </TableCell>
                      <TableCell className="font-medium">
                        {postItem?.author?.name}
                      </TableCell>
                      <TableCell className="font-medium">
                        {postItem?.upvote?.length}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Link href={`/dashboard/posts/${postItem?._id}`}>
                            <Button className="h-fit px-2 py-1 text-xs bg-gray-200 text-gray-900 hover:text-white">
                              <FaRegComments /> Comments
                            </Button>
                          </Link>
                          <Link href={`/dashboard/posts/post-details/${postItem?._id}`}>
                            <Button className="h-fit px-2 py-1 text-xs">
                              <HiOutlineViewfinderCircle /> View
                            </Button>
                          </Link>
                          <Button
                            onClick={() => handlePostDelete(postItem?._id)}
                            className="h-fit px-2 py-1 text-xs bg-red-700 text-white"
                          >
                            <RiDeleteBin6Line /> Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="mt-10">
                <Pagination
                  data={posts}
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
                No post data found
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DashboardPost;
