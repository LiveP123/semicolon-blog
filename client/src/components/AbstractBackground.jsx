import React, { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

export default function AbstractBackground() {
  const { isDark } = useContext(ThemeContext);

  const lineColor = isDark ? '#7dd3fc' : '#6b7280';
  const glowColor = isDark ? 'rgba(125, 211, 252, 0.22)' : 'rgba(99, 102, 241, 0.12)';

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden flex justify-between">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes float-1 { 0%, 100% { transform: translate(0, 0) scale(1); } 50% { transform: translate(-10px, 15px) scale(1.02); } }
        @keyframes float-2 { 0%, 100% { transform: translate(0, 0) scale(1); } 50% { transform: translate(15px, -10px) scale(1.03); } }
        @keyframes pulse-net { 0%, 100% { opacity: 0.22; } 50% { opacity: 0.8; } }
        @keyframes drift-grid { 0%, 100% { transform: translate3d(0, 0, 0); } 50% { transform: translate3d(12px, -10px, 0); } }
        @keyframes shimmer { 0%, 100% { opacity: 0.25; } 50% { opacity: 0.7; } }

        .animate-f1 { animation: float-1 12s ease-in-out infinite; }
        .animate-f2 { animation: float-2 15s ease-in-out infinite; }
        .animate-pulse-net { animation: pulse-net 5s ease-in-out infinite; }
        .animate-drift-grid { animation: drift-grid 18s ease-in-out infinite; }
        .animate-shimmer { animation: shimmer 8s ease-in-out infinite; }
      `}} />

      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background: isDark
              ? 'radial-gradient(circle at 20% 20%, rgba(103, 232, 249, 0.18), transparent 28%), radial-gradient(circle at 78% 32%, rgba(52, 211, 153, 0.18), transparent 25%), radial-gradient(circle at 58% 80%, rgba(147, 197, 253, 0.14), transparent 30%)'
              : 'radial-gradient(circle at 20% 20%, rgba(165, 180, 252, 0.16), transparent 28%), radial-gradient(circle at 78% 32%, rgba(45, 212, 191, 0.14), transparent 25%), radial-gradient(circle at 58% 80%, rgba(226, 232, 240, 0.24), transparent 30%)'
          }}
        />
      </div>

      <div className="absolute inset-0 animate-drift-grid opacity-60">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="soft-grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke={lineColor} strokeOpacity="0.12" strokeWidth="0.25" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#soft-grid)" />
        </svg>
      </div>

      <div className="absolute right-0 top-0 w-1/3 h-full animate-f1">
        <svg className={`absolute inset-0 w-full h-full ${isDark ? 'text-cyan-200/40' : 'text-indigo-600/25'}`} viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M 20 10 C 35 18, 45 38, 50 50 S 72 80, 90 90" fill="none" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.9" />
          <path d="M 5 55 C 25 35, 35 48, 55 43 S 80 22, 95 40" fill="none" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.7" />
          <path d="M 35 15 L 50 50 L 72 28" fill="none" stroke="currentColor" strokeWidth="0.45" strokeOpacity="0.7" />
          <path d="M 15 70 C 32 62, 44 78, 60 72 S 80 58, 95 70" fill="none" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.6" />

          <circle cx="20" cy="10" r="1.6" fill="currentColor" className="animate-pulse-net" />
          <circle cx="50" cy="50" r="1.9" fill="currentColor" className="animate-pulse-net" style={{ animationDelay: '0.8s' }} />
          <circle cx="72" cy="28" r="1.8" fill="currentColor" />
          <circle cx="90" cy="90" r="1.7" fill="currentColor" className="animate-pulse-net" style={{ animationDelay: '1.4s' }} />
          <circle cx="60" cy="72" r="1.5" fill="currentColor" />
        </svg>
      </div>

      <div className="absolute left-0 top-0 w-1/3 h-full animate-f2">
        <svg className={`absolute inset-0 w-full h-full ${isDark ? 'text-teal-200/40' : 'text-cyan-700/25'}`} viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M 5 30 C 20 18, 30 35, 45 42 S 75 62, 95 22" fill="none" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.8" />
          <path d="M 10 75 C 30 55, 40 82, 60 70 S 78 48, 95 58" fill="none" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.7" />
          <path d="M 18 18 L 38 44 L 54 28 L 72 52 L 88 35" fill="none" stroke="currentColor" strokeWidth="0.45" strokeOpacity="0.7" />
          <path d="M 25 90 C 38 64, 52 58, 66 45 S 82 30, 90 12" fill="none" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.6" />

          <circle cx="18" cy="18" r="1.8" fill="currentColor" />
          <circle cx="38" cy="44" r="1.8" fill="currentColor" className="animate-pulse-net" style={{ animationDelay: '0.7s' }} />
          <circle cx="54" cy="28" r="1.7" fill="currentColor" />
          <circle cx="72" cy="52" r="1.9" fill="currentColor" className="animate-pulse-net" style={{ animationDelay: '1.6s' }} />
          <circle cx="90" cy="12" r="1.7" fill="currentColor" />
        </svg>
      </div>

      <div className="absolute inset-0 flex justify-center items-center opacity-50">
        <svg className={`w-[80vw] h-[80vh] ${isDark ? 'text-sky-200/20' : 'text-slate-500/15'}`} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
          <circle cx="50" cy="50" r="18" fill="none" stroke="currentColor" strokeWidth="0.25" />
          <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.2" strokeDasharray="2 4" />
          <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="0.18" strokeDasharray="1 5" />

          <path d="M 14 50 C 22 38, 36 34, 50 50 S 78 62, 86 50" fill="none" stroke="currentColor" strokeWidth="0.25" />
          <path d="M 14 54 C 22 66, 36 66, 50 50 S 78 38, 86 54" fill="none" stroke="currentColor" strokeWidth="0.25" />

          <path d="M 50 12 L 50 88 M 12 50 L 88 50" stroke="currentColor" strokeWidth="0.15" strokeOpacity="0.8" />
          <path d="M 28 28 L 72 72 M 72 28 L 28 72" stroke="currentColor" strokeWidth="0.12" strokeOpacity="0.6" />
        </svg>
      </div>

      <div
        className="absolute right-8 top-20 w-32 h-32 rounded-full blur-3xl animate-shimmer"
        style={{ background: glowColor }}
      />
      <div
        className="absolute left-10 bottom-16 w-36 h-36 rounded-full blur-3xl animate-shimmer"
        style={{ background: glowColor, animationDelay: '2s' }}
      />
    </div>
  );
}
