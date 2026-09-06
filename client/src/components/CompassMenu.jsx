import React, { useState } from 'react';
import { categories } from '../data/dummyData';

export default function CompassMenu({ activeCategory, setActiveCategory }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-8 left-8 md:bottom-12 md:left-16 z-50 flex flex-col items-center">
      
      <div 
        className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-8 transition-all duration-700 ease-out origin-bottom ${
          isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
        }`}
      >
        {/* קווים עגולים אבסטרקטיים וכתם מים בסגנון משיכת מכחול */}
        <div className="absolute inset-0 bg-[#c4a993]/15 dark:bg-[#a8907b]/15 blur-xl rounded-[40%_60%_70%_40%] scale-150 -z-10"></div>
        <div className="absolute inset-0 border-[1px] border-[#c4a993]/30 dark:border-[#a8907b]/30 rounded-[50%_70%_40%_60%] scale-125 -z-10 rotate-12"></div>
        <div className="absolute inset-0 border-[0.5px] border-cyan-500/20 dark:border-cyan-400/20 rounded-[70%_40%_60%_30%] scale-110 -z-10 -rotate-6"></div>

        {/* תפריט ללא מסגרת ורקע - מרחף על כתם המים */}
        <nav className="flex flex-col py-2 min-w-[150px] relative z-10">
          {categories.map((cat, index) => {
            const isActive = activeCategory === cat;
            return (
              <div key={cat} className="relative group/item flex flex-col items-center">
                <button
                  onClick={() => {
                    setActiveCategory(cat);
                    setIsOpen(false);
                  }}
                  className={`w-full text-center px-4 py-2 text-sm transition-all duration-300 ${
                    isActive 
                      ? 'font-medium text-[#5c4a3d] dark:text-[#e6dfd8] scale-105' 
                      : 'font-light text-stone-500/90 dark:text-stone-300/90 hover:text-[#c4a993] dark:hover:text-[#a8907b]'
                  }`}
                >
                  {cat}
                </button>
                
                {index !== categories.length - 1 && (
                  <div className="absolute bottom-0 w-0 h-[0.5px] bg-[#c4a993]/40 dark:bg-[#a8907b]/40 transition-all duration-500 ease-out group-hover/item:w-[50%]"></div>
                )}
              </div>
            );
          })}
        </nav>
      </div>

      <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 via-[#c4a993]/30 to-teal-400/20 dark:from-cyan-400/15 dark:via-[#a8907b]/20 dark:to-teal-300/15 blur-2xl rounded-full pointer-events-none transition-all duration-700 scale-150"></div>

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-14 h-14 flex items-center justify-center group cursor-pointer"
        aria-label="Menu"
      >
        {/* טבעת חיצונית */}
        <div className={`absolute inset-0 border-[0.5px] transition-all duration-1000 ease-in-out ${
          isOpen 
            ? 'border-[#c4a993] dark:border-[#a8907b] scale-110 rounded-full rotate-180' 
            : 'border-stone-400/60 dark:border-stone-500/60 rounded-[40%_60%_70%_30%] group-hover:border-[#c4a993] dark:group-hover:border-[#a8907b] group-hover:rotate-45 group-hover:scale-105'
        }`}></div>
        
        {/* טבעת פנימית 1 - מתכווצת ויוצרת מבנה מורכב בפתיחה */}
        <div className={`absolute inset-1.5 border-[0.5px] transition-all duration-1000 ease-in-out ${
          isOpen 
            ? 'border-[#c4a993]/80 dark:border-[#a8907b]/80 scale-[0.6] rounded-[60%_40%_70%_30%] rotate-90' 
            : 'border-stone-400/50 dark:border-stone-500/50 rounded-[60%_40%_30%_70%] group-hover:border-[#c4a993]/70 dark:group-hover:border-[#a8907b]/70 group-hover:-rotate-90'
        }`}></div>

        {/* טבעת פנימית 2 - מתכווצת ויוצרת מבנה מורכב בפתיחה */}
        <div className={`absolute inset-3 border-[0.5px] transition-all duration-1000 ease-in-out ${
          isOpen 
            ? 'border-[#c4a993]/60 dark:border-[#a8907b]/60 scale-75 rounded-[30%_70%_40%_60%] -rotate-45' 
            : 'border-stone-400/70 dark:border-stone-500/70 rounded-[50%_60%_40%_50%] group-hover:border-[#c4a993] dark:group-hover:border-[#a8907b] group-hover:rotate-180'
        }`}></div>
        
        {/* נקודת מרכז - זוהרת בפתיחה */}
        <div className={`w-1.5 h-1.5 transition-all duration-700 ${
          isOpen 
            ? 'bg-[#c4a993] dark:bg-[#a8907b] rounded-full scale-150 shadow-[0_0_8px_#c4a993]' 
            : 'bg-stone-500 dark:bg-stone-400 rounded-[40%_60%_60%_40%] group-hover:bg-[#c4a993] dark:group-hover:bg-[#a8907b]'
        }`}></div>
      </button>

    </div>
  );
}