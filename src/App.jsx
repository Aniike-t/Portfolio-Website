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


const PortfolioLayout = () => {
  const words = ['Software Developer', 'Web Developer', 'Interested In Research', 'AI & ML Enthusiast', 'Philomath'];
  const words2 = [...words, ...words];

  return (
    <div className="app">

      <Header />
      <Analytics />
      
      <div className="scroll-container</div>">
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
              <div className="contact footer-btn" onClick={() => window.location.href = 'mailto:aniketvm1104@gmail.com'} >
                <MdEmail />
                <a href="mailto:aniketvm1104@gmail.com" style={{ textDecoration: 'none', color: 'inherit' }}>
                  aniketvm1104@gmail.com
                </a>
              </div>
              <div className="location footer-btn" >
                <MdLocationOn />
                Location: India
              </div>
              <div className="github-homepage-btn footer-btn" onClick={() => window.location.href = 'https://github.com/Aniike-t'} >
                <FaGithub />
                Github
              </div>
              <div className="github-homepage-btn footer-btn" onClick={() => window.location.href = 'https://www.linkedin.com/in/aniket-mahajan-275305243/'} >
                <FaLinkedin />
                LinkedIn
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="section about">
          <div className="content">
            <AboutMe />
          </div>
        </section>

        <section className="section portfolio">
          <div className="content" id="projects-section">
            <ProjectsSection />
          </div>
        </section>

        <section className="section contactsection">
          <div className="content" id="experience-section">
            <Experience />
          </div>
        </section>
      </div>
    </div>
  );
};


function App() {
  // Global effects like the custom cursor remain here
  useEffect(() => {
    const cursor = document.getElementById('cursor');
    if (!cursor) return;
    
    let mouseX = 0, mouseY = 0, currX = 0, currY = 0;
  
    // --- MOUSE MOVE LOGIC (RESTORED) ---
    const move = e => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.classList.add('active'); // Add active class on move
      // Clear timeout if it exists
      if (cursor.timeout) clearTimeout(cursor.timeout);
      // Set a new timeout to remove the class after a delay
      cursor.timeout = setTimeout(() => {
        cursor.classList.remove('active');
      }, 100);
    };
  
    // --- MOUSE CLICK LOGIC (RESTORED) ---
    const mouseDown = () => {
      cursor.classList.add('clicked');
    };
  
    const mouseUp = () => {
      cursor.classList.remove('clicked');
    };
  
    // --- ANIMATION FRAME LOGIC ---
    const animate = () => {
      currX += (mouseX - currX) * 0.1;
      currY += (mouseY - currY) * 0.1;
      cursor.style.left = currX + 'px';
      cursor.style.top = currY + 'px';
      requestAnimationFrame(animate);
    };
    
    // --- BUTTON HOVER LOGIC (RESTORED & IMPROVED) ---
    // Select all elements that should trigger the fade-out effect
    const buttons = document.querySelectorAll('.footer-btn, .tech-badge, .project-item, .back-link, .github-button');
    
    const onMouseEnter = () => cursor.classList.add('fade-out');
    const onMouseLeave = () => cursor.classList.remove('fade-out');

    buttons.forEach(btn => {
      btn.addEventListener('mouseenter', onMouseEnter);
      btn.addEventListener('mouseleave', onMouseLeave);
    });

    // --- EVENT LISTENERS ---
    document.addEventListener('mousemove', move);
    document.addEventListener('mousedown', mouseDown);
    document.addEventListener('mouseup', mouseUp);
    animate();
  
    // --- CLEANUP FUNCTION ---
    return () => {
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mousedown', mouseDown);
      document.removeEventListener('mouseup', mouseUp);
      buttons.forEach(btn => {
        btn.removeEventListener('mouseenter', onMouseEnter);
        btn.removeEventListener('mouseleave', onMouseLeave);
      });
      if (cursor.timeout) clearTimeout(cursor.timeout);
    };
  }, []); // Run this effect only once on mount
  
  return (
    <>
      <div className="custom-cursor" id="cursor"></div>
      <ScrollToTop />
      <Routes>
        <Route path="/project/:projectId" element={<ProjectDetailPage />} />
        <Route path="/" element={<PortfolioLayout />} />
        <Route path="/*" element={<PortfolioLayout />} />
        <Route path="*" element={<PortfolioLayout />} />
      </Routes>
    </>
  );
}

export default App;