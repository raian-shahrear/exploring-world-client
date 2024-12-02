"use client";
import Image from "next/image";
import Link from "next/link";
import { TDisplayEvent, TLoggedInUser, TUser } from "@/types";
import { useGetAllUser, useUnfollowUser } from "@/hooks/auth.hook";
import { FaArrowRightLong } from "react-icons/fa6";
import { useGetAllEvents } from "@/hooks/event.hook";
import { Skeleton } from "@/components/ui/skeleton";

type TProps = {
  findUser: TLoggedInUser | null;
};

const SidebarFollow = ({ findUser }: TProps) => {
  const { data: allUsers } = useGetAllUser();
  const loggedInUser: TUser = allUsers?.data?.find(
    (user: TUser) => user?._id === findUser?.id
  );
  const { mutate: handleUnfollow } = useUnfollowUser();
  const { data: events, isLoading: eventLoading } = useGetAllEvents({
    limit: 5,
    sort: "eventDate",
  });

  const handleUnfollowUser = (followingId: string) => {
    const user = {
      followingUserId: followingId,
    };
    handleUnfollow(user);
  };
  return (
    <>
      <div className="hidden lg:block">
        {findUser && findUser?.role === "user" && (
          <div className="bg-gray-50 max-h-[450px] overflow-y-auto rounded-lg p-6 shadow-lg">
            <div>
              <p className="text-sm font-semibold">
                Following: {findUser?.following?.length}
              </p>
              <div className="mt-2 flex flex-col gap-1">
                {loggedInUser?.following?.map((follow: any, idx: number) => (
                  <div key={idx} className="grid grid-cols-[auto_50px] gap-3">
                    <Link
                      href={`/profile/following/${follow?.user?._id}/posts`}
                      className="grid grid-cols-[28px_auto] items-center gap-2 w-fit"
                    >
                      <Image
                        src={follow?.user?.profile}
                        alt="user"
                        width={28}
                        height={28}
                        className="rounded-full border w-7 h-7 object-cover object-center"
                      />
                      <p className="text-xs font-semibold flex flex-col text-ellipsis whitespace-nowrap overflow-hidden">
                        <span>{follow?.user?.name}</span>
                      </p>
                    </Link>
                    <button
                      className="text-blue-500 font-semibold text-xs"
                      onClick={() => handleUnfollowUser(follow?.user?._id)}
                    >
                      Unfollow
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className=" mt-6">
              <p className="text-sm font-semibold">
                Followers: {findUser?.follower?.length}
              </p>
              <div className="mt-2 flex flex-col gap-1">
                {loggedInUser?.follower?.map((follow: any, idx: number) => (
                  <div
                    key={idx}
                    className="grid grid-cols-[24px_auto] items-center gap-2 w-fit"
                  >
                    <Image
                      src={follow?.user?.profile}
                      alt="user"
                      width={28}
                      height={28}
                      className="rounded-full border w-7 h-7 object-cover object-center"
                    />
                    <p className="text-xs font-semibold text-ellipsis whitespace-nowrap overflow-hidden">
                      {follow?.user?.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {eventLoading ? (
          <div>
            <Skeleton className="w-full h-20 shadow-lg" />
          </div>
        ) : (
          <div
            className={`max-h-[450px] overflow-y-auto bg-gray-50 rounded-lg p-6 shadow-lg ${
              findUser && findUser?.role === "user" ? "mt-6" : "mt-0"
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-bold">Next events</p>
              <Link
                href="/events"
                className="text-xs font-semibold flex items-center gap-1 text-blue-500 transition-all duration-300 hover:text-gray-900"
              >
                <span>View all</span>
                <span>
                  <FaArrowRightLong />
                </span>
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              {events?.data?.map((event: TDisplayEvent) => (
                <Link
                  key={event?._id}
                  href={`/events/${event?._id}`}
                  className="grid grid-cols-[48px_auto] gap-2 p-2 bg-gray-200 rounded-md transition-all duration-300 hover:bg-gray-300"
                >
                  <Image
                    src={event?.eventImage}
                    alt="event"
                    width={48}
                    height={48}
                    unoptimized
                    className="w-12 h-12 object-cover rounded-md"
                  />
                  <div>
                    <p className="text-sm font-semibold">{event?.title}</p>
                    <p className="text-[10px] font-semibold">
                      {new Date(event?.eventDate).toDateString()} at{" "}
                      {event?.eventTime}
                    </p>
                    <p className="text-xs mt-1">
                      <span className="text-gray-500">Event by</span>{" "}
                      <span className="font-semibold">{event?.eventBy}</span>
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SidebarFollow;
