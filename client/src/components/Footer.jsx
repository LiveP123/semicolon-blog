import React, { useState } from 'react';
import ContactModal from './ContactModal';
import './Footer.css';

const Footer = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <footer className="app-footer">
      <p>© {new Date().getFullYear()} נקודה פסיק. כל הזכויות שמורות.</p>
      <p className="credit-line">
        נבנה ע"י{' '}
        <button
          type="button"
          className="credit-btn"
          onClick={() => setIsContactOpen(true)}
        >
          CWeb
        </button>
      </p>

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </footer>
  );
};

export default Footer;