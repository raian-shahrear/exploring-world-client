/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import axiosInstance from "@/lib/AxiosInstance";
import { revalidateTag } from "next/cache";

// create category
export const createCategory = async (formData: {title: string}): Promise<any> => {
  try {
    const { data } = await axiosInstance.post("/categories", formData);
    revalidateTag("category");
    return data;
  } catch (error: any) {
    throw new Error(error?.message ? error?.message : "Failed to create category");
  }
};

// get all categories
export const getCategories = async () => {
  try {
    const { data } = await axiosInstance.get("/categories");
    revalidateTag("category");
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
