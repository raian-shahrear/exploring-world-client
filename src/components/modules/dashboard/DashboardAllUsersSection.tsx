import { Skeleton } from "@/components/ui/skeleton";
import { FaUsers } from "react-icons/fa";

type TProps = {
  allUsers: any;
  allUserLoading: boolean;
};

const DashboardAllUsersSection = ({ allUsers, allUserLoading }: TProps) => {
  return (
    <div>
      {allUserLoading ? (
        <div className="h-[200px] shadow-md p-4 flex flex-col items-center justify-center rounded-lg">
          <Skeleton className="w-14 h-14 mb-2"></Skeleton>
          <Skeleton className="w-20 h-4 mb-4"></Skeleton>
          <Skeleton className="w-20 h-4"></Skeleton>
        </div>
      ) : (
        <section className="border border-red-50 bg-red-50 shadow-md px-4 py-11 rounded-lg text-center flex items-center justify-center flex-col gap-4">
          <p className="text-3xl -mb-2">
            <FaUsers />
          </p>
          <p className="font-semibold text-gray-500">Total Users</p>
          <p className="text-2xl font-bold">
            {allUsers?.data?.length ? allUsers?.data?.length : 0}
          </p>
        </section>
      )}
    </div>
  );
};

export default DashboardAllUsersSection;
