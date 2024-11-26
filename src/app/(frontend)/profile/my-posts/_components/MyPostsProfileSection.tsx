import VerifyUserModal from "@/components/ui/modal/VerifyUserModal";
import { Skeleton } from "@/components/ui/skeleton";
import { TUser } from "@/types";
import { FaCheckCircle } from "react-icons/fa";
import { IoWarningOutline } from "react-icons/io5";

type TProps = {
  userLoading: boolean;
  loggedInUser: TUser;
};

const MyPostsProfileSection = ({ userLoading, loggedInUser }: TProps) => {
  return (
    <>
      {userLoading ? (
        <div>
          <div className="w-[250px] mx-auto">
            <Skeleton className="w-[150px] h-[150px] mx-auto rounded-md" />
            <Skeleton className="w-[250px] mx-auto h-10 mt-2" />
            <Skeleton className="w-[250px] mx-auto h-10 mt-1" />
          </div>
          <div className="mt-10 w-8/12 mx-auto">
            <div className="border rounded-lg p-6">
              <div className="grid grid-cols-[40px_auto] items-center gap-4">
                <Skeleton className="rounded-full border w-9 h-9" />
                <Skeleton className="h-10 px-4 w-full border" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-[250px] mx-auto">
          <img
            src={loggedInUser?.profile}
            alt="user"
            width={150}
            height={150}
            className="w-[150px] h-[150px] mx-auto object-cover object-top border rounded-md"
          />
          <div className="text-center mt-2">
            <p className="flex justify-center mb-3">
              {loggedInUser?.isVerified === "verified" ? (
                <span className="text-green-600 text-[11px] font-medium flex items-center gap-1">
                  <FaCheckCircle /> Verified
                </span>
              ) : loggedInUser?.isVerified === "pending" ? (
                <VerifyUserModal />
              ) : (
                <span className="text-gray-500 text-[11px] font-medium flex justify-center items-center gap-1">
                  <IoWarningOutline /> Not Verified
                </span>
              )}
            </p>
            <p className="text-sm font-semibold mb-[2px]">
              {loggedInUser?.name}
            </p>
            <p className="text-xs">{loggedInUser?.email}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default MyPostsProfileSection;
