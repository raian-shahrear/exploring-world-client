import userAvatar from "@/assets/icons/user-avatar-black.png";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TLoggedInUser, TUser } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { FaHouseUser, FaPhoneAlt, FaUserCog, FaUserEdit } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";

type TProps = {
  user: TLoggedInUser | null;
  loggedInUser: TUser;
  userLoading: boolean;
  allUserLoading: boolean;
};

const DashboardProfileSection = ({
  user,
  loggedInUser,
  userLoading,
  allUserLoading,
}: TProps) => {
  return (
    <div>
      {userLoading || allUserLoading ? (
        <div className="shadow-md h-[200px] rounded-lg">
          <div className="p-4">
            <div className="grid grid-cols-[56px_auto] items-center gap-3">
              <Skeleton className="w-14 h-14 rounded-full"></Skeleton>
              <div>
                <Skeleton className="mb-1 w-20 h-4"></Skeleton>
                <Skeleton className="w-20 h-4"></Skeleton>
              </div>
            </div>
          </div>
          <div className="p-4">
            <Skeleton className="mb-1 w-full h-4"></Skeleton>
            <Skeleton className="mb-1 w-full h-4"></Skeleton>
            <Skeleton className="w-full h-4"></Skeleton>
          </div>
        </div>
      ) : (
        <section className="border border-gray-200 bg-gray-300 shadow-md rounded-lg">
          <div className="grid grid-cols-[auto_20px] gap-4 p-4 border-b border-gray-400">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Image
                  src={user?.userProfile ? user?.userProfile : userAvatar}
                  alt="user"
                  width={56}
                  height={56}
                  className="w-14 h-14 rounded-full border-2 border-gray-900 p-1 object-cover object-center"
                />
                {loggedInUser?.isVerified === "verified" &&
                  loggedInUser?.role === "user" && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger className="text-green-600 absolute top-0 right-0 z-[1] bg-white rounded-full cursor-pointer">
                          <FaCircleCheck />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Verified User</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
              </div>
              <div className="text-gray-900 max-w-[70%]">
                <p className="mb-[2px] text-base font-semibold text-ellipsis overflow-hidden whitespace-nowrap">
                  {user?.userName}
                </p>
                <p className="text-xs text-ellipsis overflow-hidden whitespace-nowrap">
                  {user?.userEmail}
                </p>
              </div>
            </div>
            <div className="text-gray-900 text-xl transition-all duration-300 hover:text-gray-700">
              <Link href="/dashboard/my-profile">
                <FaUserEdit />
              </Link>
            </div>
          </div>
          <div className="p-4 flex flex-col gap-2">
            <div className="text-gray-900 text-sm grid grid-cols-[90px_10px_auto] items-start">
              <p className="flex items-center gap-1">
                <span className="text-base">
                  <FaUserCog />
                </span>
                <span>Role</span>
              </p>
              <p>:</p>
              <p>{user?.role}</p>
            </div>
            <div className="text-gray-900 text-sm grid grid-cols-[90px_10px_auto] items-start">
              <p className="flex items-center gap-1">
                <span className="text-base">
                  <FaPhoneAlt />
                </span>
                <span>Phone</span>
              </p>
              <p>:</p>
              <p className="text-ellipsis overflow-hidden whitespace-nowrap">
                {user?.userPhone}
              </p>
            </div>
            <div className="text-gray-900 text-sm grid grid-cols-[90px_10px_auto] items-start">
              <p className="flex items-center gap-1">
                <span className="text-base">
                  <FaHouseUser />
                </span>
                <span>Address</span>
              </p>
              <p>:</p>
              <p className="text-ellipsis overflow-hidden whitespace-nowrap">
                {user?.userAddress}
              </p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default DashboardProfileSection;
