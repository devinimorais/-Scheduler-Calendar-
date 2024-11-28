import React from "react";
import { RiUser3Fill } from "react-icons/ri";
import { FiUser } from "react-icons/fi";
import { BiSolidLockAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault(); // Previne o comportamento padrão de envio do formulário
    navigate("/Scheduledule"); // Redireciona para a rota "/Scheduledule"
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-b from-[#0e069d] to-[#74a8e6] px-4 sm:px-0">
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative bg-transparent p-6 rounded-lg max-w-sm w-full shadow-[0_30px_100px_rgba(0,0,0,0.7)]">
        <div className="flex justify-center mb-4">
          <div className="bg-[#0442c5] p-4 rounded-full">
            <RiUser3Fill className="h-8 w-8 text-white" />
          </div>
        </div>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block font-medium mb-2 text-white">
              Username
            </label>
            <div className="flex items-center border border-white rounded-xl focus-within:ring-2">
              <div className="p-2">
                <FiUser className="h-6 w-6 text-white" />
              </div>
              <input
                type="email"
                id="email"
                placeholder="username"
                className="w-full px-4 py-2 focus:outline-none bg-transparent"
              />
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-white font-medium mb-2"
            >
              Password
            </label>
            <div className="flex items-center border border-white rounded-xl focus-within:ring-2 focus-within:ring-[#313e22]">
              <div className="p-2">
                <BiSolidLockAlt className="h-6 w-6 text-white" />
              </div>
              <input
                type="password"
                id="password"
                placeholder="password"
                className="w-full px-4 py-2 focus:outline-none bg-transparent"
              />
            </div>
          </div>

          <div className="flex items-center justify-end mb-4">
            <a href="#" className="text-sm text-white hover:underline">
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full text-white py-2 px-6 rounded-[20px] bg-gradient-to-r from-[#0400ff] to-[#4ce3f7] bg-[length:100%_auto] transition-all duration-500 ease-in-out hover:bg-[length:200%_auto] hover:bg-right focus:outline-none shadow-lg animate-pulse512"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
