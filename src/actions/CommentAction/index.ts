"use server";

import envConfig from "@/config";
import axiosInstance from "@/lib/AxiosInstance";
import { TComment, TFilterProps } from "@/types";
import { buildQueryParams } from "@/utils/buildQueryParams";
import { revalidateTag } from "next/cache";

// create comment
export const createComment = async (formData: TComment): Promise<any> => {
  try {
    const { data } = await axiosInstance.post("/comments", formData);
    revalidateTag("comment");
    return data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message);
  }
};

// get comments by post
export const getAllComments = async (postId: string, params: TFilterProps) => {
  const queryString = buildQueryParams(params);
  const fetchOption = {
    next: {
      tags: ["comment"],
      revalidate: 1,
    },
  };

  if (postId) {
    const res = await fetch(
      `${envConfig.API_URL}/comments/${postId}?${queryString}`,
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
    throw new Error(error?.response?.data?.message);
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
    throw new Error(error?.response?.data?.message);
  }
};
