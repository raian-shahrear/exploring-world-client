/* eslint-disable @typescript-eslint/no-explicit-any */
import { useUpdateComment } from "@/hooks/comment.hook";
import { TDisplayComment } from "@/types";
import React from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { toast } from "sonner";

type TProps = {
  id: string;
  comment: TDisplayComment;
};

const PostEditCommentModal = ({ id, comment }: TProps) => {
  const openModal = () => {
    const modal = document.getElementById(id) as HTMLDialogElement | null;
    if (modal) {
      modal.showModal();
    }
  };

  const {
    mutate: handleUpdateComment,
    isPending: updateCommentPending,
  } = useUpdateComment();
  const {
    register,
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = useForm();

  const handleComment: SubmitHandler<FieldValues> = (data) => {
    if (isValid || !isSubmitting) {
      try{
        const newComment = {
          comment: data.comment,
        };
    
        handleUpdateComment({ commentId: comment?._id, commentData: newComment });
      }catch (err: any) {
        toast.error(
          err?.data?.message ? err?.data?.message : "Something went wrong!"
        );
      }
    }
  };
  if (updateCommentPending) {
    return (
      <div className="absolute top-2/4 left-2/4">
        <span className="loading loading-infinity w-20"></span>
      </div>
    );
  }
  return (
    <>
      <button onClick={openModal}>
        <MdEdit />
      </button>
      <dialog id={id} className="modal">
        <div className="modal-box">
          <div className="grid grid-cols-[auto_14px] items-start gap-5 mb-4">
            <p className="font-bold text-lg">Edit comment</p>
            <form method="dialog">
              <button className="text-lg">
                <IoClose />
              </button>
            </form>
          </div>

          <form onSubmit={handleSubmit(handleComment)}>
            <textarea
              defaultValue={comment?.comment}
              className="min-h-20 w-full border bg-gray-100 focus-within:bg-white p-2 text-xs"
              {...register("comment")}
            />
            <button type="submit" className="btn btn-xs btn-neutral mt-2">
              Update
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default PostEditCommentModal;
