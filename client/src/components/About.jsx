import React from 'react';
import './AboutMe.css';
import {
  MdComputer,
  MdCloud,
  MdSchool,
  MdArchitecture,
  MdTerminal,
  MdGamepad,
  MdCode,
  MdBrush,
  MdMemory
} from 'react-icons/md';

import {
  FaReact,
  FaPython,
  FaDatabase,
  FaAws,
  FaGitAlt,
  FaMobileAlt,
  FaUnity
} from 'react-icons/fa';

import {
  SiFlask,
  SiTensorflow,
  SiPytorch,
  SiFlutter,
  SiDocker,
  SiDigitalocean,
  SiMongodb,
  SiCloudflare,
  SiGoogle,
  SiPostgresql,
  SiAmazonrds,
  SiAmazondynamodb,
  SiExpo,
  SiGodotengine,
  SiFirebase,
  SiRedis,
  SiDjango
} from 'react-icons/si';

import { GiBrain } from 'react-icons/gi';
import { MdJavascript } from 'react-icons/md';

const AboutMe = () => {
  const categories = [
    {
      title: "Mobile & Web",
      icons: [
        { name: 'React', icon: <FaReact />, color: '#61DAFB' },
        { name: 'React Native Expo', icon: <SiExpo />, color: '#ffffff' },
        { name: 'Flutter', icon: <SiFlutter />, color: '#02569B' },
        { name: 'HTML', icon: <MdCode />, color: '#E34F26' },
        { name: 'CSS', icon: <MdBrush />, color: '#1572B6' },
        { name: 'JavaScript', icon: <MdJavascript />, color: '#F7DF1E' }
      ]
    },
    {
      title: "AI / ML",
      icons: [
        { name: 'NLP', icon: <GiBrain />, color: '#ea4335' },
        { name: 'PyTorch', icon: <SiPytorch />, color: '#EE4C2C' },
        { name: 'Google Genkit', icon: <SiGoogle />, color: '#4285F4' },
        { name: 'Google ADK', icon: <SiGoogle />, color: '#34A853' }
      ]
    },
    {
      title: "Systems",
      icons: [
        { name: 'C', icon: <MdMemory />, color: '#A8B9CC' },
        { name: 'Python', icon: <FaPython />, color: '#3776AB' },
        { name: 'Flask', icon: <SiFlask />, color: '#ffffff' },
        { name: 'Django', icon: <SiDjango />, color: '#092E20' },
        { name: 'System Design', icon: <MdArchitecture />, color: '#1a73e8' },
        { name: 'Docker', icon: <SiDocker />, color: '#2496ED' },
      ]
    },
    {
      title: "Cloud & Data",
      icons: [
        { name: 'PostgreSQL', icon: <SiPostgresql />, color: '#336791' },
        { name: 'MongoDB', icon: <SiMongodb />, color: '#47A248' },
        { name: 'Amazon RDS', icon: <SiAmazonrds />, color: '#527FFF' },
        { name: 'DynamoDB', icon: <SiAmazondynamodb />, color: '#4053D6' },
        { name: 'Firebase', icon: <SiFirebase />, color: '#FFCA28' },
        { name: 'Redis', icon: <SiRedis />, color: '#DC382D' },
        { name: 'AWS', icon: <FaAws />, color: '#FF9900' },
        { name: 'Cloudflare', icon: <SiCloudflare />, color: '#F38020' },
      ]
    },
    {
      title: "Additional",
      icons: [
        { name: 'Godot', icon: <SiGodotengine />, color: '#478CBF' },
        { name: 'Unity C#', icon: <FaUnity />, color: '#ffffff' },
        { name: 'Game Dev', icon: <MdGamepad />, color: '#FFD700' },
        { name: 'Git', icon: <FaGitAlt />, color: '#F05032' },
      ]
    }
  ];

  return (
    <div className="about-container-v2 fade-in">
      <div className="about-header-section">
        <h1 className="io-title">Engineering</h1>
      </div>

      <div className="about-content-grid">
        {/* Left Side: Intro + Academics */}
        <div className="about-left-column">
          <div className="about-intro-card">
            <p className="io-description">
              A Full-stack Developer and AI Researcher focused on bridging technical complexity with scalable architecture.
              Currently specializing in Large Language Models (LLMs) and distributed systems.
            </p>
          </div>

          <div className="about-card journey-card">
            <h3><div className="card-icon"><MdSchool /></div>Academics</h3>
            <div className="academic-grid">
              <div className="academic-item">
                <span className="degree">B.E. in Information Technology</span>
                <span className="institution">Vidyalankar Institute of Technology</span>
                <span className="gpa-pill">CGPA 9.48/10.0</span>
              </div>
              <div className="academic-item">
                <span className="degree">Minor in AI & Machine Learning</span>
                <span className="institution">Vidyalankar Institute of Technology</span>
                {/* <span className="specialization">Focus: NLP</span> */}
                <span className="gpa-pill">CGPA 9.00/10.0</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Stack/Skills Section */}
        <div className="skills-bento">
          {categories.map((cat, idx) => (
            <div key={idx} className="skill-group">
              <h4>{cat.title}</h4>
              <div className="skill-icons-row">
                {cat.icons.map((item, i) => (
                  <div key={i} className="skill-item-io" style={{ '--accent': item.color }}>
                    <span className="s-icon">{item.icon}</span>
                    <span className="s-name">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default AboutMe;