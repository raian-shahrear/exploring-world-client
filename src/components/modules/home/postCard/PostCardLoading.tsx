import { Skeleton } from "@/components/ui/skeleton";

const PostCardLoading = () => {
  return (
    <div className="border rounded-lg p-6">
      <div>
        <div className="grid grid-cols-[36px_auto] items-center gap-2">
          <Skeleton className="rounded-full border w-9 h-9" />
          <div className="flex flex-col gap-2">
            <Skeleton className="w-20 h-4" />
            <Skeleton className="w-20 h-3" />
          </div>
        </div>
      </div>

      <div className="mt-6">
        <Skeleton className="w-full h-52 rounded-md" />
      </div>

      <div className="mt-6">
        <Skeleton className="w-20 h-4" />
        <Skeleton className="h-3 w-20 mt-2" />
        <div className="mt-3 flex flex-col gap-1">
          {Array.from({ length: 10 }).map((_, idx) => (
            <Skeleton key={idx} className="w-full h-3" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostCardLoading;
