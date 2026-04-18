import React from "react";
import { FaMoon, FaSun } from "react-icons/fa";

const ThemeToggle = ({ theme, toggleTheme }) => {
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={toggleTheme}
        className="bg-white/90 backdrop-blur-md border border-gray-200 p-3 rounded-full shadow-lg hover:scale-105 transition"
      >
        {theme === "light" ? (
          <FaMoon className="text-gray-700" />
        ) : (
          <FaSun className="text-yellow-500" />
        )}
      </button>
    </div>
  );
};

export default ThemeToggle;