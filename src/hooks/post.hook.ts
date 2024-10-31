import {
  createPost,
  deletePost,
  downvotePost,
  getAllPosts,
  getSinglePost,
  updatePost,
  upvotePost,
} from "@/actions/PostAction";
import { TFilterProps, TPost } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, TPost>({
    mutationKey: ["CREATE_POST"],
    mutationFn: async (postData) => await createPost(postData),
    onSuccess: () => {
      toast.success("Post created successfully");
      queryClient.invalidateQueries({ queryKey: ["GET_POSTS"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, string>({
    mutationKey: ["DELETE_POST"],
    mutationFn: async (postId: string) => await deletePost(postId),
    onSuccess: () => {
      toast.success("Post deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["GET_POSTS"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, { postId: string; postData: TPost }, void>({
    mutationKey: ["UPDATE_POST"],
    mutationFn: async ({ postId, postData }) =>
      await updatePost(postId, postData),
    onSuccess: () => {
      toast.success("Post updated successfully");
      queryClient.invalidateQueries({ queryKey: ["GET_POSTS"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useGetSinglePost = (postId: string) => {
  return useQuery({
    queryKey: ["GET_SINGLE_POST", postId],
    queryFn: () => getSinglePost(postId),
    enabled: !!postId,
  });
};

export const useGetAllPosts = (params?: TFilterProps) => {
  return useQuery({
    queryKey: ["GET_POSTS", params],
    queryFn: async () => await getAllPosts(params || {}),
    staleTime: 0,
    enabled: !!params,
  });
};

export const useUpvotePost = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, string>({
    mutationKey: ["UPVOTE_POST"],
    mutationFn: async (postId: string) => await upvotePost(postId),
    onSuccess: () => {
      toast.success("Post updated successfully");
      queryClient.invalidateQueries({ queryKey: ["GET_POSTS"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useDownvotePost = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, string>({
    mutationKey: ["DOWNVOTE_POST"],
    mutationFn: async (postId: string) => await downvotePost(postId),
    onSuccess: () => {
      toast.success("Post updated successfully");
      queryClient.invalidateQueries({ queryKey: ["GET_POSTS"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
