import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isHomePage = location.pathname === "/home";

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
        isHomePage ? "bg-transparent text-white" : "bg-black text-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            onClick={() => navigate("/")}
            className="flex-shrink-0 text-2xl font-bold cursor-pointer tracking-widest hover:text-gray-300"
          >
            Agendador
          </div>

          {/* Mobile Menu Button */}
          <div className="block md:hidden">
            <button
              type="button"
              className="focus:outline-none"
              aria-expanded={isMenuOpen ? "true" : "false"}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <FaTimes className="h-6 w-6 hover:text-gray-300" />
              ) : (
                <FaBars className="h-6 w-6 hover:text-gray-300" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMenuOpen(false)}
      ></div>

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-black text-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col space-y-6 p-6">
          {/* Close Drawer Button */}
          <div className="flex justify-between items-center pb-4 border-b border-gray-700">
            <span className="text-xl font-semibold">Menu</span>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="text-white hover:text-gray-300"
            >
              <FaTimes className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
