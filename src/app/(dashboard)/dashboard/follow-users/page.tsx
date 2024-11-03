"use client";
import CommonLoader from "@/components/ui/loading/CommonLoader";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useUser } from "@/context/user.provider";
import {
  useFollowUser,
  useGetAllUser,
  useUnfollowUser,
} from "@/hooks/auth.hook";
import { TUser } from "@/types";
import Image from "next/image";
import React from "react";
import { GoDotFill } from "react-icons/go";

const FollowUsers = () => {
  const { mutate: handleFollow } = useFollowUser();
  const { mutate: handleUnfollow } = useUnfollowUser();
  const { user, isLoading: userLoading } = useUser();
  const { data: allUsers, isLoading: allUserLoading } = useGetAllUser();
  const loggedInUser: TUser = allUsers?.data?.find(
    (info: TUser) => info?._id === user?.id
  );

  // Filter out admin and logged-in user
  const filteredUsers = allUsers?.data?.filter(
    (userItem: TUser) => userItem.role !== "admin" && userItem._id !== user?.id
  );
  // find following user
  const isFollowingUser = (userId: string) => {
    return loggedInUser?.following?.some(
      (follow: any) => follow.user._id === userId
    );
  };

  // handle unfollow
  const handleUnfollowUser = (followingId: string) => {
    const user = {
      followingUserId: followingId,
    };
    handleUnfollow(user);
  };

  // handle follow
  const handleFollowUser = (followingId: string) => {
    const user = {
      followingUserId: followingId,
    };
    handleFollow(user);
  };
  return (
    <div>
      <h1 className="text-xl font-bold mb-6">Following Users</h1>

      {userLoading || allUserLoading ? (
        <div className="flex justify-center items-center h-[50vh]">
          <CommonLoader />
        </div>
      ) : (
        <>
          {loggedInUser?.following?.length ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">SL</TableHead>
                  <TableHead className="w-10">Profile</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers?.map((userItem: TUser, idx: number) => (
                  <TableRow key={idx}>
                    <TableCell className="font-medium">{idx + 1}</TableCell>
                    <TableCell className="font-medium">
                      <Image
                        width={40}
                        height={40}
                        src={userItem?.profile}
                        alt="user"
                        className="w-10 h-10 rounded-full object-cover object-center"
                      />
                    </TableCell>
                    <TableCell className="font-medium">
                      {userItem?.name}
                    </TableCell>
                    <TableCell className="font-medium">
                      {userItem?.email}
                    </TableCell>
                    <TableCell className="font-medium">
                      {userItem?.phone}
                    </TableCell>
                    <TableCell className="font-medium">
                      {userItem?.isVerified === "verified" ? (
                        <span className="text-green-600 flex items-center gap-1 font-semibold">
                          <GoDotFill /> Verified
                        </span>
                      ) : (
                        <span className="text-gray-400 flex items-center gap-1 font-semibold">
                          <GoDotFill /> Unverified
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      {isFollowingUser(userItem?._id) ? (
                        <button
                          className="text-blue-500 font-semibold"
                          onClick={() => handleUnfollowUser(userItem?._id)}
                        >
                          Unfollow
                        </button>
                      ) : (
                        <button
                          className="text-blue-500 font-semibold"
                          onClick={() => handleFollowUser(userItem?._id)}
                        >
                          Follow
                        </button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="flex justify-center items-center h-[30vh]">
              <p className="text-xl sm:text-2xl text-gray-300 font-medium">
                No following user found
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default FollowUsers;
