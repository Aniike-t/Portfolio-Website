import React from 'react';
import { Leaf, Award, Heart, CheckCircle } from 'lucide-react';
import './NiramayaAbout.css';

function NiramayaAbout() {
  const certifications = [
    {
      icon: <Award size={32} />,
      title: "Ayush Standard Quality",
      desc: "Certified by the Ministry of AYUSH, Govt of India, ensuring authentic Ayurvedic preparations."
    },
    {
      icon: <Leaf size={32} />,
      title: "100% Plant Sourced",
      desc: "Our ingredients are completely organic, clean, vegan, and harvested sustainably."
    },
    {
      icon: <Heart size={32} />,
      title: "Science-Backed Ayurveda",
      desc: "Combining ancient Vedic wisdom with modern clinical trials for zero-compromise results."
    }
  ];

  return (
    <section id="about" className="niramaya-about-section">
      <div className="niramaya-about-container">
        <div className="about-header">
          <span className="section-subtitle">Our Promise</span>
          <h2 className="section-title">Bridging Vedic Wisdom & Modern Science</h2>
          <p className="section-desc">
            At Niramaya Wellness, we believe true healing starts from within. We source our potent herbs from certified organic farms across India to craft supplements that bring real, visible results without toxic fillers.
          </p>
        </div>

        <div className="certifications-grid">
          {certifications.map((cert, i) => (
            <div key={i} className="cert-card">
              <div className="cert-icon-wrapper">
                {cert.icon}
              </div>
              <h3>{cert.title}</h3>
              <p>{cert.desc}</p>
            </div>
          ))}
        </div>

        <div className="about-featured-split">
          <div className="split-image-container">
            <img 
              src="/niramaya/about-herbs.jpg" 
              alt="Ayurvedic herbs and powders" 
              className="about-split-img"
            />
            <div className="floating-badge">
              <CheckCircle size={20} />
              <span>GMP Certified Facility</span>
            </div>
          </div>
          <div className="split-info">
            <span className="badge-tag">Ethical Practices</span>
            <h3>Purity is our highest priority</h3>
            <p>
              Each batch of Niramaya supplements undergoes rigorous triple-testing protocol for heavy metals, pesticides, and microbial purity. We ensure that only the highest grade of extracts make it into your capsule.
            </p>
            <ul className="promises-list">
              <li>
                <span className="bullet">✓</span>
                No artificial colors, flavors, or binding agents
              </li>
              <li>
                <span className="bullet">✓</span>
                Zero magnesium stearate or chemical glazes
              </li>
              <li>
                <span className="bullet">✓</span>
                Glass packaging to prevent microplastic leaching
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default NiramayaAbout;
