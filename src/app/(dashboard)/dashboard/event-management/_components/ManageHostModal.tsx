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
import { useCreateEventHost, useDeleteEventHost } from "@/hooks/event.hook";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { RiDeleteBin6Line } from "react-icons/ri";
import { toast } from "sonner";
import { TEventProps } from "./EditEventModal";
import { THost } from "@/types";

const ManageHostModal = ({ event }: TEventProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const { mutate: handleEventHost } = useCreateEventHost();
  const { mutate: handleDeleteEventHost } = useDeleteEventHost();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    reset,
  } = useForm();

  const handleAddEventHost: SubmitHandler<FieldValues> = async (data) => {
    if (isValid || !isSubmitting) {
      try {
        const formData = new FormData();

        const newHost = {
          name: data?.name,
        };

        formData.append("data", JSON.stringify(newHost));
        formData.append("image", data.logo[0]);

        console.log({
          data: formData.get("data"),
          logo: formData.get("image"),
        });
        handleEventHost({ eventId: event?._id, hostData: formData });
        reset();
      } catch (err: any) {
        toast.error(
          err?.data?.message ? err?.data?.message : "Something went wrong!"
        );
      }
    }
  };

  //   delete event's host
  const handleEventHostDelete = (hostId: string) => {
    const deletedHost = {
      hostId,
    };
    handleDeleteEventHost({ eventId: event?._id, deletedHost });
  };
  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger asChild>
        <Button
          className="h-fit px-2 py-1 text-xs gap-[2px] w-fit"
          onClick={() => setModalOpen(true)}
        >
          Manage Host
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] lg:max-w-[550px] max-h-[50vh] overflow-y-auto">
        <form onSubmit={handleSubmit(handleAddEventHost)}>
          <DialogHeader>
            <DialogTitle>Manage Host</DialogTitle>
          </DialogHeader>
          <div className="my-4">
            <div className="mb-2">
              <label className="text-xs font-semibold mb-1 inline-block">
                Host Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter host name"
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
                Host Logo <span className="text-red-600">*</span>
              </label>
              <input
                type="file"
                className="border border-gray-300 w-full h-9 px-2 py-1 text-sm rounded-sm"
                {...register("logo", { required: true })}
              />
              {errors.logo && (
                <span className="text-xs text-red-600 mt-[2px] inline-block">
                  This field is required
                </span>
              )}
            </div>
            <div className="border border-dashed rounded-sm p-2 w-full">
              <p className="text-xs font-semibold mb-2">Current host/s</p>
              <div className="flex flex-wrap gap-2">
                {event?.hostedBy?.map((host: THost) => (
                  <div
                    key={host?._id}
                    className="border rounded-sm p-2 pt-4 bg-gray-100 relative"
                  >
                    <p className="text-xs font-semibold">{host?.name}</p>
                    <span
                      onClick={() => handleEventHostDelete(host?._id as string)}
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

export default ManageHostModal;
