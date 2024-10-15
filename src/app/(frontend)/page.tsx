import CreatePost from "@/components/ui/home.tsx/CreatePost";
import PostCard from "@/components/ui/home.tsx/postCard/PostCard";
import PostCategory from "@/components/ui/home.tsx/PostCategory";
import SidebarFollow from "@/components/ui/home.tsx/SidebarFollow";
import SidebarProfile from "@/components/ui/home.tsx/SidebarProfile";
import React from "react";

const HomePage = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[200px_auto] lg:grid-cols-[250px_auto_250px] gap-6 relative">
      <SidebarProfile />
      <div>
        <CreatePost />
        <div className="mt-6">
          <PostCategory />
        </div>
        <div className="mt-6 flex flex-col gap-6">
          <PostCard />
        </div>
      </div>
      <SidebarFollow />
    </div>
  );
};

export default HomePage;
