import React from 'react';
import './Experience.css';
import { FaDownload, FaBriefcase, FaBuilding, FaMapMarkedAlt } from 'react-icons/fa';
import { SiPostgresql, SiGithub } from 'react-icons/si';

const experiences = [
  {
    role: 'Software Developer',
    company: 'Larsen & Toubro',
    date: 'Nov 2025 - Present',
    duration: '5 mos',
    location: 'Mumbai, India · On-site',
    unit: 'PES - Research and Development',
    description: [
      'Developed a cross-platform map communication application from scratch, adhering to DRDO requirements. Features include geofencing, geospatial computations, intranet map server, and real-time communication.',
      'Configured and optimized the base maptile server for offline mode to serve web and mobile clients in security-critical environments.',
      'Implemented robust REST APIs and WebSockets for low-latency communication.',
      'Optimized data serialization using zigzag varints and geospatial indexing with H3 & S2 for high-performance intranet systems.'
    ],
    tech: ['Python', 'Django', 'Flutter', 'Dart', 'REST APIs', 'WebSockets', 'H3/S2', 'Geospatial Indexing', 'System Design', 'Docker', 'GIS']
  },
  {
    role: 'Project Trainee',
    company: 'Bhabha Atomic Research Centre (BARC)',
    date: 'June 2024 - July 2024',
    duration: '2 mos',
    location: 'Mumbai - Trombay, India · On-site',
    unit: 'Survey Management Systems',
    description: [
      'Engineered a Survey Management System using PHP, MySQL, JavaScript, and Bootstrap to develop and integrate web-based workflows.',
      'Optimized user experience and implemented security measures to enhance application performance.',
      'Coordinated with a cross-functional team to achieve project objectives, demonstrating strong project coordination skills.'
    ],
    tech: ['PHP', 'MySQL', 'JavaScript', 'Bootstrap', 'Security']
  }
];

const Experience = () => {
  return (
    <div className="experience-io-container">
      {/* Background Glows */}
      <div className="exp-bg-glow blue"></div>
      <div className="exp-bg-glow red"></div>

      <div className="experience-header-io">
        <div className="header-left">
          <span className="section-subtitle">JOURNEY</span>
          <h1 className="section-title">Professional <span className="gradient-text">Experience</span></h1>
          <div className="section-line"></div>
        </div>
        <a href="/resume.pdf" download="Aniket_Mahajan_Resume.pdf" className="resume-btn-io">
          <FaDownload /> <span>Download CV</span>
        </a>
      </div>

      <div className="experience-grid">
        {experiences.map((exp, index) => (
          <div key={index} className="experience-card fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
            <div className="card-header">
              <div className="company-info">
                <div className="company-logo">
                  {exp.company === 'Larsen & Toubro' ? <FaBuilding /> : <FaBriefcase />}
                </div>
                <div>
                  <h3>{exp.role}</h3>
                  <p className="company-name">{exp.company} </p>
                </div>
              </div>
              <div className="date-location">
                <span className="exp-date">{exp.date}</span>
                <span className="exp-loc">{exp.location}</span>
              </div>
            </div>
            <span className="unit-tag">{exp.unit}</span>
            <div className="card-body">
              <ul className="description-list">
                {exp.description.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>

              <div className="tech-pills">
                {exp.tech.map((t, i) => (
                  <span key={i} className="tech-pill">{t}</span>
                ))}
              </div>
            </div>

            <div className="card-footer-accent" style={{ background: index === 0 ? 'var(--google-blue)' : 'var(--google-green)' }}></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experience;