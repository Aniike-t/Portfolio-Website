import React from 'react';
import { Award, Shield, DollarSign, HeartHandshake } from 'lucide-react';
import './SolaraWhy.css';

const REASONS = [
  {
    icon: <Award size={20} />,
    title: "Experienced and skilled team",
    description: "Our certified engineers ensure precise structure design, grid analysis, and safe installation."
  },
  {
    icon: <Shield size={20} />,
    title: "High-quality solar products",
    description: "We use only Tier-1 high-efficiency monocrystalline panels and durable storage components."
  },
  {
    icon: <DollarSign size={20} />,
    title: "Affordable pricing models",
    description: "Enjoy budget-friendly configurations, low interest financing, and transparent billing logs."
  },
  {
    icon: <HeartHandshake size={20} />,
    title: "Reliable after-sales support",
    description: "Each installation comes with a 5-year workmanship guarantee and proactive system checks."
  }
];

function SolaraWhy() {
  return (
    <section className="solara-why-section">
      <div className="solara-why-container">
        
        {/* Left Side: Reason List */}
        <div className="why-text-col">
          <span className="solara-section-subtitle lime-text">Featured Merits</span>
          <h2 className="solara-section-title text-white">Why Choose Us</h2>
          
          <div className="reasons-list">
            {REASONS.map((reason, i) => (
              <div key={i} className="reason-item">
                <div className="reason-icon-wrapper">
                  {reason.icon}
                </div>
                <div className="reason-desc-wrapper">
                  <h4>{reason.title}</h4>
                  <p>{reason.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Graphic box */}
        <div className="why-graphic-col">
          <div className="why-graphic-card">
            <svg viewBox="0 0 300 250" fill="none" xmlns="http://www.w3.org/2000/svg" className="why-svg">
              {/* Ground structure base */}
              <ellipse cx="150" cy="180" rx="90" ry="18" fill="rgba(190, 255, 83, 0.08)" filter="blur(6px)" />
              <path d="M70 140 C70 140, 80 170, 150 175 C220 170, 230 140, 230 140 L230 150 C230 150, 220 180, 150 185 C80 180, 70 150, 70 150 Z" fill="#8c6a53" />
              <path d="M70 120 C70 120, 80 150, 150 155 C220 150, 230 120, 230 120 L230 140 C230 140, 220 170, 150 175 C80 170, 70 140, 70 140 Z" fill="#beff53" opacity="0.6" />
              
              {/* Solar Grid Panel */}
              <polygon points="120,105 180,105 165,145 105,145" fill="#0c2317" stroke="#beff53" strokeWidth="1.5" />
              <polygon points="124,108 176,108 162,142 110,142" fill="#2d6efd" />
              <line x1="145" y1="108" x2="136" y2="142" stroke="#beff53" strokeWidth="1" />
              <line x1="117" y1="125" x2="169" y2="125" stroke="#beff53" strokeWidth="1" />
              
              {/* Miniature Wind Turbine */}
              <line x1="90" y1="120" x2="90" y2="70" stroke="#beff53" strokeWidth="2" />
              <circle cx="90" cy="70" r="4" fill="#0c2317" stroke="#beff53" strokeWidth="1" />
              
              {/* Sun rays glowing overhead */}
              <circle cx="210" cy="60" r="16" fill="rgba(190, 255, 83, 0.15)" />
              <circle cx="210" cy="60" r="8" fill="#beff53" />
              <line x1="210" y1="36" x2="210" y2="44" stroke="#beff53" strokeWidth="1.5" />
              <line x1="210" y1="76" x2="210" y2="84" stroke="#beff53" strokeWidth="1.5" />
              <line x1="186" y1="60" x2="194" y2="60" stroke="#beff53" strokeWidth="1.5" />
              <line x1="226" y1="60" x2="234" y2="60" stroke="#beff53" strokeWidth="1.5" />
            </svg>
            <div className="why-floating-text">
              <span>99.8% System Uptime</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default SolaraWhy;
