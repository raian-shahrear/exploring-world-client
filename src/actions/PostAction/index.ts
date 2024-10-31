"use server";
import envConfig from "@/config";
import axiosInstance from "@/lib/AxiosInstance";
import { revalidateTag } from "next/cache";
import { TFilterProps, TPost } from "@/types";
import { buildQueryParams } from "@/utils/buildQueryParams";

// create post
export const createPost = async (formData: TPost): Promise<any> => {
  try {
    const { data } = await axiosInstance.post("/post", formData);
    revalidateTag("posts");
    return data;
  } catch (error: any) {
    throw new Error(error?.message ? error?.message : "Failed to create post");
  }
};

// delete post
export const deletePost = async (postId: string): Promise<any> => {
  try {
    const { data } = await axiosInstance.delete(`/post/${postId}`);
    revalidateTag("posts");
    return data;
  } catch (error: any) {
    throw new Error(error?.message ? error?.message : "Failed to delete post");
  }
};

// update post
export const updatePost = async (
  postId: string,
  formData: TPost
): Promise<any> => {
  try {
    const { data } = await axiosInstance.patch(`/post/${postId}`, formData);
    revalidateTag("posts");
    return data;
  } catch (error: any) {
    throw new Error(error?.message ? error?.message : "Failed to update post");
  }
};

// get single post
export const getSinglePost = async (postId: string): Promise<any> => {
  const fetchOption: RequestInit = {
    cache: "no-store",
  };
  const res = await fetch(`${envConfig.API_URL}/post/${postId}`, fetchOption);
  if (!res.ok) {
    throw new Error("Failed to fetch post");
  }
  return res.json();
};

// get all post
export const getAllPosts = async (params: TFilterProps) => {
  const queryString = buildQueryParams(params);
  const fetchOption = {
    next: {
      tags: ["posts"],
      revalidate: 1,
    },
  };
  const res = await fetch(
    `${envConfig.API_URL}/post?${queryString}`,
    fetchOption
  );
  return res.json();
};

// upvote/downvote post
export const upvotePost = async (postId: string): Promise<any> => {
  try {
    const { data } = await axiosInstance.patch(`/post/upvote/${postId}`);
    revalidateTag("posts");
    return data;
  } catch (error: any) {
    throw new Error(error?.message ? error?.message : "Failed to update post");
  }
};
export const downvotePost = async (postId: string): Promise<any> => {
  try {
    const { data } = await axiosInstance.patch(`/post/downvote/${postId}`);
    revalidateTag("posts");
    return data;
  } catch (error: any) {
    throw new Error(error?.message ? error?.message : "Failed to update post");
  }
};

// get my posts
// export const getMyPosts = async () => {
//   const user = await getCurrentUser();
//   const res = await axiosInstance.get(`/post/byUser/${user?._id}`);
//   return res.data;
// };

// get posts by any user
// export const getUserPosts = async (userId: string) => {
//   const res = await axiosInstance.get(`/post/byUser/${userId}`);
//   return res.data;
// };
