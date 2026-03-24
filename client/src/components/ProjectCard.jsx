import React, { useRef, useState } from 'react';
import './ProjectCard.css';

function ProjectCard({ project }) {
  const videoRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Find a suitable preview media
  const previewMedia = project.media?.[0];

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.play().catch(e => console.log("Autoplay blocked", e));
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div 
        className={`project-card-v2 ${isHovered ? 'hovered' : ''}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
    >
      <div className="card-media-container">
        {previewMedia?.type === 'video/mp4' ? (
          <video
            ref={videoRef}
            src={previewMedia.url}
            muted
            loop
            playsInline
            className="card-video"
          />
        ) : previewMedia?.type === 'image' ? (
          <img src={previewMedia.url} alt={project.name} className="card-image" />
        ) : (
          <div className="card-placeholder">
             <div className="logo-placeholder">{project.name.charAt(0)}</div>
          </div>
        )}
        <div className="card-overlay"></div>
      </div>

      <div className="card-content-v2">
        <div className="card-top">
            <span className="project-id">#{project.id}</span>
            <div className="tech-pills">
                {project.technologies_used?.slice(0, 3).map((tech, i) => (
                    <span key={i} className="tech-pill">{tech}</span>
                ))}
            </div>
        </div>
        
        <div className="card-bottom">
            <h2 className="project-title">{project.name}</h2>
            {/* <p className="project-summary">{project.summary}</p> */}
            <div className="view-project-link">
                EXPLORE CASE STUDY 
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;