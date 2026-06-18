import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, Play } from 'lucide-react';
import './SolaraHero.css';

function SolaraHero() {
  const containerRef = useRef(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    
    // Normalize coordinates between -1 and 1
    const x = ((e.clientX - left) / width) * 2 - 1;
    const y = ((e.clientY - top) / height) * 2 - 1;
    
    setCoords({ x, y });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCoords({ x: 0, y: 0 }); // Smoothly reset to center
  };

  // Interpolated rotation strings
  const rotateX = coords.y * -15; // Max 15 degrees tilt
  const rotateY = coords.x * 15;

  return (
    <section 
      className="solara-hero" 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background glow layers */}
      <div className="hero-radial-glow"></div>
      
      <div className="solara-hero-container">
        
        {/* Left Column: Headlines */}
        <div className="hero-text-side">
          <span className="hero-badge">
            <span className="pulse-indicator"></span>
            A Unique Era of Clean Energy
          </span>
          
          <h1 className="hero-heading">
            Clean Energy
          </h1>
          
          <p className="hero-sub">
            Reduce utility bills, store reliable backup power, and protect the environment by using modern solar systems.
          </p>
          
          <div className="hero-actions-row">
            <button className="solara-btn-primary" onClick={() => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })}>
              Get Started <ArrowRight size={16} />
            </button>
            <button className="solara-btn-secondary" onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}>
              View Services <Play size={14} fill="currentColor" />
            </button>
          </div>
        </div>

        {/* Right Column: 3D Parallax Graphic */}
        <div className="hero-graphic-side">
          <div 
            className={`parallax-3d-scene ${isHovered ? 'hovering' : ''}`}
            style={{
              transform: `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
              transition: isHovered ? 'none' : 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            {/* Layer 1: Background Grid (Deepest) */}
            <div className="scene-layer layer-back" style={{ transform: `translateZ(-60px) scale(1.15)` }}>
              <svg className="parallax-grid" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="45" stroke="rgba(190, 255, 83, 0.06)" strokeWidth="0.5" strokeDasharray="2 2" />
                <circle cx="50" cy="50" r="30" stroke="rgba(190, 255, 83, 0.04)" strokeWidth="0.5" />
                <line x1="50" y1="5" x2="50" y2="95" stroke="rgba(190, 255, 83, 0.04)" strokeWidth="0.5" strokeDasharray="4 4" />
                <line x1="5" y1="50" x2="95" y2="50" stroke="rgba(190, 255, 83, 0.04)" strokeWidth="0.5" strokeDasharray="4 4" />
              </svg>
            </div>

            {/* Layer 2: The Floating Island (Base) */}
            <div className="scene-layer layer-base" style={{ transform: `translateZ(0px)` }}>
              <svg className="island-svg" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Under-island shadow */}
                <ellipse cx="200" cy="240" rx="140" ry="25" fill="rgba(12, 35, 23, 0.3)" filter="blur(10px)" />
                
                {/* 3D Under-crust (Brown slice) */}
                <path d="M60 170 C60 170, 70 230, 200 235 C330 230, 340 170, 340 170 L340 185 C340 185, 330 245, 200 250 C70 245, 60 185, 60 185 Z" fill="#8c6a53" />
                <path d="M60 150 C60 150, 70 210, 200 215 C330 210, 340 150, 340 150 L340 170 C340 170, 330 230, 200 235 C70 230, 60 170, 60 170 Z" fill="#b08b73" />
                
                {/* Grass Surface Top (Bright green) */}
                <path d="M60 150 C60 150, 100 130, 200 130 C300 130, 340 150, 340 150 C340 150, 310 175, 200 175 C90 175, 60 150, 60 150 Z" fill="#0c2317" stroke="rgba(190, 255, 83, 0.3)" strokeWidth="2" />
                <path d="M70 150 C70 150, 105 135, 200 135 C295 135, 330 150, 330 150 C330 150, 305 170, 200 170 C95 170, 70 150, 70 150 Z" fill="#beff53" opacity="0.85" />
              </svg>
            </div>

            {/* Layer 3: Solar Panels and Wind Turbines (Foreground Elements) */}
            <div className="scene-layer layer-props" style={{ transform: `translateZ(45px)` }}>
              <div className="turbines-container">
                {/* Left Turbine */}
                <div className="turbine turbine-left">
                  <div className="turbine-mast"></div>
                  <div className="turbine-head">
                    <div className="turbine-blades">
                      <div className="blade"></div>
                      <div className="blade"></div>
                      <div className="blade"></div>
                    </div>
                  </div>
                </div>

                {/* Right Turbine (Smaller, back-right) */}
                <div className="turbine turbine-right">
                  <div className="turbine-mast"></div>
                  <div className="turbine-head">
                    <div className="turbine-blades fast">
                      <div className="blade"></div>
                      <div className="blade"></div>
                      <div className="blade"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Blue Solar Panels */}
              <svg className="panels-svg" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Left Panel */}
                <g className="solar-panel-graphic shadow-effect">
                  <polygon points="120,165 175,165 190,205 130,205" fill="#0a2a1b" stroke="#beff53" strokeWidth="1.5" />
                  <polygon points="125,168 170,168 185,202 135,202" fill="#2d6efd" />
                  <line x1="148" y1="168" x2="160" y2="202" stroke="#beff53" strokeWidth="1" />
                  <line x1="130" y1="185" x2="180" y2="185" stroke="#beff53" strokeWidth="1" />
                </g>

                {/* Right Panel */}
                <g className="solar-panel-graphic">
                  <polygon points="210,165 265,165 250,205 190,205" fill="#0a2a1b" stroke="#beff53" strokeWidth="1.5" />
                  <polygon points="215,168 260,168 245,202 200,202" fill="#2d6efd" />
                  <line x1="230" y1="168" x2="222" y2="202" stroke="#beff53" strokeWidth="1" />
                  <line x1="205" y1="185" x2="255" y2="185" stroke="#beff53" strokeWidth="1" />
                </g>
              </svg>
            </div>

            {/* Layer 4: Floating Energy Spars (Extreme Foreground) */}
            <div className="scene-layer layer-front" style={{ transform: `translateZ(80px)` }}>
              <svg className="floating-particles" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="80" cy="100" r="4" fill="#beff53" className="floating-bubble bubble-one" />
                <circle cx="320" cy="80" r="3" fill="#beff53" className="floating-bubble bubble-two" />
                <circle cx="300" cy="180" r="5" fill="#beff53" className="floating-bubble bubble-three" opacity="0.6" />
                <path d="M100 110 Q110 115 120 110" stroke="rgba(190, 255, 83, 0.4)" strokeWidth="1" fill="none" className="floating-leaf" />
              </svg>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

export default SolaraHero;
