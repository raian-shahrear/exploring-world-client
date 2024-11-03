"use client";
import { logoutUser } from "@/actions/AuthActions";
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
import { useUpdateUserEmail } from "@/hooks/auth.hook";
import { TLoggedInUser } from "@/types";
import { Dispatch, FormEvent, SetStateAction, useEffect } from "react";
import { toast } from "sonner";

type TProps = {
  user: TLoggedInUser | null;
  setUserLoading: Dispatch<SetStateAction<boolean>>;
};

const EmailEditModal = ({ user, setUserLoading }: TProps) => {
  const { mutate: handleUpdateUserEmail, data: updateUserData } =
    useUpdateUserEmail();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    try {
      const updateUser = {
        email: (form.elements.namedItem("email") as HTMLInputElement).value,
      };
      handleUpdateUserEmail({ userId: user!.id, userData: updateUser });
    } catch (err: any) {
      toast.error(
        err?.data?.message ? err?.data?.message : "Something went wrong!"
      );
    }
  };

  useEffect(() => {
    if (updateUserData?.success) {
      logoutUser();
      setUserLoading(true);
    }
  }, [updateUserData, setUserLoading]);
  useEffect(() => {
    if (!user) {
      document.location.reload();
    }
  }, [user]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="text-xs text-white font-semibold cursor-pointer transition-all duration-300 hover:underline">
          Want to change email?
        </span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] lg:max-w-[550px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Email</DialogTitle>
          </DialogHeader>
          <div className="my-4">
            <label className="text-xs font-semibold mb-1 inline-block">
              Email
            </label>
            <input
              type="email"
              name="email"
              defaultValue={user?.userEmail}
              className="border border-gray-300 w-full h-9 px-2 py-1 text-sm rounded-sm"
            />
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

export default EmailEditModal;
