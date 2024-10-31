import { Skeleton } from "@/components/ui/skeleton";
import { BsPostcardHeart } from "react-icons/bs";

type TProps = {
  posts: any;
  postLoading: boolean;
};

const DashboardAllPostsSection = ({ posts, postLoading }: TProps) => {
  return (
    <div>
      {postLoading ? (
        <div className="h-[200px] shadow-md p-4 flex flex-col items-center justify-center rounded-lg">
          <Skeleton className="w-14 h-14 mb-2"></Skeleton>
          <Skeleton className="w-20 h-4 mb-4"></Skeleton>
          <Skeleton className="w-20 h-4"></Skeleton>
        </div>
      ) : (
        <section className="border border-blue-50 bg-blue-50 shadow-md px-4 py-11 rounded-lg text-center flex items-center justify-center flex-col gap-4">
          <p className="text-3xl -mb-2">
            <BsPostcardHeart />
          </p>
          <p className="font-semibold text-gray-500">Total Posts</p>
          <p className="text-2xl font-bold">
            {posts?.data?.length ? posts?.data?.length : 0}
          </p>
        </section>
      )}
    </div>
  );
};

export default DashboardAllPostsSection;
