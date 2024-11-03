import {
  createCategory,
  getCategories,
  updateCategory,
} from "@/actions/CategoryActions";
import { TFilterProps } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

// create category
export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, { title: string }>({
    mutationKey: ["CREATE_CATEGORY"],
    mutationFn: async (categoryData) => await createCategory(categoryData),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["GET_CATEGORIES"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

// get all categories
export const useGetCategories = (params?: TFilterProps) => {
  return useQuery({
    queryKey: ["GET_CATEGORIES", params],
    queryFn: async () => await getCategories(params || {}),
  });
};

// update category
export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, { catId: string; catData: any }, void>({
    mutationKey: ["UPDATE_CATEGORY"],
    mutationFn: async ({ catId, catData }) =>
      await updateCategory(catId, catData),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["GET_CATEGORIES"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
