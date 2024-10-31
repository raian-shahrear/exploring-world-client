import {
  createComment,
  deleteComment,
  getAllComments,
  updateComment,
} from "@/actions/CommentAction";
import { TComment } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateComment = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, TComment>({
    mutationKey: ["CREATE_COMMENT"],
    mutationFn: async (commentData) => await createComment(commentData),
    onSuccess: () => {
      toast.success("Comment created successfully");
      queryClient.invalidateQueries({ queryKey: ["GET_COMMENT"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useGetAllComments = (postId: string) => {
  return useQuery({
    queryKey: ["GET_COMMENT", postId],
    queryFn: () => getAllComments(postId),
    enabled: !!postId,
  });
};

export const useDeleteComment = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, string>({
    mutationKey: ["DELETE_COMMENT"],
    mutationFn: async (commentId: string) => await deleteComment(commentId),
    onSuccess: () => {
      toast.success("Comment deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["GET_COMMENT"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useUpdateComment = () => {
  const queryClient = useQueryClient();
  return useMutation<
    any,
    Error,
    { commentId: string; commentData: { comment: string } },
    void
  >({
    mutationKey: ["UPDATE_COMMENT"],
    mutationFn: async ({ commentId, commentData }) =>
      await updateComment(commentId, commentData),
    onSuccess: () => {
      toast.success("Comment updated successfully");
      queryClient.invalidateQueries({ queryKey: ["GET_COMMENT"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
