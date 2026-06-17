import React from 'react';
import './AureluneFooter.css';

function AureluneFooter({ setActivePage, setLegalDoc }) {
  const handleLegalLink = (docType) => {
    setLegalDoc(docType);
    setActivePage('Legal');
    window.scrollTo(0, 0);
  };

  return (
    <footer className="aurelune-footer">
      <div className="footer-top-grid">
        <div className="footer-col brand-col">
          <h2 className="footer-logo">Aurelune</h2>
          <p className="footer-brand-desc">A study in form, function, and enduring elegance. Designed in Paris.</p>
        </div>
        
        <div className="footer-col">
          <h3 className="footer-col-title">Client Services</h3>
          <ul className="footer-links">
            <li><button onClick={() => setActivePage('Shop')}>Contact Us</button></li>
            <li><button onClick={() => handleLegalLink('terms')}>Shipping & Returns</button></li>
            <li><button onClick={() => setActivePage('Profile')}>Track Order</button></li>
            <li><button onClick={() => handleLegalLink('terms')}>Size Guide</button></li>
          </ul>
        </div>

        <div className="footer-col">
          <h3 className="footer-col-title">The Maison</h3>
          <ul className="footer-links">
            <li><button onClick={() => setActivePage('Studio')}>About Aurelune</button></li>
            <li><button onClick={() => setActivePage('Journal')}>Sustainability</button></li>
            <li><button onClick={() => handleLegalLink('terms')}>Careers</button></li>
            <li><button onClick={() => handleLegalLink('privacy')}>Legal Notice</button></li>
          </ul>
        </div>

        <div className="footer-col newsletter-col">
          <h3 className="footer-col-title">Newsletter</h3>
          <p className="newsletter-desc">Subscribe to receive early access to new collections, exclusive events, and editorial content.</p>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Email Address" required />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-socials">
          <button>Instagram</button>
          <button>Pinterest</button>
          <button>Spotify</button>
        </div>
        <div className="footer-copyright">
          <span>&copy; {new Date().getFullYear()} Aurelune Paris. All Rights Reserved.</span>
        </div>
        <div className="footer-locale">
          <button>France (EUR €)</button>
        </div>
      </div>
    </footer>
  );
}

export default AureluneFooter;
