import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import BackToPortfolio from '../BackToPortfolio';
import SolaraHero from './SolaraHero';
import SolaraServices from './SolaraServices';
import SolaraWhy from './SolaraWhy';
import SolaraCalculator from './SolaraCalculator';
import SolaraFAQ from './SolaraFAQ';
import SolaraTestimonials from './SolaraTestimonials';
import SolaraFooter from './SolaraFooter';
import './SolaraApp.css';

function SolaraApp() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="solara-app-theme">
      <BackToPortfolio />

      {/* HEADER NAVBAR */}
      <header className={`solara-navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container-solara">
          <div className="nav-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <span className="logo-spark">⚡</span>
            <span className="logo-name">Solara</span>
          </div>

          {/* Desktop nav links */}
          <nav className="nav-links-desktop">
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Home</button>
            <button onClick={() => scrollToSection('services')}>Services</button>
            <button onClick={() => scrollToSection('calculator')}>Calculator</button>
            <button onClick={() => scrollToSection('faq')}>FAQs</button>
          </nav>

          <div className="nav-cta-desktop">
            <button className="nav-consult-btn" onClick={() => scrollToSection('calculator')}>
              Free Consultation
            </button>
          </div>

          {/* Mobile hamburger icon */}
          <button className="mobile-menu-trigger" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu slide down */}
        {isMobileMenuOpen && (
          <div className="mobile-menu-dropdown">
            <button onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setIsMobileMenuOpen(false); }}>Home</button>
            <button onClick={() => scrollToSection('services')}>Services</button>
            <button onClick={() => scrollToSection('calculator')}>Calculator</button>
            <button onClick={() => scrollToSection('faq')}>FAQs</button>
            <button className="consult-btn-mobile" onClick={() => scrollToSection('calculator')}>
              Free Consultation
            </button>
          </div>
        )}
      </header>

      {/* LAYOUT BODY */}
      <main className="solara-content-body">
        
        {/* HERO BANNER SECTION */}
        <SolaraHero />

        {/* ABOUT SERVICES BRIEF */}
        <div className="about-power-row">
          <div className="about-power-container">
            <div className="brief-title-col">
              <span className="brief-badge">About Solara</span>
              <h2>Powering the Future</h2>
            </div>
            <div className="brief-text-col">
              <p>
                <strong>We are a trusted solar energy solutions provider</strong> delivering modern, efficient solar setups for residential, commercial, and industrial clients.
              </p>
              <p>
                Our team of skilled engineers and technicians ensures customized system design, precise structural planning, and safe installation. We utilize only high-efficiency solar panels and battery storage to guarantee reliable, long-term returns.
              </p>
            </div>
          </div>
        </div>

        {/* SERVICES SECTION */}
        <SolaraServices />

        {/* WHY CHOOSE US SECTION */}
        <SolaraWhy />

        {/* BENEFITS & CALCULATOR */}
        <SolaraCalculator />

        {/* FAQ ACCORDION SECTION */}
        <SolaraFAQ />

        {/* SWITCH TO SOLAR TODAY BANNER */}
        <div className="cta-banner-wrapper">
          <div className="cta-banner-content">
            <h2>Switch to Solar Energy Today</h2>
            <button className="solara-btn-primary lime-btn" onClick={() => scrollToSection('calculator')}>
              Get Your Free consultation
            </button>
          </div>
        </div>

        {/* CLIENT TESTIMONIALS SECTION */}
        <SolaraTestimonials />

      </main>

      {/* FOOTER SECTION */}
      <SolaraFooter />

    </div>
  );
}

export default SolaraApp;
