import React from "react";
import { RiLockPasswordFill, RiUser3Fill, RiMailFill } from "react-icons/ri";

const Login: React.FC = () => {
  return (
    <div
      className="relative flex items-center justify-center min-h-screen bg-gradient-to-b from-black to-blue-800 px-4 sm:px-0"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Login form */}
      <div className="relative bg-white border border-black backdrop-blur-md p-6 rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.8)] max-w-sm w-full z-10">
        <div className="flex justify-center mb-4">
          <div className="bg-[#0442c5] p-4 rounded-full">
            <RiUser3Fill className="h-8 w-8 text-white" />
          </div>
        </div>
        <form>
          {/* Email input */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm text-[#0442c5] font-medium mb-2"
            >
              Email ID
            </label>
            <div className="flex items-center border border-white rounded-md focus-within:ring-2 focus-within:ring-[#313e22]">
              <div className="p-2">
                <RiMailFill className="h-6 w-6 text-[#0442c5]" />
              </div>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 focus:outline-none text-black bg-transparent"
              />
            </div>
          </div>

          {/* Password input */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm text-[#0442c5] font-medium mb-2"
            >
              Password
            </label>
            <div className="flex items-center border border-white rounded-md focus-within:ring-2 focus-within:ring-[#313e22]">
              <div className="p-2">
                <RiLockPasswordFill className="h-6 w-6 text-[#0442c5]" />
              </div>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 focus:outline-none text-black bg-transparent"
              />
            </div>
          </div>

          {/* Remember me and forgot password */}
          <div className="flex items-center justify-end mb-4">
            <a href="#" className="text-sm text-[#0442c5] hover:underline">
              Forgot Password?
            </a>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full bg-[#0442c5] text-white py-2 px-4 rounded-md hover:bg-[#96cafb] transition-colors"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
