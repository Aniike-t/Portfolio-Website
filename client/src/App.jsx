import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header.jsx';
import { MdLocationOn, MdEmail } from 'react-icons/md';
import WordSlider from './components/WordSlider';
import ProjectsSection from './components/ProjectSection.jsx';
import AboutMe from './components/About.jsx';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import ProjectDetailPage from './components/ProjectDetailPage';
import ScrollToTop from './components/ScrollToTop';
import Analytics from './components/Analytics.jsx';
import Experience from './components/Experience.jsx';
import GamingSection from './components/GamingSection.jsx';
import GrepNowSection from './components/GrepNowSection.jsx';


const PortfolioLayout = () => {
  const words = ['Software Developer', 'Web Developer', 'Research Enthusiast', 'AI & ML Engineer', 'Philomath'];
  const words2 = [...words, ...words];

  return (
    <div className="app">
      <Header />
      <Analytics />

      <div className="scroll-container">
        {/* HERO SECTION */}
        <section id="home" className="section home">
          <div className="hero-accent-circle"></div>
          <div className="content fade-in">
            <div className="io-star-container">
              {/* <svg className="io-star" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M50 0L56.5 38.5L94 31.5L62.5 54.5L88 84.5L50 66.5L12 84.5L37.5 54.5L6 31.5L43.5 38.5L50 0Z" fill="url(#gradient-io)" />
                  <defs>
                    <linearGradient id="gradient-io" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="var(--google-blue)" />
                      <stop offset="25%" stopColor="var(--google-red)" />
                      <stop offset="50%" stopColor="var(--google-yellow)" />
                      <stop offset="75%" stopColor="var(--google-green)" />
                    </linearGradient>
                  </defs>
                </svg> */}
            </div>
            <span className="header-aniket">Hello, I'm Aniket Mahajan</span>
            <h1 className="Profession-name">
              Full Stack NLP Engineer
            </h1>

            <div className="google-dots-hero">
              <div className="dot dot-blue"></div>
              <div className="dot dot-red"></div>
              <div className="dot dot-yellow"></div>
              <div className="dot dot-green"></div>
            </div>

            <div className="footer-info">
              <div className="footer-btn" onClick={() => window.location.href = 'mailto:aniketvm1104@gmail.com'}>
                <MdEmail size={20} />
                <a href="mailto:aniketvm1104@gmail.com">Contact</a>
              </div>
              <div className="footer-btn">
                <MdLocationOn size={20} />
                <span>India</span>
              </div>
              <div
                className="footer-btn"
                onClick={() => window.open('https://github.com/Aniike-t', '_blank')}
              >
                <FaGithub size={20} />
                <span>GitHub</span>
              </div>
              <div
                className="footer-btn"
                onClick={() => window.open('https://www.linkedin.com/in/aniket-mahajan-275305243/', '_blank')}
              >
                <FaLinkedin size={20} />
                <span>LinkedIn</span>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="section about">
          <div className="content">
            <AboutMe />
          </div>
        </section>

        {/* GREPNOW FEATURED SECTION */}

        {/* PORTFOLIO SECTION */}
        <section id="projects" className="section portfolio">
          <ProjectsSection />
        </section>

        {/* GAMING SECTION */}
        <section className="section bg-secondary">
          <GamingSection />
        </section>

        {/* EXPERIENCE SECTION */}
        <section id="experience" className="section contactsection">
          <div className="content" id="experience-section">
            <Experience />
          </div>
        </section>
        <GrepNowSection />

      </div>
    </div>
  );
};


function App() {
  useEffect(() => {
    const cursor = document.getElementById('cursor');
    if (!cursor) return;

    let mouseX = 0, mouseY = 0, currX = 0, currY = 0;

    const move = e => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.classList.add('active');
      if (cursor.timeout) clearTimeout(cursor.timeout);
      cursor.timeout = setTimeout(() => {
        cursor.classList.remove('active');
      }, 100);
    };

    const mouseDown = () => cursor.classList.add('clicked');
    const mouseUp = () => cursor.classList.remove('clicked');

    const animate = () => {
      currX += (mouseX - currX) * 0.15;
      currY += (mouseY - currY) * 0.15;
      cursor.style.left = currX + 'px';
      cursor.style.top = currY + 'px';
      requestAnimationFrame(animate);
    };

    const interactives = document.querySelectorAll('.footer-btn, .tech-badge, .project-item, .back-link, .github-button, a, button');

    const onMouseEnter = () => cursor.classList.add('active');
    const onMouseLeave = () => cursor.classList.remove('active');

    interactives.forEach(el => {
      el.addEventListener('mouseenter', onMouseEnter);
      el.addEventListener('mouseleave', onMouseLeave);
    });

    document.addEventListener('mousemove', move);
    document.addEventListener('mousedown', mouseDown);
    document.addEventListener('mouseup', mouseUp);
    animate();

    return () => {
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mousedown', mouseDown);
      document.removeEventListener('mouseup', mouseUp);
      interactives.forEach(el => {
        el.removeEventListener('mouseenter', onMouseEnter);
        el.removeEventListener('mouseleave', onMouseLeave);
      });
      if (cursor.timeout) clearTimeout(cursor.timeout);
    };
  }, []);

  return (
    <>
      <div className="custom-cursor" id="cursor"></div>
      <ScrollToTop />
      <Routes>
        <Route path="/project/:projectId" element={<ProjectDetailPage />} />
        <Route path="/" element={<PortfolioLayout />} />
        <Route path="/*" element={<PortfolioLayout />} />
      </Routes>
    </>
  );
}

export default App;