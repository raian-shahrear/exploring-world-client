"use client";
import CommonLoader from "@/components/ui/loading/CommonLoader";
import Pagination from "@/components/ui/pagination/Pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useUser } from "@/context/user.provider";
import { useGetAllUser } from "@/hooks/auth.hook";
import { TUser } from "@/types";
import Image from "next/image";
import { useState } from "react";
import { GoDotFill } from "react-icons/go";
import EditRoleModal from "./_components/EditRoleModal";

const Users = () => {
  const [dataLimit, setDataLimit] = useState(8);
  const [pageCount, setPageCount] = useState(1);
  const { user, isLoading: userLoading } = useUser();
  const { data: allUsers, isLoading: allUserLoading } = useGetAllUser({
    limit: dataLimit,
    page: pageCount,
  });

  return (
    <div>
      <h1 className="text-xl font-bold mb-6">Manage Users</h1>

      {userLoading || allUserLoading ? (
        <div className="flex justify-center items-center h-[50vh]">
          <CommonLoader />
        </div>
      ) : (
        <>
          {allUsers?.data?.length ? (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">SL</TableHead>
                    <TableHead className="w-10">Profile</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead className="w-32">Address</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allUsers?.data?.map((userInfo: TUser, idx: number) => (
                    <TableRow key={userInfo?._id}>
                      <TableCell className="font-medium">
                        {(pageCount - 1) * dataLimit + idx + 1}
                      </TableCell>
                      <TableCell className="font-medium">
                        <Image
                          width={40}
                          height={40}
                          src={userInfo?.profile}
                          alt="user"
                          className="w-10 h-10 rounded-full object-cover object-center"
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        {userInfo?.name}
                      </TableCell>
                      <TableCell className="font-medium">
                        {userInfo?.email}
                      </TableCell>
                      <TableCell className="font-medium">
                        {userInfo?.phone}
                      </TableCell>
                      <TableCell className="font-medium">
                        {userInfo?.address}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`capitalize font-semibold ${
                            userInfo?.role === "admin"
                              ? "text-blue-600"
                              : "text-gray-900"
                          }`}
                        >
                          {userInfo?.role}
                        </span>
                      </TableCell>
                      <TableCell className="font-medium">
                        {userInfo?.isVerified === "no" ? (
                          <span className="text-gray-400 flex items-center gap-1 font-semibold">
                            <GoDotFill /> Non-verified
                          </span>
                        ) : userInfo?.isVerified === "pending" ? (
                          <span className="text-orange-600 flex items-center gap-1 font-semibold">
                            <GoDotFill /> Pending
                          </span>
                        ) : (
                          <span className="text-green-600 flex items-center gap-1 font-semibold">
                            <GoDotFill /> Verified
                          </span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <EditRoleModal userInfo={userInfo} user={user} />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="mt-10">
                <Pagination
                  data={allUsers}
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
                No category data found
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Users;
