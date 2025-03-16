import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-blue-600 text-white shadow-lg relative z-50">
      <nav className="container mx-auto flex justify-between items-center p-4">
        {/* Logo / Website Name */}
        <h1 className="text-xl font-bold">My Website</h1>

        {/* Desktop Navigation */}
        <ul className="hidden sm:flex space-x-6">
          <li><Link to="/" className="hover:text-gray-300">Home</Link></li>
          <li><Link to="/about" className="hover:text-gray-300">About</Link></li>
          <li><Link to="/contact" className="hover:text-gray-300">Contact</Link></li>
        </ul>

        {/* Desktop Logout Button */}
        <Link to="/login" className="hover:text-gray-300 hidden sm:block">
          Logout
        </Link>

        {/* Mobile Menu Button */}
        <button className="sm:hidden" onClick={() => setIsOpen(true)}>
          <Menu size={28} />
        </button>
      </nav>

      {/* Mobile Menu (Minimal Width) */}
      <div
        className={`fixed top-0 right-0 h-auto w-48 bg-blue-200  text-white shadow-lg 
        transition-transform duration-300 transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } sm:hidden p-5 z-50`}
      >
        {/* Close Button */}
        <button className="absolute top-4 right-4" onClick={() => setIsOpen(false)}>
          <X size={24} />
        </button>

        {/* Menu Title */}
        <h2 className="text-lg font-bold text-center mb-4">Menu</h2>

        {/* Navigation Links with Line Breaks */}
        <ul className="flex flex-col space-y-4 text-lg">
          <li><Link to="/" className="block" onClick={() => setIsOpen(false)}>Home</Link></li>
          <hr className="border-gray-400" />
          <li><Link to="/about" className="block" onClick={() => setIsOpen(false)}>About</Link></li>
          <hr className="border-gray-400" />
          <li><Link to="/contact" className="block" onClick={() => setIsOpen(false)}>Contact</Link></li>
          <hr className="border-gray-400" />
          <li><Link to="/login" className="block" onClick={() => setIsOpen(false)}>Logout</Link></li>
        </ul>
      </div>

      {/* Overlay to close menu when clicking outside */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-40 sm:hidden z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </header>
  );
};

export default Header;
