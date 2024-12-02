import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: "Início", path: "/home" },
    { name: "Serviços", path: "/services" },
    { name: "Profissionais", path: "/professionals" },
    { name: "Login", path: "/login" },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const isHomePage = location.pathname === "/home";

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 ${
        isHomePage
          ? "bg-transparent text-white"
          : "bg-white text-black shadow-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div
            onClick={() => handleNavigation("/home")}
            className="flex-shrink-0 text-lg md:text-xl lg:text-2xl font-bold cursor-pointer"
          >
            Agendador
          </div>
          <div className="hidden md:flex space-x-6">
            {menuItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavigation(item.path)}
                className={`relative px-4 py-2 font-medium ${
                  isHomePage
                    ? "text-white hover:text-yellow-300"
                    : "text-black hover:text-black"
                } group`}
              >
                {item.name}
                <span
                  className={`absolute bottom-0 left-1/2 w-0 h-1 ${
                    isHomePage ? "bg-yellow-300" : "bg-black"
                  } transition-all duration-300 group-hover:left-0 group-hover:w-full`}
                ></span>
              </button>
            ))}
          </div>
          <div className="block md:hidden">
            <button
              type="button"
              className={`focus:outline-none ${
                isHomePage
                  ? "text-white hover:text-yellow-300"
                  : "text-black hover:text-blue-500"
              }`}
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
        </div>
      </div>
      {isMenuOpen && (
        <div
          className={`fixed inset-0 ${
            isHomePage ? "bg-black bg-opacity-50" : "bg-gray-800 bg-opacity-50"
          } z-40 transition-transform duration-300 md:hidden`}
          onClick={() => setIsMenuOpen(false)}
        >
          <div
            className={`fixed top-0 right-0 h-full ${
              isHomePage ? "bg-black text-white" : "bg-white text-black"
            } w-64 p-6 transform transition-transform duration-300 ${
              isMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex flex-col space-y-4">
              {menuItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item.path)}
                  className={`relative text-lg ${
                    isHomePage
                      ? "text-white hover:text-yellow-300"
                      : "text-black hover:text-blue-500"
                  } group`}
                >
                  {item.name}
                  <span
                    className={`absolute bottom-0 left-1/2 w-0 h-1 ${
                      isHomePage ? "bg-yellow-300" : "bg-blue-500"
                    } transition-all duration-300 group-hover:left-0 group-hover:w-full`}
                  ></span>
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
