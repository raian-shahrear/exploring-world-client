"use server";
import axiosInstance from "@/lib/AxiosInstance";
import { TFilterProps } from "@/types";
import { buildQueryParams } from "@/utils/buildQueryParams";
import { revalidateTag } from "next/cache";

// create category
export const createCategory = async (formData: {
  title: string;
}): Promise<any> => {
  try {
    const { data } = await axiosInstance.post("/categories", formData);
    revalidateTag("category");
    return data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message);
  }
};

// get all categories
export const getCategories = async (params: TFilterProps) => {
  const queryString = buildQueryParams(params);
  try {
    const { data } = await axiosInstance.get(`/categories?${queryString}`);
    revalidateTag("category");
    return data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message);
  }
};

// update category
export const updateCategory = async (
  catId: string,
  formData: any
): Promise<any> => {
  try {
    const { data } = await axiosInstance.patch(
      `/categories/${catId}`,
      formData
    );
    revalidateTag("category");
    return data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message);
  }
};
