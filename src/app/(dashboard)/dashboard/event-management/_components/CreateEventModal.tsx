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
import { useCreateEvent } from "@/hooks/event.hook";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { MdAdd } from "react-icons/md";
import { toast } from "sonner";

const CreateEventModal = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { mutate: handleCreateEvent } = useCreateEvent();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    reset,
  } = useForm();

  const handleEvent: SubmitHandler<FieldValues> = async (data) => {
    if (isValid || !isSubmitting) {
      try {
        const formData = new FormData();

        const newEvent = {
          title: data?.title,
          eventBy: data?.eventBy,
          eventPlace: data?.eventPlace,
          eventPlaceLink: data?.eventPlaceLink,
          eventDate: new Date(data?.eventDate),
          eventTime: data?.eventTime,
          eventDetails: data?.eventDetails,
        };

        formData.append("data", JSON.stringify(newEvent));
        formData.append("image", data.eventImage[0]);
        handleCreateEvent(formData);
        reset();
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
          <MdAdd /> Create Event
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] lg:max-w-[550px] max-h-[50vh] overflow-y-auto">
        <form onSubmit={handleSubmit(handleEvent)}>
          <DialogHeader>
            <DialogTitle>Add Event</DialogTitle>
          </DialogHeader>
          <div className="my-4">
            <div className="mb-2">
              <label className="text-xs font-semibold mb-1 inline-block">
                Event Title <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter event title"
                className="border border-gray-300 w-full h-9 px-2 py-1 text-sm rounded-sm"
                {...register("title", { required: true })}
              />
              {errors.title && (
                <span className="text-xs text-red-600 mt-[2px] inline-block">
                  This field is required
                </span>
              )}
            </div>
            <div className="mb-2">
              <label className="text-xs font-semibold mb-1 inline-block">
                Organizing by <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter event organizer"
                className="border border-gray-300 w-full h-9 px-2 py-1 text-sm rounded-sm"
                {...register("eventBy", { required: true })}
              />
              {errors.eventBy && (
                <span className="text-xs text-red-600 mt-[2px] inline-block">
                  This field is required
                </span>
              )}
            </div>
            <div className="mb-2">
              <label className="text-xs font-semibold mb-1 inline-block">
                Event Location <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter event location"
                className="border border-gray-300 w-full h-9 px-2 py-1 text-sm rounded-sm"
                {...register("eventPlace", { required: true })}
              />
              {errors.eventPlace && (
                <span className="text-xs text-red-600 mt-[2px] inline-block">
                  This field is required
                </span>
              )}
            </div>
            <div className="mb-2">
              <label className="text-xs font-semibold mb-1 inline-block">
                Location Embed Link (Map){" "}
                <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter event location link"
                className="border border-gray-300 w-full h-9 px-2 py-1 text-sm rounded-sm"
                {...register("eventPlaceLink", { required: true })}
              />
              {errors.eventPlaceLink && (
                <span className="text-xs text-red-600 mt-[2px] inline-block">
                  This field is required
                </span>
              )}
            </div>
            <div className="mb-2">
              <label className="text-xs font-semibold mb-1 inline-block">
                Event Time <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter event time in 24 hr formate"
                className="border border-gray-300 w-full h-9 px-2 py-1 text-sm rounded-sm"
                {...register("eventTime", { required: true })}
              />
              {errors.eventTime && (
                <span className="text-xs text-red-600 mt-[2px] inline-block">
                  This field is required
                </span>
              )}
            </div>
            <div className="mb-2">
              <label className="text-xs font-semibold mb-1 inline-block">
                Event Date <span className="text-red-600">*</span>
              </label>
              <input
                type="date"
                className="border border-gray-300 w-full h-9 px-2 py-1 text-sm rounded-sm"
                {...register("eventDate", { required: true })}
              />
              {errors.eventDate && (
                <span className="text-xs text-red-600 mt-[2px] inline-block">
                  This field is required
                </span>
              )}
            </div>
            <div className="mb-2">
              <label className="text-xs font-semibold mb-1 inline-block">
                Event Poster <span className="text-red-600">*</span>
              </label>
              <input
                type="file"
                className="border border-gray-300 w-full h-9 px-2 py-1 text-sm rounded-sm"
                {...register("eventImage", { required: true })}
              />
              {errors.eventImage && (
                <span className="text-xs text-red-600 mt-[2px] inline-block">
                  This field is required
                </span>
              )}
            </div>
            <div>
              <label className="text-xs font-semibold mb-1 inline-block">
                Event Details <span className="text-red-600">*</span>
              </label>
              <textarea
                placeholder="Enter event organizer"
                className="border border-gray-300 w-full h-14 px-2 py-1 text-sm rounded-sm"
                {...register("eventDetails", { required: true })}
              ></textarea>
              {errors.eventDetails && (
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
              Create
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateEventModal;
