import React, { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext.jsx';

export default function About() {
  const { isDark } = useContext(ThemeContext);

  const handleSendMessage = (e) => {
    e.preventDefault();
    alert("ההודעה נשמרה בהצלחה! היא תישלח באמת ברגע שנחבר את השרת.");
    e.target.reset();
  };

  return (
<div className="max-w-2xl mx-auto px-6 pt-44 pb-32 min-h-screen relative">
          <div className={`absolute top-0 right-0 w-64 h-64 border-r-[0.5px] border-t-[0.5px] opacity-20 -z-10 ${isDark ? 'border-stone-500' : 'border-stone-400'}`}>
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <pattern id="gridPatternSmall" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#gridPatternSmall)" />
        </svg>
      </div>

      <h1 className="text-5xl font-light mb-16">אודות</h1>
      
      <div className={`prose prose-lg ${isDark ? 'prose-invert prose-stone' : 'prose-stone'} font-light leading-loose text-xl`}>
        <p>
          שלום, אני חיה. החיים שלי נעים על הציר שבין סדר מוחלט לאמנות חופשית. 
        </p>
        <p>
          ביום-יום, אני מלהטטת בין לימודי מדעי המחשב באוניברסיטה הפתוחה – מפענחת לוגיקה בשפות כמו C וג'אווה, 
          ומשרטטת נוסחאות ליניאריות בעט גרפי – לבין ניהול הבית והתמרון האינסופי של גידול הילדים.
        </p>
        
        <div className={`my-12 relative p-8 -mx-8 sm:mx-0 sm:rounded-sm transition-all duration-700 ${isDark ? 'bg-cyan-950/20' : 'bg-cyan-50/50'}`}>
          <div className={`absolute inset-0 blur-2xl opacity-20 -z-10 ${isDark ? 'bg-cyan-500' : 'bg-cyan-300'}`}></div>
          <p className="m-0 text-2xl italic text-center">
            "אבל בין ההרצאות, מסכי הקוד ורעש החיים, יש את המרווחים השקטים שבהם נולדות מילים."
          </p>
        </div>

        <section className="mt-16">
          <h2 className="text-xl font-bold mb-6">יצירת קשר</h2>
          <form onSubmit={handleSendMessage} className="space-y-6">
            <div>
              <input
                type="text"
                placeholder="שם (אופציונלי)"
                className="w-full bg-transparent border-b border-stone-800 dark:border-stone-200 py-2 focus:outline-none opacity-80 focus:opacity-100 transition-opacity font-['Tinos']"
              />
            </div>
            <div>
              <textarea
                placeholder="מילים..."
                className="w-full bg-transparent border-b border-stone-800 dark:border-stone-200 py-2 focus:outline-none resize-none opacity-80 focus:opacity-100 transition-opacity font-['Tinos']"
                rows="3"
                required
              ></textarea>
            </div>
            <button 
              type="submit"
              className="text-sm border border-stone-800 dark:border-stone-200 px-6 py-2 hover:bg-stone-800 hover:text-stone-50 dark:hover:bg-stone-200 dark:hover:text-stone-900 transition-colors cursor-pointer font-['Tinos']"
            >
              שליחה
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}