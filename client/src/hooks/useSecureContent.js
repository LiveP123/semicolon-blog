import { useEffect } from 'react';

const useSecureContent = () => {
  useEffect(() => {
    const handleCopy = (e) => e.preventDefault();
    const handleContextMenu = (e) => e.preventDefault();
    
    document.addEventListener('copy', handleCopy);
    document.addEventListener('contextmenu', handleContextMenu);
    
    return () => {
      document.removeEventListener('copy', handleCopy);
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);
};

export default useSecureContent;