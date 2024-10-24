"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { BiDislike, BiLike } from "react-icons/bi";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import userAvatar from "@/assets/icons/user-avatar-black.png";
import PostEditCommentModal from "./PostEditCommentModal";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoSend } from "react-icons/io5";
import { TDisplayComment, TDisplayPost, TLoggedInUser } from "@/types";
import {
  useCreateComment,
  useDeleteComment,
  useGetAllComments,
} from "@/hooks/comment.hook";
import { formatPostDate } from "@/utils/postDate";

type TProps = {
  findUser: TLoggedInUser | null;
  post: TDisplayPost;
  handlePostUpvote: (postId: string) => void;
  handlePostDownvote: (postId: string) => void;
};

const PostCardCommentSection = ({
  findUser,
  post,
  handlePostUpvote,
  handlePostDownvote,
}: TProps) => {
  const [controlComment, setControlComment] = useState(false);
  const { mutate: handleCreateComment, isPending: createCommentPending } =
    useCreateComment();
  const { data: allComments } = useGetAllComments(post?._id);
  const { mutate: handleDeleteComment } = useDeleteComment();
  const [upvoteUser, setUpvoteUser] = useState<string | undefined>("");
  const [downvoteUser, setDownvoteUser] = useState<string | undefined>("");

  useEffect(() => {
    const upvote = post?.upvote?.find((user) => user === findUser?.id);
    setUpvoteUser(upvote);

    const downvote = post?.downvote?.find((user) => user === findUser?.id);
    setDownvoteUser(downvote);
  }, [findUser, post]);

  const { register, handleSubmit, reset } = useForm();

  // create comment
  const handleCommentSubmit: SubmitHandler<FieldValues> = (data) => {
    const newComment = {
      post: post?._id,
      comment: data.comment,
    };
    handleCreateComment(newComment);
    reset();
  };

  // delete comment
  const handleCommentDelete = (commentId: string) => {
    const isConfirm = confirm("Are you sure to delete?");
    if (isConfirm) {
      handleDeleteComment(commentId);
    }
  };

  return (
    <>
      <div className="mt-6 pt-6 border-t flex justify-between items-center">
        <div>
          {findUser &&
          findUser?.id !== post?.author?._id &&
          findUser?.role === "user" ? (
            <>
              <button
                className={`btn btn-xs me-2 ${upvoteUser && "text-blue-500"}`}
                onClick={() => handlePostUpvote(post?._id)}
              >
                <span className="text-sm">
                  <BiLike />
                </span>{" "}
                Upvote {post?.upvote?.length ? post?.upvote?.length : "0"}
              </button>
              <button
                className={`btn btn-xs ${downvoteUser && "text-blue-500"}`}
                onClick={() => handlePostDownvote(post?._id)}
              >
                <span className="text-sm">
                  <BiDislike />
                </span>{" "}
                Downvote {post?.downvote?.length ? post?.downvote?.length : "0"}
              </button>
            </>
          ) : (
            <>
              <span className="me-2 font-semibold text-xs">
                Upvote : {post?.upvote?.length ? post?.upvote?.length : "0"}
              </span>
              <span className="me-2 font-semibold text-xs">
                Downvote :{" "}
                {post?.downvote?.length ? post?.downvote?.length : "0"}
              </span>
            </>
          )}
        </div>
        <div
          className="flex items-center gap-1 cursor-pointer"
          onClick={() => setControlComment(!controlComment)}
        >
          <span>
            {controlComment ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
          </span>
          <span className="text-xs font-semibold">
            Comments (
            {allComments?.data?.length ? allComments?.data?.length : "0"})
          </span>
        </div>
      </div>

      <div
        className={`${findUser && findUser?.role === "user" ? "mt-4" : "mt-0"}`}
      >
        {findUser && findUser?.role === "user" && (
          <>
            {createCommentPending ? (
              <div className="grid grid-cols-[36px_auto] items-start gap-2">
                <div className="skeleton rounded-full w-9 h-9"></div>
                <div className="skeleton w-full rounded-md h-16"></div>
              </div>
            ) : (
              <div className="grid grid-cols-[36px_auto] items-start gap-2">
                <div>
                  <Image
                    src={findUser?.userProfile}
                    alt="user"
                    width={36}
                    height={36}
                    className="rounded-full border w-9 h-9 object-cover object-center"
                  />
                </div>
                <form onSubmit={handleSubmit(handleCommentSubmit)}>
                  <textarea
                    {...register("comment")}
                    placeholder={`Comment as ${findUser?.userName}`}
                    className="border px-3 py-2 w-full rounded-md text-xs min-h-10 bg-gray-100 focus-within:bg-white"
                  />
                  <div className="flex items-center gap-2 mt-1">
                    <button
                      type="reset"
                      className="text-xs font-semibold text-blue-500 transition-all duration-300 hover:underline"
                    >
                      Clear
                    </button>
                    <button
                      type="submit"
                      className="transition-all duration-300 hover:text-blue-500"
                    >
                      <IoSend />
                    </button>
                  </div>
                </form>
              </div>
            )}
          </>
        )}
        <div
          className={`${
            controlComment ? "flex" : "hidden"
          } flex-col gap-2 max-h-96 overflow-y-auto ${
            allComments?.data?.length > 0 ? "mt-4" : "mt-0"
          }`}
        >
          {allComments?.data?.map((comment: TDisplayComment) => (
            <div
              key={comment?._id}
              className={`grid ${
                findUser?.id === comment?.user?._id
                  ? "grid-cols-[36px_auto_34px]"
                  : "grid-cols-[36px_auto]"
              }  items-start gap-4 bg-gray-100 p-2 rounded-md`}
            >
              <div>
                <Image
                  src={
                    comment?.user?.profile ? comment?.user?.profile : userAvatar
                  }
                  alt="user"
                  width={36}
                  height={36}
                  className="rounded-full border w-9 h-9 object-cover object-center"
                />
              </div>
              <div>
                <p className="text-xs font-semibold flex items-center gap-2 mb-1">
                  <span>{comment?.user?.name}</span>
                  <span>.</span>
                  <span className="font-normal">
                    {formatPostDate(comment?.createdAt)}
                  </span>
                </p>
                <p className="text-xs">{comment?.comment}</p>
              </div>
              {findUser?.id === comment?.user?._id &&
                findUser?.role === "user" && (
                  <div className="flex items-center gap-1">
                    <PostEditCommentModal id={comment?._id} comment={comment} />
                    <button onClick={() => handleCommentDelete(comment?._id)}>
                      <RiDeleteBin6Line />
                    </button>
                  </div>
                )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PostCardCommentSection;
