"use client";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/user.provider";
import {
  useGetAllUser,
  useUpdateUser,
  useUpdateUserCover,
} from "@/hooks/auth.hook";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { FaEdit, FaUserEdit } from "react-icons/fa";
import { toast } from "sonner";
import MyProfileLoader from "./_components/MyProfileLoader";
import CommonLoader from "@/components/ui/loading/CommonLoader";
import EmailEditModal from "./_components/EmailEditModal";
import PassChangeModal from "./_components/PassChangeModal";
import Image from "next/image";
import banner from "@/assets/dashboard/profile-cover.jpg";
import { Skeleton } from "@/components/ui/skeleton";
import { TUser } from "@/types";

const MyProfile = () => {
  const {
    user,
    isLoading: userLoading,
    setIsLoading: setUserLoading,
  } = useUser();
  const { data: allUsers } = useGetAllUser();
  const loggedInUser: TUser = allUsers?.data?.find(
    (info: TUser) => info?._id === user?.id
  );
  const { mutate: handleUpdateUser, isPending: updateUserPending } =
    useUpdateUser();
  const { mutate: handleUpdateUserCover, isPending: updateUserCoverPending } =
    useUpdateUserCover();
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (user?.userProfile) {
      setPreview(user?.userProfile);
    }
  }, [user]);

  // Update the preview image when a new file is selected
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;

    const profileInput = form.elements.namedItem(
      "profileImg"
    ) as HTMLInputElement;
    const profileFile = profileInput.files && profileInput.files[0];

    try {
      const formData = new FormData();
      if (profileFile) {
        formData.append("image", profileFile);
      }
      const updateUser = {
        name: (form.elements.namedItem("name") as HTMLInputElement).value,
        phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
        address: (form.elements.namedItem("address") as HTMLInputElement).value,
      };
      formData.append("data", JSON.stringify(updateUser));

      handleUpdateUser({ userId: user!.id, userData: formData });
    } catch (err: any) {
      toast.error(
        err?.data?.message ? err?.data?.message : "Something went wrong!"
      );
    }
  };

  const handleCoverImgChange = async (file: any) => {
    try {
      const formData = new FormData();
      if (file) {
        formData.append("image", file);
      }
      handleUpdateUserCover({ userId: user!.id, coverImg: formData });
    } catch (err: any) {
      toast.error(
        err?.data?.message ? err?.data?.message : "Something went wrong!"
      );
    }
  };

  return (
    <div>
      {updateUserCoverPending ? (
        <Skeleton className="mb-6 w-full md:w-10/12 lg:w-10/12 mx-auto h-[30vh] rounded-lg"></Skeleton>
      ) : (
        <div className="mb-6 relative w-full md:w-10/12 lg:w-10/12 mx-auto">
          <Image
            width={300}
            height={300}
            src={loggedInUser?.cover ? loggedInUser?.cover : banner}
            alt="banner"
            className="rounded-lg w-full h-[30vh] object-cover"
          />
          <div className="absolute top-5 right-5 text-lg text-gray-900 bg-gray-300 p-2 rounded-full cursor-pointer transition-all duration-300 hover:bg-gray-700 hover:text-gray-100">
            <input
              type="file"
              name="cover"
              id="coverImg"
              className="hidden"
              onChange={(e) => handleCoverImgChange(e.target.files?.[0])}
            />
            <label htmlFor="coverImg" className="cursor-pointer">
              <FaEdit />
            </label>
          </div>
        </div>
      )}

      {updateUserPending ? (
        <div className="flex justify-center items-center h-[50vh]">
          <CommonLoader />
        </div>
      ) : (
        <div>
          {userLoading ? (
            <MyProfileLoader />
          ) : (
            <section className="shadow-lg rounded-lg border-t-4 w-full md:w-10/12 lg:w-10/12 mx-auto md:flex md:gap-4">
              <form
                onSubmit={handleSubmit}
                className="p-5 w-full md:w-8/12 lg:w-8/12"
              >
                <div className="mb-2">
                  <input
                    type="file"
                    name="profileImg"
                    id="profileImg"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <label
                    htmlFor="profileImg"
                    className="inline-block relative cursor-pointer"
                  >
                    <img
                      src={preview}
                      alt="profile"
                      className="w-16 h-16 rounded-full border-2 border-gray-300 p-1 object-cover object-center"
                    />
                    <span className="text-gray-900 text-lg absolute top-0 right-0 bg-white">
                      <FaEdit />
                    </span>
                  </label>
                </div>
                <div className="flex flex-col gap-1">
                  <div>
                    <label className="text-xs font-semibold mb-1 inline-block">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      defaultValue={user?.userName}
                      className="border border-gray-300 w-full h-9 px-2 py-1 text-sm rounded-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold mb-1 inline-block">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      defaultValue={user?.userEmail}
                      className="border border-gray-300 w-full h-9 px-2 py-1 text-sm rounded-sm"
                      disabled
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold mb-1 inline-block">
                      Phone No.
                    </label>
                    <input
                      type="text"
                      name="phone"
                      defaultValue={user?.userPhone}
                      className="border border-gray-300 w-full h-9 px-2 py-1 text-sm rounded-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold mb-1 inline-block">
                      Address
                    </label>
                    <textarea
                      name="address"
                      defaultValue={user?.userAddress}
                      className="border border-gray-300 w-full min-h-20 px-2 py-1 text-sm rounded-sm"
                    ></textarea>
                  </div>
                </div>
                <div className="mt-4">
                  <Button
                    type="submit"
                    className="text-xs h-fit p-2 flex items-center gap-1"
                  >
                    <span className="text-sm">
                      <FaUserEdit />
                    </span>
                    <span>Update</span>
                  </Button>
                </div>
              </form>

              <div className="bg-gray-900 flex-1 flex flex-col justify-center items-center p-5 rounded-bl-lg md:rounded-bl-none md:rounded-tr-lg rounded-br-lg">
                <p className="text-center text-sm text-gray-100 mb-5">
                  Want to change your email or password ?
                </p>
                <div className="flex flex-row md:flex-col gap-3">
                  <EmailEditModal user={user} setUserLoading={setUserLoading} />
                  <PassChangeModal
                    user={user}
                    setUserLoading={setUserLoading}
                  />
                </div>
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
};

export default MyProfile;
