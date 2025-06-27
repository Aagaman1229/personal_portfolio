import React, { useState, useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import '../styles/App.css';

function Theme({ setTheme, theme }) {  // Accept theme and setTheme as props
  // Step 1: Initialize theme based on localStorage (or default to light)
  useEffect(() => {
    document.body.className = theme + "-theme"; // Set the body class to reflect the theme
    localStorage.setItem("theme", theme); // Store the theme in localStorage
  }, [theme]);

  // Step 2: Toggle theme when clicked
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark"); // Toggle between dark and light themes
  };
  console.log("Current theme:", theme);

  // Step 3: Show the correct icon (sun for dark mode and moon for light mode)
  return (
    <div className="theme-toggle" onClick={toggleTheme}>
      {theme === "dark" ? <FaSun className="icon"/> : <FaMoon className="icon"/>}
    </div>
  );
}

export default Theme;
