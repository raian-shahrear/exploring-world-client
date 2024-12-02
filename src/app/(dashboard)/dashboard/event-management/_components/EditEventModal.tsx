"use client";
import { FaEdit } from "react-icons/fa";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useUpdateEvent } from "@/hooks/event.hook";
import { TDisplayEvent } from "@/types";

export type TEventProps = {
  event: TDisplayEvent;
};

const EditEventModal = ({ event }: TEventProps) => {
  const { mutate: handleUpdateEvent } = useUpdateEvent();

  const {
    register,
    handleSubmit,
  } = useForm();

  const handleEvent: SubmitHandler<FieldValues> = async (data) => {
    try {
      const formData = new FormData();
      if (data.eventImage[0]) {
        formData.append("image", data.eventImage[0]);
      }

      const newEvent = {
        title: data?.title,
        eventBy: data?.eventBy,
        eventPlace: data?.eventPlace,
        eventPlaceLink: data?.eventPlaceLink,
        eventDate: data?.eventDate
          ? new Date(data?.eventDate)
          : event?.eventDate,
        eventDetails: data?.eventDetails,
        eventTime: data?.eventTime,
        eventImage: event?.eventImage,
      };
      formData.append("data", JSON.stringify(newEvent));

      handleUpdateEvent({ eventId: event?._id, eventData: formData });
    } catch (err: any) {
      toast.error(
        err?.data?.message ? err?.data?.message : "Something went wrong!"
      );
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="h-fit px-2 py-1 text-xs gap-[2px] w-fit bg-gray-600">
          <FaEdit /> Edit
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
                Event Title
              </label>
              <input
                type="text"
                placeholder="Enter event title"
                defaultValue={event?.title}
                className="border border-gray-300 w-full h-9 px-2 py-1 text-sm rounded-sm"
                {...register("title")}
              />
            </div>
            <div className="mb-2">
              <label className="text-xs font-semibold mb-1 inline-block">
                Organizing by
              </label>
              <input
                type="text"
                placeholder="Enter event organizer"
                defaultValue={event?.eventBy}
                className="border border-gray-300 w-full h-9 px-2 py-1 text-sm rounded-sm"
                {...register("eventBy")}
              />
            </div>
            <div className="mb-2">
              <label className="text-xs font-semibold mb-1 inline-block">
                Event Location
              </label>
              <input
                type="text"
                placeholder="Enter event location"
                defaultValue={event?.eventPlace}
                className="border border-gray-300 w-full h-9 px-2 py-1 text-sm rounded-sm"
                {...register("eventPlace")}
              />
            </div>
            <div className="mb-2">
              <label className="text-xs font-semibold mb-1 inline-block">
                Location Embed Link (Map)
              </label>
              <input
                type="text"
                placeholder="Enter event location link"
                defaultValue={event?.eventPlaceLink}
                className="border border-gray-300 w-full h-9 px-2 py-1 text-sm rounded-sm"
                {...register("eventPlaceLink")}
              />
            </div>
            <div className="mb-2">
              <label className="text-xs font-semibold mb-1 inline-block">
                Event Time
              </label>
              <input
                type="text"
                placeholder="Enter event time in 24 hr formate"
                defaultValue={event?.eventTime}
                className="border border-gray-300 w-full h-9 px-2 py-1 text-sm rounded-sm"
                {...register("eventTime")}
              />
            </div>
            <div className="mb-2">
              <label className="text-xs font-semibold mb-1 inline-block">
                Event Date
              </label>
              <input
                type="date"
                className="border border-gray-300 w-full h-9 px-2 py-1 text-sm rounded-sm"
                {...register("eventDate")}
              />
            </div>
            <div className="mb-2">
              <label className="text-xs font-semibold mb-1 inline-block">
                Event Poster
              </label>
              <input
                type="file"
                className="border border-gray-300 w-full h-9 px-2 py-1 text-sm rounded-sm"
                {...register("eventImage")}
              />
            </div>
            <div>
              <label className="text-xs font-semibold mb-1 inline-block">
                Event Details
              </label>
              <textarea
                placeholder="Enter event organizer"
                defaultValue={event?.eventDetails}
                className="border border-gray-300 w-full h-14 px-2 py-1 text-sm rounded-sm"
                {...register("eventDetails")}
              ></textarea>
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

export default EditEventModal;
