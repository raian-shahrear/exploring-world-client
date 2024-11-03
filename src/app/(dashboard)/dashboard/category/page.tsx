"use client";
import CommonLoader from "@/components/ui/loading/CommonLoader";
import { useGetCategories } from "@/hooks/category.hook";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TPostCategory } from "@/types";
import { useState } from "react";
import Pagination from "@/components/ui/pagination/Pagination";
import { formatPostDate } from "@/utils/postDate";
import { GoDotFill } from "react-icons/go";
import EditCategoryModal from "./_components/EditCategoryModal";
import AddCategoryModal from "./_components/AddCategoryModal";

const ManageCategory = () => {
  const [dataLimit, setDataLimit] = useState(8);
  const [pageCount, setPageCount] = useState(1);
  const { data: categories, isLoading: categoryLoading } = useGetCategories({
    limit: dataLimit,
    page: pageCount,
  });
  return (
    <div>
      <div className="flex items-center justify-between gap-2 mb-6">
        <h1 className="text-xl font-bold">Manage Category</h1>
        <AddCategoryModal />
      </div>

      {categoryLoading ? (
        <div className="flex justify-center items-center h-[50vh]">
          <CommonLoader />
        </div>
      ) : (
        <>
          {categories?.data?.length ? (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">SL</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {categories?.data?.map(
                    (category: TPostCategory, idx: number) => (
                      <TableRow key={category?._id}>
                        <TableCell className="font-medium">
                          {(pageCount - 1) * dataLimit + idx + 1}
                        </TableCell>
                        <TableCell className="font-medium">
                          {category?.title}
                        </TableCell>
                        <TableCell className="font-medium">
                          {formatPostDate(category?.createdAt)}
                        </TableCell>
                        <TableCell className="font-medium">
                          {category?.isDisabled ? (
                            <span className="text-gray-400 flex items-center gap-1 font-semibold">
                              <GoDotFill /> Disabled
                            </span>
                          ) : (
                            <span className="text-gray-900 flex items-center gap-1 font-semibold">
                              <GoDotFill /> Enabled
                            </span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <EditCategoryModal category={category} />
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  )}
                </TableBody>
              </Table>
              <div className="mt-10">
                <Pagination
                  data={categories}
                  dataLimit={dataLimit}
                  setDataLimit={setDataLimit}
                  pageCount={pageCount}
                  setPageCount={setPageCount}
                />
              </div>
            </>
          ) : (
            <div className="flex justify-center items-center h-[30vh]">
              <p className="text-xl sm:text-2xl text-gray-300 font-medium">
                No category data found
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ManageCategory;
