import React from 'react';
import ThemeToggle from './ThemeToggle';

export default function Header({ navigateTo }) {
  return (
    <header className="fixed top-0 left-0 right-0 p-8 flex justify-between items-start z-40 border-b-[0.5px] border-stone-300/50 dark:border-stone-700/50 bg-[#FDFBF7]/80 dark:bg-slate-900/80 backdrop-blur-md pointer-events-none transition-colors duration-700">
      
      <div 
        className="pointer-events-auto cursor-pointer flex flex-col items-start select-none" 
        onClick={() => navigateTo('home')}
      >
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-[#5c4a3d] dark:text-[#a8907b] text-6xl font-bold leading-none -mt-2 transition-colors duration-700">;</span>
          <h1 className="text-5xl font-bold tracking-wide text-[#5c4a3d] dark:text-[#a8907b] leading-none font-['Tinos'] transition-colors duration-700">
            נקודה פסיק
          </h1>
        </div>
        <p className="text-xl opacity-80 tracking-wide text-[#5c4a3d] dark:text-[#a8907b] font-['Tinos'] transition-colors duration-700">
          החיים שבין קוד, מספרים ומילים
        </p>
      </div>

      <div className="pointer-events-auto mt-2">
        <ThemeToggle />
      </div>
      
    </header>
  );
}