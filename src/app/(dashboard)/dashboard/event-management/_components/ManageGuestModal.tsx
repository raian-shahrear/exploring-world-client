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
import { useCreateEventGuest, useDeleteEventGuest } from "@/hooks/event.hook";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { RiDeleteBin6Line } from "react-icons/ri";
import { toast } from "sonner";
import { TEventProps } from "./EditEventModal";
import { TGuest } from "@/types";

const ManageGuestModal = ({ event }: TEventProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const { mutate: handleEventGuest } = useCreateEventGuest();
  const { mutate: handleDeleteEventGuest } = useDeleteEventGuest();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    reset,
  } = useForm();

  const handleAddEventGuest: SubmitHandler<FieldValues> = async (data) => {
    if (isValid || !isSubmitting) {
      try {
        const formData = new FormData();

        const newGuest = {
          name: data?.name,
          designation: data?.designation,
        };
        formData.append("data", JSON.stringify(newGuest));
        formData.append("image", data.profile[0]);

        handleEventGuest({ eventId: event?._id, guestData: formData });
        reset();
      } catch (err: any) {
        toast.error(
          err?.data?.message ? err?.data?.message : "Something went wrong!"
        );
      }
    }
  };

  // delete event's guest
  const handleEventGuestDelete = (guestId: string) => {
    const deletedGuest = {
      guestId,
    };
    handleDeleteEventGuest({ eventId: event?._id, deletedGuest });
  };
  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger asChild>
        <Button
          className="h-fit px-2 py-1 text-xs gap-[2px] w-fit"
          onClick={() => setModalOpen(true)}
        >
          Manage Guest
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] lg:max-w-[550px] max-h-[50vh] overflow-y-auto">
        <form onSubmit={handleSubmit(handleAddEventGuest)}>
          <DialogHeader>
            <DialogTitle>Manage Guest</DialogTitle>
          </DialogHeader>
          <div className="my-4">
            <div className="mb-2">
              <label className="text-xs font-semibold mb-1 inline-block">
                Guest Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter guest name"
                className="border border-gray-300 w-full h-9 px-2 py-1 text-sm rounded-sm"
                {...register("name", { required: true })}
              />
              {errors.name && (
                <span className="text-xs text-red-600 mt-[2px] inline-block">
                  This field is required
                </span>
              )}
            </div>
            <div className="mb-2">
              <label className="text-xs font-semibold mb-1 inline-block">
                Guest Designation <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter guest designation"
                className="border border-gray-300 w-full h-9 px-2 py-1 text-sm rounded-sm"
                {...register("designation", { required: true })}
              />
              {errors.designation && (
                <span className="text-xs text-red-600 mt-[2px] inline-block">
                  This field is required
                </span>
              )}
            </div>
            <div className="mb-2">
              <label className="text-xs font-semibold mb-1 inline-block">
                Guest Image <span className="text-red-600">*</span>
              </label>
              <input
                type="file"
                className="border border-gray-300 w-full h-9 px-2 py-1 text-sm rounded-sm"
                {...register("profile", { required: true })}
              />
              {errors.profile && (
                <span className="text-xs text-red-600 mt-[2px] inline-block">
                  This field is required
                </span>
              )}
            </div>
            <div className="border border-dashed rounded-sm p-2 w-full">
              <p className="text-xs font-semibold mb-2">Current guest/s</p>
              <div className="flex flex-wrap gap-2">
                {event?.guests?.map((guest: TGuest) => (
                  <div
                    key={guest?._id}
                    className="border rounded-sm p-2 pt-4 bg-gray-100 relative"
                  >
                    <p className="text-xs font-semibold">{guest?.name}</p>
                    <p className="text-[10px]">{guest?.designation}</p>
                    <span
                      onClick={() =>
                        handleEventGuestDelete(guest?._id as string)
                      }
                      className="absolute top-0 right-0 text-xs text-red-500 bg-gray-300 p-[2px] rounded-sm cursor-pointer"
                    >
                      <RiDeleteBin6Line />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="w-fit h-fit text-xs py-2 px-2 rounded"
            >
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ManageGuestModal;
