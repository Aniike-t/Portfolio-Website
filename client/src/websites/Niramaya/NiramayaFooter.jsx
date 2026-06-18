import React from 'react';
import './NiramayaFooter.css';

function NiramayaFooter({ setActiveView, setLegalDoc }) {
  const handleNavClick = (view, doc = 'privacy') => {
    setActiveView(view);
    if (view === 'Legal') {
      setLegalDoc(doc);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="niramaya-footer">
      <div className="niramaya-footer-container">
        
        <div className="footer-brand-col">
          <div className="footer-logo">
            <span className="logo-icon">🌸</span>
            <span className="logo-name">Niramaya</span>
          </div>
          <p className="footer-tagline">
            Sourcing clean, Ayurvedic herbs and modern bioactive molecules to fuel your life's vitality.
          </p>
          <div className="ayush-badge-container">
            <span className="ayush-badge">GMP Certified</span>
            <span className="ayush-badge">AYUSH Std Quality</span>
          </div>
        </div>

        <div className="footer-links-grid">
          <div className="footer-links-col">
            <h4>Shop</h4>
            <ul>
              <li><button onClick={() => { setActiveView('Shop'); setTimeout(() => document.getElementById('shop')?.scrollIntoView({behavior:'smooth'}), 100); }}>Vitamins</button></li>
              <li><button onClick={() => { setActiveView('Shop'); setTimeout(() => document.getElementById('shop')?.scrollIntoView({behavior:'smooth'}), 100); }}>Dietary Supplements</button></li>
              <li><button onClick={() => { setActiveView('Shop'); setTimeout(() => document.getElementById('offers')?.scrollIntoView({behavior:'smooth'}), 100); }}>Special Bundles</button></li>
            </ul>
          </div>

          <div className="footer-links-col">
            <h4>Company</h4>
            <ul>
              <li><button onClick={() => { setActiveView('Shop'); setTimeout(() => document.getElementById('about')?.scrollIntoView({behavior:'smooth'}), 100); }}>About Us</button></li>
              <li><button onClick={() => handleNavClick('Blog')}>Wellness Journal</button></li>
              <li><button onClick={() => handleNavClick('Profile')}>User Dashboard</button></li>
            </ul>
          </div>

          <div className="footer-links-col">
            <h4>Legal & Safety</h4>
            <ul>
              <li><button onClick={() => handleNavClick('Legal', 'privacy')}>Privacy Policy</button></li>
              <li><button onClick={() => handleNavClick('Legal', 'terms')}>Terms of Service</button></li>
            </ul>
          </div>
        </div>

      </div>

      <div className="footer-bottom-bar">
        <div className="footer-bottom-container">
          <p>© 2026 Niramaya Wellness Private Limited. All Rights Reserved.</p>
          <p className="disclaimer-text">
            Disclaimer: These products are health supplements and not intended as replacements for medical treatments.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default NiramayaFooter;
