"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useUpdateCategory } from "@/hooks/category.hook";
import { TPostCategory } from "@/types";
import { FormEvent } from "react";
import { FaEdit } from "react-icons/fa";
import { toast } from "sonner";

type TProps = {
  category: TPostCategory;
};

const EditCategoryModal = ({ category }: TProps) => {
  const { mutate: handleUpdateCategory } = useUpdateCategory();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const status =
      (form.elements.namedItem("status") as HTMLInputElement).value ===
      "enabled"
        ? false
        : true;
    try {
      const updateCategory = {
        title: (form.elements.namedItem("title") as HTMLInputElement).value,
        isDisabled: status,
      };
      handleUpdateCategory({ catId: category!._id, catData: updateCategory });
    } catch (err: any) {
      toast.error(
        err?.data?.message ? err?.data?.message : "Something went wrong!"
      );
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="h-fit px-2 py-1 text-xs gap-[2px]">
          <FaEdit /> Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] lg:max-w-[550px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
          </DialogHeader>
          <div className="my-4">
            <div className="mb-2">
              <label className="text-xs font-semibold mb-1 inline-block">
                Category
              </label>
              <input
                type="text"
                name="title"
                defaultValue={category?.title}
                className="border border-gray-300 w-full h-9 px-2 py-1 text-sm rounded-sm"
              />
            </div>

            <div>
              <label className="text-xs font-semibold mb-1 inline-block">
                Status
              </label>
              <select
                name="status"
                className="border border-gray-300 w-full h-9 px-2 py-1 text-sm rounded-sm"
                defaultValue={category?.isDisabled ? "disabled" : "enabled"}
              >
                <option value="enabled">Enabled</option>
                <option value="disabled">Disabled</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                type="submit"
                className="w-fit h-fit text-xs py-2 px-2 rounded"
              >
                Update
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditCategoryModal;
