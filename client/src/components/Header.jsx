import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import './Header.css';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={`header-container fade-in ${isMenuOpen ? 'menu-active' : ''}`}>
      <div className="logo-io" onClick={() => window.location.href = '#home'}>AM</div>

      <nav className={`navbar-io ${isMenuOpen ? 'nav-active' : ''}`}>
        <a href="#home" onClick={closeMenu}>Home</a>
        <a href="#about" onClick={closeMenu}>About</a>
        {/* <a href="#grepnow" onClick={closeMenu}>gREP</a> */}
        <a href="#projects" onClick={closeMenu}>Projects</a>
        <a href="#experience" onClick={closeMenu}>Experience</a>
        <a href="#hobbies" onClick={closeMenu}>Hobbies</a>
      </nav>

      <div className="header-actions">
        <button className="register-btn header-cta" onClick={() => window.location.href = 'mailto:aniketvm1104@gmail.com'}>
          Let's Talk
        </button>

        <button className="mobile-toggle" onClick={toggleMenu} aria-label="Toggle Navigation">
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
    </header>
  );
}

export default Header;