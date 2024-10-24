/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import CreatePost from "@/components/ui/home.tsx/CreatePost";
import PostCard from "@/components/ui/home.tsx/postCard/PostCard";
import PostCategory from "@/components/ui/home.tsx/PostCategory";
import SidebarFollow from "@/components/ui/home.tsx/SidebarFollow";
import SidebarProfile from "@/components/ui/home.tsx/SidebarProfile";
import { useUser } from "@/context/user.provider";
import React, { useState } from "react";

const HomePage = () => {
  const { user: findUser, isLoading: userLoading} = useUser();
  const [controlCategoryTab, setControlCategoryTab] = useState<
    string | string[]
  >("0");
  return (
    <div
      className={`grid ${
        findUser
          ? "grid-cols-1 md:grid-cols-[200px_auto] lg:grid-cols-[250px_auto_250px]"
          : "grid-cols-1"
      } gap-6 relative`}
    >
      {findUser && (
        <SidebarProfile userLoading={userLoading} findUser={findUser} />
      )}
      <div>
        {findUser && findUser?.role === "user" && (
          <CreatePost userLoading={userLoading} findUser={findUser} />
        )}
        <div
          className={`${
            findUser && findUser?.role === "user" ? "mt-6" : "mt-0"
          }`}
        >
          <PostCategory
            controlCategoryTab={controlCategoryTab}
            setControlCategoryTab={setControlCategoryTab}
          />
        </div>
        <div className="mt-6 flex flex-col gap-6">
          <PostCard
            controlCategoryTab={controlCategoryTab}
            userLoading={userLoading}
            findUser={findUser}
          />
        </div>
      </div>
      {findUser && findUser?.role === "user" && (
        <SidebarFollow userLoading={userLoading} findUser={findUser} />
      )}
    </div>
  );
};

export default HomePage;
