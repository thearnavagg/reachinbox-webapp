import React, { useState, useEffect } from "react";

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 transition duration-300 rounded-full focus:outline-none"
    >
      {!darkMode ? (
        <span className="text-yellow-500">🌙</span>
      ) : (
        <span className="text-blue-500">☀️</span>
      )}
    </button>
  );
};

export default DarkModeToggle;
