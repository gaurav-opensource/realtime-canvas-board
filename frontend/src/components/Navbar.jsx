import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleCreateRoom = () => {
    const roomId = Math.random().toString(36).substring(2, 8);
    navigate(`/room/${roomId}`);
  };

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center font-bold text-white">
            D
          </div>
          <h1 className="text-xl font-semibold text-white tracking-wide">
            DrawSync
          </h1>
        </div>

        {/* Menu */}
        <div className="hidden md:flex items-center gap-8 text-gray-300 font-medium">
          <a href="#about" className="hover:text-white transition">
            About
          </a>
          <a href="#features" className="hover:text-white transition">
            Features
          </a>
          <a href="#how" className="hover:text-white transition">
            How It Works
          </a>
        </div>

        {/* CTA Button */}
        <button
          onClick={handleCreateRoom}
          className="bg-gradient-to-r from-purple-500 to-blue-500 px-5 py-2 rounded-lg text-white font-medium hover:opacity-90 transition"
        >
          Create Room
        </button>
      </div>
    </nav>
  );
};

export default Navbar;