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
import { useUpdateUserRole } from "@/hooks/auth.hook";
import { TLoggedInUser, TUser } from "@/types";
import { FormEvent } from "react";
import { FaEdit } from "react-icons/fa";
import { toast } from "sonner";

type TProps = {
  userInfo: TUser;
  user: TLoggedInUser | null;
};

const EditRoleModal = ({ userInfo, user }: TProps) => {
  const { mutate: handleUpdateUserRole } = useUpdateUserRole();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    try {
      const updateCategory = {
        role: (form.elements.namedItem("role") as HTMLInputElement).value,
      };
      handleUpdateUserRole({ userId: userInfo?._id, userData: updateCategory });
    } catch (err: any) {
      toast.error(
        err?.data?.message ? err?.data?.message : "Something went wrong!"
      );
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="h-fit px-2 py-1 text-xs gap-[2px]"
          disabled={userInfo?._id === user?.id}
        >
          <FaEdit /> Edit Role
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] lg:max-w-[550px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Update User Role</DialogTitle>
          </DialogHeader>
          <div className="my-4">
            <div>
              <label className="text-xs font-semibold mb-1 inline-block">
                Role
              </label>
              <select
                name="role"
                className="border border-gray-300 w-full h-9 px-2 py-1 text-sm rounded-sm"
                defaultValue={userInfo?.role}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
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

export default EditRoleModal;
