import React, { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Toggle dark mode and persist preference
  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  // Load user's preference from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return (
    <div className="flex items-center space-x-4">
      <Sun className={`w-5 h-5 ${!isDarkMode ? "text-primary" : "text-muted"}`} />
      <button
        onClick={toggleDarkMode}
        className={`relative inline-flex items-center h-6 w-11 rounded-full ${
          isDarkMode ? "bg-primary" : "bg-muted"
        }`}
      >
        <span
          className={`transform transition-transform rounded-full h-4 w-4 bg-primary-foreground ${
            isDarkMode ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
      <Moon className={`w-5 h-5 ${isDarkMode ? "text-primary" : "text-muted"}`} />
    </div>
  );
};

export default DarkModeToggle;

