/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import axiosInstance from "@/lib/AxiosInstance";
import { jwtDecode } from "jwt-decode";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const registerUser = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/auth/signup", userData);
    return data;
  } catch (error: any) {
    throw new Error(error?.message);
  }
};

export const loginUser = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/auth/login", userData);
    if (data.success) {
      cookies().set("accessToken", data?.data?.accessToken);
      cookies().set("refreshToken", data?.data?.refreshToken);
    }
    return data;
  } catch (error: any) {
    throw new Error(error?.message);
  }
};

export const logoutUser = () => {
  cookies().delete("accessToken");
  cookies().delete("refreshToken");
};

export const getCurrentUser = async () => {
  const accessToken = cookies().get("accessToken")?.value;
  let decodedToken = null;
  if (accessToken) {
    decodedToken = await jwtDecode(accessToken);
    return decodedToken;
  }
  return decodedToken;
};

export const getAllUsers = async () => {
  try {
    const { data } = await axiosInstance.get(`/auth/users`);
    revalidateTag("user");
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getNewAccessToken = async () => {
  const currentTime = new Date().getTime() / 1000;
  try {
    const refreshToken = cookies().get("refreshToken")?.value;
    if (refreshToken) {
      const decodedToken = await jwtDecode(refreshToken);
      if (decodedToken && currentTime > decodedToken.exp!) {
        logoutUser();
      }
    }

    const res = await axiosInstance({
      url: "/auth/refresh-token",
      method: "POST",
      withCredentials: true,
      headers: {
        cookie: `refreshToken=${refreshToken}`,
      },
    });

    return res.data;
  } catch (error: any) {
    throw new Error(
      error?.message ? error?.message : "Failed to get new access token"
    );
  }
};

// follow/unfollow user
export const followUser = async (userData: FieldValues): Promise<any> => {
  try {
    const { data } = await axiosInstance.patch(`/auth/follow`, userData);
    revalidateTag("user");

    // Get new access token
    const res = await getNewAccessToken();
    const accessToken = res.data.accessToken;
    cookies().set("accessToken", accessToken);
    const decodedUser = await jwtDecode(accessToken);

    return { data, decodedUser }
  } catch (error: any) {
    throw new Error(error?.message ? error?.message : "Failed to update user");
  }
};

export const unfollowUser = async (userData: FieldValues): Promise<any> => {
  try {
    const { data } = await axiosInstance.patch(`/auth/unfollow`, userData);
    revalidateTag("user");
    
    // Get new access token
    const res = await getNewAccessToken();
    const accessToken = res.data.accessToken;
    cookies().set("accessToken", accessToken);
    const decodedUser = await jwtDecode(accessToken);

    return { data, decodedUser }
  } catch (error: any) {
    throw new Error(error?.message ? error?.message : "Failed to update user");
  }
};
