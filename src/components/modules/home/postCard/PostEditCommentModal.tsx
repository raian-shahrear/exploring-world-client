"use client"
import { useUpdateComment } from "@/hooks/comment.hook";
import { TDisplayComment } from "@/types";
import React from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { MdEdit } from "react-icons/md";
import { toast } from "sonner";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import CommonLoader from "@/components/ui/loading/CommonLoader";

type TProps = {
  comment: TDisplayComment;
};

const PostEditCommentModal = ({ comment }: TProps) => {
  const { mutate: handleUpdateComment, isPending: updateCommentPending } =
    useUpdateComment();
  const {
    register,
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = useForm();

  const handleComment: SubmitHandler<FieldValues> = (data) => {
    if (isValid || !isSubmitting) {
      try {
        const newComment = {
          comment: data.comment,
        };

        handleUpdateComment({
          commentId: comment?._id,
          commentData: newComment,
        });
      } catch (err: any) {
        toast.error(
          err?.data?.message ? err?.data?.message : "Something went wrong!"
        );
      }
    }
  };
  if (updateCommentPending) {
    return (
      <div className="absolute top-2/4 left-2/4">
        <CommonLoader />
      </div>
    );
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button>
          <MdEdit />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] lg:max-w-[550px]">
        <form onSubmit={handleSubmit(handleComment)}>
          <DialogHeader>
            <DialogTitle>Edit comment</DialogTitle>
          </DialogHeader>
          <div className="my-4">
            <textarea
              defaultValue={comment?.comment}
              className="min-h-20 w-full border bg-gray-100 focus-within:bg-white p-2 text-xs"
              {...register("comment")}
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                type="submit"
                className="w-fit h-fit text-xs py-2 px-2 rounded"
              >
                Update
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PostEditCommentModal;
