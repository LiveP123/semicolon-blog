import React, { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function PostPage({ postId, navigateTo }) {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!postId) {
      setLoading(false);
      return;
    }

    fetch(`${API_URL}/api/posts/${postId}`)
      .then((res) => {
        if (!res.ok) throw new Error('הפוסט לא נמצא');
        return res.json();
      })
      .then((data) => {
        setPost(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [postId]);

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto px-6 pt-44 pb-32 text-center text-stone-400 relative z-10">
        טוען את הפוסט...
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="max-w-2xl mx-auto px-6 pt-44 pb-32 text-center relative z-10">
        <p className="mb-4 text-stone-500 dark:text-stone-400">פוסט לא נמצא</p>
        <button
          onClick={() => navigateTo('home')}
          className="text-sm underline text-cyan-700 dark:text-cyan-400 cursor-pointer"
        >
          חזרה לדף הבית
        </button>
      </div>
    );
  }

  return (
    <article className="max-w-2xl mx-auto px-6 pt-44 pb-32 min-h-screen secure-text-area relative z-10">
      <header className="mb-12">
        <div className="flex items-center gap-4 text-sm mb-6">
          <span className="text-cyan-700 dark:text-cyan-400 font-bold">{post.category}</span>
          <span className="text-stone-400 dark:text-stone-500">•</span>
          <span className="text-stone-500 dark:text-stone-400">
            {post.createdAt ? new Date(post.createdAt).toLocaleDateString('he-IL') : post.readTime}
          </span>
        </div>
        <h1 className="text-4xl font-bold mb-6 leading-tight">{post.title}</h1>
      </header>
      
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-xl leading-loose whitespace-pre-wrap text-[#5c4a3d] dark:text-[#d4c8be]">
          {post.content}
        </p>
      </div>
    </article>
  );
}