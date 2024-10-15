"use client";
import { useUser } from "@/context/user.provider";
import Image from "next/image";
import userAvatar from "@/assets/icons/user-avatar-black.png";
import { FaCheckCircle } from "react-icons/fa";

const SidebarProfile = () => {
  const { user } = useUser();
  return (
    <div className="h-fit lg:h-[85vh] bg-gray-50 rounded-lg p-6 md:sticky top-[100px] shadow-lg flex items-start md:block gap-4 md:gap-0">
      <div>
        <Image
          src={user?.userProfile ? user?.userProfile : userAvatar}
          alt="user"
          width={64}
          height={64}
          className="w-[100px] md:w-full md:h-[150px] md:mx-auto object-cover object-top border"
        />
      </div>
      <div className="md:mt-4">
        <p className="text-sm font-semibold mb-2">
          <span>User Name</span>
          <span className="text-success text-[10px] font-normal flex items-center gap-1">
            <FaCheckCircle /> Verified
          </span>
        </p>
        <p className="text-xs font-semibold text-ellipsis whitespace-nowrap overflow-hidden mb-1">
          username@gmail.com
        </p>
        <p className="text-xs font-semibold mb-1">Following: 0</p>
        <p className="text-xs font-semibold">Follower: 0</p>
      </div>
    </div>
  );
};

export default SidebarProfile;
