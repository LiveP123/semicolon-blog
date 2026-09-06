import React, { useState } from 'react';
import { saveNewPost } from '../data/postManager';
import { categories } from '../data/dummyData';

export default function Admin({ navigateTo }) {
  const [formData, setFormData] = useState({ title: '', excerpt: '', category: categories[1], content: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    const readTime = Math.max(1, Math.ceil(formData.content.split(' ').length / 200)) + ' דקות';
    saveNewPost({ ...formData, readTime });
    navigateTo('home');
  };

  return (
    <div className="max-w-2xl mx-auto px-6 pt-44 pb-32 min-h-screen relative z-10">
      <h2 className="text-3xl font-bold mb-8">הוספת פוסט חדש</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <input 
          type="text" placeholder="כותרת" required
          className="p-3 bg-transparent border-b border-stone-300 dark:border-stone-700 focus:outline-none focus:border-cyan-500"
          onChange={(e) => setFormData({...formData, title: e.target.value})} 
        />
        <input 
          type="text" placeholder="תקציר (עד 3 מילים)" required
          className="p-3 bg-transparent border-b border-stone-300 dark:border-stone-700 focus:outline-none focus:border-cyan-500"
          onChange={(e) => setFormData({...formData, excerpt: e.target.value})} 
        />
        <select 
          className="p-3 bg-transparent border-b border-stone-300 dark:border-stone-700 focus:outline-none focus:border-cyan-500"
          onChange={(e) => setFormData({...formData, category: e.target.value})}
        >
          {categories.filter(c => c !== 'הכל').map(cat => (
            <option key={cat} value={cat} className="bg-[#FDFBF7] dark:bg-slate-900">{cat}</option>
          ))}
        </select>
        <textarea 
          placeholder="תוכן הפוסט..." required rows="8"
          className="p-3 bg-transparent border border-stone-300 dark:border-stone-700 rounded-md focus:outline-none focus:border-cyan-500 resize-none"
          onChange={(e) => setFormData({...formData, content: e.target.value})} 
        ></textarea>
        <button type="submit" className="bg-cyan-600 hover:bg-cyan-500 text-white p-3 rounded-md transition-colors">
          פרסמי פוסט
        </button>
      </form>
    </div>
  );
}