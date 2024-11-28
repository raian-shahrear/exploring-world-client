import { Skeleton } from "@/components/ui/skeleton";

const MyProfileLoader = () => {
  return (
    <div className="p-5 shadow-lg rounded-lg w-full md:w-10/12 lg:w-10/12 mx-auto">
      <Skeleton className="w-16 h-16 rounded-full mb-2"></Skeleton>
      <div className="flex flex-col gap-2">
        <Skeleton className="w-full h-10 rounded-sm"></Skeleton>
        <Skeleton className="w-full h-10 rounded-sm"></Skeleton>
        <Skeleton className="w-full h-10 rounded-sm"></Skeleton>
        <Skeleton className="w-full h-20 rounded-sm"></Skeleton>
        <Skeleton className="w-10 h-6 rounded-sm mt-2"></Skeleton>
      </div>
    </div>
  );
};

export default MyProfileLoader;
