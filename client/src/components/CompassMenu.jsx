import React, { useState, useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import { categories } from '../data/dummyData';

export default function CompassMenu({ navigateTo, currentPage, activeCategory, setActiveCategory }) {
  const [isOpen, setIsOpen] = useState(false);
  const { isDark } = useContext(ThemeContext);

  return (
    <div className="fixed bottom-8 left-8 z-50 flex flex-col-reverse items-start gap-4">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-14 h-14 rounded-full flex items-center justify-center focus:outline-none group cursor-pointer"
      >
        <div className={`absolute inset-0 rounded-full border-[0.5px] transition-all duration-500 ${isDark ? 'border-stone-600' : 'border-stone-300'} ${isOpen ? 'scale-125 opacity-0' : 'scale-100 opacity-100'}`}></div>
        <div className={`absolute inset-2 rounded-full border-[0.5px] transition-all duration-500 ${isDark ? 'border-stone-500' : 'border-stone-400'} ${isOpen ? 'scale-150 opacity-0' : 'scale-100 opacity-100'}`}></div>
        <div className={`w-2 h-2 rounded-full transition-all duration-300 ${isDark ? 'bg-stone-300' : 'bg-stone-600'} ${isOpen ? 'scale-50' : 'scale-100'}`}></div>
        <div className={`absolute inset-0 rounded-full blur-md scale-50 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-700 -z-10 ${isDark ? 'bg-cyan-900/50' : 'bg-cyan-100/50'}`}></div>
      </button>

      <nav className={`flex flex-col w-36 transition-all duration-500 origin-bottom-left ${isOpen ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto' : 'opacity-0 translate-y-10 scale-90 pointer-events-none'}`}>
        <button 
          onClick={() => { navigateTo('home'); setIsOpen(false); }} 
          className={`text-right py-2 text-lg border-b-[0.5px] transition-all duration-300 focus:outline-none flex items-center justify-between cursor-pointer ${currentPage === 'home' ? (isDark ? 'border-cyan-700/50 text-cyan-200' : 'border-cyan-300/50 text-cyan-800') : (isDark ? 'border-slate-700 text-stone-400 hover:text-stone-200' : 'border-stone-300 text-stone-500 hover:text-stone-800')}`}
        >
          <span>בית</span>
        </button>
        <button 
          onClick={() => { navigateTo('about'); setIsOpen(false); }} 
          className={`text-right py-2 text-lg border-b-[0.5px] transition-all duration-300 focus:outline-none flex items-center justify-between cursor-pointer ${currentPage === 'about' ? (isDark ? 'border-cyan-700/50 text-cyan-200' : 'border-cyan-300/50 text-cyan-800') : (isDark ? 'border-slate-700 text-stone-400 hover:text-stone-200' : 'border-stone-300 text-stone-500 hover:text-stone-800')}`}
        >
          <span>אודות</span>
        </button>
        
        {/* קטגוריות זמינות תמיד */}
        <div className="flex flex-col mt-3 pl-2">
          {categories.map((cat, index) => (
            <button 
              key={cat}
              onClick={() => { navigateTo('home'); setActiveCategory(cat); setIsOpen(false); }}
              className={`text-right py-1.5 transition-all duration-300 focus:outline-none flex items-center justify-between text-base cursor-pointer ${index !== categories.length - 1 ? 'border-b-[0.5px] border-stone-200/40 dark:border-slate-700/40' : ''} ${activeCategory === cat ? (isDark ? 'text-cyan-300' : 'text-cyan-700') : (isDark ? 'text-stone-500 hover:text-stone-300' : 'text-stone-400 hover:text-stone-600')}`}
            >
              <span>{cat}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}