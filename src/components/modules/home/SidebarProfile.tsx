"use client";
import { FaCheckCircle } from "react-icons/fa";
import { TLoggedInUser, TUser } from "@/types";
import { useGetAllUser, useUnfollowUser } from "@/hooks/auth.hook";
import { format, parseISO } from "date-fns";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { IoMdArrowDropdown, IoMdArrowDropup, IoMdClose } from "react-icons/io";
import { Skeleton } from "@/components/ui/skeleton";
import VerifyUserModal from "@/components/ui/modal/VerifyUserModal";

type TProps = {
  userLoading: boolean;
  findUser: TLoggedInUser;
};

const SidebarProfile = ({ userLoading, findUser }: TProps) => {
  const [controlFollowing, setControlFollowing] = useState(false);
  const [controlFollower, setControlFollower] = useState(false);
  const [accountCreatedDate, setAccountCreatedDate] = useState("");
  const { data: allUsers } = useGetAllUser();
  const loggedInUser: TUser = allUsers?.data?.find(
    (user: TUser) => user?._id === findUser?.id
  );
  const { mutate: handleUnfollow } = useUnfollowUser();

  const handleUnfollowUser = (followingId: string) => {
    const user = {
      followingUserId: followingId,
    };
    handleUnfollow(user);
  };

  // date formatting
  useEffect(() => {
    if (loggedInUser?.createdAt) {
      const date = parseISO(loggedInUser?.createdAt);
      const formattedDate = format(date, "EEE do MMM yyyy 'at' h:mmaaa");
      setAccountCreatedDate(formattedDate);
    }
  }, [loggedInUser]);

  return (
    <>
      {userLoading ? (
        <Skeleton className="h-fit lg:h-[85vh] rounded-lg p-6 md:sticky top-[100px] shadow-lg" />
      ) : (
        <div className="h-fit lg:h-[85vh] bg-gray-50 rounded-lg p-6 md:sticky top-[100px] shadow-lg">
          <div className="flex md:block gap-6 md:gap-0">
            <div>
              <img
                src={findUser?.userProfile}
                alt="user"
                width={64}
                height={64}
                className="w-[150px] h-full md:w-full md:h-[150px] md:mx-auto object-cover object-top border rounded-md"
              />
            </div>
            <div className="md:mt-4 flex-1">
              <p className="text-sm font-semibold mb-3">
                <span className="mb-[2px] block">{findUser?.userName}</span>
                {loggedInUser?.isVerified === "verified" ? (
                  <span className="text-green-600 text-[11px] font-medium flex items-center gap-1">
                    <FaCheckCircle /> Verified
                  </span>
                ) : loggedInUser?.isVerified === "pending" ? (
                  <VerifyUserModal />
                ) : (
                  ""
                )}
              </p>
              <p className="text-xs font-semibold mb-2 grid grid-cols-[65px_8px_auto]">
                <span>Email</span>
                <span>:</span>
                <span className="block text-ellipsis whitespace-nowrap overflow-hidden">
                  {findUser?.userEmail}
                </span>
              </p>
              <p className="text-xs font-semibold mb-2 grid grid-cols-[65px_8px_auto]">
                <span>Role</span>
                <span>:</span>
                <span className="capitalize">{findUser?.role}</span>
              </p>
              <p className="text-xs font-semibold mb-2 grid grid-cols-[65px_8px_auto]">
                <span>Phone</span>
                <span>:</span>
                <span className="capitalize">{findUser?.userPhone}</span>
              </p>
              <p className="text-xs font-semibold mb-2 grid grid-cols-[65px_8px_auto]">
                <span>Address</span>
                <span>:</span>
                <span className="capitalize">{findUser?.userAddress}</span>
              </p>
              <p className="text-xs font-semibold mb-2 grid grid-cols-[65px_8px_auto]">
                <span>Created At</span>
                <span>:</span>
                <span className="capitalize">{accountCreatedDate}</span>
              </p>
              {findUser?.role === "user" && (
                <>
                  <p className="text-xs font-semibold mb-2 grid grid-cols-[65px_8px_auto]">
                    <span>Following</span>
                    <span>:</span>
                    <div className="flex items-center gap-2">
                      <span>{findUser?.following?.length}</span>
                      {findUser?.following?.length > 0 && (
                        <button
                          type="button"
                          className="border border-gray-400 h-5 w-5 rounded-md flex justify-center items-center md:hidden"
                          onClick={() => setControlFollowing(!controlFollowing)}
                        >
                          {controlFollowing ? (
                            <IoMdArrowDropup />
                          ) : (
                            <IoMdArrowDropdown />
                          )}
                        </button>
                      )}
                    </div>
                  </p>
                  <p className="text-xs font-semibold grid grid-cols-[65px_8px_auto]">
                    <span>Follower</span>
                    <span>:</span>
                    <div className="flex items-center gap-2">
                      {findUser?.follower?.length}
                      {findUser?.follower?.length > 0 && (
                        <button
                          type="button"
                          className="border border-gray-400 h-5 w-5 rounded-md flex justify-center items-center md:hidden"
                          onClick={() => setControlFollower(!controlFollower)}
                        >
                          {controlFollower ? (
                            <IoMdArrowDropup />
                          ) : (
                            <IoMdArrowDropdown />
                          )}
                        </button>
                      )}
                    </div>
                  </p>
                </>
              )}
            </div>
          </div>
          {findUser?.role === "user" && (
            <div className="mt-4 block md:hidden">
              <div
                className={`border rounded-lg w-full p-4 ${
                  controlFollowing ? "block" : "hidden"
                }`}
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold mb-2">
                    Following ({findUser?.following?.length}) :
                  </p>
                  <span
                    className="btn h-5 min-h-5 w-5 p-0 rounded-md btn-outline"
                    onClick={() => setControlFollowing(false)}
                  >
                    <IoMdClose />
                  </span>
                </div>
                <div className="mt-2 flex flex-col gap-1 max-h-36 overflow-y-auto overflow-x-hidden">
                  {loggedInUser?.following?.map((follow: any, idx: number) => (
                    <div
                      key={idx}
                      className="grid grid-cols-[auto_50px] gap-3 pr-4"
                    >
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

              <div
                className={`border rounded-lg w-full p-4 mt-2 ${
                  controlFollower ? "block" : "hidden"
                }`}
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold mb-2">
                    Follower ({findUser?.follower?.length}) :
                  </p>
                  <span
                    className="btn h-5 min-h-5 w-5 p-0 rounded-md btn-outline"
                    onClick={() => setControlFollower(false)}
                  >
                    <IoMdClose />
                  </span>
                </div>
                <div className="mt-2 flex flex-col gap-1 max-h-36 overflow-y-auto overflow-x-hidden">
                  {loggedInUser?.follower?.map((follow: any, idx: number) => (
                    <div
                      key={idx}
                      className="grid grid-cols-[24px_auto] items-center gap-2 w-fit pr-4"
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
        </div>
      )}
    </>
  );
};

export default SidebarProfile;
