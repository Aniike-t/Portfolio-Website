import React from 'react';
import './SolaraFooter.css';

function SolaraFooter() {
  return (
    <footer className="solara-footer">
      <div className="solara-footer-container">
        
        <div className="footer-brand-col">
          <div className="footer-logo">
            <span className="logo-icon">⚡</span>
            <span className="logo-name">Solara</span>
          </div>
          <p className="footer-tagline">
            Delivering clean, smart, and efficient solar systems to secure energy freedom and reduce carbon output.
          </p>
        </div>

        <div className="footer-links-grid">
          <div className="footer-links-col">
            <h4>Quick Links</h4>
            <ul>
              <li><button onClick={() => document.getElementById('services')?.scrollIntoView({behavior:'smooth'})}>Solar Panels</button></li>
              <li><button onClick={() => document.getElementById('services')?.scrollIntoView({behavior:'smooth'})}>Inverter & Battery</button></li>
              <li><button onClick={() => document.getElementById('services')?.scrollIntoView({behavior:'smooth'})}>Commercial Blueprints</button></li>
            </ul>
          </div>

          <div className="footer-links-col">
            <h4>Company</h4>
            <ul>
              <li><button onClick={() => document.getElementById('calculator')?.scrollIntoView({behavior:'smooth'})}>Calculator</button></li>
              <li><button onClick={() => document.getElementById('faq')?.scrollIntoView({behavior:'smooth'})}>FAQ Help Center</button></li>
              <li><button onClick={() => alert("Blog and case studies are coming soon!")}>Wellness Blog</button></li>
            </ul>
          </div>

          <div className="footer-links-col">
            <h4>Get in Touch</h4>
            <ul>
              <li><span className="contact-info-text">+91 XXXXX XXXXX</span></li>
              <li><span className="contact-info-text">contact@solara.in</span></li>
              <li><span className="contact-info-text">Mumbai, MH, India</span></li>
            </ul>
          </div>
        </div>

      </div>

      <div className="footer-bottom-bar">
        <div className="footer-bottom-container">
          <p>© 2026 Solara Power Solutions Private Limited. All rights reserved.</p>
          <div className="footer-legal-links">
            <button onClick={() => alert("Terms of service...")}>Terms of Use</button>
            <span className="divider">|</span>
            <button onClick={() => alert("Privacy policy...")}>Privacy Policy</button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default SolaraFooter;
