"use client";
import CommonLoader from "@/components/ui/loading/CommonLoader";
import { useUser } from "@/context/user.provider";
import { useLogin } from "@/hooks/auth.hook";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { toast } from "sonner";

const Login = () => {
  const { setIsLoading: setUserLoading } = useUser();
  const { mutate: handleUserLogin, isPending } = useLogin();
  const [showPass, setShowPass] = useState(false);
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");
  const router = useRouter();
  const pathname = usePathname();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    reset,
  } = useForm();

  const handleLogin: SubmitHandler<FieldValues> = async (data) => {
    if (isValid || !isSubmitting) {
      try {
        const newLogin = {
          email: data.email,
          password: data.password,
        };
        handleUserLogin(newLogin);
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
      if (redirect) {
        router.push(redirect);
      } else if (pathname.match("/login")) {
        router.push("/login");
      } else {
        router.push("/");
      }
      setUserLoading(true);
    }
  }, [isPending, redirect]);

  if (isPending) {
    return (
      <div className="absolute top-2/4 left-2/4">
        <CommonLoader />
      </div>
    );
  }
  return (
    <div className="container mx-auto px-4 lg:px-10 xxl:px-0 py-20 min-h-screen flex justify-center items-center">
      <div className="w-full">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold mb-2">Exploring World</h1>
          <p className="font-medium">
            Login first to explore the world and connect with other travelers.
          </p>
        </div>
        <div className="w-full sm:w-8/12 lg:w-6/12 xl:w-4/12 mx-auto p-5 md:p-8 shadow-xl rounded-md bg-gray-100 text-gray-900">
          <p className="font-bold text-2xl text-center mb-8">Login</p>
          <form
            onSubmit={handleSubmit(handleLogin)}
            className="flex flex-col gap-8 items-center"
          >
            <div className="w-full grid grid-cols-1 gap-5">
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
                    {...register("password", { required: true })}
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
                    This field is required
                  </span>
                )}
              </div>
            </div>
            <button
              type="submit"
              className="bg-gray-900 text-white w-fit h-fit text-sm py-2 px-4 rounded flex items-center gap-1"
            >
              Login
            </button>
          </form>
          <p className="mt-4 text-xs font-medium text-center">
            <span>Do not have account? Please </span>
            <Link
              href="/register"
              className="text-blue-600 transition-all duration-300 hover:text-gray-900 hover:underline"
            >
              register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
