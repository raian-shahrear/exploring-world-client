"use client";
import CommonLoader from "@/components/ui/loading/CommonLoader";
import { useRegistration } from "@/hooks/auth.hook";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { toast } from "sonner";

const RegisterForm = () => {
  const {
    mutate: handleRegistration,
    isPending,
    data: registerData,
  } = useRegistration();
  const [showPass, setShowPass] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    reset,
  } = useForm();

  const handleSignup: SubmitHandler<FieldValues> = async (data) => {
    if (isValid || !isSubmitting) {
      try {
        const formData = new FormData();

        const newUser = {
          name: data.name,
          email: data.email,
          password: data.password,
          phone: data.phone,
          address: data.address,
        };

        formData.append("data", JSON.stringify(newUser));
        formData.append("image", data.profile[0]);

        handleRegistration(formData);
        reset();
      } catch (err: any) {
        toast.error(
          err?.data?.message ? err?.data?.message : "Something went wrong!"
        );
      }
    }
  };

  useEffect(() => {
    if (!isPending) {
      if (pathname.match("/register")) {
        router.push("/register");
      } else {
        router.push("/");
      }
    }

    if (registerData?.success) {
      router.push("/login");
    }
  }, [isPending, pathname, router, registerData]);

  return (
    <>
      {isPending ? (
        <div className="h-[20vh] flex justify-center items-center">
          <CommonLoader />
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(handleSignup)}
          className="flex flex-col gap-8 items-center"
        >
          <div className="w-full grid grid-cols-1 gap-5">
            <div className="w-full grid grid-cols-1 gap-5">
              <div>
                <label className="text-xs font-semibold mb-1 inline-block">
                  Full Name<span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  className="border border-gray-300 w-full h-9 px-2 py-1 text-sm rounded-sm"
                  placeholder="Enter name"
                  {...register("name", { required: true })}
                />
                {errors.name && (
                  <span className="text-xs text-red-600 mt-[2px] inline-block">
                    This field is required
                  </span>
                )}
              </div>
              <div>
                <label className="text-xs font-semibold mb-1 inline-block">
                  Email<span className="text-red-600">*</span>
                </label>
                <input
                  type="email"
                  className="border border-gray-300 w-full h-9 px-2 py-1 text-sm rounded-sm"
                  placeholder="Enter email"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <span className="text-xs text-red-600 mt-[2px] inline-block">
                    This field is required
                  </span>
                )}
              </div>
              <div>
                <label className="text-xs font-semibold mb-1 inline-block">
                  Password<span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPass ? "text" : "password"}
                    className="border border-gray-300 w-full h-9 pl-2 pr-8 py-1 text-sm rounded-sm"
                    placeholder="Enter password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters long",
                      },
                    })}
                  />
                  <span
                    className="cursor-pointer text-lg absolute top-[9px] right-2"
                    onClick={() => setShowPass(!showPass)}
                  >
                    {showPass ? <IoMdEye /> : <IoMdEyeOff />}
                  </span>
                </div>
                {errors.password && (
                  <span className="text-xs text-red-600 mt-[2px] inline-block">
                    {(errors as any).password?.message}
                  </span>
                )}
              </div>
              <div>
                <label className="text-xs font-semibold mb-1 inline-block">
                  Phone No.<span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  className="border border-gray-300 w-full h-9 px-2 py-1 text-sm rounded-sm"
                  placeholder="Enter phone"
                  {...register("phone", { required: true })}
                />
                {errors.phone && (
                  <span className="text-xs text-red-600 mt-[2px] inline-block">
                    This field is required
                  </span>
                )}
              </div>
              <div>
                <label className="text-xs font-semibold mb-1 inline-block">
                  User Image<span className="text-red-600">*</span>
                </label>
                <input
                  type="file"
                  className="border border-gray-300 w-full h-9 px-2 py-1 text-sm rounded-sm"
                  {...register("profile", { required: true })}
                />
                {errors.profile && (
                  <span className="text-xs text-red-600 mt-[2px] inline-block">
                    This field is required
                  </span>
                )}
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold mb-1 inline-block">
                Address<span className="text-red-600">*</span>
              </label>
              <textarea
                placeholder="Enter address"
                className="border border-gray-300 w-full min-h-20 px-2 py-1 text-sm rounded-sm"
                {...register("address", { required: true })}
              ></textarea>
              {errors.address && (
                <span className="text-xs text-red-600 mt-[2px] inline-block">
                  This field is required
                </span>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="bg-gray-900 text-white w-fit h-fit text-sm py-2 px-4 rounded flex items-center gap-1"
          >
            Sign Up
          </button>
        </form>
      )}
    </>
  );
};

export default RegisterForm;
