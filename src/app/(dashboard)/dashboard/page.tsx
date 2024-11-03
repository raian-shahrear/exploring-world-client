"use client";
import { useUser } from "@/context/user.provider";
import DashboardProfileSection from "@/components/modules/dashboard/DashboardProfileSection";
import { useGetAllPosts } from "@/hooks/post.hook";
import DashboardAllPostsSection from "@/components/modules/dashboard/DashboardAllPostsSection";
import DashboardMyPostsSection from "@/components/modules/dashboard/DashboardMyPostsSection";
import { useGetAllUser } from "@/hooks/auth.hook";
import DashboardAllUsersSection from "@/components/modules/dashboard/DashboardAllUsersSection";
import { TUser } from "@/types";
import DashboardFollowUsersSection from "@/components/modules/dashboard/DashboardFollowUsersSection";
import DashboardPostChartSection from "@/components/modules/dashboard/DashboardPostChartSection";

const DashboardPage = () => {
  const { user, isLoading: userLoading } = useUser();
  const { data: posts, isLoading: postLoading } = useGetAllPosts();
  const { data: myPosts, isLoading: myPostLoading } = useGetAllPosts({
    authors: user?.id ? [user?.id] : [],
  });
  const { data: allUsers, isLoading: allUserLoading } = useGetAllUser();
  const loggedInUser: TUser = allUsers?.data?.find(
    (info: TUser) => info?._id === user?.id
  );
  return (
    <div>
      <h1 className="text-xl font-bold mb-6">Dashboard</h1>

      <div className="grid md:grid-cols-3 gap-6">
        <DashboardProfileSection
          user={user}
          loggedInUser={loggedInUser}
          userLoading={userLoading}
          allUserLoading={allUserLoading}
        />
        {user?.role === "admin" && (
          <>
            <DashboardAllPostsSection posts={posts} postLoading={postLoading} />
            <DashboardAllUsersSection
              allUsers={allUsers}
              allUserLoading={allUserLoading}
            />
          </>
        )}
        {user?.role === "user" && (
          <>
            <DashboardMyPostsSection
              myPosts={myPosts}
              myPostLoading={myPostLoading}
            />
            <DashboardFollowUsersSection
              loggedInUser={loggedInUser}
              allUserLoading={allUserLoading}
            />
          </>
        )}
      </div>

      <div className="mt-6">
        <DashboardPostChartSection posts={posts} postLoading={postLoading} />
      </div>
    </div>
  );
};

export default DashboardPage;
