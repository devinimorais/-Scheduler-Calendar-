import React from "react";
import Background from "../../assets/img/background.jpg";

const Login: React.FC = () => {
  return (
    <div
      className="relative flex items-center justify-center min-h-screen bg-cover bg-center px-4 sm:px-0"
      style={{ backgroundImage: `url(${Background})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Login form */}
      <div className="relative bg-black/25 border border-white backdrop-blur-md p-6 rounded-lg shadow-[0_8px_30px_rgba(0,0,0,0.4)] max-w-sm w-full z-10">
        <div className="flex justify-center mb-4">
          <div className="bg-[#313e22] p-4 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
        </div>
        <form>
          {/* Email input */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm text-white font-medium mb-2"
            >
              Email ID
            </label>
            <div className="flex items-center border border-white rounded-md focus-within:ring-2 focus-within:ring-[#313e22]">
              <div className="p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 12H8m8 0H8m8 0H8M21 12c0 7.732-12 7.732-12 0 0-3.866 4-7 6-7s6 3.134 6 7zm-6-5a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 focus:outline-none text-white bg-transparent"
              />
            </div>
          </div>

          {/* Password input */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm text-white font-medium mb-2"
            >
              Password
            </label>
            <div className="flex items-center border border-white rounded-md focus-within:ring-2 focus-within:ring-[#313e22]">
              <div className="p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 17v1m-3 4h6a2 2 0 002-2v-4m4-4h-4V7a4 4 0 00-8 0v4H4m4 0a2 2 0 100 4h8a2 2 0 100-4z"
                  />
                </svg>
              </div>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 focus:outline-none text-white bg-transparent"
              />
            </div>
          </div>

          {/* Remember me and forgot password */}
          <div className="flex items-center justify-end mb-4">
            <a href="#" className="text-sm text-white hover:underline">
              Forgot Password?
            </a>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full bg-white text-black py-2 px-4 rounded-md hover:bg-green-800 transition-colors"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
