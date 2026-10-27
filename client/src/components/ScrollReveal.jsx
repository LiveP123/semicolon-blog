import React, { useEffect, useRef, useState } from 'react';

export default function ScrollReveal({ children, delay = 0 }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // ברגע שהאלמנט נכנס למסך, נפעיל את האנימציה
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target); // מפעיל פעם אחת בלבד
        }
      },
      {
        threshold: 0.1, // יופעל כש-10% מהאלמנט נגלל פנימה
        rootMargin: "0px 0px -50px 0px" // נותן לו קצת להיכנס למסך לפני שמופיע
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}