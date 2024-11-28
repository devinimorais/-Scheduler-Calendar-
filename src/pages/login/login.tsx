import React from "react";
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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#212121] to-[#212121] px-4 sm:px-0">
      <div className="relative bg-[#212121] text-white rounded-lg p-8 shadow-[inset_2px_2px_10px_rgba(0,0,0,1),inset_-1px_-1px_5px_rgba(255,255,255,0.6)] max-w-sm w-full">
        <div className="text-center text-2xl font-bold mb-6">Login</div>
        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          <div className="flex items-center bg-[#212121] border border-[#212121] rounded-md shadow-[6px_6px_10px_rgba(0,0,0,1),1px_1px_10px_rgba(255,255,255,0.6)] focus-within:shadow-[inset_2px_2px_10px_rgba(0,0,0,1),inset_-1px_-1px_5px_rgba(255,255,255,0.6)]">
            <FiUser className="text-white mx-3" size={20} />
            <input
              type="text"
              placeholder="Username"
              className="w-full h-12 bg-transparent border-none outline-none text-white placeholder-gray-400"
            />
          </div>
          <div className="flex items-center bg-[#212121] border border-[#212121] rounded-md shadow-[6px_6px_10px_rgba(0,0,0,1),1px_1px_10px_rgba(255,255,255,0.6)] focus-within:shadow-[inset_2px_2px_10px_rgba(0,0,0,1),inset_-1px_-1px_5px_rgba(255,255,255,0.6)]">
            <BiSolidLockAlt className="text-white mx-3" size={20} />
            <input
              type="password"
              placeholder="Password"
              className="w-full h-12 bg-transparent border-none outline-none text-white placeholder-gray-400"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-[#212121] border border-[#212121] rounded-md text-white font-semibold shadow-[6px_6px_10px_rgba(0,0,0,1),1px_1px_10px_rgba(255,255,255,0.6)] hover:scale-105 focus:shadow-[inset_2px_2px_10px_rgba(0,0,0,1),inset_-1px_-1px_5px_rgba(255,255,255,0.6)]"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
