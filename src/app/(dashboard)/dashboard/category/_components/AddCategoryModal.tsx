"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useCreateCategory } from "@/hooks/category.hook";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { MdAdd } from "react-icons/md";
import { toast } from "sonner";

const AddCategoryModal = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { mutate: handleCategory } = useCreateCategory();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm();

  const handleAddCategory: SubmitHandler<FieldValues> = async (data) => {
    if (isValid || !isSubmitting) {
      try {
        const newCategory = {
          title: data?.title,
        };
        handleCategory(newCategory);
      } catch (err: any) {
        toast.error(
          err?.data?.message ? err?.data?.message : "Something went wrong!"
        );
      }
    }
  };

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger asChild>
        <Button
          className="h-fit py-1 px-1 text-sm gap-[2px]"
          onClick={() => setModalOpen(true)}
        >
          <MdAdd /> Add Category
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] lg:max-w-[550px]">
        <form onSubmit={handleSubmit(handleAddCategory)}>
          <DialogHeader>
            <DialogTitle>Add Category</DialogTitle>
          </DialogHeader>
          <div className="my-4">
            <div className="mb-2">
              <label className="text-xs font-semibold mb-1 inline-block">
                Category <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter category"
                className="border border-gray-300 w-full h-9 px-2 py-1 text-sm rounded-sm"
                {...register("title", { required: true })}
              />
              {errors.title && (
                <span className="text-xs text-red-600 mt-[2px] inline-block">
                  This field is required
                </span>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="w-fit h-fit text-xs py-2 px-2 rounded"
              onClick={() => setModalOpen(!isValid || isSubmitting)}
            >
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddCategoryModal;
