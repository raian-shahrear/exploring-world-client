"use server";

import envConfig from "@/config";
import axiosInstance from "@/lib/AxiosInstance";
import { TComment } from "@/types";
import { revalidateTag } from "next/cache";

// create comment
export const createComment = async (formData: TComment): Promise<any> => {
  try {
    const { data } = await axiosInstance.post("/comments", formData);
    revalidateTag("comment");
    return data;
  } catch (error: any) {
    throw new Error(
      error?.message ? error?.message : "Failed to create comment"
    );
  }
};

// get comments by post
export const getAllComments = async (postId: string) => {
  const fetchOption = {
    next: {
      tags: ["comment"],
      revalidate: 1,
    },
  };

  if(postId){
    const res = await fetch(
      `${envConfig.API_URL}/comments/${postId}`,
      fetchOption
    );
    return res.json();
  }
};

// delete comment
export const deleteComment = async (commentId: string): Promise<any> => {
  try {
    const { data } = await axiosInstance.delete(`/comments/${commentId}`);
    revalidateTag("comment");
    return data;
  } catch (error: any) {
    throw new Error(
      error?.message ? error?.message : "Failed to delete comment"
    );
  }
};

// update comment
export const updateComment = async (
  commentId: string,
  formData: { comment: string }
): Promise<any> => {
  try {
    const { data } = await axiosInstance.patch(
      `/comments/${commentId}`,
      formData
    );
    revalidateTag("comment");
    return data;
  } catch (error: any) {
    throw new Error(
      error?.message ? error?.message : "Failed to update comment"
    );
  }
};
