import React, { useState } from 'react';
import { categories } from '../data/dummyData';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function Admin({ navigateTo }) {
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    category: categories[1] || 'קוד',
    content: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/api/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('שגיאה ביצירת הפוסט');
      }

      navigateTo('home');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-6 pt-44 pb-32 min-h-screen relative z-10">
      <h2 className="text-3xl font-bold mb-8">הוספת פוסט חדש</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <input 
          type="text" 
          placeholder="כותרת" 
          required
          value={formData.title}
          className="p-3 bg-transparent border-b border-stone-300 dark:border-stone-700 focus:outline-none focus:border-cyan-500"
          onChange={(e) => setFormData({...formData, title: e.target.value})} 
        />
        <input 
          type="text" 
          placeholder="תקציר (עד 3 מילים)" 
          required
          value={formData.excerpt}
          className="p-3 bg-transparent border-b border-stone-300 dark:border-stone-700 focus:outline-none focus:border-cyan-500"
          onChange={(e) => setFormData({...formData, excerpt: e.target.value})} 
        />
        <select 
          value={formData.category}
          className="p-3 bg-transparent border-b border-stone-300 dark:border-stone-700 focus:outline-none focus:border-cyan-500"
          onChange={(e) => setFormData({...formData, category: e.target.value})}
        >
          {categories.filter(c => c !== 'הכל').map(cat => (
            <option key={cat} value={cat} className="bg-[#FDFBF7] dark:bg-slate-900">{cat}</option>
          ))}
        </select>
        <textarea 
          placeholder="תוכן הפוסט..." 
          required 
          rows="8"
          value={formData.content}
          className="p-3 bg-transparent border border-stone-300 dark:border-stone-700 rounded-md focus:outline-none focus:border-cyan-500 resize-none"
          onChange={(e) => setFormData({...formData, content: e.target.value})} 
        ></textarea>
        <button 
          type="submit" 
          disabled={loading}
          className="bg-cyan-600 hover:bg-cyan-500 text-white p-3 rounded-md transition-colors disabled:opacity-50 cursor-pointer"
        >
          {loading ? 'שומר פוסט...' : 'פרסמי פוסט'}
        </button>
      </form>
    </div>
  );
}