import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import { MdLocationOn, MdEmail } from 'react-icons/md'; // Import icons
import WordSlider from './components/WordSlider';

function App() {
  const words = ['Software Developer', 'Web Developer', 'Interested In Research', 'AI & ML Enthusiast', 'Philomath'];
  const words2 = [...words, ...words]; 

  return (
    <div className="app">
      <Header />
      <div className="scroll-container">
        <section className="section home">
          <div className="content">
            <h1 className="Profession-name">
              Hello,
              <br />
              I'm Aniket Mahajan
              <br />
              <WordSlider words={words2} />
            </h1>
            <div className="footer-info">
              <div className="contact">
                <MdEmail />
                <a href="mailto:aniketvm1104@gmail.com" style={{ textDecoration: 'none', color: 'inherit' }}>
                  aniketvm1104@gmail.com
                </a>
              </div>
              <div className="location">
                <MdLocationOn />
                Current location: India
              </div>
            </div>
          </div>
        </section>

        <section className="section portfolio">
          <div className="content">
            <h2>Portfolio</h2>
            <p>Check out my projects below.</p>
          </div>
        </section>

        <section className="section about">
          <div className="content">
            <h2>About Me</h2>
            <p>Learn more about my skills and experience.</p>
          </div>
        </section>

        <section className="section contactsection">
          <div className="content">
            <h2>Contact Me</h2>
            <p>Get in touch with me!</p>
          </div>
        </section>
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default App;