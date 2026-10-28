import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './contexts/ThemeContext.jsx';
import AbstractBackground from './components/AbstractBackground.jsx';
import Header from './components/Header.jsx';
import CompassMenu from './components/CompassMenu.jsx';
import Home from './pages/Home.jsx';
import PostPage from './pages/PostPage.jsx';
import About from './pages/About.jsx';
import Admin from './pages/Admin.jsx';
import ContactModal from './components/ContactModal.jsx';

function parseRoute() {
  const pathname = window.location.pathname.replace(/^\/+/, '');
  const parts = pathname.split('/').filter(Boolean);

  if (!parts.length) {
    return { page: 'home', postId: null };
  }

  const [first, second] = parts;

  if (first === 'about') {
    return { page: 'about', postId: null };
  }

  if (first === 'admin') {
    return { page: 'admin', postId: null };
  }

  if (first === 'post' && second) {
    return { page: 'post', postId: second };
  }

  if (first === 'home') {
    return { page: 'home', postId: null };
  }

  return { page: 'home', postId: null };
}

function AppContent() {
  const [currentPage, setCurrentPage] = useState(() => parseRoute().page);
  const [postId, setPostId] = useState(() => parseRoute().postId);
  const [activeCategory, setActiveCategory] = useState('הכל');
  const [isContactOpen, setIsContactOpen] = useState(false);

  useEffect(() => {
    const syncFromUrl = () => {
      const route = parseRoute();
      setCurrentPage(route.page);
      setPostId(route.postId);
    };

    window.addEventListener('popstate', syncFromUrl);
    syncFromUrl();

    return () => {
      window.removeEventListener('popstate', syncFromUrl);
    };
  }, []);

  const navigateTo = (page, id = null) => {
    let nextUrl = '/';

    if (page === 'about') nextUrl = '/about';
    else if (page === 'admin') nextUrl = '/admin';
    else if (page === 'post' && id) nextUrl = `/post/${id}`;
    else if (page === 'home') nextUrl = '/';

    window.history.pushState({ page, postId: id }, '', nextUrl);
    setCurrentPage(page);
    setPostId(id || null);
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home navigateTo={navigateTo} activeCategory={activeCategory} />;
      case 'post':
        return <PostPage postId={postId} navigateTo={navigateTo} />;
      case 'about':
        return <About />;
      case 'admin':
        return <Admin navigateTo={navigateTo} />;
      default:
        return <Home navigateTo={navigateTo} activeCategory={activeCategory} />;
    }
  };

  return (
    <div className="transition-all duration-700 min-h-screen bg-[#FDFBF7] dark:bg-slate-900 text-[#5c4a3d] dark:text-[#d4c8be] relative z-0 flex flex-col justify-between">
      <AbstractBackground />

      <div className="relative z-10 flex-1 flex flex-col">
        <Header navigateTo={navigateTo} />

        <CompassMenu
          navigateTo={navigateTo}
          currentPage={currentPage}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />

        <main className="flex-1">{renderPage()}</main>
      </div>

      <footer className="relative z-10 py-8 text-center text-xs font-light text-stone-400 dark:text-stone-600 tracking-wider">
        Designed & Built by{' '}
        <button
          type="button"
          onClick={() => setIsContactOpen(true)}
          className="underline font-normal hover:text-stone-200 dark:hover:text-stone-300 transition-colors cursor-pointer"
        >
          CWeb
        </button>
      </footer>

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      <style dangerouslySetInnerHTML={{ __html: `
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
      ` }} />
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