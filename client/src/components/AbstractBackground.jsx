import React, { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

export default function AbstractBackground() {
  const { isDark } = useContext(ThemeContext);
  
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden flex justify-between">
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes float-1 { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(-10px, 15px); } }
        @keyframes float-2 { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(15px, -10px); } }
        @keyframes pulse-net { 0%, 100% { opacity: 0.3; } 50% { opacity: 1; } }
        .animate-f1 { animation: float-1 12s ease-in-out infinite; }
        .animate-f2 { animation: float-2 15s ease-in-out infinite; }
        .animate-pulse-net { animation: pulse-net 5s ease-in-out infinite; }
      `}} />

      {/* צד ימין בלבד */}
      <div className="absolute right-0 top-0 w-1/4 h-full animate-f1">
        <svg className={`absolute inset-0 w-full h-full ${isDark ? 'text-cyan-200/40' : 'text-cyan-700/25'}`}>
          <line x1="80%" y1="15%" x2="50%" y2="30%" stroke="currentColor" strokeWidth="1" />
          <line x1="50%" y1="30%" x2="75%" y2="55%" stroke="currentColor" strokeWidth="1" />
          <line x1="75%" y1="55%" x2="40%" y2="75%" stroke="currentColor" strokeWidth="1" />
          <line x1="75%" y1="55%" x2="90%" y2="85%" stroke="currentColor" strokeWidth="1" />
          
          <circle cx="80%" cy="15%" r="2.5" fill="currentColor" />
          <circle cx="50%" cy="30%" r="2.5" fill="currentColor" className="animate-pulse-net" />
          <circle cx="75%" cy="55%" r="2.5" fill="currentColor" />
          <circle cx="40%" cy="75%" r="2.5" fill="currentColor" className="animate-pulse-net" style={{animationDelay: '1s'}} />
          <circle cx="90%" cy="85%" r="2.5" fill="currentColor" />
        </svg>
      </div>

      {/* צד שמאל בלבד */}
      <div className="absolute left-0 top-0 w-1/4 h-full animate-f2">
        <svg className={`absolute inset-0 w-full h-full ${isDark ? 'text-teal-200/40' : 'text-teal-700/25'}`}>
          <line x1="20%" y1="20%" x2="50%" y2="35%" stroke="currentColor" strokeWidth="1" />
          <line x1="50%" y1="35%" x2="25%" y2="60%" stroke="currentColor" strokeWidth="1" />
          <line x1="25%" y1="60%" x2="60%" y2="80%" stroke="currentColor" strokeWidth="1" />
          <line x1="25%" y1="60%" x2="15%" y2="90%" stroke="currentColor" strokeWidth="1" />

          <circle cx="20%" cy="20%" r="2.5" fill="currentColor" />
          <circle cx="50%" cy="35%" r="2.5" fill="currentColor" className="animate-pulse-net" style={{animationDelay: '0.5s'}} />
          <circle cx="25%" cy="60%" r="2.5" fill="currentColor" />
          <circle cx="60%" cy="80%" r="2.5" fill="currentColor" className="animate-pulse-net" style={{animationDelay: '1.5s'}} />
          <circle cx="15%" cy="90%" r="2.5" fill="currentColor" />
        </svg>
      </div>
      
    </div>
  );
}