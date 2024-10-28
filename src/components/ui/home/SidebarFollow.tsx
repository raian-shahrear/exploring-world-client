/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from "next/image";
import Link from "next/link";
import { TLoggedInUser, TUser } from "@/types";
import { useGetAllUser, useUnfollowUser } from "@/hooks/auth.hook";

type TProps = {
  userLoading: boolean;
  findUser: TLoggedInUser;
};

const SidebarFollow = ({ userLoading, findUser }: TProps) => {
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
  return (
    <>
      {userLoading ? (
        <div className="skeleton h-fit lg:h-[85vh] rounded-lg p-6 md:sticky top-[100px] shadow-lg"></div>
      ) : (
        <div className="bg-gray-50 h-[85vh] rounded-lg p-6 shadow-lg sticky top-[100px] overflow-auto hidden lg:block">
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
    </>
  );
};

export default SidebarFollow;
