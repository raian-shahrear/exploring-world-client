import { Skeleton } from "@/components/ui/skeleton";
import { TUser } from "@/types";
import { FaUsers } from "react-icons/fa";

type TProps = {
  loggedInUser: TUser;
  allUserLoading: boolean;
};

const DashboardFollowUsersSection = ({
  loggedInUser,
  allUserLoading,
}: TProps) => {
  return (
    <div>
      {allUserLoading ? (
        <div className="h-[200px] shadow-md p-4 flex flex-col items-center justify-center rounded-lg">
          <Skeleton className="w-14 h-14 mb-2"></Skeleton>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <Skeleton className="w-20 h-4 mb-4"></Skeleton>
              <Skeleton className="w-20 h-4"></Skeleton>
            </div>
            <div>
              <Skeleton className="w-20 h-4 mb-4"></Skeleton>
              <Skeleton className="w-20 h-4"></Skeleton>
            </div>
          </div>
        </div>
      ) : (
        <section className="border border-red-50 bg-red-50 shadow-md px-4 py-11 rounded-lg text-center flex items-center justify-center flex-col gap-4">
          <p className="text-3xl -mb-2">
            <FaUsers />
          </p>
          <div className="grid grid-cols-[auto_10px_auto] gap-6 items-center">
            <div className="flex flex-col gap-4">
              <p className="font-semibold text-gray-500">Following</p>
              <p className="text-2xl font-bold">
                {loggedInUser?.following?.length
                  ? loggedInUser?.following?.length
                  : 0}
              </p>
            </div>
            <div className="w-[1px] h-12 bg-gray-300"></div>
            <div className="flex flex-col gap-4">
              <p className="font-semibold text-gray-500">Follower</p>
              <p className="text-2xl font-bold">
                {loggedInUser?.follower?.length
                  ? loggedInUser?.follower?.length
                  : 0}
              </p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default DashboardFollowUsersSection;
