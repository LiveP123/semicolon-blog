import React, { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext.jsx';
import AbstractBackground from './components/AbstractBackground.jsx';
import Header from './components/Header.jsx';
import CompassMenu from './components/CompassMenu.jsx';
import Home from './pages/Home.jsx';
import PostPage from './pages/PostPage.jsx';
import About from './pages/About.jsx';
function AppContent() {
  const [currentPage, setCurrentPage] = useState('home');
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

    <div className="transition-all duration-700 min-h-screen bg-[#FDFBF7] dark:bg-slate-900 text-[#5c4a3d] dark:text-[#d4c8be] relative z-0">
      
      {/* שכבת הרקע */}
      <AbstractBackground />
      
      {/* שכבת התוכן */}
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