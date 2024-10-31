import { createCategory, getCategories } from "@/actions/CategoryActions";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateCategory = () => {
  return useMutation<any, Error, {title: string}>({
    mutationKey: ["CREATE_CATEGORY"],
    mutationFn: async (categoryData) => await createCategory(categoryData),
    onSuccess: () => {
      toast.success("Category created successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useGetCategories = () => {
  return useQuery({
    queryKey: ["GET_CATEGORIES"],
    queryFn: async () => await getCategories(),
  });
};
