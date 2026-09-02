import React, { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

export default function AbstractBackground() {
  const { isDark } = useContext(ThemeContext);
  
  return (
    <div className="fixed inset-0 pointer-events-none flex justify-between z-0 overflow-hidden">
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes float-1 { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(-10px, 15px); } }
        @keyframes float-2 { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(15px, -10px); } }
        @keyframes float-3 { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(-15px, -15px); } }
        .animate-f1 { animation: float-1 8s ease-in-out infinite; }
        .animate-f2 { animation: float-2 11s ease-in-out infinite; }
        .animate-f3 { animation: float-3 14s ease-in-out infinite; }
      `}} />

      {/* צד ימין */}
      <div className="absolute right-0 top-0 w-1/3 h-full pointer-events-auto group">
        
        <svg className={`absolute inset-0 w-full h-full pointer-events-none transition-all duration-1000 ${isDark ? 'text-cyan-300/40' : 'text-cyan-700/20'} group-hover:text-cyan-300/70`}>
          <line x1="80%" y1="20%" x2="60%" y2="35%" stroke="currentColor" strokeWidth="0.5" />
          <line x1="60%" y1="35%" x2="70%" y2="55%" stroke="currentColor" strokeWidth="0.5" />
          <line x1="70%" y1="55%" x2="40%" y2="65%" stroke="currentColor" strokeWidth="0.5" />
          <line x1="40%" y1="65%" x2="50%" y2="85%" stroke="currentColor" strokeWidth="0.5" />
          <line x1="70%" y1="55%" x2="85%" y2="75%" stroke="currentColor" strokeWidth="0.5" />
          
          <line x1="60%" y1="35%" x2="40%" y2="65%" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" className="opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <line x1="80%" y1="20%" x2="85%" y2="75%" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" className="opacity-0 group-hover:opacity-100 transition-opacity duration-1000 delay-100" />
        </svg>

        <div className={`animate-f1 absolute top-[20%] right-[20%] w-1.5 h-1.5 rounded-full transition-all duration-700 group-hover:scale-[3] group-hover:-translate-x-8 group-hover:translate-y-3 group-hover:bg-cyan-200 group-hover:shadow-[0_0_15px_#67e8f9] ${isDark ? 'bg-cyan-300/80' : 'bg-cyan-600/40'}`}></div>
        <div className={`animate-f2 absolute top-[35%] right-[40%] w-1 h-1 rounded-full transition-all duration-1000 group-hover:scale-[4] group-hover:translate-x-10 group-hover:translate-y-5 group-hover:bg-purple-200 group-hover:shadow-[0_0_15px_#d8b4fe] ${isDark ? 'bg-purple-300/80' : 'bg-purple-600/40'}`}></div>
        <div className={`animate-f3 absolute top-[55%] right-[30%] w-2 h-2 rounded-full transition-all duration-700 group-hover:scale-[2] group-hover:-translate-x-12 group-hover:-translate-y-2 group-hover:bg-cyan-200 group-hover:shadow-[0_0_20px_#22d3ee] ${isDark ? 'bg-cyan-400/80' : 'bg-cyan-600/40'}`}></div>
        <div className={`animate-f1 absolute top-[65%] right-[60%] w-1.5 h-1.5 rounded-full transition-all duration-700 group-hover:scale-[3] group-hover:translate-x-8 group-hover:-translate-y-10 group-hover:bg-indigo-200 group-hover:shadow-[0_0_15px_#a5b4fc] ${isDark ? 'bg-indigo-300/80' : 'bg-indigo-600/40'}`}></div>
        <div className={`animate-f2 absolute top-[85%] right-[50%] w-1 h-1 rounded-full transition-all duration-1000 group-hover:scale-[4] group-hover:-translate-x-6 group-hover:-translate-y-8 group-hover:bg-cyan-200 group-hover:shadow-[0_0_15px_#67e8f9] ${isDark ? 'bg-cyan-300/80' : 'bg-cyan-600/40'}`}></div>
        <div className={`animate-f3 absolute top-[75%] right-[15%] w-1.5 h-1.5 rounded-full transition-all duration-700 group-hover:scale-[3] group-hover:translate-x-6 group-hover:translate-y-6 group-hover:bg-purple-300 group-hover:shadow-[0_0_15px_#c084fc] ${isDark ? 'bg-purple-400/80' : 'bg-purple-600/40'}`}></div>
      </div>

      {/* צד שמאל */}
      <div className="absolute left-0 top-0 w-1/3 h-full pointer-events-auto group">
        
        <svg className={`absolute inset-0 w-full h-full pointer-events-none transition-all duration-1000 ${isDark ? 'text-teal-300/40' : 'text-teal-700/20'} group-hover:text-teal-300/70`}>
          <line x1="20%" y1="25%" x2="35%" y2="45%" stroke="currentColor" strokeWidth="0.5" />
          <line x1="35%" y1="45%" x2="25%" y2="65%" stroke="currentColor" strokeWidth="0.5" />
          <line x1="25%" y1="65%" x2="55%" y2="75%" stroke="currentColor" strokeWidth="0.5" />
          <line x1="35%" y1="45%" x2="60%" y2="35%" stroke="currentColor" strokeWidth="0.5" />
          
          <line x1="20%" y1="25%" x2="60%" y2="35%" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" className="opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <line x1="60%" y1="35%" x2="55%" y2="75%" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" className="opacity-0 group-hover:opacity-100 transition-opacity duration-1000 delay-150" />
        </svg>

        <div className={`animate-f2 absolute top-[25%] left-[20%] w-1.5 h-1.5 rounded-full transition-all duration-700 group-hover:scale-[3] group-hover:translate-x-8 group-hover:translate-y-5 group-hover:bg-teal-200 group-hover:shadow-[0_0_15px_#5eead4] ${isDark ? 'bg-teal-300/80' : 'bg-teal-600/40'}`}></div>
        <div className={`animate-f3 absolute top-[45%] left-[35%] w-2 h-2 rounded-full transition-all duration-1000 group-hover:scale-[2.5] group-hover:-translate-x-10 group-hover:-translate-y-4 group-hover:bg-cyan-300 group-hover:shadow-[0_0_20px_#22d3ee] ${isDark ? 'bg-cyan-400/80' : 'bg-cyan-600/40'}`}></div>
        <div className={`animate-f1 absolute top-[65%] left-[25%] w-1 h-1 rounded-full transition-all duration-700 group-hover:scale-[4] group-hover:translate-x-10 group-hover:-translate-y-8 group-hover:bg-teal-200 group-hover:shadow-[0_0_15px_#5eead4] ${isDark ? 'bg-teal-300/80' : 'bg-teal-600/40'}`}></div>
        <div className={`animate-f2 absolute top-[75%] left-[55%] w-1.5 h-1.5 rounded-full transition-all duration-1000 group-hover:scale-[3] group-hover:-translate-x-8 group-hover:translate-y-6 group-hover:bg-indigo-200 group-hover:shadow-[0_0_15px_#a5b4fc] ${isDark ? 'bg-indigo-300/80' : 'bg-indigo-600/40'}`}></div>
        <div className={`animate-f3 absolute top-[35%] left-[60%] w-1 h-1 rounded-full transition-all duration-700 group-hover:scale-[4] group-hover:-translate-x-6 group-hover:-translate-y-10 group-hover:bg-cyan-200 group-hover:shadow-[0_0_15px_#67e8f9] ${isDark ? 'bg-cyan-300/80' : 'bg-cyan-600/40'}`}></div>
      </div>
      
    </div>
  );
}