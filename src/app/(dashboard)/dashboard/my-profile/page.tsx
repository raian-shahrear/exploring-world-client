"use client";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/user.provider";
import { useUpdateUser } from "@/hooks/auth.hook";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { FaEdit, FaUserEdit } from "react-icons/fa";
import { toast } from "sonner";
import MyProfileLoader from "./_components/MyProfileLoader";
import CommonLoader from "@/components/ui/loading/CommonLoader";
import EmailEditModal from "./_components/EmailEditModal";
import PassChangeModal from "./_components/PassChangeModal";

const MyProfile = () => {
  const {
    user,
    isLoading: userLoading,
    setIsLoading: setUserLoading,
  } = useUser();
  const { mutate: handleUpdateUser, isPending: updateUserPending } =
    useUpdateUser();
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

  return (
    <div>
      <h1 className="text-xl font-bold mb-6">My Profile</h1>

      {updateUserPending ? (
        <div className="flex justify-center items-center h-[50vh]">
          <CommonLoader />
        </div>
      ) : (
        <div>
          {userLoading ? (
            <MyProfileLoader />
          ) : (
            <section className="shadow-lg rounded-lg border-t-4 w-full md:w-8/12 lg:w-6/12">
              <form onSubmit={handleSubmit} className="p-5">
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

              <div className="mt-4 flex items-center justify-center gap-2 bg-gray-900 p-2 rounded-bl-lg rounded-br-lg">
                <EmailEditModal user={user} setUserLoading={setUserLoading} />
                <span className="text-gray-500">|</span>
                <PassChangeModal user={user} setUserLoading={setUserLoading} />
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
};

export default MyProfile;
