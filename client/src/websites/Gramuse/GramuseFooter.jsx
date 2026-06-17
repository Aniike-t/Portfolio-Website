import React from 'react';
import { Leaf, Instagram, Twitter, Facebook, MapPin, Phone, Mail } from 'lucide-react';
import './GramuseFooter.css';

function GramuseFooter({ setActiveView, setLegalDoc }) {
  const handleLegalLink = (docType) => {
    setLegalDoc(docType);
    setActiveView('Legal');
    window.scrollTo(0, 0);
  };

  return (
    <footer className="gramuse-footer">
      <div className="footer-top">
        <div className="footer-brand">
          <div className="footer-logo">
            <Leaf size={28} className="logo-icon" />
            <span>Gramuse</span>
          </div>
          <p className="footer-brand-text">
            Bringing the farm to your doorstep. Fresh, organic, and sustainably sourced produce for a healthier community.
          </p>
          <div className="social-links">
            <button aria-label="Instagram"><Instagram size={20} /></button>
            <button aria-label="Twitter"><Twitter size={20} /></button>
            <button aria-label="Facebook"><Facebook size={20} /></button>
          </div>
        </div>

        <div className="footer-links-col">
          <h3>Shop</h3>
          <ul>
            <li><button onClick={() => { setActiveView('Shop'); window.scrollTo(0,0); }}>Fresh Produce</button></li>
            <li><button onClick={() => { setActiveView('Shop'); window.scrollTo(0,0); }}>Dairy & Eggs</button></li>
            <li><button onClick={() => { setActiveView('Shop'); window.scrollTo(0,0); }}>Pantry Essentials</button></li>
            <li><button onClick={() => { setActiveView('Shop'); window.scrollTo(0,0); }}>Weekly Boxes</button></li>
          </ul>
        </div>

        <div className="footer-links-col">
          <h3>About Us</h3>
          <ul>
            <li><button onClick={() => { setActiveView('Shop'); document.getElementById('about')?.scrollIntoView({behavior:'smooth'}); }}>Our Story</button></li>
            <li><button onClick={() => { setActiveView('Shop'); document.getElementById('about')?.scrollIntoView({behavior:'smooth'}); }}>Our Farmers</button></li>
            <li><button onClick={() => handleLegalLink('privacy')}>Sustainability</button></li>
            <li><button onClick={() => handleLegalLink('terms')}>Careers</button></li>
          </ul>
        </div>

        <div className="footer-contact">
          <h3>Contact</h3>
          <ul>
            <li>
              <MapPin size={18} className="contact-icon" />
              <span>123 Organic Lane, Freshville</span>
            </li>
            <li>
              <Phone size={18} className="contact-icon" />
              <span>+1 (555) 123-4567</span>
            </li>
            <li>
              <Mail size={18} className="contact-icon" />
              <span>hello@gramuse.co</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-links">
          <button>Privacy Policy</button>
          <button>Terms of Service</button>
          <button>Refund Policy</button>
        </div>
        <p className="copyright">&copy; {new Date().getFullYear()} Gramuse Organic Grocery. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default GramuseFooter;
