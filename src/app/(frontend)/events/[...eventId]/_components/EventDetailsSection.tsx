"use client";
import { useGetSingleEvent } from "@/hooks/event.hook";
import { TEventDetailsProps } from "../page";
import Image from "next/image";
import { MdLocationOn, MdPerson } from "react-icons/md";
import { TGuest, THost } from "@/types";
import CommonLoader from "@/components/ui/loading/CommonLoader";

const EventDetailsSection = ({ params }: TEventDetailsProps) => {
  const { data: eventSingleData, isLoading: getSingleEventLoading } =
    useGetSingleEvent(params?.eventId);
  return (
    <>
      {getSingleEventLoading ? (
        <div className="flex justify-center items-center h-[50vh]">
          <CommonLoader />
        </div>
      ) : (
        <div>
          <div className="mb-6">
            <Image
              src={eventSingleData?.data?.eventImage}
              alt="host"
              width={300}
              height={300}
              unoptimized
              className="w-full object-cover rounded-lg"
            />
          </div>
          <div className="border-b pb-2">
            <p className="text-gray-500 text-xs font-semibold">
              {new Date(eventSingleData?.data?.eventDate).toDateString()} at{" "}
              {eventSingleData?.data?.eventTime}
            </p>
            <p className="mt-1 text-lg font-semibold">
              {eventSingleData?.data?.title}
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
            <div className="shadow-lg rounded-lg p-4 h-fit">
              <div>
                <p className="text-base font-semibold">Details</p>
                <div className="mt-1">
                  <p className="text-sm mt-2 flex items-center gap-1">
                    <span className="text-gray-500 flex items-center gap-1">
                      <MdPerson className="text-base" /> Event by
                    </span>
                    <span className="font-semibold">
                      {eventSingleData?.data?.eventBy}
                    </span>
                  </p>
                  <p className="text-sm mt-2 flex items-center gap-1">
                    <span className="text-gray-500">
                      <MdLocationOn className="text-lg" />
                    </span>
                    <span className="font-semibold">
                      {eventSingleData?.data?.eventPlace}
                    </span>
                  </p>
                  <p className="text-sm mt-2">
                    {eventSingleData?.data?.eventDetails}
                  </p>
                </div>
              </div>
              {eventSingleData?.data?.hostedBy?.length && (
                <div className="mt-4">
                  <p className="text-base font-semibold">Meet your hosts</p>
                  <div className="mt-2 grid grid-cols-2 gap-3">
                    {eventSingleData?.data?.hostedBy?.map((host: THost) => (
                      <div key={host?._id} className="p-2 border rounded-lg">
                        <Image
                          src={host?.logo}
                          alt="event"
                          width={56}
                          height={56}
                          unoptimized
                          className="w-14 h-14 rounded-full mx-auto"
                        />
                        <p className="mt-1 text-sm text-center">{host?.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="shadow-lg rounded-lg p-4 h-fit">
              <div>
                <iframe
                  src={eventSingleData?.data?.eventPlaceLink}
                  width="600"
                  height="450"
                  style={{ border: "0" }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-[300px]"
                ></iframe>
              </div>
              {eventSingleData?.data?.guests?.length && (
                <div className="mt-4">
                  <p className="text-base font-semibold">Guests</p>
                  <div className="mt-2 flex flex-col gap-3">
                    {eventSingleData?.data?.guests?.map((guest: TGuest) => (
                      <div
                        key={guest?._id}
                        className="grid grid-cols-[56px_auto] gap-2 items-center"
                      >
                        <Image
                          src={guest?.profile}
                          alt="guest"
                          width={48}
                          height={48}
                          unoptimized
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <p className="text-sm font-semibold">{guest?.name}</p>
                          <p className="text-xs">{guest?.designation}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EventDetailsSection;
