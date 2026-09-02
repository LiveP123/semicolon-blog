import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // נעול על true (כהה) בטעינה הראשונית, מתעלם מזיכרון ישן של הדפדפן
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <ThemeContext.Provider value={{ isDark: isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};