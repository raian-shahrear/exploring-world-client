import { logoutUser } from "@/actions/AuthActions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useUpdatePassword } from "@/hooks/auth.hook";
import { TLoggedInUser } from "@/types";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

type TProps = {
  user: TLoggedInUser | null;
  setUserLoading: Dispatch<SetStateAction<boolean>>;
};

const PassChangeModal = ({ user, setUserLoading }: TProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const { mutate: handleUpdatePassword, data: updatePassData } =
    useUpdatePassword();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm();

  const handleUpdatePass: SubmitHandler<FieldValues> = async (data) => {
    if (isValid || !isSubmitting) {
      try {
        const updatePass = {
          oldPassword: data?.oldPassword,
          newPassword: data?.newPassword,
        };
        handleUpdatePassword({ userData: updatePass });
      } catch (err: any) {
        toast.error(
          err?.data?.message ? err?.data?.message : "Something went wrong!"
        );
      }
    }
  };

  useEffect(() => {
    if (updatePassData?.statusCode === 200) {
      logoutUser();
      setUserLoading(true);
    }
  }, [updatePassData, setUserLoading]);
  useEffect(() => {
    if (!user) {
      document.location.reload();
    }
  }, [user]);
  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger asChild>
        <span
          className="text-xs text-white font-semibold cursor-pointer transition-all duration-300 hover:underline"
          onClick={() => setModalOpen(true)}
        >
          Want to change password?
        </span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] lg:max-w-[550px]">
        <form onSubmit={handleSubmit(handleUpdatePass)}>
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
          </DialogHeader>
          <div className="my-4">
            <div className="mb-2">
              <label className="text-xs font-semibold mb-1 inline-block">
                Old Password <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                placeholder="password"
                className="border border-gray-300 w-full h-9 px-2 py-1 text-sm rounded-sm"
                {...register("oldPassword", { required: true })}
              />
              {errors.oldPassword && (
                <span className="text-xs text-red-600 mt-[2px] inline-block">
                  This field is required
                </span>
              )}
            </div>
            <div>
              <label className="text-xs font-semibold mb-1 inline-block">
                New Password <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                placeholder="password"
                className="border border-gray-300 w-full h-9 px-2 py-1 text-sm rounded-sm"
                {...register("newPassword", { required: true })}
              />
              {errors.newPassword && (
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
              Update password
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PassChangeModal;
