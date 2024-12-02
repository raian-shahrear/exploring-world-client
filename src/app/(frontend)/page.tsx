"use client";
import PostCard from "@/components/modules/home/postCard/PostCard";
import PostCategory from "@/components/modules/home/PostCategory";
import SidebarFollow from "@/components/modules/home/SidebarFollow";
import SidebarProfile from "@/components/modules/home/SidebarProfile";
import { useUser } from "@/context/user.provider";
import React, { useState } from "react";
import CreatePostModal from "./posts/_components/CreatePostModal";

const HomePage = () => {
  const { user: findUser, isLoading: userLoading } = useUser();
  const [controlCategoryTab, setControlCategoryTab] = useState<
    string | string[]
  >("0");
  return (
    <div
      className={`grid ${
        findUser
          ? "grid-cols-1 lg:grid-cols-[250px_auto_250px]"
          : "grid-cols-1 lg:grid-cols-[250px_auto_250px]"
      } gap-6 relative`}
    >
      <SidebarProfile
        findUser={findUser}
        controlCategoryTab={controlCategoryTab}
        setControlCategoryTab={setControlCategoryTab}
      />
      <div>
        {findUser && findUser?.role === "user" && (
          <div className="border rounded-lg p-6">
            <CreatePostModal />
          </div>
        )}
        <div
          className={`block lg:hidden ${
            findUser && findUser?.role === "user" ? "mt-6 mb-0" : "mt-0 mb-6"
          }`}
        >
          <PostCategory
            controlCategoryTab={controlCategoryTab}
            setControlCategoryTab={setControlCategoryTab}
          />
        </div>
        <div
          className={`${
            findUser && findUser?.role === "user" ? "mt-6" : "mt-0"
          } flex flex-col gap-6`}
        >
          <PostCard
            controlCategoryTab={controlCategoryTab}
            userLoading={userLoading}
            findUser={findUser}
          />
        </div>
      </div>
      <SidebarFollow findUser={findUser} />
    </div>
  );
};

export default HomePage;
