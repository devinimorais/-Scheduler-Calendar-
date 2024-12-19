import React from "react";
import { FiUser } from "react-icons/fi";
import { BiSolidLockAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/Scheduledule");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Email"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Password"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-black font-semibold rounded-md hover:opacity-90 text-white"
          >
            Login
          </button>
        </form>
        <div className="text-center mt-4">
          <a
            href="#"
            className="text-sm text-blue-500 hover:underline"
          >
            Forgot Password?
          </a>
        </div>
        <div className="text-center mt-2">
          <p className="text-sm">
            Don’t have an account?{' '}
            <a
              href="#"
              className="text-blue-500 font-semibold hover:underline"
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
