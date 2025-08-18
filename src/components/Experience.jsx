import React from 'react';
import './Experience.css';
import { FaDownload } from 'react-icons/fa';

const experiences = [
  {
    role: 'Project Trainee',
    company: 'Bhabha Atomic Research Centre (BARC)',
    date: 'June 2024 - July 2024',
    description: [
      'Engineered a Survey Management System using PHP, MySQL, JavaScript, and Bootstrap to develop and integrate web-based workflows.',
      'Optimized user experience and implemented security measures to enhance application performance.',
      'Coordinated with a cross-functional team to achieve project objectives, demonstrating strong project coordination skills.'
    ],
  }
];

const Experience = () => {
  return (
    <div className="experience-container">
      <div className="experience-header">
        <h1>Work Experience</h1>
        <a href="/resume.pdf" download="Aniket_Mahajan_Resume.pdf" className="resume-button">
          <FaDownload /> Download Resume
        </a>
      </div>
      <div className="experience-timeline">
        {experiences.map((exp, index) => (
          <div key={index} className="experience-item">
            <div className="experience-dot"></div>
            <div className="experience-content">
              <h3>{exp.role}</h3>
              <p className="experience-company-date">
                {exp.company} | {exp.date}
              </p>
              <ul>
                {exp.description.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experience;