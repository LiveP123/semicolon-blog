import React, { useState } from 'react';
import './ContactModal.css';

const ContactModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ loading: false, success: false, error: '' });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: '' });

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus({ loading: false, success: true, error: '' });
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error('שגיאה בשליחת ההודעה');
      }
    } catch (err) {
      setStatus({ loading: false, success: false, error: 'אירעה שגיאה בשליחה. נסי שוב מאוחר יותר.' });
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        
        <h2>יצירת קשר</h2>
        <p className="modal-subtitle">נבנה ע"י CWeb. נשמח לשמוע ממך!</p>

        {status.success ? (
          <div className="contact-success">
            <p>✨ ההודעה נשלחה בהצלחה! נחזור אליך בהקדם.</p>
            <button className="btn-submit" onClick={onClose}>סגור</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">שם מלא</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="איך לקרוא לך?"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">דואר אלקטרוני</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">הודעה</label>
              <textarea
                id="message"
                name="message"
                rows="4"
                required
                value={formData.message}
                onChange={handleChange}
                placeholder="מה שתרצי לכתוב לנו..."
              ></textarea>
            </div>

            {status.error && <p className="contact-error">{status.error}</p>}

            <button type="submit" className="btn-submit" disabled={status.loading}>
              {status.loading ? 'שולח...' : 'שליחת הודעה'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ContactModal;