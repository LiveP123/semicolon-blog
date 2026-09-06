import React from 'react';
import { getPosts } from '../data/postManager';

export default function PostPage({ postId, navigateTo }) {
  const allPosts = getPosts();
  const post = allPosts.find(p => p.id === postId);

  if (!post) return <div className="max-w-2xl mx-auto px-6 pt-44 pb-32 relative z-10">פוסט לא נמצא</div>;

  return (
    <article className="max-w-2xl mx-auto px-6 pt-44 pb-32 min-h-screen secure-text-area relative z-10">
      <header className="mb-12">
        <div className="flex items-center gap-4 text-sm mb-6">
          <span className="text-cyan-700 dark:text-cyan-400 font-bold">{post.category}</span>
          <span className="text-stone-400 dark:text-stone-500">•</span>
          <span className="text-stone-500 dark:text-stone-400">{post.readTime}</span>
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