import {
  createPost,
  deletePost,
  downvotePost,
  getAllPosts,
  getSinglePost,
  updatePost,
  upvotePost,
} from "@/actions/PostAction";
import { TFilterProps } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

// create post
export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, FormData>({
    mutationKey: ["CREATE_POST"],
    mutationFn: async (postData) => await createPost(postData),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["GET_POSTS"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

// delete post
export const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, string>({
    mutationKey: ["DELETE_POST"],
    mutationFn: async (postId: string) => await deletePost(postId),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["GET_POSTS"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

// update post
export const useUpdatePost = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, { postId: string; postData: FormData }, void>({
    mutationKey: ["UPDATE_POST"],
    mutationFn: async ({ postId, postData }) =>
      await updatePost(postId, postData),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["GET_POSTS"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

// get single post
export const useGetSinglePost = (postId: string) => {
  return useQuery({
    queryKey: ["GET_SINGLE_POST", postId],
    queryFn: () => getSinglePost(postId),
    enabled: !!postId,
  });
};

// get all posts
export const useGetAllPosts = (params?: TFilterProps) => {
  return useQuery({
    queryKey: ["GET_POSTS", params],
    queryFn: async () => await getAllPosts(params || {}),
    staleTime: 0,
  });
};

// upvote post
export const useUpvotePost = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, string>({
    mutationKey: ["UPVOTE_POST"],
    mutationFn: async (postId: string) => await upvotePost(postId),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["GET_POSTS"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

// downvote post
export const useDownvotePost = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, string>({
    mutationKey: ["DOWNVOTE_POST"],
    mutationFn: async (postId: string) => await downvotePost(postId),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["GET_POSTS"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
