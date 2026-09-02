import React, { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useContext(ThemeContext);
  
  return (
    <button 
      onClick={toggleTheme} 
      className="relative w-14 h-14 flex items-center justify-center focus:outline-none group cursor-pointer"
      aria-label="Toggle Theme"
    >
      {/* עיגול ימני */}
      <div className={`absolute w-7 h-7 rounded-full border-2 transition-all duration-700 ease-in-out group-hover:shadow-[0_0_10px_rgba(255,255,255,0.2)] ${isDark ? 'border-cyan-400/80 translate-x-2' : 'border-stone-500/60 -translate-x-2'}`}></div>
      
      {/* עיגול שמאלי */}
      <div className={`absolute w-7 h-7 rounded-full border-2 transition-all duration-700 ease-in-out group-hover:shadow-[0_0_10px_rgba(255,255,255,0.2)] ${isDark ? 'border-stone-500/80 -translate-x-2' : 'border-cyan-600/80 translate-x-2'}`}></div>
    </button>
  );
}