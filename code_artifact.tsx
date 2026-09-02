import React, { useState, useEffect, createContext, useContext } from 'react';

// ==========================================
// 1. הגדרות תשתית (Context & Hooks)
// ==========================================

// Context לניהול תאורה
const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <ThemeContext.Provider value={{ isDark: isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook למניעת העתקה וקליק ימני (ה-Blur הוסר)
const useSecureContent = () => {
  useEffect(() => {
    const handleCopy = (e) => e.preventDefault();
    const handleContextMenu = (e) => e.preventDefault();
    
    document.addEventListener('copy', handleCopy);
    document.addEventListener('contextmenu', handleContextMenu);
    
    return () => {
      document.removeEventListener('copy', handleCopy);
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);
};

// ==========================================
// 2. Dummy Data (יגיע בעתיד מה-MongoDB)
// ==========================================

const dummyPosts = [
  {
    id: 1,
    title: 'מאחורי הקלעים של ניהול זיכרון',
    excerpt: 'כשהתחלתי לבנות את פרויקט האסמבלר ב-C, הבנתי שפוינטרים הם קצת כמו שירה - דורשים דיוק מוחלט כדי לא ללכת לאיבוד.',
    category: 'קוד',
    readTime: '3 דקות'
  },
  {
    id: 2,
    title: 'בין אינטגרלים למציאות',
    excerpt: 'מחשבות על חדו"א ב\' וההבנה שלפעמים המרחב התלת-ממדי מסודר וצפוי הרבה יותר מהחיים עצמם.',
    category: 'מתמטיקה',
    readTime: '5 דקות'
  },
  {
    id: 3,
    title: '55 דקות של שקט',
    excerpt: 'איך טיימר פשוט עוזר לי למצוא את האיזון העדין שבין אימהות, פתרון בעיות אלגוריתמיות, ושורות של קוד.',
    category: 'שירה',
    readTime: '2 דקות'
  }
];

const categories = ['הכל', 'קוד', 'מתמטיקה', 'שירה', 'מתכונים'];

// ==========================================
// 3. קומפוננטות UI שונות
// ==========================================

// פונקציית עזר לרינדור האייקון הקטן של הקטגוריה
const renderCategoryIcon = (category) => {
  switch (category) {
    case 'קוד':
      return '< >';
    case 'מתמטיקה':
      return '∫';
    case 'שירה':
      return '~';
    default:
      return '•';
  }
};

// הרקע הגיאומטרי המופשט
const AbstractBackground = () => {
  const { isDark } = useContext(ThemeContext);
  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
      <div className={`absolute top-1/4 left-1/4 w-[50vw] h-[50vw] rounded-full blur-[100px] opacity-20 transition-all duration-1000 ${isDark ? 'bg-cyan-900/40' : 'bg-cyan-200/50'}`}></div>
      <div className={`absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] rounded-full blur-[80px] opacity-10 transition-all duration-1000 ${isDark ? 'bg-amber-900/20' : 'bg-orange-100/40'}`}></div>
      <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
        <pattern id="gridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke={isDark ? "white" : "black"} strokeWidth="0.5" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#gridPattern)" />
      </svg>
    </div>
  );
};

// כפתור התאורה העדין
const ThemeToggle = () => {
  const { isDark, toggleTheme } = useContext(ThemeContext);
  return (
    <button 
      onClick={toggleTheme} 
      className="relative w-12 h-12 flex items-center justify-center focus:outline-none group"
      aria-label="Toggle Theme"
    >
      <div className={`absolute w-6 h-6 rounded-full border-[0.5px] transition-all duration-700 ease-in-out ${isDark ? 'border-cyan-300/40 translate-x-2' : 'border-stone-400/40 -translate-x-2'}`}></div>
      <div className={`absolute w-6 h-6 rounded-full border-[0.5px] transition-all duration-700 ease-in-out ${isDark ? 'border-stone-500/40 -translate-x-2' : 'border-cyan-600/40 translate-x-2'}`}></div>
    </button>
  );
};

// המצפן - תפריט מופשט נפתח
const CompassMenu = ({ navigateTo, currentPage, activeCategory, setActiveCategory }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isDark } = useContext(ThemeContext);

  return (
    <div className="fixed bottom-8 left-8 z-50 flex flex-col-reverse items-start gap-4">
      {/* כפתור המצפן המרכזי */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-14 h-14 rounded-full flex items-center justify-center focus:outline-none group"
      >
        {/* טבעות המצפן */}
        <div className={`absolute inset-0 rounded-full border-[0.5px] transition-all duration-500 ${isDark ? 'border-stone-600' : 'border-stone-300'} ${isOpen ? 'scale-125 opacity-0' : 'scale-100 opacity-100'}`}></div>
        <div className={`absolute inset-2 rounded-full border-[0.5px] transition-all duration-500 ${isDark ? 'border-stone-500' : 'border-stone-400'} ${isOpen ? 'scale-150 opacity-0' : 'scale-100 opacity-100'}`}></div>
        
        {/* הנקודה המרכזית */}
        <div className={`w-2 h-2 rounded-full transition-all duration-300 ${isDark ? 'bg-stone-300' : 'bg-stone-600'} ${isOpen ? 'scale-50' : 'scale-100'}`}></div>
        
        {/* חיווי צבע מים ב-Hover */}
        <div className={`absolute inset-0 rounded-full blur-md scale-50 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-700 -z-10 ${isDark ? 'bg-cyan-900/50' : 'bg-cyan-100/50'}`}></div>
      </button>

      {/* פריטי התפריט (ללא מסגרות, עם קווים מפרידים עדינים) */}
      <nav className={`flex flex-col w-32 transition-all duration-500 origin-bottom-left ${isOpen ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto' : 'opacity-0 translate-y-10 scale-90 pointer-events-none'}`}>
        <button 
          onClick={() => { navigateTo('home'); setIsOpen(false); }} 
          className={`text-right py-2 text-lg border-b-[0.5px] transition-all duration-300 focus:outline-none flex items-center justify-between ${currentPage === 'home' ? (isDark ? 'border-cyan-700/50 text-cyan-200' : 'border-cyan-300/50 text-cyan-800') : (isDark ? 'border-slate-700 text-stone-400 hover:text-stone-200' : 'border-stone-300 text-stone-500 hover:text-stone-800')}`}
        >
          <span>בית</span>
        </button>
        
        <button 
          onClick={() => { navigateTo('about'); setIsOpen(false); }} 
          className={`text-right py-2 text-lg border-b-[0.5px] transition-all duration-300 focus:outline-none flex items-center justify-between ${currentPage === 'about' ? (isDark ? 'border-cyan-700/50 text-cyan-200' : 'border-cyan-300/50 text-cyan-800') : (isDark ? 'border-slate-700 text-stone-400 hover:text-stone-200' : 'border-stone-300 text-stone-500 hover:text-stone-800')}`}
        >
          <span>אודות</span>
        </button>

        {/* קטגוריות משולבות בתוך התפריט כשנמצאים בבית */}
        {currentPage === 'home' && (
          <div className="flex flex-col mt-3 pl-2">
            {categories.map((cat, index) => (
              <button 
                key={cat}
                onClick={() => { setActiveCategory(cat); setIsOpen(false); }}
                className={`text-right py-1.5 transition-all duration-300 focus:outline-none flex items-center justify-between text-base ${index !== categories.length - 1 ? 'border-b-[0.5px] border-stone-200/40 dark:border-slate-700/40' : ''} ${activeCategory === cat ? (isDark ? 'text-cyan-300' : 'text-cyan-700') : (isDark ? 'text-stone-500 hover:text-stone-300' : 'text-stone-400 hover:text-stone-600')}`}
              >
                <span>{cat}</span>
              </button>
            ))}
          </div>
        )}
      </nav>
    </div>
  );
};


// ==========================================
// 4. עמודי האתר
// ==========================================

// עמוד הבית (הפיד)
const Home = ({ navigateTo, activeCategory }) => {
  const { isDark } = useContext(ThemeContext);
  
  const filteredPosts = activeCategory === 'הכל' 
    ? dummyPosts 
    : dummyPosts.filter(p => p.category === activeCategory);

  return (
    <div className="max-w-3xl mx-auto px-6 py-20 min-h-screen pb-40">
      
      {/* רשימת הפוסטים */}
      <div className="flex flex-col gap-12 sm:gap-0 sm:flex-col sm:overflow-visible overflow-x-auto snap-x snap-mandatory flex-row pb-8 scrollbar-hide">
        {filteredPosts.map((post) => (
          <button 
            key={post.id}
            onClick={() => navigateTo('post')}
            className={`min-w-[85vw] sm:min-w-0 snap-center text-right group py-10 transition-all duration-500 focus:outline-none relative border-b-[0.5px] ${isDark ? 'border-stone-800/50 hover:border-transparent' : 'border-stone-200/50 hover:border-transparent'}`}
          >
            {/* קווים תוחמים עליון ותחתון בריחוף (ללא פינות, באנימציית התרחבות) */}
            <div className={`absolute top-0 right-0 left-0 h-[0.5px] scale-x-0 group-hover:scale-x-100 origin-center transition-transform duration-700 ease-out ${isDark ? 'bg-stone-500' : 'bg-stone-300'}`}></div>
            <div className={`absolute bottom-0 right-0 left-0 h-[0.5px] scale-x-0 group-hover:scale-x-100 origin-center transition-transform duration-700 ease-out ${isDark ? 'bg-stone-500' : 'bg-stone-300'}`}></div>
            
            <div className="relative z-10 px-6">
              <div className="flex justify-between items-baseline mb-4">
                <h2 className="text-3xl font-light tracking-wide flex items-center transition-transform duration-500 group-hover:-translate-x-2">
                   {post.title}
                </h2>
                
                {/* סמל קטגוריה בלבד - שמתגלה רק בריחוף */}
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
};

// עמוד פוסט (עם אבטחת תוכן)
const PostPage = ({ navigateTo }) => {
  const { isDark } = useContext(ThemeContext);
  useSecureContent(); // הפעלת חסימת העתקות בעמוד הפוסט

  return (
    <article className="max-w-2xl mx-auto px-6 py-32 min-h-screen secure-text-area">
      <header className="mb-20 text-center">
        <h1 className="text-5xl font-light mb-6 tracking-wide">מאחורי הקלעים של ניהול זיכרון</h1>
        <div className="flex items-center justify-center gap-4 text-sm tracking-widest uppercase opacity-60">
          <span>קוד</span>
          <span>&middot;</span>
          <span>3 דקות</span>
        </div>
      </header>

      <div className={`prose prose-lg mx-auto ${isDark ? 'prose-invert prose-stone' : 'prose-stone'} font-light leading-loose text-xl`}>
        <p>
          כשהתחלתי לבנות את פרויקט האסמבלר ב-C, הבנתי שפוינטרים הם קצת כמו שירה - דורשים דיוק מוחלט כדי לא ללכת לאיבוד.
        </p>
        
        {/* דוגמה לאזור קוד מופרד סמנטית */}
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
};

// עמוד אודות
const About = () => {
  const { isDark } = useContext(ThemeContext);
  return (
    <div className="max-w-2xl mx-auto px-6 py-32 min-h-screen relative">
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
        
        <p>
          <strong>;נקודה פסיק</strong> הוא המרחב שבו שני העולמות האלו מפסיקים להתחרות, ומתחילים להשלים זה את זה – 
          לוגיקה, שירה, אומנות וקצת מתכונים.
        </p>
      </div>

      <div className="mt-32">
        <h3 className="text-2xl font-light mb-4">מחשבות, קוד, או סתם מילים – השאירו לי כאן משהו</h3>
        <input 
          type="text" 
          placeholder="..."
          className={`w-full bg-transparent border-b-[0.5px] py-4 focus:outline-none transition-colors duration-300 font-light text-xl ${isDark ? 'border-stone-700 focus:border-cyan-600' : 'border-stone-300 focus:border-cyan-400'}`}
        />
      </div>
    </div>
  );
};


// ==========================================
// 5. עטיפת האפליקציה (Root)
// ==========================================

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

// קומפוננטה פנימית כדי שתוכל להשתמש ב-Hooks של React
const AppContent = () => {
  // ניהול ניווט מותאם אישית במקום react-router-dom
  const [currentPage, setCurrentPage] = useState('home'); // 'home', 'post', 'about', '404'
  const [activeCategory, setActiveCategory] = useState('הכל');
  
  const navigateTo = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <Home navigateTo={navigateTo} activeCategory={activeCategory} />;
      case 'post': return <PostPage navigateTo={navigateTo} />;
      case 'about': return <About />;
      default: return <Home navigateTo={navigateTo} activeCategory={activeCategory} />;
    }
  };
  
  return (
    <div className="transition-all duration-700 min-h-screen bg-[#FDFBF7] dark:bg-slate-900 text-[#5c4a3d] dark:text-stone-100">
      <AbstractBackground />
      
      {/* מסגרת עליונה */}
      <header className="fixed top-0 left-0 right-0 p-8 flex justify-between items-start z-40 pointer-events-none">
        {/* מתג התאורה (יום/לילה) */}
        <div className="pointer-events-auto">
          <ThemeToggle />
        </div>
        
        {/* לוגו האתר (מותאם לתמונה שצורפה) */}
        <div className="text-right pointer-events-auto cursor-pointer flex flex-col items-center" onClick={() => navigateTo('home')}>
          <div className="flex items-center flex-row-reverse gap-2 mb-1">
             {/* הנקודה פסיק מצד ימין, בגדול */}
             <span className="text-[#5c4a3d] dark:text-[#a8907b] text-6xl font-bold leading-none -mt-2">;</span>
             {/* שם הבלוג */}
             <h1 className="text-5xl font-bold tracking-wide text-[#5c4a3d] dark:text-[#a8907b] leading-none">
               נקודה פסיק
             </h1>
          </div>
          {/* תת הכותרת */}
          <p className="text-xl opacity-80 tracking-wide text-[#5c4a3d] dark:text-[#a8907b]">
            החיים שבין קוד, מספרים ומילים
          </p>
        </div>
      </header>

      {/* תפריט מופשט (מצפן) בפינה התחתונה */}
      <CompassMenu 
        navigateTo={navigateTo} 
        currentPage={currentPage} 
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      
      {/* אזור התוכן המרכזי */}
      <main>
        {renderPage()}
      </main>
      
      {/* סגנונות גלובליים חיוניים (הסרת ה-Blur והחלת הפונט Tinos) */}
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Tinos:ital,wght@0,400;0,700;1,400;1,700&display=swap');
        
        :root {
          direction: rtl;
        }
        
        /* מחילים את טינוס כפונט ברירת המחדל לכל האתר */
        body {
          font-family: 'Tinos', serif;
        }
        
        /* דורסים את מחלקות הטקסט של טיילווינד כדי לכפות את טינוס בכל מקום, מלבד בקוד */
        .font-serif, .font-sans {
          font-family: 'Tinos', serif !important;
        }

        .dir-ltr {
          direction: ltr;
        }
        
        /* מחלקת אבטחת טקסט לעמוד הפוסט */
        .secure-text-area {
          user-select: none;
          -webkit-user-select: none;
        }
        
        /* הסתרת פס הגלילה */
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}} />
    </div>
  );
};