import React from 'react';
import './AboutMe.css';
import { MdComputer, MdCloud, MdSettingsInputAntenna } from 'react-icons/md';
import { FaReact, FaPython } from 'react-icons/fa';
import { SiFlask } from 'react-icons/si';
import { GiBrain } from 'react-icons/gi';

const AboutMe = () => {
  const technologies = [
    { name: 'React', icon: <FaReact /> },
    { name: 'Python', icon: <FaPython /> },
    { name: 'Flask', icon: <SiFlask /> },
    { name: 'Cloud', icon: <MdCloud /> },
    { name: 'AI ML', icon: <GiBrain /> },
    { name: 'Fullstack', icon: <MdComputer /> }
  ];

  return (
    <div className="about-container">
      {/* Left Column: About Info and Academics */}
      <div className="about-info">
        <div className="personal-intro">
          <h1>About Me</h1>
          <p>
            An innovative software engineer with a robust academic background in AI and machine learning.
            My professional journey is defined by creating impactful software solutions that bridge technical
            complexity with strategic problem-solving.
          </p>
        </div>

        <div className="academic-highlights">
          <h3>Academic Highlights</h3>
          <ul>
            <li>
              {/* <span className="academic-icon"><MdSettingsInputAntenna /></span>  */}
              Bachelor of Enginnering in Information Technology 
              <span className="gpa-badge">GPA: 9.48</span>
            </li>
            <li>
              {/* <span className="academic-icon"><MdSettingsInputAntenna /></span> */}
              Minor in Artificial Intelligence & Machine Learning
            </li>

          </ul>
        </div>
      </div>

      {/* Right Column: Technologies */}
      <div className="technologies-section">
        <h2>Technologies I Work With</h2>
        <div className="tech-grid tech-grid-btns">
          {technologies.map((tech, index) => (
            <div key={index} className="tech-badge">
              <span className="tech-icon">{tech.icon}</span>
              <span className="tech-name">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutMe;