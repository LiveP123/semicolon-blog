import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './contexts/ThemeContext.jsx';
import AbstractBackground from './components/AbstractBackground.jsx';
import Header from './components/Header.jsx';
import CompassMenu from './components/CompassMenu.jsx';
import Home from './pages/Home.jsx';
import PostPage from './pages/PostPage.jsx';
import About from './pages/About.jsx';
import Admin from './pages/Admin';

function AppContent() {
const [currentPage, setCurrentPage] = useState(() => {
  const path = window.location.pathname.replace('/', '');
  return path || 'home';
});  const [activeCategory, setActiveCategory] = useState('הכל');
  const [postId, setPostId] = useState(null);

  useEffect(() => {
    const handlePopState = (event) => {
      if (event.state) {
        setCurrentPage(event.state.page || 'home');
        setPostId(event.state.postId || null);
      } else {
        setCurrentPage('home');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (page, id = null) => {
    window.history.pushState({ page, postId: id }, '', `/${page}${id ? `/${id}` : ''}`);
    setCurrentPage(page);
    if (id) setPostId(id);
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <Home navigateTo={navigateTo} activeCategory={activeCategory} />;
      case 'post': return <PostPage postId={postId} navigateTo={navigateTo} />;
      case 'about': return <About />;
      case 'admin': return <Admin navigateTo={navigateTo} />;
      default: return <Home navigateTo={navigateTo} activeCategory={activeCategory} />;
    }
  };
  
  return (
    <div className="transition-all duration-700 min-h-screen bg-[#FDFBF7] dark:bg-slate-900 text-[#5c4a3d] dark:text-[#d4c8be] relative z-0 flex flex-col justify-between">
      
      {/* שכבת הרקע */}
      <AbstractBackground />
      
      {/* שכבת התوכן */}
      <div className="relative z-10">
        <Header navigateTo={navigateTo} />

        <CompassMenu 
          navigateTo={navigateTo} 
          currentPage={currentPage} 
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
        
        <main>
          {renderPage()}
        </main>
      </div>

      {/* שורה תחתונה - קרדיט CWeb */}
      <footer className="relative z-10 py-8 text-center text-xs font-light text-stone-400 dark:text-stone-600 tracking-wider">
        Designed & Built by CWeb
      </footer>
      
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Tinos:ital,wght@0,400;0,700;1,400;1,700&display=swap');
        
        :root {
          direction: rtl;
        }
        
        body {
          font-family: 'Tinos', serif;
        }
        
        .font-serif, .font-sans {
          font-family: 'Tinos', serif !important;
        }

        .dir-ltr {
          direction: ltr;
        }
        
        .secure-text-area {
          user-select: none;
          -webkit-user-select: none;
        }
        
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
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}