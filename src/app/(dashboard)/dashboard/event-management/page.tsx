"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CreateEventModal from "./_components/CreateEventModal";
import ManageGuestModal from "./_components/ManageGuestModal";
import ManageHostModal from "./_components/ManageHostModal";
import EditEventModal from "./_components/EditEventModal";
import { Button } from "@/components/ui/button";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useState } from "react";
import { useDeleteEvent, useGetAllEvents } from "@/hooks/event.hook";
import CommonLoader from "@/components/ui/loading/CommonLoader";
import Pagination from "@/components/ui/pagination/Pagination";
import { formatPostDate } from "@/utils/postDate";
import { TDisplayEvent } from "@/types";
import Image from "next/image";

const EventManagement = () => {
  const [dataLimit, setDataLimit] = useState(8);
  const [pageCount, setPageCount] = useState(1);
  const { data: events, isLoading: eventLoading } = useGetAllEvents({
    limit: dataLimit,
    page: pageCount,
    sort: "eventDate",
  });
  const { mutate: handleDeleteEvent } = useDeleteEvent();

  //   delete event
  const handleEventDelete = (eventId: string) => {
    const isConfirm = confirm("Are you sure to delete?");
    if (isConfirm) {
      handleDeleteEvent(eventId);
    }
  };
  return (
    <div>
      <div className="flex items-center justify-between gap-2 mb-6">
        <h1 className="text-xl font-bold">Manage Events</h1>
        <CreateEventModal />
      </div>

      {eventLoading ? (
        <div className="flex justify-center items-center h-[50vh]">
          <CommonLoader />
        </div>
      ) : (
        <>
          {events?.data?.length ? (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">SL</TableHead>
                    <TableHead>Poster</TableHead>
                    <TableHead>title</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead>Event Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {events?.data?.map((event: TDisplayEvent, idx: number) => (
                    <TableRow key={event?._id}>
                      <TableCell className="font-medium">
                        {(pageCount - 1) * dataLimit + idx + 1}
                      </TableCell>
                      <TableCell className="w-11">
                        <Image
                          width={40}
                          height={40}
                          src={event?.eventImage}
                          alt="poster"
                          className="w-10 h-10 object-cover rounded-md"
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        {event?.title}
                      </TableCell>
                      <TableCell className="font-medium">
                        {formatPostDate(event?.createdAt)}
                      </TableCell>
                      <TableCell className="font-medium">
                        <p>{new Date(event?.eventDate).toDateString()}</p>
                        <p>at {event?.eventTime}</p>
                      </TableCell>
                      <TableCell className="font-semibold">
                        {event?.isActive ? (
                          <span>Enable</span>
                        ) : (
                          <span className="text-gray-500">Disable</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1">
                          <div className="flex gap-1">
                            <ManageGuestModal event={event} />
                            <ManageHostModal event={event} />
                          </div>
                          <div className="flex gap-1">
                            <EditEventModal event={event} />
                            <Button
                              onClick={() => handleEventDelete(event?._id)}
                              className="h-fit px-2 py-1 text-xs bg-red-700 text-white w-fit"
                            >
                              <RiDeleteBin6Line /> Delete
                            </Button>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="mt-10">
                <Pagination
                  data={events}
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
                No event data found
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default EventManagement;
