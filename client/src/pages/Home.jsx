import React, { useState, useEffect } from 'react';
import ScrollReveal from '../components/ScrollReveal';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
fetch(`${API_URL}/api/posts`)

const getCategoryIcon = (category) => {
  switch(category) {
    case 'קוד': 
      return <span className="font-mono text-xl font-thin text-[#c4a993]/80 dark:text-[#a8907b]/80 tracking-widest">&lt;&gt;</span>;
    case 'מתמטיקה': 
      return <span className="font-serif text-3xl font-thin text-[#c4a993]/80 dark:text-[#a8907b]/80">∫</span>;
    case 'שירה': 
      return (
        <svg className="w-5 h-5 text-[#c4a993]/80 dark:text-[#a8907b]/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.75" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
      );
    case 'אוכל': 
      return <svg className="w-5 h-5 text-[#c4a993]/80 dark:text-[#a8907b]/80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.75" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>;
    case 'מחשבות':
      return (
        <svg className="w-5 h-5 text-[#c4a993]/80 dark:text-[#a8907b]/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.75" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
        </svg>
      );
    default: 
      return <span className="font-mono text-xl font-thin text-[#c4a993]/80 dark:text-[#a8907b]/80">&lt;&gt;</span>;
  }
};

export default function Home({ activeCategory, navigateTo }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/posts')
      .then((res) => {
        if (!res.ok) throw new Error('שגיאה בטעינת הפוסטים');
        return res.json();
      })
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filteredPosts = activeCategory === 'הכל' 
    ? posts 
    : posts.filter(post => post.category === activeCategory);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-6 pt-36 text-center text-stone-400">
        טוען פוסטים...
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto px-6 pt-36 text-center text-red-400">
        שגיאה בהתחברות לשרת: {error}
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 pt-36 pb-32 min-h-screen relative z-10">
      <div className="flex flex-col">
        {filteredPosts.length === 0 ? (
          <p className="text-center text-stone-400 py-12">לא נמצאו פוסטים בקטגוריה זו.</p>
        ) : (
          filteredPosts.map((post, index) => (
            <ScrollReveal key={post._id} delay={index * 150}>
              <article 
                className="group cursor-pointer relative py-10 px-4 transition-all duration-500"
                onClick={() => navigateTo('post', post._id)}
              >
                <div className="absolute bottom-0 left-4 right-4 h-[0.5px] bg-stone-300/30 dark:bg-stone-700/30 transition-all duration-700 group-hover:bg-[#c4a993] dark:group-hover:bg-[#a8907b] group-hover:h-[1px] group-hover:shadow-[0_0_8px_rgba(196,169,147,0.3)]"></div>
                
                <div className="flex items-start justify-between gap-6">
                  <div className="flex-1">
                    <h2 className="text-4xl font-light mb-4 text-[#5c4a3d] dark:text-[#e6dfd8] transition-all duration-500 group-hover:opacity-80">
                      {post.title}
                    </h2>
                    <p className="text-xl font-light text-stone-500 dark:text-[#bba99a] leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                  
                  <div className="flex-shrink-0 pt-2 opacity-0 group-hover:opacity-100 transition-all duration-700 translate-x-2 group-hover:translate-x-0">
                    {getCategoryIcon(post.category)}
                  </div>
                </div>
              </article>
            </ScrollReveal>
          ))
        )}
      </div>
    </div>
  );
}