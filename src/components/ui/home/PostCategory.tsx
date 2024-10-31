"use client";
import { useGetCategories } from "@/hooks/category.hook";
import { TPostCategory } from "@/types";
import { Dispatch } from "react";
import { Skeleton } from "@/components/ui/skeleton";

type TProps = {
  controlCategoryTab: string | string[];
  setControlCategoryTab: Dispatch<React.SetStateAction<string | string[]>>;
};

const PostCategory = ({
  controlCategoryTab,
  setControlCategoryTab,
}: TProps) => {
  const { data: categories, isLoading: categoryLoading } = useGetCategories();

  const handleCategoryArray = (categoryId: string) => {
    setControlCategoryTab((prev) => {
      if (prev === "0") return [categoryId];

      const prevCategories = Array.isArray(prev) ? prev : [prev];

      if (prevCategories.includes(categoryId)) {
        return prevCategories.filter((id) => id !== categoryId);
      } else {
        return [...prevCategories, categoryId];
      }
    });
  };

  return (
    <>
      {categoryLoading ? (
        <div>
          <Skeleton className="w-20 h-4 mb-2" />
          <Skeleton className="mt-1 py-1 px-2 w-full h-4" />
        </div>
      ) : (
        <div className="">
          <p className="text-sm font-bold">Post Category</p>
          <div className="flex flex-wrap gap-1 mt-1">
            <button
              onClick={() => setControlCategoryTab("0")}
              className={`text-xs text-white py-1 px-2 rounded-3xl ${
                controlCategoryTab === "0" ? "bg-gray-900" : "bg-gray-400"
              }`}
            >
              All
            </button>

            {categories?.data?.map((category: TPostCategory) => (
              <button
                key={category?._id}
                onClick={() => handleCategoryArray(category?._id)}
                className={`text-xs text-white py-1 px-2 rounded-3xl ${
                  Array.isArray(controlCategoryTab) &&
                  controlCategoryTab.includes(category?._id)
                    ? "bg-gray-900"
                    : "bg-gray-400"
                }`}
              >
                {category?.title}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default PostCategory;
