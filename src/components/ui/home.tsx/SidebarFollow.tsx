import Image from "next/image";
import userAvatar from "@/assets/icons/user-avatar-black.png";
import Link from "next/link";

const SidebarFollow = () => {
  return (
    <div className="bg-gray-50 h-[85vh] rounded-lg p-6 shadow-lg sticky top-[100px] overflow-auto hidden lg:block">
      <div>
        <p className="text-sm font-semibold">Following: 3</p>
        <div className="mt-2 flex flex-col gap-1">
          <Link href="/profile/following/1/posts" className="grid grid-cols-[24px_auto] items-center gap-1">
            <Image
              src={userAvatar}
              alt="user"
              width={24}
              height={24}
              className="rounded-full border w-6 h-6"
            />
            <p className="text-xs font-semibold text-ellipsis whitespace-nowrap overflow-hidden">User Name</p>
          </Link>
          <Link href="/profile/following/1/posts" className="grid grid-cols-[24px_auto] items-center gap-1">
            <Image
              src={userAvatar}
              alt="user"
              width={24}
              height={24}
              className="rounded-full border w-6 h-6"
            />
            <p className="text-xs font-semibold text-ellipsis whitespace-nowrap overflow-hidden">User Name</p>
          </Link>
          <Link href="/profile/following/1/posts" className="grid grid-cols-[24px_auto] items-center gap-1">
            <Image
              src={userAvatar}
              alt="user"
              width={24}
              height={24}
              className="rounded-full border w-6 h-6"
            />
            <p className="text-xs font-semibold text-ellipsis whitespace-nowrap overflow-hidden">User Name</p>
          </Link>
        </div>
      </div>
      <div className=" mt-6">
        <p className="text-sm font-semibold">Followers: 3</p>
        <div className="mt-2 flex flex-col gap-1">
          <Link href="/profile/follower/1/posts" className="grid grid-cols-[24px_auto] items-center gap-1">
            <Image
              src={userAvatar}
              alt="user"
              width={24}
              height={24}
              className="rounded-full border w-6 h-6"
            />
            <p className="text-xs font-semibold text-ellipsis whitespace-nowrap overflow-hidden">User Name</p>
          </Link>
          <Link href="/profile/follower/1/posts" className="grid grid-cols-[24px_auto] items-center gap-1">
            <Image
              src={userAvatar}
              alt="user"
              width={24}
              height={24}
              className="rounded-full border w-6 h-6"
            />
            <p className="text-xs font-semibold text-ellipsis whitespace-nowrap overflow-hidden">User Name</p>
          </Link>
          <Link href="/profile/follower/1/posts" className="grid grid-cols-[24px_auto] items-center gap-1">
            <Image
              src={userAvatar}
              alt="user"
              width={24}
              height={24}
              className="rounded-full border w-6 h-6"
            />
            <p className="text-xs font-semibold text-ellipsis whitespace-nowrap overflow-hidden">User Name</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SidebarFollow;
