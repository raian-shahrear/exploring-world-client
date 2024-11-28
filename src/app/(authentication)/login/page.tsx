import Link from "next/link";
import LoginForm from "./_components/LoginForm";
import { FaLongArrowAltLeft } from "react-icons/fa";

export const metadata = {
  title: "Exploring World - Login",
  description:
    "Login first to explore the world and connect with other travelers.",
  keywords: "login",
};

const Login = () => {
  return (
    <div className="container mx-auto px-4 lg:px-10 xxl:px-0 py-20 min-h-screen flex justify-center items-center">
      <div className="w-full sm:w-8/12 lg:w-6/12 xl:w-4/12 mx-auto">
        <div className="text-center mb-6">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 text-sm text-blue-600 font-bold mb-2 transition-all duration-300 hover:text-gray-900"
          >
            <FaLongArrowAltLeft />
            <span>Home</span>
          </Link>
          <h1 className="text-3xl font-bold mb-2">Exploring World</h1>
          <p className="font-medium">
            Login first to explore the world and connect with other travelers.
          </p>
        </div>
        <div className="p-5 md:p-8 shadow-xl rounded-md bg-gray-100 text-gray-900">
          <p className="font-bold text-2xl text-center mb-8">Login</p>
          <LoginForm />
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
