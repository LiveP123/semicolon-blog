import React, { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import { dummyPosts } from '../data/dummyData';

const renderCategoryIcon = (category) => {
  switch (category) {
    case 'קוד': return '< >';
    case 'מתמטיקה': return '∫';
    case 'שירה': return '~';
    default: return '•';
  }
};

export default function Home({ navigateTo, activeCategory }) {
  const { isDark } = useContext(ThemeContext);
  
  const filteredPosts = activeCategory === 'הכל' 
    ? dummyPosts 
    : dummyPosts.filter(p => p.category === activeCategory);

  return (
    <div className="max-w-3xl mx-auto px-6 py-32 min-h-screen pb-40">
      
      {/* אזור הפתיחה (Hero) - נותן נפח לעמוד כשהוא נטען */}
      {activeCategory === 'הכל' && (
        <div className="mb-24 mt-8 animate-fade-in">
          <h2 className="text-2xl font-light mb-6 opacity-70">ברוכות הבאות,</h2>
          <p className="text-3xl sm:text-4xl leading-relaxed font-light">
            כאן אני אוספת את המחשבות שלי על <span className="font-bold opacity-90">קוד</span>, משרטטת תובנות של <span className="font-bold opacity-90">מתמטיקה</span>, ומוצאת את השקט שבין לבין.
          </p>
        </div>
      )}

      {/* אזור הפוסטים */}
      <div className="flex flex-col gap-12 sm:gap-0 sm:flex-col sm:overflow-visible overflow-x-auto snap-x snap-mandatory flex-row pb-8 scrollbar-hide">
        {filteredPosts.map((post) => (
          <button 
            key={post.id}
            onClick={() => navigateTo('post')}
            className={`min-w-[85vw] sm:min-w-0 snap-center text-right group py-10 transition-all duration-500 focus:outline-none relative border-b-[0.5px] ${isDark ? 'border-stone-800/50 hover:border-transparent' : 'border-stone-200/50 hover:border-transparent'}`}
          >
            <div className={`absolute top-0 right-0 left-0 h-[0.5px] scale-x-0 group-hover:scale-x-100 origin-center transition-transform duration-700 ease-out ${isDark ? 'bg-stone-500' : 'bg-stone-300'}`}></div>
            <div className={`absolute bottom-0 right-0 left-0 h-[0.5px] scale-x-0 group-hover:scale-x-100 origin-center transition-transform duration-700 ease-out ${isDark ? 'bg-stone-500' : 'bg-stone-300'}`}></div>
            
            <div className="relative z-10 px-6">
              <div className="flex justify-between items-baseline mb-4">
                <h2 className="text-3xl font-light tracking-wide flex items-center transition-transform duration-500 group-hover:-translate-x-2">
                   {post.title}
                </h2>
                <div className="flex items-center opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-x-4 group-hover:translate-x-0">
                  <span className={`text-2xl font-serif mt-1 ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                    {renderCategoryIcon(post.category)}
                  </span>
                </div>
              </div>
              <p className={`text-lg font-light leading-relaxed mb-4 opacity-70 group-hover:opacity-100 transition-opacity duration-300 ${isDark ? 'text-stone-400' : 'text-stone-600'}`}>
                {post.excerpt}
              </p>
              <div className={`text-sm tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${isDark ? 'text-stone-600' : 'text-stone-300'}`}>
                {post.readTime}
              </div>
            </div>
          </button>
        ))}
        {filteredPosts.length === 0 && (
          <div className="text-center text-xl mt-20 opacity-50">
            עדיין לא כתבתי על זה...
          </div>
        )}
      </div>
    </div>
  );
}