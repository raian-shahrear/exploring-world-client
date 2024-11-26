import Pagination from "@/components/ui/pagination/Pagination";
import PostSmallCard from "@/components/ui/postSmallCard/PostSmallCard";
import { Skeleton } from "@/components/ui/skeleton";
import { TDisplayPost, TLoggedInUser } from "@/types";
import { Dispatch, SetStateAction } from "react";

type TProps = {
  postLoading: boolean;
  posts: any;
  dataLimit: number;
  setDataLimit: Dispatch<SetStateAction<number>>;
  pageCount: number;
  setPageCount: Dispatch<SetStateAction<number>>;
  findUser: TLoggedInUser | null;
  handlePostDelete: (postId: string) => void;
};

const MyPostsDisplaySection = ({
  postLoading,
  posts,
  dataLimit,
  setDataLimit,
  pageCount,
  setPageCount,
  findUser,
  handlePostDelete,
}: TProps) => {
  return (
    <>
      {postLoading ? (
        <div className="mt-10">
          <Skeleton className="w-full h-[350px] rounded-lg border" />
        </div>
      ) : (
        <>
          {posts?.data?.length > 0 ? (
            <>
              <div className="mt-10">
                <Pagination
                  data={posts}
                  dataLimit={dataLimit}
                  setDataLimit={setDataLimit}
                  pageCount={pageCount}
                  setPageCount={setPageCount}
                />
              </div>
              <div
                className={`mt-10 grid grid-cols-1 gap-6 ${
                  posts?.data?.length === 1
                    ? "md:grid-cols-1 lg:grid-cols-1"
                    : posts?.data?.length === 2
                    ? "md:grid-cols-2 lg:grid-cols-2"
                    : posts?.data?.length === 3
                    ? "md:grid-cols-2 lg:grid-cols-3"
                    : "md:grid-cols-2 lg:grid-cols-4"
                }`}
              >
                {posts?.data?.map((post: TDisplayPost) => (
                  <PostSmallCard
                    key={post?._id}
                    posts={posts?.data}
                    post={post}
                    findUser={findUser}
                    handlePostDelete={handlePostDelete}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="mt-10">
              <p className="text-center text-gray-300 text-2xl font-semibold">
                No Post Found
              </p>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default MyPostsDisplaySection;
