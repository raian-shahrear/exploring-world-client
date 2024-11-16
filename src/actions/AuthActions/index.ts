"use server";
import axiosInstance from "@/lib/AxiosInstance";
import { TFilterProps, TUser } from "@/types";
import { buildQueryParams } from "@/utils/buildQueryParams";
import { jwtDecode } from "jwt-decode";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

// register/create user
export const registerUser = async (userData: FormData) => {
  try {
    const { data } = await axiosInstance.post("/auth/signup", userData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  } catch (error: any) {
    return { success: false, message: error?.response?.data?.message };
  }
};

// login user
export const loginUser = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/auth/login", userData);
    if (data.success) {
      cookies().set("accessToken", data?.data?.accessToken);
      cookies().set("refreshToken", data?.data?.refreshToken);
    }
    return data;
  } catch (error: any) {
    return { success: false, message: error?.response?.data?.message };
  }
};

// logout user
export const logoutUser = () => {
  cookies().delete("accessToken");
  cookies().delete("refreshToken");
};

// get current loggedIn user
export const getCurrentUser = async () => {
  const accessToken = cookies().get("accessToken")?.value;
  let decodedToken = null;
  if (accessToken) {
    decodedToken = await jwtDecode(accessToken);
    return decodedToken;
  }
  return decodedToken;
};

// get all users
export const getAllUsers = async (params: TFilterProps) => {
  const queryString = buildQueryParams(params);
  try {
    const { data } = await axiosInstance.get(`/auth/users?${queryString}`);
    revalidateTag("user");
    return data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message);
  }
};

// get all user's name for options
export const getAllUsersName = async () => {
  try {
    const { data } = await axiosInstance.get(`/auth/users-name`);
    return data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message);
  }
};

// get accessToken from refreshToken
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
    throw new Error(error?.response?.data?.message);
  }
};

// follow user
export const followUser = async (userData: FieldValues): Promise<any> => {
  try {
    const { data } = await axiosInstance.patch(`/auth/follow`, userData);
    revalidateTag("user");

    // Get new access token
    const res = await getNewAccessToken();
    const accessToken = res.data.accessToken;
    cookies().set("accessToken", accessToken);
    const decodedUser = await jwtDecode(accessToken);

    return { data, decodedUser };
  } catch (error: any) {
    throw new Error(error?.response?.data?.message);
  }
};

// unfollow user
export const unfollowUser = async (userData: FieldValues): Promise<any> => {
  try {
    const { data } = await axiosInstance.patch(`/auth/unfollow`, userData);
    revalidateTag("user");

    // Get new access token
    const res = await getNewAccessToken();
    const accessToken = res.data.accessToken;
    cookies().set("accessToken", accessToken);
    const decodedUser = await jwtDecode(accessToken);

    return { data, decodedUser };
  } catch (error: any) {
    throw new Error(error?.response?.data?.message);
  }
};

// update user
export const updateUser = async (
  userId: string,
  formData: FormData
): Promise<any> => {
  try {
    const { data } = await axiosInstance.patch(
      `/auth/users/${userId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    revalidateTag("user");

    // Get new access token
    const res = await getNewAccessToken();
    const accessToken = res.data.accessToken;
    cookies().set("accessToken", accessToken);
    const decodedUser = await jwtDecode(accessToken);

    return { data, decodedUser };
  } catch (error: any) {
    throw new Error(error?.response?.data?.message);
  }
};

// update user email
export const updateUserEmail = async (
  userId: string,
  formData: Partial<TUser>
): Promise<any> => {
  try {
    const { data } = await axiosInstance.patch(
      `/auth/user-email/${userId}`,
      formData
    );
    revalidateTag("user");
    return data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message);
  }
};

// update password
export const updatePassword = async (formData: any): Promise<any> => {
  try {
    const { data } = await axiosInstance.post(
      `/auth/change-password`,
      formData
    );
    revalidateTag("user");
    return data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message);
  }
};

// update user role
export const updateUserRole = async (
  userId: string,
  formData: { role: string }
): Promise<any> => {
  try {
    const { data } = await axiosInstance.patch(
      `/auth//user-role/${userId}`,
      formData
    );
    revalidateTag("user");
    return data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message);
  }
};

// verify user
export const verifyUser = async (): Promise<any> => {
  try {
    const { data } = await axiosInstance.patch(`/auth/user-verify`);
    revalidateTag("user");
    return data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message);
  }
};
