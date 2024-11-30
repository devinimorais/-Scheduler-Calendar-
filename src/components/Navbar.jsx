import React, { useState } from "react";

const Navbar = () => {
  const [activeItem, setActiveItem] = useState("Home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { name: "Home", href: "#" },
    { name: "Services", href: "#" },
    { name: "Products", href: "#" },
    { name: "Clients", href: "#" },
    { name: "Contact", href: "#" },
  ];

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo ou título */}
          <div className="flex-shrink-0 text-xl font-bold text-[#134647]">
            Agendador
          </div>

          {/* Hamburger menu for mobile */}
          <div className="block md:hidden">
            <button
              type="button"
              className="text-gray-600 hover:text-gray-800 focus:outline-none"
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

          {/* Menu items (desktop) */}
          <div className="hidden md:flex space-x-6">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setActiveItem(item.name)}
                className={`px-4 py-2 font-medium shadow-md transition duration-300 rounded-full ${
                  activeItem === item.name
                    ? "bg-[#134647] text-white"
                    : "text-gray-500 hover:text-gray-800"
                }`}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`fixed top-0 right-0 h-full bg-white shadow-lg z-30 w-64 transform transition-transform duration-300 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Close button */}
          <button
            type="button"
            className="p-4 text-gray-600 hover:text-gray-800 self-end"
            onClick={() => setIsMenuOpen(false)}
          >
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Menu items */}
          <div className="flex-grow flex flex-col items-start space-y-4 p-6">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => {
                  setActiveItem(item.name);
                  setIsMenuOpen(false); // Fecha o drawer ao clicar
                }}
                className={`w-full text-left px-4 py-2 font-medium shadow-md rounded-full transition duration-300 ${
                  activeItem === item.name
                    ? "bg-[#134647] text-white"
                    : "text-gray-500 hover:text-gray-800"
                }`}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Backdrop overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}
    </nav>
  );
};

export default Navbar;
