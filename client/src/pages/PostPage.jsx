import React, { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import useSecureContent from '../hooks/useSecureContent';

export default function PostPage({ navigateTo }) {
  const { isDark } = useContext(ThemeContext);
  useSecureContent(); 

  return (
<article className="max-w-2xl mx-auto px-6 pt-44 pb-32 min-h-screen secure-text-area">
          
      {/* כותרת הפוסט */}
      <header className="mb-16 text-center mt-8">
        <div className="text-sm tracking-widest uppercase opacity-60 mb-6 font-mono">
          קוד // 3 דקות קריאה
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-8 leading-tight text-[#5c4a3d] dark:text-[#a8907b] font-['Tinos']">
          מאחורי הקלעים של ניהול זיכרון
        </h1>
        <div className={`h-[0.5px] w-24 mx-auto ${isDark ? 'bg-stone-700' : 'bg-stone-300'}`}></div>
      </header>

      {/* תוכן הפוסט */}
      <div className={`prose prose-lg mx-auto ${isDark ? 'prose-invert prose-stone' : 'prose-stone'} font-light leading-loose text-xl`}>
        <p>
          כשהתחלתי לבנות את פרויקט האסמבלר ב-C, הבנתי שפוינטרים הם קצת כמו שירה - דורשים דיוק מוחלט כדי לא ללכת לאיבוד.
        </p>
        
        <div className={`my-12 p-8 rounded-sm border-[0.5px] dir-ltr text-left font-mono text-sm ${isDark ? 'border-cyan-900/30 bg-slate-800/50 text-cyan-100' : 'border-cyan-200/50 bg-stone-100/50 text-cyan-900'}`}>
          <code>
            {'int *ptr = malloc(sizeof(int));\nif (ptr == NULL) {\n  return ERROR;\n}'}
          </code>
        </div>
        
        <p>
          יש משהו כמעט מדיטטיבי בלתפוס חתיכת זיכרון וירטואלי ולהגיד "זה שלי עכשיו". עד הרגע ששוכחים לשחרר אותו, ואז המחשב מזכיר לך מי באמת שולט פה.
        </p>
      </div>

      <div className="mt-32 pt-12 border-t-[0.5px] border-stone-200 dark:border-stone-800 text-center">
        <button 
          onClick={() => navigateTo('home')}
          className="text-lg opacity-60 hover:opacity-100 transition-opacity focus:outline-none"
        >
          חזרה למחשבות //
        </button>
      </div>
    </article>
  );
}