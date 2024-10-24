/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useRegistration } from "@/hooks/auth.hook";
import { getImageUrl } from "@/utils/getImageUrl";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { toast } from "sonner";

const Register = () => {
  const { mutate: handleRegistration, isPending } = useRegistration();
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
        const imageUrl = await getImageUrl.getSingleImageUrl(data.profile[0]);
        const newUser = {
          name: data.name,
          email: data.email,
          password: data.password,
          phone: data.phone,
          address: data.address,
          profile: imageUrl,
        };
        handleRegistration(newUser);
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
  }, [isPending]);
  if (isPending) {
    return (
      <div className="absolute top-2/4 left-2/4">
        <span className="loading loading-infinity w-20"></span>
      </div>
    );
  }
  return (
    <div className="container mx-auto px-4 lg:px-10 xxl:px-0 py-20 min-h-screen flex justify-center items-center">
      <div className="w-full">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold mb-2">Exploring World</h1>
          <p className="font-medium">
            Open an account to explore the world and connect with other
            travelers.
          </p>
        </div>
        <div className="w-full sm:w-8/12 lg:w-6/12 xl:w-4/12 mx-auto p-5 md:p-8 shadow-xl rounded-md bg-gray-100 text-gray-900">
          <p className="font-bold text-2xl text-center mb-8">Sign Up</p>
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
                          message:
                            "Password must be at least 6 characters long",
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
              className="btn btn-neutral btn-sm w-fit h-fit text-sm py-2 px-4 rounded flex items-center gap-1"
            >
              Sign Up
            </button>
          </form>
          <p className="mt-4 text-xs font-medium text-center">
            <span>Already have an account? Please </span>
            <Link
              href="/login"
              className="text-blue-600 transition-all duration-300 hover:text-gray-900 hover:underline"
            >
              login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
