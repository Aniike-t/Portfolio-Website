import React from 'react';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="name"></div>
      <nav>
        <ul>
          <li>
            <a href="/">About</a>
          </li>
          <li>
            <a href="#projects-section">Projects</a>
          </li>
          <li>
            <a href="/">Contact</a>
          </li>
          {/* <li>
            <a href="mailto:aniketvm1104@gmail.com" aria-label="Mail">Mail</a>
          </li> */}
          {/* <li>
            <a href="https://github.com/Aniike-t" aria-label="Github">Github</a>
          </li> */}
        </ul>
      </nav>
    </header>
  );
}

export default Header;