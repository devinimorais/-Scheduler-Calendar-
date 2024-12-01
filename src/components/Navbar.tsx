import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { name: "Início", path: "/home" },
    { name: "Serviços", path: "/services" },
    { name: "Profissionais", path: "/professionals" },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div
            onClick={() => handleNavigation("/home")}
            className="flex-shrink-0 text-lg md:text-xl lg:text-2xl font-bold text-black cursor-pointer"
          >
            Agendador
          </div>
          <div className="block md:hidden">
            <button
              type="button"
              className="text-gray-600 hover:text-gray-800 focus:outline-none"
              aria-expanded={isMenuOpen ? "true" : "false"}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
          <div className="hidden md:flex space-x-6">
            {menuItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavigation(item.path)}
                className="px-4 py-2 font-medium text-gray-500 hover:text-gray-800"
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div
          className={`fixed inset-0 bg-gray-800 bg-opacity-50 z-10 transition-transform duration-300 md:hidden`}
          onClick={() => setIsMenuOpen(false)}
        >
          <div
            className={`fixed top-0 right-0 h-full bg-white w-64 p-6 shadow-lg transform transition-transform duration-300 ${
              isMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex flex-col space-y-4">
              {menuItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item.path)}
                  className="text-lg text-gray-800 hover:text-gray-500"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
