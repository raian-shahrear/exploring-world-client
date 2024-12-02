"use client";
import CommonLoader from "@/components/ui/loading/CommonLoader";
import Pagination from "@/components/ui/pagination/Pagination";
import { useGetAllEvents } from "@/hooks/event.hook";
import { TDisplayEvent } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { MdLocationOn, MdPerson } from "react-icons/md";

const EventSection = () => {
  const [dataLimit, setDataLimit] = useState(8);
  const [pageCount, setPageCount] = useState(1);
  const { data: events, isLoading: eventLoading } = useGetAllEvents({
    limit: dataLimit,
    page: pageCount,
    sort: "eventDate",
  });
  return (
    <>
      {eventLoading ? (
        <div className="flex justify-center items-center h-[50vh]">
          <CommonLoader />
        </div>
      ) : (
        <div className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {events?.data?.map((event: TDisplayEvent) => (
              <div key={event?._id} className="shadow-xl rounded-lg">
                <Image
                  src={event?.eventImage}
                  alt="event"
                  width={48}
                  height={48}
                  unoptimized
                  className="w-full h-[200px] object-cover rounded-tl-lg rounded-tr-lg"
                />
                <div className="p-4">
                  <p className="text-sm font-semibold">{event?.title}</p>
                  <p className="text-[10px] font-semibold">
                    {new Date(event?.eventDate).toDateString()} at{" "}
                    {event?.eventTime}
                  </p>
                  <p className="text-xs mt-2 flex items-center gap-1">
                    <span className="text-gray-500 flex items-center gap-1">
                      <MdPerson className="text-base" /> Event by
                    </span>
                    <span className="font-semibold">{event?.eventBy}</span>
                  </p>
                  <p className="text-xs mt-2 flex items-center gap-1">
                    <span className="text-gray-500">
                      <MdLocationOn className="text-base" />
                    </span>
                    <span className="font-semibold">{event?.eventPlace}</span>
                  </p>
                  <Link
                    href={`/events/${event?._id}`}
                    className="mt-4 text-xs font-semibold flex items-center gap-1 text-blue-500 transition-all duration-300 hover:text-gray-900"
                  >
                    See Details <FaArrowRightLong />
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Pagination
              data={events}
              dataLimit={dataLimit}
              setDataLimit={setDataLimit}
              pageCount={pageCount}
              setPageCount={setPageCount}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default EventSection;
